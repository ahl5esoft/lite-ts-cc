import { IFormatter } from './i-formatter';

export abstract class FormatterFactoryBase {
    public static ctor = 'FormatterFactoryBase';

    public abstract build(type: number): IFormatter;
}

export class FormatterFactory extends FormatterFactoryBase {
    public constructor(
        private m_Formatter: { [type: number]: IFormatter },
    ) {
        super();
    }

    public build(type: number) {
        if (this.m_Formatter[type])
            return this.m_Formatter[type];

        throw new Error(`${FormatterFactoryBase.ctor}.build: 无效类型[${type}]`);
    }
}