import { instantiate, Node, Prefab } from 'cc';

import { IMvvmMemberSetter } from './i-mvvm-member-setter';
import { AssetLoaderBase } from './asset-loader-base';
import { MvvmMapping } from './i-mvvm-member';
import { CcView } from './view';

export class MvvmPrefabMemberSetter implements IMvvmMemberSetter {
    private m_Children: { [index: number]: Node; } = {};

    public get getters() {
        return [];
    }

    public constructor(
        private m_AssetLoader: AssetLoaderBase,
        private m_Mapping: MvvmMapping,
        private m_ParentNode: Node,
    ) { }

    public bindEvent() { }

    public async setValue(values: { _index: number }[]) {
        for (const r of values) {
            if (!this.m_Children[r._index]) {
                const prefab = await this.m_AssetLoader.load(Prefab, this.m_Mapping.path);
                this.m_Children[r._index] = instantiate(prefab);
            }

            this.m_Children[r._index].getComponent(CcView).init({
                input: r,
                viewID: this.m_Mapping.path.replace('.prefab', ''),
                nodeParent: this.m_ParentNode,
            });
        }
    }
}