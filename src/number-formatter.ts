import { IFormatter } from './i-formatter';

export class NumberFormatter implements IFormatter {
    public constructor(
        private m_FractionDigits: number,
        private m_Unit: { [unit: string]: number },
    ) { }

    public format(v: number) {
        for (const [ck, cv] of Object.entries(this.m_Unit)) {
            if (v < cv)
                continue;

            return (v / cv).toFixed(this.m_FractionDigits) + ck;
        }

        return v.toString();
    }
}