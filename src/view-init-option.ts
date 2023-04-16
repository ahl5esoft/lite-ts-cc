import { Node } from 'cc';

export type ViewInitOption<T> = Partial<{
    nodeParent: Node;
    viewID: string;
    input: T;
}>;