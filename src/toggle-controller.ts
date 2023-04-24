export interface IToggleItem {
    isToggleEnable: boolean;
    onToggleDisable(): Promise<void>;
    onToggleEnable(): Promise<void>;
}

export class CcToggleController {
    public m_Item: { [index: number]: IToggleItem; } = {};

    public addItem(index: number, item: IToggleItem) {
        this.m_Item[index] = item;
    }

    public async toggle(index: number) {
        if (this.m_Item[index].isToggleEnable)
            return;

        const enableItem = Object.values(this.m_Item).find(r => r.isToggleEnable);
        if (enableItem) {
            enableItem.isToggleEnable = false;
            await enableItem.onToggleDisable();
        }

        this.m_Item[index].isToggleEnable = true;
        await this.m_Item[index].onToggleEnable();
    }
}