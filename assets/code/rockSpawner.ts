import { _decorator, Component, Node ,Prefab , CCInteger, Vec2, Vec3 ,instantiate,find,randomRangeInt} from 'cc';
import {rock} from "./rock";
import GlobalData from './GlobalData';
const { ccclass, property } = _decorator;

@ccclass('rockSpawner')
export class rockSpawner extends Component {
    private objPool  = null;
    private point :number[] = [-384,-192,0,-192,384];

    @property(Prefab)
    private rockPrefab :Prefab = null;

    @property(Prefab)
    private coinPrefab :Prefab = null;

    @property(CCInteger)
    private spawnRate: number = 1;  // Number of rock spawned per second

    @property(CCInteger)
    private spawnInterval: number = 4;  // Interval between spawns

    @property(CCInteger)
    private coinInterval: number = 5;

    start() {
        this.GmodeBasesetup()
        this.spawnInterval = 1 / this.spawnRate;
        this.schedule(this.spawnAsteroid, this.spawnInterval);  // Schedule the spawnAsteroid method to run at intervals
        this.schedule(this.coinspawn,this.coinInterval);
        this.objPool = find("Canvas/objectPool");
    }

    GmodeBasesetup(){
        const gdata:GlobalData = GlobalData.getInstance()
        switch (gdata.getGameMode()){
            case(GlobalData.GameMode.Easy):
                this.spawnRate=0.3;
                this.coinInterval = 5;
                break;
            case(GlobalData.GameMode.Medium):
                this.spawnRate = 0.4;
                this.coinInterval = 3;
                break;
            case(GlobalData.GameMode.Hard):
                this.spawnRate = 0.5;
                this.coinInterval = 1;
                break;
        }
    }

    spawnAsteroid() {
        if (this.rockPrefab) {
            const rockobj = instantiate(this.rockPrefab);
            const pos = new Vec3(this.point[randomRangeInt(0,5)],500,0);
            const health = randomRangeInt(0,4);
            let rockCom = rockobj.getComponent(rock);
            rockCom.health = health;
            rockobj.setPosition(pos);
            this.objPool.addChild(rockobj);

        }
    }
    coinspawn(){
        if(this.coinPrefab){
            const coinobj = instantiate(this.coinPrefab);
            const pos = new Vec3(this.point[randomRangeInt(0,5)],500,0);
            coinobj.setPosition(pos);
            this.objPool.addChild(coinobj);
        }
    }
}


