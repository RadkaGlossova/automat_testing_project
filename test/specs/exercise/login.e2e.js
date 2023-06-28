import LoginPage from '../../pageobjects/login.page.js'
import {username, password} from '../../../test/specs/fixtures.js'


describe('Login Page', async () => {
    beforeEach(async () => {

        await LoginPage.open();
});

    it('should show login page', async () => {

        // zjištění stavu políčka email

        await expect (LoginPage.emailField).toBeEnabled();
        await expect (LoginPage.emailField).toBeDisplayed();
     

        // zjištění stavu políčka password
        await expect(LoginPage.passwordField).toBeEnabled();
        await expect(LoginPage.passwordField).toBeDisplayed();

        // výpis textu tlačítka na přihlášení
        await expect(LoginPage.loginButton).toBeClickable();
        await expect(await LoginPage.loginButton.getText()).toEqual('Přihlásit');

        
        // výpis atributu href odkazu a zapomenuté heslo
        console.log(await expect(LoginPage.forgottenPasslink));
       
        // kontrola - nelze přihlásit bez vyplnění formuláře
        await LoginPage.loginButton.click();
        await expect(await LoginPage.getTitle()).toEqual('Přihlášení');
    });

        it('should not login - incorrect password', async () => {

        // přihlášení - správný email, špatné heslo
        await LoginPage.login(username, '123');
       
        await expect (await LoginPage.getToastMessage()).toEqual('Některé pole obsahuje špatně zadanou hodnotu');

        await expect(await LoginPage.getFieldError()).toEqual('Tyto přihlašovací údaje neodpovídají žadnému záznamu.');
        
        // pořád vidím formulář pro přihlášení
        await expect(await LoginPage.getTitle()).toEqual('Přihlášení');
        await expect(LoginPage.emailField).toBeEnabled();
        await expect(LoginPage.emailField).toBeDisplayed();
        await expect(LoginPage.passwordField).toBeEnabled();
        await expect(LoginPage.passwordField).toBeDisplayed();
        await expect(LoginPage.loginButton).toBeClickable();
        await expect(await LoginPage.loginButton.getText()).toEqual('Přihlásit');

        // odkaz na zapomenuté heslo
        await expect (LoginPage.forgottenPasswButton).toBeClickable();
        await LoginPage.forgottenPasswButton.click();
        await expect (await LoginPage.getTitle()).toMatch('Zapomenuté heslo');

    });

    it('should login', async () => {
        // přihlášení - správné údaje
        await LoginPage.login(username, password);

        // Vypiš jméno přihlášeného uživatele
        await expect (await LoginPage.currentUser).toHaveTextContaining(['Admin','Lišák']);

    });
    it('should logout', async () => {
        // přihlášení

        await LoginPage.login(username, password);
        
         //odhlášení
    await expect(await LoginPage.logout()); 
    
    await expect(await LoginPage.loggedOutUser.getText()).toEqual('Přihlásit')  
 });

});