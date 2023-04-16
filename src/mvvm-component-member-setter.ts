import { Component, SpriteFrame } from 'cc';

import { IMvvmMemberSetter } from './i-mvvm-member-setter';
import { AssetLoaderBase } from './asset-loader-base';

export class MvvmComponentMemberSetter implements IMvvmMemberSetter {
    public constructor(
        private m_AssetLoader: AssetLoaderBase,
        private m_Component: Component,
        private m_Prop: string,
    ) { }

    public setValue(v: any) {
        if (this.m_Prop == 'spriteFrame') {
            this.m_AssetLoader.load(SpriteFrame, `${v}`).then(res => {
                this.m_Component[this.m_Prop] = res;
            })
        } else {
            this.m_Component[this.m_Prop] = v;
        }
    }
}