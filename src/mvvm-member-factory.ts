import { Node } from 'cc';

import { AssetLoaderBase } from './asset-loader-base';
import { MvvmMapping } from './i-mvvm-member';
import { MvvmMember } from './mvvm-member';
import { MvvmMemerFactoryBase } from './mvvm-member-factory-base';

export class CcMvvmMemberFactory extends MvvmMemerFactoryBase {
    public constructor(
        private m_AssetLoader: AssetLoaderBase,
    ) {
        super();
    }

    public build(mapping: MvvmMapping, parenNode: Node) {
        return new MvvmMember(this.m_AssetLoader, mapping, parenNode);
    }
}