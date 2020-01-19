export class GameOverScene extends Phaser.Scene {

    private restartKey: Phaser.Input.Keyboard.Key;

    constructor() { 
      super({
        key: "GameOverScene"
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
  
      // Game Over Title
      this.add
        .text(
          this.sys.canvas.width / 2,
          50,
          "GAME OVER",
        )
        .setOrigin(0.5)
        .setAlign('center')
        .setFontSize(60);

      // Your Score Title
      this.add
        .text(
          this.sys.canvas.width / 2,
          150,
          "Your Score",
        )
        .setOrigin(0.5)
        .setAlign('center')
        .setFontSize(40);

      // Your Score Number
      this.add
        .bitmapText(
          this.sys.canvas.width / 2 - 14,
          200,
          "font",
          this.registry.values.score
        )
        .setDepth(2);

      // Restart Instructions
      this.add
        .text(
          this.sys.canvas.width / 2,
          this.sys.canvas.height - 50,
          "Press [spacebar] or [tap]\n to play again",
        )
        .setOrigin(0.5)
        .setAlign('center')
        .setFontSize(20);

      // Register spacebar as restart
      this.restartKey = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.SPACE
      );

      this.input.on('pointerdown', (pointer) => {
        this.restartGame();
      });
    }

    update(): void {
      if (this.restartKey.isDown) {
        this.restartGame();
      }
    }

    private restartGame() {
      this.scene.start('GameScene');
    }
  }
