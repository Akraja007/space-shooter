import { _decorator, Component, Node ,Vec3 , Collider2D , Contact2DType , IPhysics2DContact} from 'cc';
import {utility} from "./utility";
import { rock } from './rock';
const { ccclass, property } = _decorator;

@ccclass('bullet')
export class bullet extends Component {
    
    @property
    private moveSpeed: number = 50;
    private coll :Collider2D =null;

    protected onLoad(): void {
        this.coll = this.getComponent(Collider2D);
        this.coll.on (Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }


    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        let rockobj :rock =null;
        rockobj = otherCollider.getComponent(rock);
        if(rockobj.health > 0){
            rockobj.health -=1;
            selfCollider.node.destroy();
        }
        else{
            otherCollider.node.destroy();
            selfCollider.node.destroy();
        }

        
    }

    update(deltaTime: number) {
        const movement = new Vec3(0, this.moveSpeed * deltaTime, 0);
        this.node.translate(movement);
        if(utility.isNodeOffScreen(this.node))

            {
                this.node.destroy();
            }
    }
}


