import 
{ _decorator, Component, input, Input, EventKeyboard, 
    KeyCode,RigidBody2D, Vec2,Prefab,instantiate, 
    Vec3,CCInteger,Collider2D ,Contact2DType, IPhysics2DContact ,find
} 
from 'cc';
import GlobalData from './GlobalData';
import { coin } from './coin';
const { ccclass ,property} = _decorator;

@ccclass("Movement")
export class Movement extends Component {
    @property
    private moveSpeed: number = 700;
    private direction: Vec2 = new Vec2(0,0);
    private rig :RigidBody2D = null;
    private coll :Collider2D =null;
    private objPool  = null;

    @property(Prefab)
    private bulletPrefab :Prefab = null;
    private spawnInterval: number = 0;  // Interval between spawns, calculated from spawnRate
    @property(CCInteger)
    private spawnRate: number = 2.0;  // Number of bullet spawned per second

    onLoad () {
        this.rig = this.getComponent(RigidBody2D);
        this.coll = this.getComponent(Collider2D);

        this.coll.on (Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy () {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
        if(otherCollider.node.name==="rock"){
            this.node.destroy();
            const panel = find("Canvas/Node");
            panel.active =true;
        }
        else if (otherCollider.node.name==="coin"){
            const gdata =GlobalData.getInstance();
            const coinCom = otherCollider.node.getComponent(coin);
            gdata.addCoins(coinCom.value);
            otherCollider.node.destroy();
        }
    }

    onKeyDown (event: EventKeyboard) {
        
        switch(event.keyCode) {
            case KeyCode.ARROW_UP:
                this.direction.y = 1;
                break;
            case KeyCode.ARROW_DOWN:
                this.direction.y = -1;
                break;
            case KeyCode.ARROW_LEFT:
                this.direction.x = -1;
                break;
            case KeyCode.ARROW_RIGHT:
                this.direction.x = 1;
                break;
        }
    }

    onKeyUp (event: EventKeyboard) {

        switch(event.keyCode) {
            case KeyCode.ARROW_UP:
                if (this.direction.y === 1) this.direction.y = 0;
                break;
            case KeyCode.ARROW_DOWN:
                if (this.direction.y === -1) this.direction.y = 0;
                break;
            case KeyCode.ARROW_LEFT:
                if (this.direction.x === -1) this.direction.x = 0;
                break;
            case KeyCode.ARROW_RIGHT:
                if (this.direction.x === 1) this.direction.x = 0;
                break;
        }
    }
     start() {
        this.spawnInterval = 1 / this.spawnRate;
        this.schedule(this.spawn, this.spawnInterval);  // Schedule the spawnAsteroid method to run at intervals
        this.objPool = find("Canvas/objectPool");
    }

    spawn() {
        if (this.bulletPrefab && this.objPool) {
            const bullet = instantiate(this.bulletPrefab);
            bullet.setPosition(this.node.getPosition());
            this.objPool.addChild(bullet);
        }
    }



    update (deltaTime: number) {
        if (!this.direction.equals(Vec2.ZERO)) {
            const normalizedDirection = this.direction.clone().normalize();
            const movement = normalizedDirection.multiplyScalar(this.moveSpeed * deltaTime);
            this.rig.linearVelocity = movement;
        } else {
            this.rig.linearVelocity = Vec2.ZERO;
        }
    }
}