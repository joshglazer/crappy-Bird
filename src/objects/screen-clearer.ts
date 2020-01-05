/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Flappy Bird: Pipe
 * @license      Digitsensitive
 */

export class ScreenClearer extends Phaser.GameObjects.Image {
    constructor(params) {
        super(params.scene, params.x, params.y, params.key, params.frame);

        const velocity = 300  
      
        // image
        this.setOrigin(0, 0);
  
        // physics
        this.scene.physics.world.enable(this);
        this.body.allowGravity = false;
        this.body.setVelocityX(-1 * velocity);
        this.body.setSize(50, 50);
  
        this.scene.add.existing(this);
    }
  }
  