import { Node } from 'cc';

import { ViewInitOption } from './view-init-option';

export interface IView<T> {
    readonly id: string;
    readonly node: Node;
    init(opt: ViewInitOption<T>): Promise<void>;
    lazyInit(arg: T): Promise<void>;
}