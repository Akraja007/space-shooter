import { _decorator, Component, Enum, game, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GlobalData')
export default class GlobalData extends Component {
    static GameMode = {
        Easy: 'Easy',
        Medium: 'Medium',
        Hard: 'Hard'
    };
    private static _instance: GlobalData;
    
    private coinCount: number = 0;
    private curentMode :string = GlobalData.GameMode.Easy;

    public static getInstance(): GlobalData {
        if (!GlobalData._instance) {
            GlobalData._instance = new GlobalData();
        }
        return GlobalData._instance;
    }

    onLoad() {
        if (GlobalData._instance && GlobalData._instance !== this) {
            this.destroy();
        } else {
            GlobalData._instance = this;
            // Perform any other initialization here
        }
    }

    public addCoins(amount: number): void {
        this.coinCount += amount;
    }

    public subtractCoins(amount: number): void {
        if (this.coinCount - amount < 0) {
            this.coinCount = 0;
        } else {
            this.coinCount -= amount;
        }
    }

    public getCoins(): number {
        return this.coinCount;
    }

    public setGameMode(mode:string){
        this.curentMode=mode;
    }

    public getGameMode(){
        return this.curentMode;
    }
}


