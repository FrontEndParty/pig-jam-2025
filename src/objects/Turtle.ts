import { BaseScene } from '../scenes/BaseScene';
import { BaseObstacle } from './BaseObstacle';

/**
 * A Gnome obstacle class that extends the BaseObstacle.
 * It moves from right to left and self-destructs when off-screen.
 */
export class Turtle extends BaseObstacle {
    
    /**
     * @param scene The scene to add the gnome to.
     * @param x The starting x-coordinate.
     * @param y The starting y-coordinate.
     */
    constructor(scene: BaseScene, x: number, y: number) {
        // Call the parent constructor with the specific details for this gnome.
        // You'll need to have a 'gnome' texture loaded for this to be visible.
        // We'll make the gnome slightly slower than the cone for variety.
        super(scene, x, y, 'turtle', 5, 0.5); 
    }
}