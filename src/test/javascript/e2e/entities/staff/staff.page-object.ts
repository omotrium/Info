import { element, by, ElementFinder } from 'protractor';

export class StaffComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-staff div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class StaffUpdatePage {
    pageTitle = element(by.id('jhi-staff-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    firstNameInput = element(by.id('field_firstName'));
    lastNameInput = element(by.id('field_lastName'));
    usernameInput = element(by.id('field_username'));
    emailInput = element(by.id('field_email'));
    accountStatusInput = element(by.id('field_accountStatus'));
    passwordInput = element(by.id('field_password'));
    verifiedByInput = element(by.id('field_verifiedBy'));
    loginCountInput = element(by.id('field_loginCount'));
    organisationsSelect = element(by.id('field_organisations'));
    internalGroupSelect = element(by.id('field_internalGroup'));
    userTypesSelect = element(by.id('field_userTypes'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setFirstNameInput(firstName) {
        await this.firstNameInput.sendKeys(firstName);
    }

    async getFirstNameInput() {
        return this.firstNameInput.getAttribute('value');
    }

    async setLastNameInput(lastName) {
        await this.lastNameInput.sendKeys(lastName);
    }

    async getLastNameInput() {
        return this.lastNameInput.getAttribute('value');
    }

    async setUsernameInput(username) {
        await this.usernameInput.sendKeys(username);
    }

    async getUsernameInput() {
        return this.usernameInput.getAttribute('value');
    }

    async setEmailInput(email) {
        await this.emailInput.sendKeys(email);
    }

    async getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    async setAccountStatusInput(accountStatus) {
        await this.accountStatusInput.sendKeys(accountStatus);
    }

    async getAccountStatusInput() {
        return this.accountStatusInput.getAttribute('value');
    }

    async setPasswordInput(password) {
        await this.passwordInput.sendKeys(password);
    }

    async getPasswordInput() {
        return this.passwordInput.getAttribute('value');
    }

    async setVerifiedByInput(verifiedBy) {
        await this.verifiedByInput.sendKeys(verifiedBy);
    }

    async getVerifiedByInput() {
        return this.verifiedByInput.getAttribute('value');
    }

    async setLoginCountInput(loginCount) {
        await this.loginCountInput.sendKeys(loginCount);
    }

    async getLoginCountInput() {
        return this.loginCountInput.getAttribute('value');
    }

    async organisationsSelectLastOption() {
        await this.organisationsSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async organisationsSelectOption(option) {
        await this.organisationsSelect.sendKeys(option);
    }

    getOrganisationsSelect(): ElementFinder {
        return this.organisationsSelect;
    }

    async getOrganisationsSelectedOption() {
        return this.organisationsSelect.element(by.css('option:checked')).getText();
    }

    async internalGroupSelectLastOption() {
        await this.internalGroupSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async internalGroupSelectOption(option) {
        await this.internalGroupSelect.sendKeys(option);
    }

    getInternalGroupSelect(): ElementFinder {
        return this.internalGroupSelect;
    }

    async getInternalGroupSelectedOption() {
        return this.internalGroupSelect.element(by.css('option:checked')).getText();
    }

    async userTypesSelectLastOption() {
        await this.userTypesSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async userTypesSelectOption(option) {
        await this.userTypesSelect.sendKeys(option);
    }

    getUserTypesSelect(): ElementFinder {
        return this.userTypesSelect;
    }

    async getUserTypesSelectedOption() {
        return this.userTypesSelect.element(by.css('option:checked')).getText();
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
