// Song scene is overlayed on top of Game scene.
// This scene handles input streaming and anything else you think should go here.
import { Note } from '../util/Note';
import { Game } from './Game'


export class SongScene extends Phaser.Scene {
  bpm = 190;
  songStart = 0;
  songLength = 100; // seconds
  notes: Note[] = [];
  nextIndex = 0;
  inputWindow = 100; // ms ± window
  noteSpeed = 300;   // px/sec
  hitX = 0;
  player = null

  constructor() {
    super("SongScene");
  }

  create() {
    this.songStart = this.time.now;
    this.generateNotes(this.songLength);

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
  }

  generateNotes(secondsAhead: number) {
    const beatInterval = (60 / this.bpm) * 1000;
    const totalBeats = Math.floor((secondsAhead * 1000) / beatInterval);

    this.notes = Array.from({ length: totalBeats }, (_, i) => {
      const time = i * beatInterval + this.songStart;
      const inputs = [Phaser.Math.Between(0, 3)];
      return { time, inputs, active: true };
    });
  }

  update() {
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
      this.player._health -= 5;
      this.player.check_if_dead();
      if (note.sprite) note.sprite.setColor("#ff0000");
      console.log("Missed note!", this.player._health);
      this.nextIndex++;
      
    }
  }

  updateNotes(now: number) {
    const screenW = this.scale.width;
    const noteY = this.scale.height * 0.1; // top band

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

  renderNote(note: Note, x: number, y: number) {
    if (!note.sprite) {
      note.sprite = this.add.text(x, y, note.inputs[0].toString(), {
        fontSize: "24px",
        color: "#ffffff",
      }).setOrigin(0.5);
    } else {
      note.sprite.x = x;
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
}
