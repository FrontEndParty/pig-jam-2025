import { BaseScene } from '../scenes/BaseScene';

/**
 * A base class for non-physical obstacles that scroll from right to left.
 * The object automatically destroys itself when it moves off-screen to the left.
 */
export class BaseObstacle extends Phaser.GameObjects.Image {
    protected _speed: number;

    /**
     * @param scene The scene to add the obstacle to.
     * @param x The starting x-coordinate.
     * @param y The starting y-coordinate.
     * @param texture The texture key for the obstacle's appearance.
     * @param speed The horizontal speed at which the obstacle moves left.
     */
    constructor(scene: BaseScene, x: number, y: number, texture: string, speed: number, scale:number) {
        super(scene, x, y, texture);
        
        this._speed = speed;
        this.setScale(scale);
        scene.add.existing(this);
    }

    /**
     * The update method is called every frame.
     * It moves the obstacle and checks if it should be destroyed.
     */
    public update(): void {
        // Move the obstacle to the left at a constant speed
        this.x -= this._speed;

        // Check if the obstacle is off the screen to the left
        // The origin of an Image is its center (0.5), so we check its right edge.
        // If its right edge is less than 0, it's completely out of view.
        if (this.getRightCenter().x < 0) {
            this.destroy(); // Remove from the scene to free up memory
        }
    }
}