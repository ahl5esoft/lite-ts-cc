import { _decorator, CCString, Component, Label } from 'cc';
import { ioc } from 'lite-ts-ioc';

import { LangAccessorBase } from './lang-accessor-base';

const { ccclass, property } = _decorator;

const ctor = 'CcLang';

@ccclass(ctor)
export class CcLang extends Component {
    public static ctor = ctor;

    private m_Lbl: Label;

    @property({ tooltip: '多语言键', type: [CCString] })
    private m_Keys: string[] = [];
    public set keys(v: string[]) {
        this.m_Keys = v;
        this.bind();
    }

    public onLoad() {
        this.bind();
    }

    private async bind() {
        if (!this.m_Keys?.length)
            return;

        this.m_Lbl ??= this.node.getComponent(Label);
        this.m_Lbl.string = await ioc.get<LangAccessorBase>(LangAccessorBase).get(...this.m_Keys);
    }
}