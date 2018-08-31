import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { StaffComponentsPage, StaffUpdatePage } from './staff.page-object';

describe('Staff e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let staffUpdatePage: StaffUpdatePage;
    let staffComponentsPage: StaffComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Staff', async () => {
        await navBarPage.goToEntity('staff');
        staffComponentsPage = new StaffComponentsPage();
        expect(await staffComponentsPage.getTitle()).toMatch(/informationManagerApp.staff.home.title/);
    });

    it('should load create Staff page', async () => {
        await staffComponentsPage.clickOnCreateButton();
        staffUpdatePage = new StaffUpdatePage();
        expect(await staffUpdatePage.getPageTitle()).toMatch(/informationManagerApp.staff.home.createOrEditLabel/);
        await staffUpdatePage.cancel();
    });

    /* it('should create and save Staff', async () => {
        await staffComponentsPage.clickOnCreateButton();
        await staffUpdatePage.setFirstNameInput('firstName');
        expect(await staffUpdatePage.getFirstNameInput()).toMatch('firstName');
        await staffUpdatePage.setLastNameInput('lastName');
        expect(await staffUpdatePage.getLastNameInput()).toMatch('lastName');
        await staffUpdatePage.setUsernameInput('username');
        expect(await staffUpdatePage.getUsernameInput()).toMatch('username');
        await staffUpdatePage.setEmailInput('email');
        expect(await staffUpdatePage.getEmailInput()).toMatch('email');
        await staffUpdatePage.setAccountStatusInput('accountStatus');
        expect(await staffUpdatePage.getAccountStatusInput()).toMatch('accountStatus');
        await staffUpdatePage.setPasswordInput('password');
        expect(await staffUpdatePage.getPasswordInput()).toMatch('password');
        await staffUpdatePage.setVerifiedByInput('verifiedBy');
        expect(await staffUpdatePage.getVerifiedByInput()).toMatch('verifiedBy');
        await staffUpdatePage.setLoginCountInput('loginCount');
        expect(await staffUpdatePage.getLoginCountInput()).toMatch('loginCount');
        await staffUpdatePage.organisationsSelectLastOption();
        await staffUpdatePage.internalGroupSelectLastOption();
        await staffUpdatePage.userTypesSelectLastOption();
        await staffUpdatePage.save();
        expect(await staffUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
