import { BaseScene } from '../scenes/BaseScene'

export default class Player extends Phaser.Physics.Arcade.Sprite {
  private _cursors?: Phaser.Types.Input.Keyboard.CursorKeys
  private _wasd?: { [key: string]: Phaser.Input.Keyboard.Key }
  private _speed: number
  private _gameScene: BaseScene
  
  constructor(scene: Phaser.Scene, x: number, y: number) {
    // 1. IMPORTANT: Use the key for the SPRITESHEET you'll load, not the old static image.
    super(scene, x, y, 'player') 
    this._gameScene = scene as BaseScene

    this.setScale(0.25)
    this._gameScene.add.existing(this)
    this._gameScene.physics.add.existing(this)

    // 2. Adjust the collision body for a character sprite.
    // This is often taller than it is wide. You may need to tweak these values.
     this.body?.setSize(120, 80);

    this._cursors = this._gameScene.input.keyboard?.createCursorKeys()
    this._wasd = this._gameScene.input.keyboard?.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
    }) as { [key: string]: Phaser.Input.Keyboard.Key }

    this._speed = 250

    // 3. Start the player in the 'idle' animation by default.
    this.anims.play('idle', true);
  }

  public get gameScene (): BaseScene {
    return this._gameScene;
  }

  public update () {
    const direction = new Phaser.Math.Vector2(0, 0)
    if (this._cursors?.left.isDown || this._wasd?.left.isDown) {
        direction.x -= 1
    }
    if (this._cursors?.right.isDown || this._wasd?.right.isDown) {
        direction.x += 1
    }
    if (this._cursors?.up.isDown || this._wasd?.up.isDown) {
        direction.y -= 1
    }
    if (this._cursors?.down.isDown || this._wasd?.down.isDown) {
        direction.y += 1
    }
    direction.normalize().scale(this._speed)
    this.setVelocity(direction.x, direction.y)

    // 4. Call the new method to update animations every frame.
    //TODO: comment this back in
    // this.updateAnimation();
  }

  /**
   * Checks the player's velocity and plays the appropriate animation ('run' or 'idle').
   * Also flips the sprite horizontally to face the direction of movement.
   */
  private updateAnimation(): void {
    const velocity = this.body?.velocity;

    // If the player is moving
    if (velocity && (velocity.x !== 0 || velocity.y !== 0)) {
        this.anims.play('run', true);

        // Flip sprite based on horizontal direction
        if (velocity.x < 0) {
            this.flipX = true; // Facing left
        } else if (velocity.x > 0) {
            this.flipX = false; // Facing right
        }
    } 
    // If the player is standing still
    else {
        this.anims.play('idle', true);
    }
  }
}
