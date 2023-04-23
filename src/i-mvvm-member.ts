export type MvvmMappingSetterChainItem = {
    method: string;
    args?: string[];
};

export type MvvmMapping = {
    path: string;
    type: string;
    getter: { [key: string]: string; };
    setter: { [key: string]: string | MvvmMappingSetterChainItem[]; };
    events: {
        customEventData?: string;
        component: string;
        handler: string;
        type: string;
    }[];
};

export type MvvmGetter = {
    key: string;
    getValueFunc: () => any;
};

export interface IMvvmMember {
    readonly getters: MvvmGetter[];
    bindEvent(): void;
    setValue(prop: string, value: any): void;
}