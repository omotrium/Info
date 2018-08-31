import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { StaffRoleComponentsPage, StaffRoleUpdatePage } from './staff-role.page-object';

describe('StaffRole e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let staffRoleUpdatePage: StaffRoleUpdatePage;
    let staffRoleComponentsPage: StaffRoleComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load StaffRoles', async () => {
        await navBarPage.goToEntity('staff-role');
        staffRoleComponentsPage = new StaffRoleComponentsPage();
        expect(await staffRoleComponentsPage.getTitle()).toMatch(/informationManagerApp.staffRole.home.title/);
    });

    it('should load create StaffRole page', async () => {
        await staffRoleComponentsPage.clickOnCreateButton();
        staffRoleUpdatePage = new StaffRoleUpdatePage();
        expect(await staffRoleUpdatePage.getPageTitle()).toMatch(/informationManagerApp.staffRole.home.createOrEditLabel/);
        await staffRoleUpdatePage.cancel();
    });

    /* it('should create and save StaffRoles', async () => {
        await staffRoleComponentsPage.clickOnCreateButton();
        await staffRoleUpdatePage.staffSelectLastOption();
        await staffRoleUpdatePage.roleSelectLastOption();
        await staffRoleUpdatePage.save();
        expect(await staffRoleUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
