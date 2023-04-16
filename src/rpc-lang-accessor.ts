import { RpcBase } from 'lite-ts-rpc';

import { LangAccessorBase } from './lang-accessor-base';

export class LangConfig {
    public updateInterval: number;
    public type: string;
}

type Response = {
    content: { [key: string]: string };
    version: number;
    currencySymbol: string;
}

export class RpcLangAccessor extends LangAccessorBase {
    public static route = '/config/get-lang';

    private m_Cache: {
        [langType: string]: {
            content: { [key: string]: string };
            updateOn: number;
            version: number;
        }
    } = {};

    public get langType() {
        return this.m_Config.type;
    }

    public constructor(
        private m_Rpc: RpcBase,
        private m_Config: LangConfig,
    ) {
        super();

        this.m_Cache[this.m_Config.type] ??= {
            content: {},
            updateOn: 0,
            version: 0,
        };
    }

    public async get(...keys: string[]) {
        const content = await this.getContent();
        let text: string;
        for (let i = 0; i < keys.length; i++) {
            if (text) {
                const replacer = await this.get(keys[i]);
                text = text.replace(
                    new RegExp(`\\{${i - 1}\\}`, 'g'),
                    replacer,
                );
            } else {
                text = content[keys[i]] ?? keys[i];
            }
        }
        return text;
    }

    public async has(key: string) {
        const content = await this.getContent();
        return !!content[key];
    }

    private async getContent() {
        const now = Date.now();
        if (now - this.m_Cache[this.langType].updateOn >= this.m_Config.updateInterval) {
            const resp = await this.m_Rpc.call<Response>({
                body: {
                    lang: this.langType,
                    version: this.m_Cache[this.langType].version,
                },
                route: RpcLangAccessor.route,
            });
            if (!resp.err) {
                this.m_Cache[this.langType].content = {
                    ...this.m_Cache[this.langType].content,
                    ...resp.data.content
                };
                this.m_Cache[this.langType].updateOn = now;
                this.m_Cache[this.langType].version = resp.data.version;
            }
        }

        return this.m_Cache[this.langType].content;
    }
}
