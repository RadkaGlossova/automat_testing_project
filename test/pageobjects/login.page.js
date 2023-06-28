import AppPage from '../../test/pageobjects/app.page.js' 

class LoginPage extends AppPage{

    constructor() {
        super();
        this.url = '/prihlaseni';
    }
    get emailField() {return $('#email');}
    get passwordField() {return $('#password');}
    get loginButton() {return $('.btn-primary');}
    get forgottenPasswButton() { return $('.btn-link');}
    get fieldError() { return $('.invalid-feedback'); }
    get forgottenPasslink() {return $('form').$('a').getAttribute('href');}
        
    async open() {
        await browser.reloadSession();
        await browser.url(this.url);
    }
    async login(username,password) {
        await this.emailField.setValue(username);
        await this.passwordField.setValue(password);
        await this.loginButton.click();
    }
    
    async getFieldError() {
        return await this.fieldError.getText();
    }

    async getForgottenPasswLink() {
        return await this.link;
   
}
}


export default new LoginPage();
