/// <reference types="./temp/declarations/cc" />
/// <reference types="./temp/declarations/cc" />
declare abstract class AssetLoaderBase {
    static ctor: string;
    abstract load<T extends Asset>(typer: new () => T, path: string): Promise<T>;
}
declare class CcAssetLoader extends AssetLoaderBase {
    private m_LoadedAsset;
    constructor(m_LoadedAsset: {
        [path: string]: Asset;
    });
    load<T extends Asset>(typer: new () => T, pathString: string): Promise<T>;
}