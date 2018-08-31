import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { InternalGroupComponentsPage, InternalGroupUpdatePage } from './internal-group.page-object';

describe('InternalGroup e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let internalGroupUpdatePage: InternalGroupUpdatePage;
    let internalGroupComponentsPage: InternalGroupComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load InternalGroups', async () => {
        await navBarPage.goToEntity('internal-group');
        internalGroupComponentsPage = new InternalGroupComponentsPage();
        expect(await internalGroupComponentsPage.getTitle()).toMatch(/informationManagerApp.internalGroup.home.title/);
    });

    it('should load create InternalGroup page', async () => {
        await internalGroupComponentsPage.clickOnCreateButton();
        internalGroupUpdatePage = new InternalGroupUpdatePage();
        expect(await internalGroupUpdatePage.getPageTitle()).toMatch(/informationManagerApp.internalGroup.home.createOrEditLabel/);
        await internalGroupUpdatePage.cancel();
    });

    it('should create and save InternalGroups', async () => {
        await internalGroupComponentsPage.clickOnCreateButton();
        await internalGroupUpdatePage.setNameInput('name');
        expect(await internalGroupUpdatePage.getNameInput()).toMatch('name');
        await internalGroupUpdatePage.save();
        expect(await internalGroupUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
