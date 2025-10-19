import { BaseScene } from '../scenes/BaseScene';
import { BaseObstacle } from './BaseObstacle';

/**
 * A Gnome obstacle that extends the BaseObstacle class.
 */
export class Gnome extends BaseObstacle {
    
    /**
     * @param scene The scene to add the gnome to.
     * @param x The starting x-coordinate.
     * @param y The starting y-coordinate.
     */
    constructor(scene: BaseScene, x: number, y: number) {
        // Call the parent constructor.
        // constructor(scene, x, y, texture, speed, scale)
        super(scene, x, y, 'gnome', 5, 0.5); 
    }
}