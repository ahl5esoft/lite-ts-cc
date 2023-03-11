// import { isValid, view } from 'cc';

// import { CcView } from './view';
// import { AssetServiceBase, IModalServiceOpenOption, IView, IViewInitOption, ModalServiceBase } from '../../contract';

// export class CcModalService extends ModalServiceBase {
//     public constructor(
//         private m_AssetService: AssetServiceBase,
//         private m_CreateViewFunc: (opt: IViewInitOption<void>, assetService: AssetServiceBase) => Promise<IView<void>>,
//     ) {
//         super();
//     }

//     public close(viewID: string) {
//         const node = this.modal[viewID]?.node;
//         if (!isValid(node))
//             return;

//         node.destroy();
//         delete this.modal[viewID];
//     }

//     public hide(viewID: string) {
//         const node = this.modal[viewID]?.node;
//         if (!node?.active)
//             return;

//         node.active = false;
//     }

//     public async open(viewID: string, opt: Partial<IModalServiceOpenOption>) {
//         this.modal[viewID] ??= await this.m_CreateViewFunc({
//             input: opt?.input,
//             viewID,
//         }, this.m_AssetService);
//         this.modal[viewID].node.active = true;
//         this.modal[viewID].node.setSiblingIndex(opt?.zIndex ?? 10);
//         if (opt?.lazyArg)
//             this.modal[viewID].node.getComponent(CcView).lazyInit(opt.lazyArg);
//     }
// }