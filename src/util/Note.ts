export interface Note {
  time: number;        // ms since song start
  inputs: number[];
  sprite?: Phaser.GameObjects.Text;
  active?: boolean;
}