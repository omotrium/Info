import { element, by, ElementFinder } from 'protractor';

export class StaffRoleComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-staff-role div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class StaffRoleUpdatePage {
    pageTitle = element(by.id('jhi-staff-role-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    staffSelect = element(by.id('field_staff'));
    roleSelect = element(by.id('field_role'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async staffSelectLastOption() {
        await this.staffSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async staffSelectOption(option) {
        await this.staffSelect.sendKeys(option);
    }

    getStaffSelect(): ElementFinder {
        return this.staffSelect;
    }

    async getStaffSelectedOption() {
        return this.staffSelect.element(by.css('option:checked')).getText();
    }

    async roleSelectLastOption() {
        await this.roleSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async roleSelectOption(option) {
        await this.roleSelect.sendKeys(option);
    }

    getRoleSelect(): ElementFinder {
        return this.roleSelect;
    }

    async getRoleSelectedOption() {
        return this.roleSelect.element(by.css('option:checked')).getText();
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
