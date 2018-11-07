//导演类 控制逻辑
import {DataStore} from "./base/DataStore.js";
import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/DownPencil.js";

export class Director {

    constructor() {
        this.datStore = DataStore.getIntance();
        this.moveSpeed = 2;
    }

    static getIntance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    createPencil() {
        const minTop = window.innerHeight / 8;
        const maxTop = window.innerHeight / 2;
        const top = minTop + Math.random() * (maxTop - minTop);
        this.datStore.get('pencils')
            .push(new UpPencil(top));
        this.datStore.get('pencils')
            .push(new DownPencil(top));
    }

    birdsEvent() {
        for (let i = 0; i <= 2; i++) {
            this.datStore.get('birds').y[i] =
                this.datStore.get('birds').birdsY[i];
        }
        this.datStore.get('birds').time = 0;
    }

    //判断是否撞击铅笔
    static isStrike(bird, pencil) {
        let s = false;
        if (bird.top > pencil.bottom ||
            bird.bottom < pencil.top ||
            bird.right < pencil.left ||
            bird.left > pencil.right) {
            s = true;
        }
        return !s;
    }

    //判断小鸟是否撞击地板和铅笔
    check() {
        const birds = this.datStore.get('birds');
        const land = this.datStore.get('land');
        //地板撞击判断
        if ((birds.birdsY[0] + birds.birdsHeight[0]) >= land.y) {
            console.log("撞击地板");
            this.isGameOver = true;
            return;
        }
        //小鸟边框模型
        const birdsBorder = {
            top: birds.y[0],
            bottom: birds.birdsY[0] + birds.birdsHeight[0],
            left: birds.birdsX[0],
            right: birds.birdsX[0] + birds.birdsWidth[0]
        };

        const pencils = this.datStore.get('pencils');
        for (let i = 0; i < pencils.length; i++) {
            const pencil = pencils[i];
            const pencilBorder = {
                top: pencil.y,
                bottom: pencil.y + pencil.height,
                left: pencil.x,
                right: pencil.x + pencil.width
            };

            if (Director.isStrike(birdsBorder, pencilBorder)) {
                console.log('撞击了铅笔');
                this.isGameOver = true;
                return;
            }
        }

        //加分
        if (birds.birdsX[0] > pencils[0].x + pencils[0].width
            && this.datStore.get('score').isScore) {
            this.datStore.get('score').isScore = false;
            this.datStore.get('score').scoreNumber++;
        }
    }

    run() {
        if (this.isGameOver) {
            cancelAnimationFrame(this.datStore.get('timer'));
            this.datStore.destory();
            this.datStore.get("startButton").draw();
            return;
        }
        this.check();

        this.datStore.get('background').draw();
        const pencils = this.datStore.get('pencils');
        //销毁越界
        if (pencils[0].x + pencils[0].width <= 0 &&
            pencils.length === 4) {
            //弹出第一个元素，并且数组个数减一
            pencils.shift();
            pencils.shift();
            this.datStore.get('score').isScore = true;
        }
        if (pencils[0].x <= (window.innerWidth - pencils[0].width) / 2 &&
            pencils.length === 2) {
            this.createPencil();
        }

        this.datStore.get("pencils").forEach(function (value, index, array) {
            value.draw();
        });
        this.datStore.get('land').draw();
        this.datStore.get('score').draw();
        this.datStore.get('birds').draw();

        let timer = requestAnimationFrame(() => this.run());
        this.datStore.put('timer', timer);
    }
}