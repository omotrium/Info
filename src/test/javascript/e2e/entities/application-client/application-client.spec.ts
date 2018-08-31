import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ApplicationClientComponentsPage, ApplicationClientUpdatePage } from './application-client.page-object';

describe('ApplicationClient e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let applicationClientUpdatePage: ApplicationClientUpdatePage;
    let applicationClientComponentsPage: ApplicationClientComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ApplicationClients', async () => {
        await navBarPage.goToEntity('application-client');
        applicationClientComponentsPage = new ApplicationClientComponentsPage();
        expect(await applicationClientComponentsPage.getTitle()).toMatch(/informationManagerApp.applicationClient.home.title/);
    });

    it('should load create ApplicationClient page', async () => {
        await applicationClientComponentsPage.clickOnCreateButton();
        applicationClientUpdatePage = new ApplicationClientUpdatePage();
        expect(await applicationClientUpdatePage.getPageTitle()).toMatch(/informationManagerApp.applicationClient.home.createOrEditLabel/);
        await applicationClientUpdatePage.cancel();
    });

    it('should create and save ApplicationClients', async () => {
        await applicationClientComponentsPage.clickOnCreateButton();
        await applicationClientUpdatePage.setNameInput('name');
        expect(await applicationClientUpdatePage.getNameInput()).toMatch('name');
        await applicationClientUpdatePage.save();
        expect(await applicationClientUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
