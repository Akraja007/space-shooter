import { _decorator, Component, Vec3} from 'cc';
import {utility} from "./utility";
import GlobalData from './GlobalData';
const { ccclass, property } = _decorator;

@ccclass('coin')
export class coin extends Component {
    private moveSpeed: number = 50;
    public value:number =1 ;
    update(deltaTime: number) {
        const movement = new Vec3(0, -this.moveSpeed * deltaTime, 0);
        this.node.translate(movement);
        if(utility.isNodeOffScreen(this.node) && this.node.position.y<0)

            {
                this.node.destroy();
            }
    }
}


