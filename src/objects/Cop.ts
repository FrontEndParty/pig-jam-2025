import { BaseScene } from '../scenes/BaseScene';
import { BaseNPC } from './BaseNPC';
import Player from './Player';

/**
 * The Cop NPC class. If the player overlaps with this NPC,
 * the scene will transition to the "game over" screen.
 */
export class Cop extends BaseNPC {
  public originalX: integer;

  constructor(scene: BaseScene, x: number, y: number) {
    // Call the parent constructor from BaseNPC
    super(
      scene,
      'cop', // This is the texture key for the cop sprite
      'Police Officer', // The name of the NPC
      x,
      y,
      false // This NPC is not interactable with a button press
    );
    this.setScale(0.1);
    // We can optionally adjust the physics body (hitbox) of the cop.
    // For example, to make it slightly smaller than the visual sprite.
    this.body?.setSize(this.width * 0.8, this.height * 0.9);

    this.originalX = this.x; // call once when creating the cop

  }

  /**
   * This method is required by the BaseNPC abstract class.
   * Since the cop's "interaction" is based purely on collision,
   * we can leave this empty.
   */
  public interact(): void {
    // The cop is not interactable in a conventional way.
  }

  /**
   * A helper method to set up the collision logic between this cop and the player.
   * When they overlap, the game over sequence is triggered.
   * @param player The player instance to check for overlap with.
   */
  public setupCollision(player: Player): void {
    this.scene.physics.add.overlap(
      this, // The cop instance
      player, // The player instance
      () => {
        // This is the callback function that executes when the overlap occurs.
        // It transitions the game to the GameOver scene.
        // --- THIS LINE HAS BEEN CORRECTED ---
        
        this.scene.scene.stop('Game'); // Use your existing scene key
        this.scene.scene.stop('SongScene'); // Use your existing scene key
        this.scene.scene.start('GameOver'); // Use your existing scene key
      },
      undefined, // processCallback, not needed for this simple case
      this // The context for the callback
    );
  }

  public move(playerHealth: number) {
    if (playerHealth <= 0) return;

    const screenCenterX = this.scene.scale.width / 2;
    const fraction = (100 - playerHealth) / 100; // fraction of full distance

    // Target is always originalX + fraction * fullDistance
    const targetX = this.originalX + fraction * (screenCenterX - this.originalX);
    const targetY = this.y; // y stays fixed

    this.scene.tweens.add({
      targets: this,
      x: targetX,
      y: targetY,
      ease: 'Power1',
      duration: 10,
    });

  }
}

// x = full distance
