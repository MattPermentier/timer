import { Game } from "./game"
import * as PIXI from 'pixi.js'

export class Character extends PIXI.Sprite{
    public game: Game

    constructor(texture: PIXI.Texture, game: Game){
        super(texture)
        this.game = game
        this.texture = texture 
        this.scale.set(-2, 2) 
        this.anchor.set(0.5)
    }
}