import { Node } from 'cc';

import { IMvvmMemberSetter } from './i-mvvm-member-setter';

export class MvvmNodeMemberSetter implements IMvvmMemberSetter {
    public constructor(
        private m_Node: Node,
        private m_Prop: string,
    ) { }

    public setValue(v: any) {
        this.m_Node[this.m_Prop] = v;
    }
}