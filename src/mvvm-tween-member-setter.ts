import * as cc from 'cc';
import { IMvvmMemberSetter } from './i-mvvm-member-setter';
import { MvvmMappingSetterChainItem } from './i-mvvm-member';

export class MvvmTweenMemberSetter implements IMvvmMemberSetter {
    public constructor(
        private m_Node: cc.Node,
        private m_Chain: MvvmMappingSetterChainItem[],
    ) { }

    public setValue(v: any) {
        this.m_Chain.reduce(
            (memo, r) => {
                return memo ? memo[r.method](
                    ...(r.args ?? []).map(cr => {
                        let argParts = cr.split('.');
                        if (argParts.length == 2) {
                            return () => {
                                const component = this.m_Node.getComponent(argParts[0]);
                                component[argParts[1]](this.m_Node);
                            };
                        }

                        return v[cr];
                    })
                ) : cc.tween(
                    r.args?.length ? this.m_Node.getComponent(cc[r.args[0]]) : this.m_Node
                );
            },
            null as cc.Tween<any>,
        ).start();
    }
}