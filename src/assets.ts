import * as PIXI from 'pixi.js'
import { Game } from './game'

type AssetFile = { name: string, url: string }

export class Assets extends PIXI.Loader {

    private game: Game
    private assets: AssetFile[] = []

    constructor(game: Game) {
        super()
        this.game = game

        this.assets = [
            { name: "brandaanJson", url: "brandaan.json" },
        ]

        this.assets.forEach(asset => {
            this.add(asset.name, asset.url)
        })
        
        this.onError.add((arg) => { console.error(arg) })
        this.onProgress.add((loader) => this.showProgress(loader))
        this.load(() => game.loadCompleted())
    }

    private showProgress(loader: PIXI.Loader) {
        console.log(`Loading ${loader.progress}%`)
        
    }
}