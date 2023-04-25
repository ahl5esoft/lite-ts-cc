export interface IToggle {
    onToggleBlur(): Promise<void>;
    onToggleFocus(): Promise<void>;
}

const focusField = 'isToggleFocus';

export class CcToggleController {
    public m_Toggle: { [index: number]: IToggle; } = {};

    public addToggle(index: number, item: IToggle) {
        this.m_Toggle[index] = item;
    }

    public async toggle(index: number) {
        if (this.m_Toggle[index][focusField])
            return;

        const enableItem = Object.values(this.m_Toggle).find(r => r[focusField]);
        if (enableItem) {
            enableItem[focusField] = false;
            await enableItem.onToggleBlur();
        }

        this.m_Toggle[index][focusField] = true;
        await this.m_Toggle[index].onToggleFocus();
    }
}