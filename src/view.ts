import * as cc from 'cc';
import { ioc } from 'lite-ts-ioc';

import { AssetLoaderBase } from './asset-loader-base';
import { IMvvmMember, MvvmMapping } from './i-mvvm-member';
import { IView } from './i-view';
import { MvvmMemerFactoryBase } from './mvvm-member-factory-base';
import { ViewInitOption } from './view-init-option';

export class CcView<T> extends cc.Component implements IView<T> {
    private m_ActiveAction: () => void;

    private m_ID: string;
    public get id() {
        return this.m_ID;
    }

    private m_Input: T;
    public get input() {
        return this.m_Input;
    }

    private m_Vm: { [key: string]: any };
    public get vm() {
        this.m_Vm ??= new Proxy({}, {
            set: (_, prop: string, value) => {
                this.mvvmMembers.then(res => {
                    for (const r of res) {
                        r.setValue(prop, value);
                    }
                });
                return true;
            },
        })
        return this.m_Vm;
    }

    private m_MvvmMembers: Promise<IMvvmMember[]>;
    protected get mvvmMembers() {
        this.m_MvvmMembers ??= new Promise<IMvvmMember[]>(async (s, f) => {
            try {
                const asset = await ioc.get<AssetLoaderBase>(AssetLoaderBase).load(
                    cc.JsonAsset,
                    `${this.id.replace(':', '_').replace('/', '_')}.json`,
                );
                s(
                    (asset.json as MvvmMapping[]).map(r => {
                        return ioc.get<MvvmMemerFactoryBase>(MvvmMemerFactoryBase).build(r, this.node);
                    })
                );
            } catch (ex) {
                f(ex);
            }
        });
        return this.m_MvvmMembers;
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

    public async onLoad() {
        const members = await this.mvvmMembers;
        for (const r of members) {
            r.bindEvent();
        }

        ioc.inject(this);
        await this.onActive();
        this.m_ActiveAction?.();
    }

    protected async getVm<T>() {
        const res = {};
        const members = await this.mvvmMembers;
        for (const r of members) {
            for (const cr of r.getters) {
                res[cr.key] = cr.getValueFunc();
            }
        }
        return res as T;
    }

    protected async onActive() { }
}