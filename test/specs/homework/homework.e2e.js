import { toast,passwFieldError,emailFieldError,newEmail,substitute,email } from '../fixtures.js';
import RegistrationPage from '../../pageobjects/registration.page.js';


describe('User registration', async () => {

    beforeEach(async () => {
        await RegistrationPage.open();
    });    
        
    it('should show login form', async () => {
        //kontrola registračního formuláře
        await expect(RegistrationPage.userNameField).toBeExisting();
        await expect(RegistrationPage.userNameField).toBeEnabled();
        
        await expect(RegistrationPage.emailField).toBeExisting();
        await expect(RegistrationPage.emailField).toBeEnabled();

        await expect(RegistrationPage.passwordField).toBeExisting();
        await expect(RegistrationPage.passwordField).toBeEnabled();
                
        await expect(RegistrationPage.passwConfirmation).toBeExisting();
        await expect(RegistrationPage.passwConfirmation).toBeEnabled();

        await expect(RegistrationPage.registrationButton).toHaveText('Zaregistrovat','Registrovat');
        await expect(RegistrationPage.registrationButton).toBeClickable();
    });


    it('valid registration', async () => {
                // vyplní formulář, před spuštěním změnit newEmail ve fixtures
                await RegistrationPage.register(substitute,newEmail,'Jaji,nek354');
                await browser.pause(2000);
                
                // kontrola přesměrování z registrační stránky
                await expect (await RegistrationPage.getTitle()).toEqual('Přihlášky');
                await expect(await RegistrationPage.userNameDropdown).toHaveTextContaining(['jajinek','Jajinek']);
    });

    it('registration with existing email', async () =>{
        //vyplní existující email
        await RegistrationPage.register(substitute,email,'Jaji,nek456');
        await browser.pause(2000);

        // kontrola - neproběhne registace/přesměrování
        await expect(await RegistrationPage.getTitle()).toEqual('Registrace');

        // kontrola chybových hlášek
        await expect(RegistrationPage.fieldError).toBeDisplayed();
        await expect(RegistrationPage.toast).toBeDisplayed();
        await expect(await RegistrationPage.getFieldError()).toEqual(emailFieldError);
        await expect(await RegistrationPage.getToastMessage()).toEqual(toast)
    });
 
    it('registration with invalid password', async () =>{
        
        // vyplní špatné heslo (pouze číslice)
        await RegistrationPage.register(substitute,'jajinek100@seznam.cz','123');
        
        // kontrola, že neproběhne registrace/přesměrování        
        await expect(await RegistrationPage.getTitle()).toEqual('Registrace');
        
        // kontrola chybových hlášek
        await expect(RegistrationPage.fieldError).toBeDisplayed();
        await expect(RegistrationPage.toast).toBeDisplayed();
        await expect(await RegistrationPage.getFieldError()).toEqual(passwFieldError);
        await expect(await RegistrationPage.getToastMessage()).toEqual(toast)
    });

});