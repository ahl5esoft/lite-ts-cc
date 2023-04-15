import { Node } from 'cc';

import { IMvvmMember, MvvmMapping } from './i-mvvm-member';

export abstract class MvvmMemerFactoryBase {
    public static ctor = 'MvvmMemerFactoryBase';

    public abstract build(mapping: MvvmMapping, parentNode: Node): IMvvmMember;
}