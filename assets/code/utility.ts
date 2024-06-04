import { _decorator, Component, Node , UITransform , view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('utility')
export class utility extends Component {
    
    public static isNodeOffScreen(node: Node): boolean {
        const nodePos = node.getWorldPosition();
        const nodeUITransform = node.getComponent(UITransform);

        if (!nodeUITransform) {
            console.warn('Node does not have a UITransform component.');
            return false;
        }

        const halfWidth = nodeUITransform.width / 2;
        const halfHeight = nodeUITransform.height / 2;
        const viewSize = view.getVisibleSize();

        // Check horizontal bounds
        if (nodePos.x + halfWidth < 0 || nodePos.x - halfWidth > viewSize.width) {
            return true;
        }

        // Check vertical bounds
        if (nodePos.y + halfHeight < 0 || nodePos.y - halfHeight > viewSize.height) {
            return true;
        }

        return false;
    }
}


