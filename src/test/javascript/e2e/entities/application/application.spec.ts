import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ApplicationComponentsPage, ApplicationUpdatePage } from './application.page-object';

describe('Application e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let applicationUpdatePage: ApplicationUpdatePage;
    let applicationComponentsPage: ApplicationComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Applications', async () => {
        await navBarPage.goToEntity('application');
        applicationComponentsPage = new ApplicationComponentsPage();
        expect(await applicationComponentsPage.getTitle()).toMatch(/informationManagerApp.application.home.title/);
    });

    it('should load create Application page', async () => {
        await applicationComponentsPage.clickOnCreateButton();
        applicationUpdatePage = new ApplicationUpdatePage();
        expect(await applicationUpdatePage.getPageTitle()).toMatch(/informationManagerApp.application.home.createOrEditLabel/);
        await applicationUpdatePage.cancel();
    });

    /* it('should create and save Applications', async () => {
        await applicationComponentsPage.clickOnCreateButton();
        await applicationUpdatePage.setNameInput('name');
        expect(await applicationUpdatePage.getNameInput()).toMatch('name');
        await applicationUpdatePage.setDescriptionInput('description');
        expect(await applicationUpdatePage.getDescriptionInput()).toMatch('description');
        await applicationUpdatePage.setUaaIdInput('uaaId');
        expect(await applicationUpdatePage.getUaaIdInput()).toMatch('uaaId');
        await applicationUpdatePage.authenticationTypesSelectLastOption();
        await applicationUpdatePage.applicationClientsSelectLastOption();
        await applicationUpdatePage.save();
        expect(await applicationUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
