import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AuthenticationTypeComponentsPage, AuthenticationTypeUpdatePage } from './authentication-type.page-object';

describe('AuthenticationType e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let authenticationTypeUpdatePage: AuthenticationTypeUpdatePage;
    let authenticationTypeComponentsPage: AuthenticationTypeComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load AuthenticationTypes', async () => {
        await navBarPage.goToEntity('authentication-type');
        authenticationTypeComponentsPage = new AuthenticationTypeComponentsPage();
        expect(await authenticationTypeComponentsPage.getTitle()).toMatch(/informationManagerApp.authenticationType.home.title/);
    });

    it('should load create AuthenticationType page', async () => {
        await authenticationTypeComponentsPage.clickOnCreateButton();
        authenticationTypeUpdatePage = new AuthenticationTypeUpdatePage();
        expect(await authenticationTypeUpdatePage.getPageTitle()).toMatch(
            /informationManagerApp.authenticationType.home.createOrEditLabel/
        );
        await authenticationTypeUpdatePage.cancel();
    });

    it('should create and save AuthenticationTypes', async () => {
        await authenticationTypeComponentsPage.clickOnCreateButton();
        await authenticationTypeUpdatePage.setNameInput('name');
        expect(await authenticationTypeUpdatePage.getNameInput()).toMatch('name');
        await authenticationTypeUpdatePage.setTokenInput('token');
        expect(await authenticationTypeUpdatePage.getTokenInput()).toMatch('token');
        await authenticationTypeUpdatePage.save();
        expect(await authenticationTypeUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
