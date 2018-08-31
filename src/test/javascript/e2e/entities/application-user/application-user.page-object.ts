import { element, by, ElementFinder } from 'protractor';

export class ApplicationUserComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-application-user div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ApplicationUserUpdatePage {
    pageTitle = element(by.id('jhi-application-user-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    staffSelect = element(by.id('field_staff'));
    applicationSelect = element(by.id('field_application'));

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

    async applicationSelectLastOption() {
        await this.applicationSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async applicationSelectOption(option) {
        await this.applicationSelect.sendKeys(option);
    }

    getApplicationSelect(): ElementFinder {
        return this.applicationSelect;
    }

    async getApplicationSelectedOption() {
        return this.applicationSelect.element(by.css('option:checked')).getText();
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
