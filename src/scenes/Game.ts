import Player from '../objects/Player';
import { BaseScene } from './BaseScene';

export class Game extends BaseScene
{
  private _camera: Phaser.Cameras.Scene2D.Camera;
  private _background: Phaser.GameObjects.Image;
  private _msg_text : Phaser.GameObjects.Text;
  private _player: Player

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

    this.listenForEvents();
  }

  public update (_time: number, _delta: number): void {
    this._player.update()
  }

  private listenForEvents () {
    this.events.on('removeFromScene', (entity: null) => {
    });

    this.events.on('addToScene', (entity: null) => {
    });
  }
}
