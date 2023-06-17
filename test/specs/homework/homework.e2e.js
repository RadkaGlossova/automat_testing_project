const username = 'da-app.admin@czechitas.cz';

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
