import { element, by, ElementFinder } from 'protractor';

export class RoleActivityComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-role-activity div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RoleActivityUpdatePage {
    pageTitle = element(by.id('jhi-role-activity-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    rolesSelect = element(by.id('field_roles'));
    activitySelect = element(by.id('field_activity'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async rolesSelectLastOption() {
        await this.rolesSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async rolesSelectOption(option) {
        await this.rolesSelect.sendKeys(option);
    }

    getRolesSelect(): ElementFinder {
        return this.rolesSelect;
    }

    async getRolesSelectedOption() {
        return this.rolesSelect.element(by.css('option:checked')).getText();
    }

    async activitySelectLastOption() {
        await this.activitySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async activitySelectOption(option) {
        await this.activitySelect.sendKeys(option);
    }

    getActivitySelect(): ElementFinder {
        return this.activitySelect;
    }

    async getActivitySelectedOption() {
        return this.activitySelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
