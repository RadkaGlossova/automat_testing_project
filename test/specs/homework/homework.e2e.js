describe('Homework', async () => {
    beforeEach(async () => {
        await browser.reloadSession();
        await browser.url('/registrace');
    });
    
        
    it('should show login form', async () => {
        const nameInput = $('#name');
        //console.log('Name input field is displayed: ' + await nameInput.isDisplayed());
        //console.log('Name input field is enabled: ' + await nameInput.isEnabled());
        await expect(nameInput).toBeExisting();
        await expect(nameInput).toBeEnabled();
        
        const emailField = $('#email');
        // console.log('Email field is displayed: ' + await emailField.isDisplayed());
        // console.log('Email field is enabled: ' + await emailField.isEnabled());
        await expect(emailField).toBeExisting();
        await expect(emailField).toBeEnabled();

        const passwordInput =  $('#password');
        //console.log('Password input field is displayed: ' + await passwordInput.isDisplayed());
        //console.log('Password input field is enabled: ' + await passwordInput.isEnabled());
        await expect(passwordInput).toBeExisting();
        await expect(passwordInput).toBeEnabled();
                
        const passwConfirmInput =  $('#password-confirm');
        //console.log('Password-confirm input field displayed: ' + await passwConfirmInput.isDisplayed());
        //console.log('Password-confirm input field is enabled: ' + await passwConfirmInput.isEnabled());
        await expect(passwConfirmInput).toBeExisting();
        await expect(passwConfirmInput).toBeEnabled();

        const submitButton =  $('.btn-primary');
        //console.log('Submit button clicable: ' + await submitButton.isClickable());
        await expect(submitButton).toHaveText('Zaregistrovat','Registrovat');
        await expect(submitButton).toBeClickable();

    });


    it('valid registration', async () => {

                const nameInput = await $('#name');
                const emailInput = await $('#email');
                const passwordInput = await $('#password');
                const passwConfirmInput = await $('#password-confirm');
                const submitButton = await $('.btn-primary');

                await nameInput.setValue('jajinek');
                await emailInput.setValue('jajinek14@seznam.cz');
                await passwordInput.setValue('Jajinek,123');
                await passwConfirmInput.setValue('Jajinek,123');
                await submitButton.click();
                await browser.pause(2000);

                const nadpis = await $('h1').getText();
                await expect(await nadpis).toEqual('Přihlášky');
                //console.log(nadpis);
        
    });

    it('registration with existing email', async () =>{
        
        const nameInput = await $('#name');
        const emailInput = await $('#email');
        const passwordInput = await $('#password');
        const passwConfirmInput = await $('#password-confirm');
        const submitButton = await $('.btn-primary');

        await nameInput.setValue('jajinek');
        await emailInput.setValue('jajinek3@seznam.cz');
        await passwordInput.setValue('Jajinek,123');
        await passwConfirmInput.setValue('Jajinek,123');
        await submitButton.click();

        const toastTitle = await $('.toast-title');
        const toastMessage = await $('.toast-message');
        const emailError = await $('.invalid-feedback');

        const nadpis = await $('h1').getText();

        await expect(nadpis).toEqual('Registrace');
        await expect(toastTitle).toBeDisplayed();
        await expect(toastTitle).toHaveTextContaining('Špatně','špatně');
        await expect(toastMessage).toBeDisplayed();
        await expect(toastMessage).toHaveTextContaining('špatně')
        await expect(emailError).toBeDisplayed();
        await expect(emailError).toHaveTextContaining('email');
        //console.log(nadpis)
        //console.log(toastTitle);
        //console.log(toastMessage);
        //console.log(emailError);


    }),
    it('registration with invalid password', async () =>{
        
        const nameInput = await $('#name');
        const emailInput = await $('#email');
        const passwordInput = await $('#password');
        const passwConfirmInput = await $('#password-confirm');
        const submitButton = await $('.btn-primary');

        await nameInput.setValue('jajinek');
        await emailInput.setValue('jajinek5@seznam.cz');
        await passwordInput.setValue('123');
        await passwConfirmInput.setValue('123');
        await submitButton.click();

        const toastTitle = await $('.toast-title');
        const toastMessage = await $('.toast-message');
        const passwordError = await $('.invalid-feedback');

        const nadpis = await $('h1').getText();

        
        await expect(nadpis).toEqual('Registrace');
        await expect(await toastTitle).toBeDisplayed();
        await expect(await toastMessage).toHaveTextContaining(['špatně','Špatně'])
        await expect(await toastMessage).toBeDisplayed();
        await expect(await toastMessage).toHaveTextContaining(['špatně','Špatně'])
        await expect(await passwordError).toBeDisplayed();
        await expect(await passwordError).toHaveTextContaining(['heslo','Heslo']);

        //console.log(nadpis)
        //console.log(toastTitle);
        //console.log(toastMessage);
        //console.log(PasswordError);


    });

});
