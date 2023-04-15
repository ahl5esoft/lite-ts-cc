import { Node } from 'cc';

export type ViewInitOption<T> = Partial<{
    nodeParent: Node;
    viewID: string;
    input: T;
}>;

export interface IView<T> {
    readonly id: string;
    readonly node: Node;
    init(opt: ViewInitOption<T>): Promise<void>;
    lazyInit(arg: T): Promise<void>;
}