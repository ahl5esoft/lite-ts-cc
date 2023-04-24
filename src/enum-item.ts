import { Asset } from 'cc';
import { EnumItem } from 'lite-ts-enum';

export class CcEnumItem extends EnumItem {
    private m_EnumName: string;

    private m_BundleName: string;
    protected get bundleName() {
        if (!this.m_BundleName) {
            const dirname = this.m_EnumName.replace(/[A-Z]/g, (r, i) => {
                return (i ? '-' : '') + r.toLowerCase();
            });
            this.m_BundleName = 'bundles_' + dirname;
        }

        return this.m_BundleName;
    }

    public async getAssetPath<T extends Asset>(_: new () => T, scene?: string) {
        const paths: any[] = [this.bundleName, ':texture/'];
        if (scene)
            paths.push(scene, '-');
        paths.push(this.value);
        return paths.join('');
    }

    public getEncodingKey(attr?: string) {
        const parts = [this.m_EnumName, this.value];
        if (attr)
            parts.push(attr);
        return parts.join('-');
    }

    public static create(entry: EnumItem, enumName: string) {
        const item = new CcEnumItem();
        Object.assign(item, entry);
        item.m_EnumName = enumName;
        return item;
    }
}