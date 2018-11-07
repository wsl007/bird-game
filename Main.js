//初始化整个游戏的精灵，作为游戏入库
import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {Background} from "./js/runtime/Background.js";
import {Land} from "./js/runtime/Land.js";
import {DataStore} from "./js/base/DataStore.js";
import {Director} from "./js/Director.js";
import {Birds} from "./js/player/Birds.js";
import {Score} from "./js/player/Score.js";
import {StartButton} from "./js/player/StartButton.js";

export class Main {

    constructor() {
        this.canvas = document.getElementById('game_canvas');
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getIntance();
        this.director = Director.getIntance();
        const loader = ResourceLoader.create();
        loader.onLoaded(map => this.onResourceFirstLoaded(map));

        this.registerEvent();
    }

    onResourceFirstLoaded(map) {
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        this.init();
    }

    init(){
        this.director.isGameOver = false;

        this.dataStore
            .put('background', Background)
            .put('land',Land)
            .put('pencils',[])
            .put('birds',Birds)
            .put('startButton',StartButton)
            .put("score",Score);

        this.director.createPencil();
        this.director.run();
    }

    registerEvent(){
        this.canvas.addEventListener('touchstart',
            e => {
                //屏蔽js事件冒泡
                e.preventDefault();
                if (this.director.isGameOver) {
                    this.init();
                } else {
                    this.director.birdsEvent();
                }
            });
    }
}