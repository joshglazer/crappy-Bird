/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Flappy Bird: Pipe
 * @license      Digitsensitive
 */

export class Pipe extends Phaser.GameObjects.Image {
  constructor(params, velocity: number, isWacky: boolean) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    // If this is a wacky pipe, generate a number between -50 and 50 to modify the velocity of each segment of the pipe
    if (isWacky) {
      const velocityModifier = 100 + (Math.floor(Math.random() * 100) - 50);
      velocity = velocity + velocityModifier;
    }

    // image
    this.setScale(3);
    this.setOrigin(0, 0);

    // physics
    this.scene.physics.world.enable(this);
    this.body.allowGravity = false;
    this.body.setVelocityX(-1 * velocity);
    this.body.setSize(20, 20);

    this.scene.add.existing(this);
  }
}
