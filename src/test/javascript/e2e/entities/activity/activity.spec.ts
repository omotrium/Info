import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ActivityComponentsPage, ActivityUpdatePage } from './activity.page-object';

describe('Activity e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let activityUpdatePage: ActivityUpdatePage;
    let activityComponentsPage: ActivityComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Activities', async () => {
        await navBarPage.goToEntity('activity');
        activityComponentsPage = new ActivityComponentsPage();
        expect(await activityComponentsPage.getTitle()).toMatch(/informationManagerApp.activity.home.title/);
    });

    it('should load create Activity page', async () => {
        await activityComponentsPage.clickOnCreateButton();
        activityUpdatePage = new ActivityUpdatePage();
        expect(await activityUpdatePage.getPageTitle()).toMatch(/informationManagerApp.activity.home.createOrEditLabel/);
        await activityUpdatePage.cancel();
    });

    it('should create and save Activities', async () => {
        await activityComponentsPage.clickOnCreateButton();
        await activityUpdatePage.setNameInput('name');
        expect(await activityUpdatePage.getNameInput()).toMatch('name');
        await activityUpdatePage.setDescriptionInput('description');
        expect(await activityUpdatePage.getDescriptionInput()).toMatch('description');
        await activityUpdatePage.setUaaIdInput('uaaId');
        expect(await activityUpdatePage.getUaaIdInput()).toMatch('uaaId');
        await activityUpdatePage.save();
        expect(await activityUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
