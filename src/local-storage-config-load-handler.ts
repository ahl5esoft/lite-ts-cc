import { sys } from 'cc';

import { ConfigLoadHandlerBase, ConfigLoadHandlerContext } from 'lite-ts-config';

export class CcLocalStorageConfigLoadHandler extends ConfigLoadHandlerBase {
    public async handle(ctx: ConfigLoadHandlerContext) {
        const v = sys.localStorage.getItem(ctx.name);
        try {
            if (v)
                ctx.res = JSON.parse(v);
            else
                await this.next?.handle(ctx);
        } catch { }
    }
}