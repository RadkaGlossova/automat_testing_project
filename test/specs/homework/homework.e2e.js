/**
 * Lesson 9: Page Object Pattern - Exercise 4
 */
import {username, password, expectedApplicationsPageRows} from '../../specs/fixtures.js'
import LoginPage from '../../specs/examples/lesson-08/pages/login.page.js';
import ApplicationsPage from '../../specs/examples/lesson-08/pages/applications.page.js';

describe('Applications Page', async () => {

    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login(username, password)
        await ApplicationsPage.goToApplications();
    });

    it('should list all applications', async () => {
        const rows = await ApplicationsPage.getTableRows();

        await expect(rows.length).toEqual(expectedApplicationsPageRows);

        for (const row of rows) {
            console.log(row);
            await expect(row.name).toMatch(/^(?!\s*$).+/);
            await expect(row.date).toMatch(/(\d{2}.\d{2}.\d{4}|\d{2}.\d{2}. - \d{2}.\d{2}.\d{4})/);
            await expect(row.paymentType).toMatch(/(Bankovní převod|FKSP|Hotově|Složenka)/);
            await expect(row.toPay).toMatch(/\d{1,3}(| \d{0,3}) Kč/);
        }
    });

    it('should filter in applications', async () => {
        const searchText = 'mar';

        const unfilteredRows = await ApplicationsPage.getTableRows();

        await ApplicationsPage.searchInTable(searchText);

        const filteredRows = await ApplicationsPage.getTableRows();
        await expect(filteredRows.length).toBeLessThanOrEqual(unfilteredRows.length);

        for (const row of filteredRows) {
            console.log(row);
            await expect(row.name.toLowerCase()).toContain(searchText);
        }
    });
});


/**
 * Lesson 9: Page Object Pattern - Exercise 3
 */
import {username, password, userFullName} from '../../../fixtures.js'
import LoginPage from '../pages/login.page.js'

describe('Login Page', async () => {

    beforeEach(async () => {
        await LoginPage.open();
    });

    it('should show login form', async () => {
        await expect(await LoginPage.emailField).toBeDisplayed();
        await expect(await LoginPage.emailField).toBeEnabled();
        await expect(await LoginPage.passwordField).toBeDisplayed();
        await expect(await LoginPage.passwordField).toBeEnabled();
        await expect(await LoginPage.loginButton.getText()).toEqual('Přihlásit');
    });

    it('should login with valid credentials', async () => {

        await LoginPage.login(username, password)

        await expect(await LoginPage.getCurrentUser()).toEqual(userFullName);
    });

    it('should not login with invalid credentials', async () => {

        await LoginPage.login(username, 'invalid');

        // na stránce je jednak toast message
        await expect(await LoginPage.getToastMessage()).toEqual('Některé pole obsahuje špatně zadanou hodnotu');

        // ale také validační message ve formuláři
        await expect(await LoginPage.getFieldError()).toEqual('Tyto přihlašovací údaje neodpovídají žadnému záznamu.')

        // stále vidíme login formulář
        await expect(await LoginPage.emailField).toBeDisplayed();
        await expect(await LoginPage.passwordField).toBeDisplayed();
        await expect(await LoginPage.loginButton).toBeDisplayed();
    });

    it('should logout', async () => {
        await LoginPage.login(username, password);

        // zkontrolujeme, že jsme přihlášeni, jinak by test byl nevalidní
        await expect(await LoginPage.getCurrentUser()).toEqual(userFullName);

        await LoginPage.logout()

        await expect(await LoginPage.userNameDropdown.isDisplayed()).toBeFalsy();
        await expect(await LoginPage.navbarRight.getText()).toEqual('Přihlásit');
    });
});











/* const username = 'da-app.admin@czechitas.cz';

async function openRegistrationPage() {
    await browser.reloadSession();
    await browser.url('/registrace');
}

function getNameField() {
    return $('#name');
}

function getEmailField() {
    return $('#email');
}

function getPasswordField() {
    return $('#password');
}

function getPasswConfirmField() {
    return $('#password-confirm');
}

function getSubmitButton() {
    return $('.btn-primary');
}

function getToast() {
    return $('.toast-message');
}

function getFieldError() {
    return $('.invalid-feedback');
}

function getHeader() {
    return $('h1').getText();
}
function userNameDropdown () {
    return $('.navbar-right').$('[data-toggle="dropdown"]');
}


describe('Homework', async () => {
    beforeEach(async () => {
       await openRegistrationPage();
    });
    
        
    it('should show login form', async () => {
        //kontrola registračního formuláře
        const nameInput = await getNameField();
        await expect(nameInput).toBeExisting();
        await expect(nameInput).toBeEnabled();
        
        const emailField = await getEmailField();
        await expect(emailField).toBeExisting();
        await expect(emailField).toBeEnabled();

        const passwordInput =  await getPasswordField();
        await expect(passwordInput).toBeExisting();
        await expect(passwordInput).toBeEnabled();
                
        const passwConfirmInput =  await getPasswConfirmField();
        await expect(passwConfirmInput).toBeExisting();
        await expect(passwConfirmInput).toBeEnabled();

        const submitButton =  await getSubmitButton();
        await expect(submitButton).toHaveText('Zaregistrovat','Registrovat');
        await expect(submitButton).toBeClickable();
    });


    it('valid registration', async () => {
                // vyplní formulář
                await getNameField().setValue('jajinek');
                await getEmailField().setValue('jajinek32@seznam.cz');
                await getPasswordField().setValue('Jajinek,123');
                await getPasswConfirmField().setValue('Jajinek,123');
                await getSubmitButton().click();
                await browser.pause(2000);
                
                // kontrola přesměrování z registrační stránky
                await expect(await getHeader()).toEqual('Přihlášky');
                await expect(await userNameDropdown()).toHaveTextContaining(['jajinek','Jajinek']);
    });

    it('registration with existing email', async () =>{
        //vyplní existující email
        await getNameField().setValue('jajinek');
        await getEmailField().setValue(username);
        await getPasswordField().setValue('Jajinek,123');
        await getPasswConfirmField().setValue('Jajinek,123');
        await getSubmitButton().click();

        // kontrola - neproběhne registace/přesměrování
        await expect(await getHeader()).toEqual('Registrace');

        // kontrola chybových hlášek
        await expect(getToast()).toBeDisplayed();
        await expect(getToast()).toHaveTextContaining('špatně')
        await expect(getFieldError()).toBeDisplayed();
        await expect(getFieldError()).toHaveTextContaining(['email','emailem']);

    }),
    it('registration with invalid password', async () =>{
        
        // vyplní špatné heslo (pouze číslice)
        await getNameField().setValue('jajinek');
        await getEmailField().setValue('jajinek22@seznam.cz');
        await getPasswordField().setValue('123');
        await getPasswConfirmField().setValue('123');
        await getSubmitButton().click();

        
        // kontrola, že neproběhne registrace/přesměrování        
        await expect(await getHeader()).toEqual('Registrace');
        
        // kontrola chybových hlášek
        await expect(await getToast()).toBeDisplayed();
        await expect(await getToast()).toHaveTextContaining(['špatně','Špatně'])
        await expect(await getFieldError()).toBeDisplayed();
        await expect(await getFieldError()).toHaveTextContaining(['heslo','Heslo']);


    });

});
 */