import * as PIXI from 'pixi.js'
import { Game } from './game'


export class Brandaan extends PIXI.AnimatedSprite {
    private game: Game
    private xSpeed: number = 0
    private ySpeed: number = 0
    private frames: PIXI.Texture[][] = []
    private previousFrame: number = -1

    constructor(game: Game, textures: PIXI.Texture[][], x: number, y: number) {
        super(textures[0])
        this.game = game
        this.frames = textures

        this.x = x
        this.y = y
        this.anchor.set(0.5)
        this.scale.set(3)
        this.animationSpeed = 0.1;
        this.loop = true
        this.play();

        this.game.pixi.stage.addChild(this);

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))

    }

    private onKeyDown(e: KeyboardEvent): any {
        switch (e.key.toUpperCase()) {
            case "A":
            case "ARROWLEFT":
                this.xSpeed = -3
                this.scale.set(-3,3)
                this.setFrames(1)
                break
            case "D":
            case "ARROWRIGHT":
                this.xSpeed = 3
                this.scale.set(3)
                this.setFrames(1)
                break
            case "W":
            case "ARROWUP":
                this.ySpeed = -3
                this.setFrames(1)
                break
            case "S":
            case "ARROWDOWN":
                this.ySpeed = 3
                this.setFrames(1)
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): any {
        switch (e.key.toUpperCase()) {
            case " ":
                break;
            case "A":
            case "D":
            case "ARROWLEFT":
            case "ARROWRIGHT":
                this.xSpeed = 0
                this.setFrames(0)
                break
            case "W":
            case "S":
            case "ARROWUP":
            case "ARROWDOWN":
                this.ySpeed = 0
                this.setFrames(0)
                break
        }
    }

    private setFrames(frame: number) {
        console.log(this.previousFrame)
        if (this.previousFrame != frame) {

            console.log("set frames");

            this.textures = this.frames[frame]

            this.loop = true

            this.play()

            this.previousFrame = frame

        }

    }

    public update(delta: number): void {
        super.update(delta)
        this.x += this.xSpeed * delta
        this.y += this.ySpeed * delta

        this.keepInScreen()
    }

    private keepInScreen(){
        if(this.getBounds().left > this.game.pixi.screen.right){
            this.x =-this.getBounds().width
        }
    }
}
