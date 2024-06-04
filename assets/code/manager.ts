import { _decorator, Component, Node ,ToggleContainer ,Toggle, director, game} from 'cc';
import GlobalData from './GlobalData';
const { ccclass, property } = _decorator;

@ccclass('manager')
export class manager extends Component {
    @property(ToggleContainer)
    private toggleGroup : ToggleContainer = null;
    
    start() {
        const globalData = GlobalData.getInstance();
        globalData.addCoins(0);
        
    }

    onDestroy() {
        const globalData = GlobalData.getInstance();
    }

    startClicked(){
        director.loadScene("main");
    }

    exitClicked(){
        game.end();
    }
    
    onToggle () {
        const tgl:Toggle[] =this.toggleGroup.activeToggles();
        const globalData = GlobalData.getInstance();
        globalData.setGameMode(tgl[0].name);
    }
        
}


