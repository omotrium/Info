import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RoleComponentsPage, RoleUpdatePage } from './role.page-object';

describe('Role e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let roleUpdatePage: RoleUpdatePage;
    let roleComponentsPage: RoleComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Roles', async () => {
        await navBarPage.goToEntity('role');
        roleComponentsPage = new RoleComponentsPage();
        expect(await roleComponentsPage.getTitle()).toMatch(/informationManagerApp.role.home.title/);
    });

    it('should load create Role page', async () => {
        await roleComponentsPage.clickOnCreateButton();
        roleUpdatePage = new RoleUpdatePage();
        expect(await roleUpdatePage.getPageTitle()).toMatch(/informationManagerApp.role.home.createOrEditLabel/);
        await roleUpdatePage.cancel();
    });

    it('should create and save Roles', async () => {
        await roleComponentsPage.clickOnCreateButton();
        await roleUpdatePage.setNameInput('name');
        expect(await roleUpdatePage.getNameInput()).toMatch('name');
        await roleUpdatePage.setDescriptionInput('description');
        expect(await roleUpdatePage.getDescriptionInput()).toMatch('description');
        await roleUpdatePage.setUaaIdInput('uaaId');
        expect(await roleUpdatePage.getUaaIdInput()).toMatch('uaaId');
        await roleUpdatePage.save();
        expect(await roleUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
