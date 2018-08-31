import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { UserTypeComponentsPage, UserTypeUpdatePage } from './user-type.page-object';

describe('UserType e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let userTypeUpdatePage: UserTypeUpdatePage;
    let userTypeComponentsPage: UserTypeComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load UserTypes', async () => {
        await navBarPage.goToEntity('user-type');
        userTypeComponentsPage = new UserTypeComponentsPage();
        expect(await userTypeComponentsPage.getTitle()).toMatch(/informationManagerApp.userType.home.title/);
    });

    it('should load create UserType page', async () => {
        await userTypeComponentsPage.clickOnCreateButton();
        userTypeUpdatePage = new UserTypeUpdatePage();
        expect(await userTypeUpdatePage.getPageTitle()).toMatch(/informationManagerApp.userType.home.createOrEditLabel/);
        await userTypeUpdatePage.cancel();
    });

    it('should create and save UserTypes', async () => {
        await userTypeComponentsPage.clickOnCreateButton();
        await userTypeUpdatePage.setNameInput('name');
        expect(await userTypeUpdatePage.getNameInput()).toMatch('name');
        await userTypeUpdatePage.setDescriptionInput('description');
        expect(await userTypeUpdatePage.getDescriptionInput()).toMatch('description');
        await userTypeUpdatePage.save();
        expect(await userTypeUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
