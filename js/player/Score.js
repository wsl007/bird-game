//计分器
import {DataStore} from "../base/DataStore.js";

export class Score {

    constructor(){
        this.ctx = DataStore.getIntance().ctx;
        this.scoreNumber = 0;
        //判断是否控制加分
        this.isScore = true;
    }

    draw(){
        this.ctx.font = '25px Arial';
        this.ctx.fillStyle = '#eb65ff';
        this.ctx.fillText(
            this.scoreNumber,
            window.innerWidth/2,
            window.innerHeight/18,
            1000
        );
    }
}