import { IFsm } from './i-fsm';

export abstract class FsmStateBase {
    public fsm: IFsm<FsmStateBase>;

    public constructor(
        public key?: string,
    ) { }

    public async onUpdate(_: number) { }

    public async onEnter() { }

    public async onExit() { }
}