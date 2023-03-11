import { Component } from 'cc';

import { IView, ViewInitOption } from './i-view';

export class CcView<T> extends Component implements IView<T> {
    private m_ActiveAction: () => void;

    private m_ID: string;
    public get id() {
        return this.m_ID;
    }

    private m_Input: T;
    public get input() {
        return this.m_Input;
    }

    public async init(opt: ViewInitOption<T>) {
        this.m_ID ??= opt.viewID;
        this.m_Input = opt.input;
        if (opt.nodeParent)
            this.node.parent = opt.nodeParent;
        return new Promise<void>(s => {
            this.m_ActiveAction = s;
        });
    }

    public async lazyInit(_: T) { }

    public async onEnable() {
        await this.onActive();
        this.m_ActiveAction?.();
    }

    protected async onActive() { }
}