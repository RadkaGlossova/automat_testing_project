describe('Homework', async () => {
    beforeEach(async () => {
        await browser.reloadSession();
        await browser.url('/registrace');
    });

        
    it('should show login form', async () => {
        const emailField = $('#email');
        console.log('Email field is displayed: ' + await emailField.isDisplayed());
        console.log('Email field is enabled: ' + await emailField.isEnabled());

                
        const nameInput = $('#email');
        console.log('Name input field is displayed: ' + await nameInput.isDisplayed());
        console.log('Name input field is enabled: ' + await nameInput.isEnabled());

        const passwordInput =  $('#password');
        console.log('Password input field is displayed: ' + await passwordInput.isDisplayed());
        console.log('Password input field is enabled: ' + await passwordInput.isEnabled());
                
        const passwConfirmInput =  $('#password-confirm');
        console.log('Password-confirm input field displayed: ' + await passwConfirmInput.isDisplayed());
        console.log('Password-confirm input field is enabled: ' + await passwConfirmInput.isEnabled());

        const submitButton =  $('.btn-primary');
        console.log('Submit button clicable: ' + await submitButton.isClickable());

    });
    it('valid registration', async () => {

                const nameInput = await $('#name');
                const emailInput = await $('#email');
                const passwordInput = await $('#password');
                const passwConfirmInput = await $('#password-confirm');
                const submitButton = await $('.btn-primary');

                await nameInput.setValue('jajinek');
                await emailInput.setValue('jajinek6@seznam.cz');
                await passwordInput.setValue('Jajinek,123');
                await passwConfirmInput.setValue('Jajinek,123');
                await submitButton.click();

                await browser.pause(2000);

                const nadpis = await $('h1').getText();
                console.log(nadpis);
        
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

        const toastTitle = await $('.toast-title').getText();
        const toastMessage = await $('.toast-message').getText();
        const emailError = await $('.invalid-feedback').getText();

        const nadpis = await $('h1').getText();

        console.log(nadpis)
        console.log(toastTitle);
        console.log(toastMessage);
        console.log(emailError);


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

        const toastTitle = await $('.toast-title').getText();
        const toastMessage = await $('.toast-message').getText();
        const PasswordError = await $('.invalid-feedback').getText();

        const nadpis = await $('h1').getText();

        console.log(nadpis)
        console.log(toastTitle);
        console.log(toastMessage);
        console.log(PasswordError);


    });

});
