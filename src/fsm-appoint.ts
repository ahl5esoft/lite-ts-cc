import { FsmStateBase } from './fsm-state-base';
import { IFsm } from './i-fsm';

export class FsmAppoint<T extends FsmStateBase> implements IFsm<T> {
    private m_State: { [key: number]: T; } = {};

    private m_CurrentState: T;
    public get currentState() {
        return this.m_CurrentState;
    }

    public regStates(...states: T[]) {
        for (const r of states) {
            r.fsm = this;
            this.m_State[r.key] = r;
        }
    }

    public async transfer(key: string) {
        await this.m_CurrentState?.onExit();

        this.m_CurrentState = this.m_State[key];
        if (!this.m_CurrentState)
            throw new Error(`状态机:无效状态[${key}]`);

        await this.m_CurrentState.onEnter();
    }
}
