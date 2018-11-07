//小鸟类
//是循环的渲染3只小鸟
//其实是渲染图片的3个部分
import {Sprite} from "../base/Sprite.js";

export class Birds extends Sprite {

    constructor() {
        const image = Sprite.getImage('birds');
        super(image,
            0, 0, image.width, image.height,
            0, 0, image.width, image.height);

        //小鸟3种状态的保存
        //小鸟尺寸 w:34 h:24上下10 左右9
        this.clippingX = [9,
            9 + 34 + 18,
            9 + 34 + 18 + 34 + 18
        ];
        this.clippingY = [10, 10, 10];
        this.clippingWidth = [34, 34, 34];
        this.clippingHeight = [24, 24, 24];
        const birdX = window.innerWidth / 4;
        this.birdsX = [
            birdX,
            birdX,
            birdX
        ];
        const birdY = window.innerHeight / 2;
        this.birdsY = [birdY,
            birdY,
            birdY
        ];
        const birdWidth = 34;
        this.birdsWidth = [
            birdWidth,
            birdWidth,
            birdWidth
        ];
        const birdHeigth = 24;
        this.birdsHeight = [
            birdHeigth,
            birdHeigth,
            birdHeigth
        ];
        this.y = [
            birdY,
            birdY,
            birdY
        ];
        this.index = 0;
        this.count = 0;
        this.time = 0;
    }

    draw() {
        //切换3中状态的速度
        const speed = 0.2;
        this.count += speed;
        if (this.count >= 2)
            this.count = 0;
        //舍去小数
        this.index = Math.floor(this.count);

        //模拟重力加速度
        const g = 0.98/2.4;
        //向上偏移一点
        const offsetUp = 30;
        //小鸟的位移
        const offsetY = (g * this.time * (this.time - offsetUp)) / 2;
        for (let i = 0; i <= 2; i++) {
            this.birdsY[i] = this.y[i] + offsetY;
        }
        this.time++;

        super.draw(this.img,
            this.clippingX[this.index],
            this.clippingY[this.index],
            this.clippingWidth[this.index],
            this.clippingHeight[this.height],
            this.birdsX[this.index],
            this.birdsY[this.index],
            this.birdsWidth[this.index],
            this.birdsHeight[this.index]);
    }
}