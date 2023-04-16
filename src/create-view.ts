import { IView } from './i-view';
import { ViewInitOption } from './view-init-option';

export type CreateView = (opt: ViewInitOption<void>) => Promise<IView<void>>;