import { element, by, ElementFinder } from 'protractor';

export class ApplicationComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-application div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ApplicationUpdatePage {
    pageTitle = element(by.id('jhi-application-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    descriptionInput = element(by.id('field_description'));
    uaaIdInput = element(by.id('field_uaaId'));
    authenticationTypesSelect = element(by.id('field_authenticationTypes'));
    applicationClientsSelect = element(by.id('field_applicationClients'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setUaaIdInput(uaaId) {
        await this.uaaIdInput.sendKeys(uaaId);
    }

    async getUaaIdInput() {
        return this.uaaIdInput.getAttribute('value');
    }

    async authenticationTypesSelectLastOption() {
        await this.authenticationTypesSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async authenticationTypesSelectOption(option) {
        await this.authenticationTypesSelect.sendKeys(option);
    }

    getAuthenticationTypesSelect(): ElementFinder {
        return this.authenticationTypesSelect;
    }

    async getAuthenticationTypesSelectedOption() {
        return this.authenticationTypesSelect.element(by.css('option:checked')).getText();
    }

    async applicationClientsSelectLastOption() {
        await this.applicationClientsSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async applicationClientsSelectOption(option) {
        await this.applicationClientsSelect.sendKeys(option);
    }

    getApplicationClientsSelect(): ElementFinder {
        return this.applicationClientsSelect;
    }

    async getApplicationClientsSelectedOption() {
        return this.applicationClientsSelect.element(by.css('option:checked')).getText();
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
