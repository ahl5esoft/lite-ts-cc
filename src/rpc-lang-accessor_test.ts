import { strictEqual } from 'assert';

import { RpcLangAccessor as Self } from './rpc-lang-accessor';

describe('src/rpc-lang-accessor.ts', () => {
    describe('.get(...keys: string[])', () => {
        it('ok', async () => {
            const self = new Self(null, {
                updateInterval: 0,
                type: 'tt'
            });

            Reflect.set(self, 'getContent', () => {
                return {
                    a: 'aa'
                };
            });

            const res = await self.get('a');
            strictEqual(res, 'aa');
        });
        
        it('{0}', async () => {
            const self = new Self(null, {
                updateInterval: 0,
                type: 'tt'
            });

            Reflect.set(self, 'getContent', () => {
                return {
                    a: '{0}-{1}-{2}',
                    b: 'bb',
                    c: 'cc',
                    d: 'dd'
                };
            });

            const res = await self.get('a', 'b', 'c', 'd');
            strictEqual(res, 'bb-cc-dd');
        });
    });
});