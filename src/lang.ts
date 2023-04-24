import { _decorator, CCString, Component, Label, RichText } from 'cc';
import { ioc } from 'lite-ts-ioc';

import { LangAccessorBase } from './lang-accessor-base';

const { ccclass, property } = _decorator;

const ctor = 'CcLang';

type StringComponent = {
    string: string;
};

@ccclass(ctor)
export class CcLang extends Component {
    public static ctor = ctor;

    private m_Component: StringComponent;

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

        if (!this.m_Component) {
            this.m_Component ??= this.node.getComponent(Label);
            this.m_Component ??= this.node.getComponent(RichText);
            if (!this.m_Component)
                throw new Error(`CcLang: ${this.node.getPathInHierarchy()}缺少Label或RichText`);
        }

        this.m_Component.string = await ioc.get<LangAccessorBase>(LangAccessorBase).get(...this.m_Keys);
    }
}