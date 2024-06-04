import { _decorator, Component, Node ,Label, game} from 'cc';
import GlobalData from './GlobalData';
const { ccclass, property } = _decorator;

@ccclass('coinDisplay')
export class coinDisplay extends Component {
    private labelCom :Label = null;
    private gdata :GlobalData = null;

    start() {
        this.labelCom = this.getComponent(Label);
        this.gdata = GlobalData.getInstance();
    }

    update(deltaTime: number) {
        this.labelCom.string = "Coin: "+String(this.gdata.getCoins());
    }

    restart(){
        game.restart();
    }
}


