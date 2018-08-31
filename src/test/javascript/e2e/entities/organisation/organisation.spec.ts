import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OrganisationComponentsPage, OrganisationUpdatePage } from './organisation.page-object';

describe('Organisation e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let organisationUpdatePage: OrganisationUpdatePage;
    let organisationComponentsPage: OrganisationComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Organisations', async () => {
        await navBarPage.goToEntity('organisation');
        organisationComponentsPage = new OrganisationComponentsPage();
        expect(await organisationComponentsPage.getTitle()).toMatch(/informationManagerApp.organisation.home.title/);
    });

    it('should load create Organisation page', async () => {
        await organisationComponentsPage.clickOnCreateButton();
        organisationUpdatePage = new OrganisationUpdatePage();
        expect(await organisationUpdatePage.getPageTitle()).toMatch(/informationManagerApp.organisation.home.createOrEditLabel/);
        await organisationUpdatePage.cancel();
    });

    it('should create and save Organisations', async () => {
        await organisationComponentsPage.clickOnCreateButton();
        await organisationUpdatePage.setNameInput('name');
        expect(await organisationUpdatePage.getNameInput()).toMatch('name');
        await organisationUpdatePage.save();
        expect(await organisationUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
