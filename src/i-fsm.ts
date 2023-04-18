import { FsmStateBase } from './fsm-state-base';

export interface IFsm<T extends FsmStateBase> {
    readonly currentState: T;

    regStates(...states: T[]): void;
    transfer(key?: string): Promise<void>;
}