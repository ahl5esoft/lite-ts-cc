import { JsonAsset } from 'cc';
import { ConfigLoadHandlerBase, ConfigLoadHandlerContext } from 'lite-ts-config';

import { AssetLoaderBase } from './asset-loader-base';

export class CcAssetLoaderConfigLoadHandler extends ConfigLoadHandlerBase {
    public constructor(
        private m_AssetLoader: AssetLoaderBase,
        private m_KeyOfPath: { [key: string]: string; },
    ) {
        super();
    }

    public async handle(ctx: ConfigLoadHandlerContext) {
        if (!this.m_KeyOfPath[ctx.name])
            return await this.next?.handle(ctx);

        const asset = await this.m_AssetLoader.load<JsonAsset>(JsonAsset, this.m_KeyOfPath[ctx.name]);
        ctx.res = asset.json;
    }
}