import { IView } from './i-view';

export abstract class PageServiceBase {
    public static ctor = 'PageServiceBase';

    public readonly current: IView<void>;
    public abstract replace(viewID: string): Promise<void>;
    public abstract redirect(viewID: string): Promise<void>;
    public abstract back(): Promise<void>;
}