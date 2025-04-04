import { expect } from '@playwright/test';
import BasePage from '../../Base';
import { getTextExcludeIconText } from '../../../tests/utils/general';
import { DataSourcePage } from './DataSourcePage';

export class MetaDataPage extends BasePage {
  constructor(dataSource: DataSourcePage) {
    super(dataSource.rootPage);
  }

  get() {
    return this.rootPage.locator('div.ant-modal-content');
  }

  async clickReload() {
    await this.get().locator(`button:has-text("Reload")`).click();

    // todo: Remove this wait
    await this.rootPage.waitForTimeout(100);
    // await this.get().locator(`.animate-spin`).waitFor({state: 'visible'});
    await this.get().locator(`.animate-spin`).waitFor({ state: 'detached', timeout: 10000 });
  }

  async close() {
    await this.get().click();
    await this.rootPage.keyboard.press('Escape');
    await this.rootPage.keyboard.press('Escape');
    await this.rootPage.waitForSelector('div.ant-modal-content', {
      state: 'hidden',
    });
  }

  async sync() {
    await this.get().locator(`button:has-text("Sync Now")`).click();
    await this.verifyToast({ message: 'Table metadata recreated successfully' });
    // wait for clickability of the sync button
    await this.get().locator(`.sync-completed`).waitFor({ state: 'visible', timeout: 10000 });
    await this.get().locator(`.sync-completed`).click();
  }

  async verifyRow({ index, model, state }: { index: number; model: string; state: string }) {
    const fieldLocator = this.get().locator(`tr.nc-table-row`).nth(index).locator(`td.nc-table-cell`).nth(0);
    const fieldText = await getTextExcludeIconText(fieldLocator);
    expect(fieldText).toBe(model);

    await expect(this.get().locator(`tr.nc-table-row`).nth(index).locator(`td.nc-table-cell`).nth(1)).toHaveText(
      state,
      {
        ignoreCase: true,
      }
    );
  }
}
