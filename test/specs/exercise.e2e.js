import {username, password,expectedApplicationsPageRows,searchText} from './fixtures.js'

describe('Login Page', async () => {
    beforeEach(async () => {

        await browser.reloadSession();
        await browser.url('/prihlaseni');
});

    it('should show login page', async () => {

        // zjištění stavu políčka email
        const emailField = $('#email');
        expect(emailField).toBeEnabled();
        expect(emailField).toBeDisplayed();

        // zjištění stavu políčka password
        const passwordField = $('#password');
        expect(passwordField).toBeEnabled();
        expect(passwordField).toBeDisabled();

        // výpis textu tlačítka na přihlášení
        const loginButton = $('.btn-primary');
        expect(loginButton).toBeClickable();
        expect(await loginButton.getText()).toEqual('Přihlásit');

        
        // výpis atributu href odkazu a zapomenuté heslo
        const link = $('form').$('a').getAttribute('href');
        console.log('Forgot password? link: ' + await link);
       
        // kontrola - nelze přihlásit bez vyplnění formuláře
        await loginButton.click();
        const title = await $('h1');
        expect(await title.getText()).toEqual('Přihlášení');
    });

        it('should not login - incorrect password', async () => {
            const emailField = $('#email');
            const passwordField = $('#password');
            const loginButton = $('.btn-primary');

        // přihlášení - správný email, špatné heslo
        await emailField.setValue(username);
        await passwordField.setValue('123');
        await loginButton.click();  

        const title = await $('h1').getText();
        const errorMessage = await $('.toast-message').getText();
       
        expect(await errorMessage.toLowerCase()).toHaveTextContaining(['špatně','špatné']);
        expect(title).toEqual('Přihlášení');

        // odkaz na zapomenuté heslo
        const forgottenPasswButton = $('.btn-link');
        expect (forgottenPasswButton).toBeClickable();
        await forgottenPasswButton.click();
        expect (await $('h1').getText()).toMatch('Zapomenuté heslo');

    });

    it('should login', async () => {
        // přihlášení - správné údaje
        const emailField = $('#email');
        const passwordField = $('#password');
        const loginButton = $('.btn-primary');

        await emailField.setValue(username);
        await passwordField.setValue(password);
        await loginButton.click();

        // Vypiš jméno přihlášeného uživatele
        const currentUser = $('.navbar-right').$('strong');
        expect(await currentUser.getText()).toHaveTextContaining(['Admin','Lišák']);
        console.log(await currentUser);

    });
    it('should logout', async () => {
        // přihlášení
    const emailField = $('#email');
    const passwordField = $('#password');
    const loginButton = $('.btn-primary');

    await emailField.setValue(username);
    await passwordField.setValue(password);
    await loginButton.click();
        
         //odhlášení
     await $('.dropdown-toggle').click(); 
     await $('#logout-link').click();
         const logoutUser = $('.navbar-right').$('.nav-item');
         expect(await logoutUser.getText()).toEqual('Přihlásit')
         console.log(await logoutUser.getText());   
 });

});
    
describe('Applications Page', async () => {
    beforeEach( async () => {
        
        await browser.reloadSession();
        await browser.url('/prihlaseni');
          
        //přihlášení
        const emailField = $('#email');
        const passwordField = $('#password');
        const loginButton = $('.btn-primary');

        await emailField.setValue(username);
        await passwordField.setValue(password);
        await loginButton.click();


    });

        it('should show table', async () => {
       
        // přechod na stránku s kurzy
        await $('=Přihlášky').click();
        await browser.pause(1000);

        // kontrola nadpisu stránky
        expect (await $('h1').getText()).toMatch('Přihlášky');

        // výpis přihlášených kurzů
        const rows = await $('.dataTable').$('tbody').$$('tr');
        expect (rows.length).toEqual(expectedApplicationsPageRows)

        for (const row of rows){
            const cols = await row.$$('td');
                 expect(cols[0]).toHaveText(/[a-zA-Z]{3,}/);
                 expect(cols[1]).toHaveText(/(Python|JavaScript|Automatizované testování)/);
                 expect(cols[2]).toHaveText(/(\d{2}.\d{2}.\d{4}|\d{2}.\d{2}. - \d{2}.\d{2}.\d{4})/);
                 expect(cols[3]).toHaveText(/\d{1,3}(| \d{0,3}) Kč/);;
    }
  
    });

    it('should filter the table', async () => {
      
        // přechod na stránku s kurzy
        await $('=Přihlášky').click();
        await browser.pause(1000);
        
        // počet řádků
        const rows = await $('.dataTable').$('tbody').$$('tr');
      
        // Filtrování tabulky
        await $('input[type="search"]').setValue(searchText);
        await browser.pause(1000);
        await $('#DataTables_Table_0_processing').waitForDisplayed({ reverse: true });

        const filteredRows = await $('.dataTable').$('tbody').$$('tr')

        // kontrola, že je vyfiltrováno méně řádků než před filtrováním
        expect (filteredRows.length).toBeLessThan(rows.length);

        // kontrola, že zobrazuje pouze řádky s filtrovanou frází
        for (const filteredRow of filteredRows) {
            const cols = await filteredRow.$$('td');
            expect(cols[0]).toHaveTextContaining(searchText);
        }
     });

      
});