import { _decorator, Component, Node , SpriteFrame ,Sprite ,Vec3, Prefab,instantiate} from 'cc';
import { utility } from "./utility";
import { coin } from "./coin";
const { ccclass, property } = _decorator;

@ccclass('rock')
export class rock extends Component {
    public health :number = 3
    private coinvalue : number
    private sp : Sprite = null;

    @property(Prefab)
    private coinPrefab :Prefab

    @property(SpriteFrame)
    private s :SpriteFrame

    @property(SpriteFrame)
    private m :SpriteFrame

    @property(SpriteFrame)
    private b :SpriteFrame

    @property
    private moveSpeed: number = 50;

    start() {
        this.sp = this.getComponent(Sprite);
        switch(this.health){
            case 1:
                this.sp.spriteFrame = this.s;
                break;
            case 2:
                this.sp.spriteFrame = this.m;
                break;
            case 3:
                this.sp.spriteFrame = this.b;
                break;
        }
        this.coinvalue = this.health+1;
        
    }
    
    update(deltaTime: number) {
        const movement = new Vec3(0, -this.moveSpeed * deltaTime, 0);
        this.node.translate(movement);
        if(utility.isNodeOffScreen(this.node) && this.node.position.y<0)

            {
                this.node.destroy();
            }
    }
    
    protected onDestroy(): void {

        const coinobj = instantiate(this.coinPrefab);
        coinobj.setPosition(this.node.getPosition());
        this.node.getParent().addChild(coinobj);
        let coinCom:coin =null;
        coinCom =coinobj.getComponent(coin);
        coinCom.value = this.coinvalue;

    }
}


