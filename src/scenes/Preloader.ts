import { BaseScene } from "./BaseScene";

export class Preloader extends BaseScene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game
        this.load.setPath('assets');

        this.load.image('logo', 'images/logo.png');

        // --- NEW ASSETS ADDED HERE ---

        // 1. Add the new Game Over background
        this.load.image('gameOverBackground', 'images/game_over_bg.jpg');

        // 2. Add assets needed for the Game scene that were missing
        this.load.spritesheet('player', '/images/sprites/pig/pig_spin_sprite.png', {
          frameWidth: 588,  // Width of one frame
          frameHeight: 375  // Height of one frame
        });
        this.load.spritesheet('cop', 'images/sprites/cop_sprite_cropped.png',{
          frameWidth: 939, 
          frameHeight: 1252 
        });       // For the BaseNPC/Cop class
        this.load.spritesheet('turtle', 'images/sprites/turtle_sprite_cropped.png', {
          frameWidth: 229, 
          frameHeight: 179 
        });     // For the Turtle obstacle
        this.load.spritesheet('gnome', 'images/sprites/gnome_sprite_cropped.png',{
           frameWidth: 118, 
           frameHeight: 205 
        });   // For the Gnome obstacle

        // --- END OF NEW ASSETS ---
    }

    create ()
    {
        //  When all the assets have loaded, move to the MainMenu
        this.scene.start('MainMenu');
    }
}
