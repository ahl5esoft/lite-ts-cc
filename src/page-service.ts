import { CreateView } from './create-view';
import { IView } from './i-view';
import { PageServiceBase } from './page-service-base';

export class CcPageService extends PageServiceBase {
    private m_Breadcrumbs: string[] = [];

    public current: IView<void>;

    public constructor(
        private m_CreateViewFunc: CreateView,
    ) {
        super();
    }

    public async replace(viewID: string) {
        this.createPage(viewID);
        this.m_Breadcrumbs = [];
    }

    public async redirect(viewID: string) {
        if (this.current?.id == viewID)
            return;

        const index = this.m_Breadcrumbs.indexOf(viewID);
        if (index == -1) {
            if (this.current)
                this.m_Breadcrumbs.push(this.current.id);

            this.createPage(viewID);
        } else {
            this.m_Breadcrumbs.splice(index + 1);
            this.back();
        }
    }

    public async back() {
        if (!this.m_Breadcrumbs.length)
            return;

        await this.createPage(
            this.m_Breadcrumbs.pop()
        );
    }

    private async createPage(viewID: string) {
        if (this.current)
            this.current.node?.destroy();

        this.current = await this.m_CreateViewFunc({ viewID });
    }
}