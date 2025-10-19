import Player from '../objects/Player';
import { BaseScene } from './BaseScene';
import { Cop } from '../objects/Cop';
import { BaseObstacle } from '../objects/BaseObstacle';
import { Gnome } from '../objects/Gnome';
import { SongScene } from "./SongScene";

// --- HELPER OBSTACLE CLASS ---
// In a larger project, you'd move these to their own files (e.g., src/objects/Cone.ts)
class Cone extends BaseObstacle {
  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, 'cone', 5);
  }
}
// -----------------------------

export class Game extends BaseScene
{
  private _camera: Phaser.Cameras.Scene2D.Camera;
  private _background: Phaser.GameObjects.Image;
  private _msg_text : Phaser.GameObjects.Text;
  public _player: Player;
  private _obstacles: Phaser.GameObjects.Group; 

  constructor () {
    super('Game');
  }

  public create () {
    this._camera = this.cameras.main;
    this._camera.setBackgroundColor(0x00ff00);
  
    this._background = this.add.image(512, 384, 'background');
    this._background.setAlpha(0.5);

    this._msg_text = this.add.text(250, 30, `Value: ${this.dataStore.exampleValue}`, {
        fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
        stroke: '#000000', strokeThickness: 8,
        align: 'center'
    });
    this._msg_text.setOrigin(0.5);

    this._player = new Player(this, this.scale.width / 2, this.scale.height / 2);
    const cop = new Cop(this, 150, 150);
    cop.setupCollision(this._player);

    this.scene.launch("SongScene"); // starts rhythm UI on top
    this.scene.bringToTop("SongScene"); // ensures it's above others

    this._obstacles = this.add.group({ runChildUpdate: true });

    this.time.addEvent({
      delay: 1500, 
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true,
    });

    this.listenForEvents();
  }

  /**
   * Spawns a random obstacle from a predefined list of obstacle types.
   * This method is easily scalable by adding new classes to the `obstacleTypes` array.
   */
  private spawnObstacle(): void {
    const obstacleTypes = [Cone, Gnome]; // <-- To add more obstacles, just add their class name here!
    
    const spawnX = this.scale.width + 100;
    const spawnY = this.scale.height - 60; 

    // 1. Pick a random class from the array
    const RandomObstacleClass = Phaser.Math.RND.pick(obstacleTypes);

    // 2. Create an instance of that class
    const obstacle = new RandomObstacleClass(this, spawnX, spawnY);

    // 3. Add it to the group, which will manage its update and destruction
    this._obstacles.add(obstacle);
  }

  public update (_time: number, _delta: number): void {
    this._player.update();
  }

  private listenForEvents () {
    this.events.on('removeFromScene', (entity: null) => {
    });

    this.events.on('addToScene', (entity: null) => {
    });
  }
}
