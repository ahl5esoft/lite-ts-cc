import { isValid } from 'cc';

import { AssetLoaderBase } from './asset-loader-base';
import { IView } from './i-view';
import { ModalServiceBase } from './modal-service-base';
import { ModalServiceOpenOption } from './modal-service-open-option';
import { CcView } from './view';
import { ViewInitOption } from './view-init-option';

export class CcModalService extends ModalServiceBase {
    public constructor(
        private m_AssetLoader: AssetLoaderBase,
        private m_CreateViewFunc: (opt: ViewInitOption<void>, assetLoader: AssetLoaderBase) => Promise<IView<void>>,
    ) {
        super();
    }

    public close(viewID: string) {
        const node = this.modal[viewID]?.node;
        if (!isValid(node))
            return;

        node.destroy();
        delete this.modal[viewID];
    }

    public hide(viewID: string) {
        const node = this.modal[viewID]?.node;
        if (!node?.active)
            return;

        node.active = false;
    }

    public async open(viewID: string, opt: ModalServiceOpenOption) {
        this.modal[viewID] ??= await this.m_CreateViewFunc({
            input: opt?.input,
            viewID,
        }, this.m_AssetLoader);
        this.modal[viewID].node.active = true;
        this.modal[viewID].node.setSiblingIndex(opt?.zIndex ?? 10);
        if (opt?.lazyArg)
            this.modal[viewID].node.getComponent(CcView).lazyInit(opt.lazyArg);
    }
}
