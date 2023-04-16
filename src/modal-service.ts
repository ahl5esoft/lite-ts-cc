import { isValid } from 'cc';

import { CreateView } from './create-view';
import { ModalServiceBase } from './modal-service-base';
import { ModalServiceOpenOption } from './modal-service-open-option';
import { CcView } from './view';

export class CcModalService extends ModalServiceBase {
    public constructor(
        private m_CreateViewFunc: CreateView,
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
        });
        this.modal[viewID].node.active = true;
        this.modal[viewID].node.setSiblingIndex(opt?.zIndex ?? 10);
        if (opt?.lazyArg)
            this.modal[viewID].node.getComponent(CcView).lazyInit(opt.lazyArg);
    }
}
