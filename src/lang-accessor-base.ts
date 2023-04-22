export abstract class LangAccessorBase {
    public static ctor = 'LangAccessorBase';

    public abstract get langAbbr(): string;
    public abstract get(...keys: string[]): Promise<string>;
    public abstract has(key: string): Promise<boolean>;
}