// Song scene is overlayed on top of Game scene.
// This scene handles input streaming and anything else you think should go here.
import { Note } from '../util/Note';
import { Game } from './Game'
import { song01Beats } from '../data/song01-beats';


export class SongScene extends Phaser.Scene {
  songStart = 0;
  notes: Note[] = [];
  nextIndex = 0;
  inputWindow = 100; // ms ± window
  noteSpeed = 300;   // px/sec
  hitX = 0;
  player = null
  lanes = null

  constructor() {
    super("SongScene");
  }

  create() {
    // Hit line (¼ across screen, near top)
    this.hitX = this.scale.width * 0.25;
    const line = this.add.rectangle(
      this.hitX,
      this.scale.height * 0.1,
      4,
      this.scale.height * 0.2,
      0xffffff,
      0.5
    );
    line.setDepth(10);

    const gameScene = this.scene.get("Game") as Game; // cast to your Game class
    this.player = gameScene._player;
    this.createLanes();

    // Start music and notes AFTER everything is setup and rendered
    // Use nextTick or small delay to ensure scene is fully visible
    this.time.delayedCall(100, () => {
      this.songStart = this.time.now;
      this.sound.play('song_01', { volume: 0.5 });
      this.generateNotes();
      console.log('Song started at:', this.songStart);
    });
  }

  generateNotes() {
    // Use actual beat timings from song01-beats.ts
    // Convert beat times (in seconds) to absolute timestamps (ms since songStart)
    this.notes = song01Beats.map(beatTime => {
      const time = this.songStart + (beatTime * 1000); // Convert seconds to ms
      const inputs = [Phaser.Math.Between(0, 3)]; // Random button assignment
      return { time, inputs, active: true };
    });

    console.log(`Loaded ${this.notes.length} notes from song data`);
  }

  update() {
    if (this.songStart === 0 || this.notes.length === 0) return;

    const now = this.time.now;
    const elapsed = now - this.songStart;
    this.checkNext(elapsed);
    this.updateNotes(now);
  }

  checkNext(elapsed: number) {
    if (this.nextIndex >= this.notes.length) return;
    const note = this.notes[this.nextIndex];
    const diff = elapsed - (note.time - this.songStart);
    if (diff > this.inputWindow) {
      this.player.loseHealth()
      if (note.sprite) note.sprite.setColor("#ff0000");
      console.log("Missed note!", this.player._health);
      this.nextIndex++;

    }
  }

  updateNotes(now: number) {
    const screenW = this.scale.width;
    const noteY = (this.scale.height * 0.1) - 35; // top band

    this.notes.forEach(note => {
      if (!note.active) return;

      const timeUntilHit = note.time - now;
      const posX = this.hitX + (timeUntilHit / 1000) * this.noteSpeed;

      if (posX < -50 || posX > screenW + 50) {
        if (note.sprite) note.sprite.setVisible(false);
        return;
      }

      this.renderNote(note, posX, noteY);
    });
  }
renderNote(note: Note, x: number, yBase: number = 0) {
  // Map note index (0-3) to a lane offset
  const laneSpacing = 40; // pixels between lanes
  const laneY = yBase + note.inputs[0] * laneSpacing;

  if (!note.sprite) {
    note.sprite = this.add.text(x, laneY, note.inputs[0].toString(), {
      fontSize: "24px",
      color: "#ffffff",
    }).setOrigin(0.5);
  } else {
    note.sprite.x = x;
    note.sprite.y = laneY;
    note.sprite.setVisible(true);
  }

  const distanceToHit = Math.abs(x - this.hitX);
    if (distanceToHit < 10) {
      note.sprite.setScale(1.5);
      note.sprite.setAlpha(1);
    } else if (x < this.hitX) {
      note.sprite.setScale(1);
      note.sprite.setAlpha(0.5);
    } else {
      note.sprite.setScale(1);
      note.sprite.setAlpha(1);
    }

    if (x < -50) {
      note.sprite.destroy();
      note.active = false;
    }
  }

  // Create four persistent lanes
  private createLanes(yBase: number = 40) {
    const laneSpacing = 40;
    this.lanes = [];

    for (let i = 0; i < 4; i++) {
      const laneY = yBase + i * laneSpacing;
      const lane = this.add.rectangle(
        this.hitX,      // or full width if you want horizontal bars
        laneY,
        this.scale.width,
        30,
        0xE9ED2B,
        0.5
      ).setOrigin(0, 0.5); // align top-left if full width
      lane.setDepth(0);      // behind notes
      this.lanes.push(lane);
    }
  }

}
