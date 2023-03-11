import { AssetLoaderBase } from './asset-loader-base';
import { IView, ViewInitOption } from './i-view';

export type CreateView = (assetLoader: AssetLoaderBase, opt: ViewInitOption<void>) => Promise<IView<void>>;