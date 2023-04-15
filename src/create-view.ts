import { IView, ViewInitOption } from './i-view';

export type CreateView = (opt: ViewInitOption<void>) => Promise<IView<void>>;