/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Flappy Bird: Game Scene
 * @license      Digitsensitive
 */

import { Bird } from "../objects/bird";
import { Pipe } from "../objects/pipe";
import { ScreenClearer } from "../objects/screen-clearer";

export class GameScene extends Phaser.Scene {
  private bird: Bird;
  private pipes: Phaser.GameObjects.Group;
  private background: Phaser.GameObjects.TileSprite;
  private scoreText: Phaser.GameObjects.BitmapText;
  private screenClearer: ScreenClearer

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {
    this.registry.set("score", -1);
  }

  preload(): void {
    this.load.pack(
      "flappyBirdPack",
      "./src/assets/pack.json",
      "flappyBirdPack"
    );
  }

  create(): void {
    this.background = this.add
      .tileSprite(0, 0, 390, 600, "background")
      .setOrigin(0, 0);

    this.scoreText = this.add
      .bitmapText(
        this.sys.canvas.width / 2 - 14,
        30,
        "font",
        this.registry.values.score
      )
      .setDepth(2);

    this.pipes = this.add.group({ classType: Pipe });

    this.bird = new Bird({
      scene: this,
      x: 50,
      y: 100,
      key: "bird"
    });

    // *****************************************************************
    // TIMER
    // *****************************************************************
    this.addNewRowOfPipes();

    this.time.addEvent({
      delay: 1500,
      callback: this.addNewRowOfPipes,
      callbackScope: this,
      loop: true
    });

    this.time.addEvent({
      delay: 15000,
      callback: this.addScreenClearer,
      callbackScope:this,
      loop: true,
    })
  }

  update(): void {
    if (!this.bird.getDead()) {
      this.background.tilePositionX += 4;
      this.bird.update();

      // check if the bird has hit the screen clearer
      this.physics.overlap(
        this.bird,
        this.screenClearer,
        function() {
          this.pipes.clear(true, true);
          this.screenClearer.destroy();
        },
        null,
        this
      );
      
      // check if the bird has hit a pipe
      this.physics.overlap(
        this.bird,
        this.pipes,
        function() {
          this.bird.setDead(true);
        },
        null,
        this
      );
    } else {

      // When the game ends, stop the movement of all objects
      Phaser.Actions.Call(
        this.pipes.getChildren(),
        function(pipe) {
          pipe.body.setVelocityX(0);
        },
        this
      );

      if (this.screenClearer && this.screenClearer.body) {
        this.screenClearer.body.setVelocityX(0);
      }

      // When the game ends and the bird falls off the bottom of the screen, 
      if (this.bird.y > this.sys.canvas.height) {
        this.scene.restart();
      }
    }
  }

  private addNewRowOfPipes(): void {
    // update the score
    this.registry.values.score += 1;
    this.scoreText.setText(this.registry.values.score);

    // randomly pick a number between 1 and 5
    let hole = Math.floor(Math.random() * 5) + 1;

    // velocity should be a random number between 150 and 250
    const velocity = Math.floor(Math.random() * 100) + 150;

    // one in every 20 pipes should be a wacky pipe, which means that each piece moves at it's own speed
    const isWacky = (Math.floor(Math.random() * 20) + 1) === 20;

    // add 6 pipes with one big hole at position hole and hole + 1
    for (let i = 0; i < 10; i++) {
      if (i !== hole && i !== hole + 1 && i !== hole + 2) {
        if (i === hole - 1) {
          this.addPipe(400, i * 60, 0, velocity, isWacky);
        } else if (i === hole + 3) {
          this.addPipe(400, i * 60, 1, velocity, isWacky);
        } else {
          this.addPipe(400, i * 60, 2, velocity, isWacky);
        }
      }
    }
  }

  private addScreenClearer(): void {
    // set a random y value between 0 and 50 less than the height, and x value to the right of the screen
    const x = 400;
    const height = 50;
    const y = Math.floor(Math.random() * (this.sys.canvas.height - height)) + 1;

    this.screenClearer = new ScreenClearer({
      scene: this,
      x: x,
      y: y,
      key: "screen-clearer"
    });

  }

  private addPipe(x: number, y: number, frame: number, velocity: number, isWacky: boolean): void {
    // create a new pipe at the position x and y and add it to group
    this.pipes.add(
      new Pipe(
        {
          scene: this,
          x: x,
          y: y,
          frame: frame,
          key: "pipe",
        },
        velocity,
        isWacky
      )
    );
  }
}
