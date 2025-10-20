import { BaseScene } from './BaseScene';

export class GameOver extends BaseScene
{
    gameover_text : Phaser.GameObjects.Text;

    constructor ()
    {
        super('GameOver');
    }

    create ()
    {
        // --- THIS IS THE UPDATED SECTION FOR THE BACKGROUND ---

        // 1. Add the background image but don't worry about its size yet.
        const bg = this.add.image(this.scale.width / 2, this.scale.height / 2, 'gameOverBackground');
        this.sound.stopAll(); // Stop any currently playing sounds
        this.sound.play('dead-song', { volume: 0.5, loop: true });

        // 2. Calculate the scaling factors for both width and height.
        // This tells us how much we'd need to scale the image to match the screen's width and height.
        const scaleX = this.scale.width / bg.width;
        const scaleY = this.scale.height / bg.height;

        // 3. Use the LARGER of the two scale factors.
        // This ensures the image is big enough to cover the entire screen in both dimensions.
        const scale = Math.max(scaleX, scaleY);

        // 4. Apply the calculated scale to the image.
        // The image will now cover the screen without distortion.
        bg.setScale(scale);

        // --- END OF BACKGROUND UPDATE ---


        // Add the "Game Over" text on top of the new background.
        this.gameover_text = this.add.text(this.scale.width / 2, this.scale.height / 2, 'Game Over', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.gameover_text.setOrigin(0.5);

        // Add a "Click to restart" prompt below the main text.
        const restartText = this.add.text(this.scale.width / 2, this.scale.height / 2 + 80, 'Click anywhere to return to the Main Menu', {
            fontFamily: 'Arial', fontSize: 24, color: '#ffffff',
            stroke: '#000000', strokeThickness: 6,
            align: 'center'
        });
        restartText.setOrigin(0.5);

        // Set up the input listener to go back to the Main Menu.
        this.input.once('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }
}
