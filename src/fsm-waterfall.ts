import { FsmStateBase } from './fsm-state-base';
import { IFsm } from './i-fsm';

export class FsmWaterfall<T extends FsmStateBase> implements IFsm<T> {
    private m_Index = -1;
    private m_States: T[] = [];

    public get currentState() {
        return this.m_States[this.m_Index];
    }

    public regStates(...states: T[]) {
        for (const r of states) {
            r.fsm = this;
            this.m_States.push(r);
        }
    }

    public async transfer() {
        await this.m_States[this.m_Index]?.onExit();

        if (this.m_Index == this.m_States.length - 1)
            this.m_Index = -1;

        await this.m_States[++this.m_Index].onEnter();
    }
}