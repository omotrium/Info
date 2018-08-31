import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ApplicationUserComponentsPage, ApplicationUserUpdatePage } from './application-user.page-object';

describe('ApplicationUser e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let applicationUserUpdatePage: ApplicationUserUpdatePage;
    let applicationUserComponentsPage: ApplicationUserComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ApplicationUsers', async () => {
        await navBarPage.goToEntity('application-user');
        applicationUserComponentsPage = new ApplicationUserComponentsPage();
        expect(await applicationUserComponentsPage.getTitle()).toMatch(/informationManagerApp.applicationUser.home.title/);
    });

    it('should load create ApplicationUser page', async () => {
        await applicationUserComponentsPage.clickOnCreateButton();
        applicationUserUpdatePage = new ApplicationUserUpdatePage();
        expect(await applicationUserUpdatePage.getPageTitle()).toMatch(/informationManagerApp.applicationUser.home.createOrEditLabel/);
        await applicationUserUpdatePage.cancel();
    });

    /* it('should create and save ApplicationUsers', async () => {
        await applicationUserComponentsPage.clickOnCreateButton();
        await applicationUserUpdatePage.staffSelectLastOption();
        await applicationUserUpdatePage.applicationSelectLastOption();
        await applicationUserUpdatePage.save();
        expect(await applicationUserUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
