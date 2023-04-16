import { IView } from './i-view';
import { ModalServiceOpenOption } from './modal-service-open-option';

export abstract class ModalServiceBase {
    public static ctor = 'ModalServiceBase';

    public modal: { [id: string]: IView<any>; } = {};
    public abstract close(viewID: string): void;
    public abstract hide(viewID: string): void;
    public abstract open(viewID: string, opt?: ModalServiceOpenOption): Promise<void>;
}