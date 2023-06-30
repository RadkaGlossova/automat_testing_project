import LoginPage from '../../pageobjects/login.page.js'
import {username, password, ico, newOrderTitle, orderAction, orderConfirmation,} from '../../../test/specs/fixtures.js'
import AppPage from '../../pageobjects/app.page.js'
import OrderPage from '../../pageobjects/order.page.js'
import orderPage from '../../pageobjects/order.page.js';

describe('Order Page', async () => {
    beforeEach(async () => {
        await browser.reloadSession();
        await OrderPage.open();
    });

    it('should show order form', async () => {
        await expect(await OrderPage.getTitle()).toEqual(newOrderTitle);
        await expect(OrderPage.orderForm).toBeDisplayed();
        await expect(await OrderPage.getFormTitle()).toEqual(orderAction);
    });

    it('should fill in name and adress after IČO is filled', async () =>{
        await expect(await OrderPage.fillIco());
        await expect(await OrderPage.toast).toBeDisplayed();
        await expect(await OrderPage.getToastMessage()).toEqual('Data z ARESu úspěšně načtena');
        await expect(await OrderPage.formClient).toHaveValueContaining('');
        await expect(await OrderPage.formAddress).toHaveValueContaining('');
    });

    it('should not send incorrectly filled form', async () =>{
        await expect(await OrderPage.fillIco());
        await OrderPage.fillForm();
        await OrderPage.formChoice.click();      
        await OrderPage.selectAfternoon();


        await OrderPage.studentsAge.setValue('10');
        await OrderPage.studentsCount.setValue('10');


        await LoginPage.loginButton.click();
        await expect(await OrderPage.getTitle()).toEqual(newOrderTitle);
        await expect(OrderPage.orderForm).toBeDisplayed();
        await expect(await OrderPage.getFormTitle()).toEqual(orderAction);

    });

    it('should send fully filled form for forenoon course', async () =>{
        await expect(await OrderPage.fillIco());
        await OrderPage.fillForm();
        await OrderPage.formChoice.click();      
        await OrderPage.selectForenoon();


        await OrderPage.studentsAge.setValue('10');
        await OrderPage.studentsCount.setValue('10');
        await OrderPage.campAdults.setValue('2');


        await LoginPage.loginButton.click();
        await expect(await OrderPage.getFormTitle()).toEqual(orderConfirmation);
    });

    it('should send fully filled form for afternoon course', async () =>{
        await expect(await OrderPage.fillIco());
        await OrderPage.fillForm();
        await OrderPage.formChoice.click();      
        await OrderPage.selectAfternoon();


        await OrderPage.studentsAge.setValue('10');
        await OrderPage.studentsCount.setValue('10');
        await OrderPage.campAdults.setValue('2');


        await LoginPage.loginButton.click();
        await expect(await OrderPage.getFormTitle()).toEqual(orderConfirmation);
    });


});

