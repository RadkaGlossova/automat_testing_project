import { toast,passwFieldError,emailFieldError,newEmail,substitute,email } from '../fixtures.js';
import RegistrationPage from '../../pageobjects/registration.page.js';
import AppPage from '../../pageobjects/app.page.js';


describe('User registration', async () => {

    beforeEach(async () => {
        await AppPage.open();
    });    
        
    it.only('should show empty cart', async () => {
        await AppPage.open();
        await AppPage.goToCart();
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