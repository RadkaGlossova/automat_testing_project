import AppPage from '../../test/pageobjects/app.page.js' 

class RegistrationPage extends AppPage {

    constructor() {
        super()
        this.url = '/registrace';
    }
    get userNameField() {return $('#name');}
    get emailField() {return $('#email');}
    get passwordField() {return $('#password');}
    get passwConfirmation() {return $('#password-confirm');}
    get registrationButton() {return $('.btn-primary');}
    get userNameDropdown () {return $('.navbar-right').$('[data-toggle="dropdown"]');}

async open() {
    await browser.reloadSession();
    await browser.url(this.url);
}

async register(userName,email,password){
    await this.userNameField.setValue(userName);
    await this.emailField.setValue(email);
    await this.passwordField.setValue(password);
    await this.passwConfirmation.setValue(password);
    await this.registrationButton.click();
}
}

export default new RegistrationPage();