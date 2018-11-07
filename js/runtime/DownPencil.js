//下半部分铅笔
import {Pencil} from "./Pencil.js";
import {Sprite} from "../base/Sprite.js";

export class DownPencil extends Pencil{

    constructor(top){
        const image = Sprite.getImage('pencilDown');
        super(image,top);
    }

    draw(){
        //笔之前的固定间隙
        let gap = window.innerHeight/5;
        this.y = this.top + gap;
        super.draw();
    }
}