import { strictEqual } from 'assert';

import { NumberFormatter as Self } from './number-formatter';

describe('src/number-formatter.ts', () => {
    describe('.format(v: number)', () => {
        it('K', () => {
            const res = new Self(2, {
                M: 1_000_000,
                K: 1_000,
            }).format(123456);
            strictEqual(res, '123.46K');
        });

        it('M', () => {
            const res = new Self(2, {
                M: 1_000_000,
                K: 1_000,
            }).format(1234567);
            strictEqual(res, '1.23M');
        });
    });
});