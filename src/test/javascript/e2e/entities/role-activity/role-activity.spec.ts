import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RoleActivityComponentsPage, RoleActivityUpdatePage } from './role-activity.page-object';

describe('RoleActivity e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let roleActivityUpdatePage: RoleActivityUpdatePage;
    let roleActivityComponentsPage: RoleActivityComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load RoleActivities', async () => {
        await navBarPage.goToEntity('role-activity');
        roleActivityComponentsPage = new RoleActivityComponentsPage();
        expect(await roleActivityComponentsPage.getTitle()).toMatch(/informationManagerApp.roleActivity.home.title/);
    });

    it('should load create RoleActivity page', async () => {
        await roleActivityComponentsPage.clickOnCreateButton();
        roleActivityUpdatePage = new RoleActivityUpdatePage();
        expect(await roleActivityUpdatePage.getPageTitle()).toMatch(/informationManagerApp.roleActivity.home.createOrEditLabel/);
        await roleActivityUpdatePage.cancel();
    });

    /* it('should create and save RoleActivities', async () => {
        await roleActivityComponentsPage.clickOnCreateButton();
        await roleActivityUpdatePage.rolesSelectLastOption();
        await roleActivityUpdatePage.activitySelectLastOption();
        await roleActivityUpdatePage.save();
        expect(await roleActivityUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
