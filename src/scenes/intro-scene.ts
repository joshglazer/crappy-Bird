import { Bird } from "../objects/bird";

export class IntroScene extends Phaser.Scene {

    private startKey: Phaser.Input.Keyboard.Key;

    constructor() { 
      super({
        key: "IntroScene"
      });
    }

    init(): void {
    }
  
    preload(): void {
      this.load.pack(
        "flappyBirdPack",
        "./src/assets/pack.json",
        "flappyBirdPack"
      );
    }  

    create(): void {
      // Background
      this.add
        .tileSprite(0, 0, 390, 600, "background")
        .setOrigin(0, 0);
  
      // Game Title
      this.add
        .text(
          this.sys.canvas.width / 2,
          50,
          "CRAPPY BIRD",
        )
        .setOrigin(0.5)
        .setAlign('center')
        .setFontSize(50);

      // Game Subtitle
      this.add
        .text(
          this.sys.canvas.width / 2,
          90,
          "A \"Flappy Bird\" Rip-off",
        )
        .setOrigin(0.5)
        .setAlign('center')
        .setFontSize(20);

      // Bird
      this.add.image(
        this.sys.canvas.width / 2,
        250,
        "bird",
      ).setScale(8);

      // Start Instructions
      this.add
        .text(
          this.sys.canvas.width / 2,
          this.sys.canvas.height - 50,
          "Press [spacebar] to play again",
        )
        .setOrigin(0.5)
        .setAlign('center')
        .setFontSize(20);

      // Register spacebar as restart
      this.startKey = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.SPACE
      );

      this.input.on('pointerdown', (pointer) => {
        this.startGame();
      });
    }

    update(): void {
      if (this.startKey.isDown) {
        this.startGame();
      }
    }

    private startGame() {
      this.scene.start('GameScene');
    }
  }
