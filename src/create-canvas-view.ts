import { instantiate, Node, Prefab } from 'cc';

import { AssetLoaderBase } from './asset-loader-base';
import { CreateView } from './create-view';
import { IView } from './i-view';
import { CcView } from './view';
import { ViewInitOption } from './view-init-option';

export function ccCreateCanvasView(assetLoader: AssetLoaderBase, canvas: Node): CreateView {
    return async (opt: ViewInitOption<void>) => {
        const prefab = await assetLoader.load(Prefab, `${opt.viewID}${opt.viewID.includes(':') ? '/' : ':'}canvas.prefab`);
        const node = instantiate(prefab);
        const view = node.getComponent(CcView);
        if (view) {
            view.init({
                ...opt,
                nodeParent: canvas
            });
        } else {
            throw new Error(`未继承service.CcView: ${opt.viewID}`);
        }

        return view as IView<void>;
    };
}