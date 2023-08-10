import {customerFirstName, customerLastName, customerUserName, customerPassword, loggedUser} from '../../test/specs/fixtures.js'
describe('Demoqa Login Page', async () => {

    beforeEach (async() =>
    { 
        await browser.url('/');
    });

    it('should open login page', async () => {
        await browser.url('/login')
        await browser.saveScreenshot('login_page.png');

        const title = await $('h2');
        await expect (await title.getText()).toContain('Welcome,');

        const customerUserNameField =  await $('input[id="userName"]');
        await expect(customerUserNameField).toBeDisplayed();
        await expect(customerUserNameField).toBeEnabled();

        const customerPasswordField = await $('input[id="password"]');
        await expect(customerPasswordField).toBeDisplayed();
        await expect(customerPasswordField).toBeEnabled();

        const loginButton = await $('#login');
        await expect(loginButton).toBeClickable();

        const newUserButton = await $('#newUser');
        await expect(newUserButton).toBeClickable();
        
    });
        
       

    it('should register new customer', async () => {
        await browser.url('/register')
        const headline = $('.main-header')
        await expect (await headline.getText()).toEqual('Register');
        const customerFirstNameField =  await $('input[id="firstname"]');
        await customerFirstNameField.setValue(customerFirstName);
        const customerLastNameField =  await $('input[id="lastname"]');
        await customerLastNameField.setValue(customerLastName);
        const customerUserNameField =  await $('input[id="userName"]');
        await customerUserNameField.setValue(customerUserName);
        const customerPasswordField = await $('input[id="password"]');
        await customerPasswordField.setValue(customerPassword);
        await browser.pause(1000);
        
        // reCaptcha picture - don´t know how to proceed :-/
        // const registerButton =  await $('#register');
        // await registerButton.click();
        // await browser.pause(1000);
        // const currentLoggedCustomer = await $('').getText();
        // await expect (currentLoggedCustomer).toEqual(loggedCustomer);
    });

    it('should redirect to login', async () => {
        await browser.url('/register');
        const headline = $('.main-header');
        await expect (await headline.getText()).toEqual('Register');
        const redirButton = $('#gotologin');
        await expect(redirButton).toBeClickable();
        await redirButton.click();
        await expect(await headline.getText()).toEqual('Login');
    });

    it('should redirect to register', async () => {
        await browser.url('/login');
        const headline = $('.main-header');
        await expect (await headline.getText()).toEqual('Login');
        const newUserButton = $('#newUser');
        await expect(newUserButton).toBeClickable();
        await newUserButton.click();
        await expect(await headline.getText()).toEqual('Register');
    });

    it('should login and logout user with valid credentials', async () =>{
        await browser.url('/login');

        const headline = $('.main-header');
        await expect (await headline.getText()).toEqual('Login');
   
        const title = await $('h2');
        await expect (await title.getText()).toContain('Welcome,');

        const customerUserNameField =  await $('input[id="userName"]');
        await customerUserNameField.setValue(customerUserName);

        const customerPasswordField = await $('input[id="password"]');
        await customerPasswordField.setValue(customerPassword);

        const loginButton = await $('#login');
        await loginButton.click()     

        await browser.pause(1000) //poor internet connection
        
        // succesfully logged user check
        await expect (await headline.getText()).toEqual('Profile');

        const currentLoggedUser = $('#userName-value')  ;
        await expect (await currentLoggedUser.getText()).toEqual(loggedUser)

        // logout
        const logoutButton = await $('#submit');
        await expect (loginButton).toBeClickable();
        await logoutButton.click();
        await expect (await headline.getText()).toEqual('Login');

    });
});
describe('Book store', async () =>{

    beforeEach(async () =>{
        await browser.url('/login');

        const customerUserNameField =  await $('input[id="userName"]');
        await customerUserNameField.setValue(customerUserName);
        const customerPasswordField = await $('input[id="password"]');
        await customerPasswordField.setValue(customerPassword);
        const loginButton = await $('#login');
        await loginButton.click() 

    });
    afterEach(async () =>{
        await browser.url('/profile');
        const logoutButton = await $('#submit');
        // await expect (logoutButton).toBeClickable();
        await logoutButton.click();
        const headline = $('.main-header')
        await expect (await headline.getText()).toEqual('Login');
    });

    it('should go to a bookstore', async () =>{
        
        //go to the store
        const goToStoreButton = $('#gotoStore');
        await expect (goToStoreButton).toBeClickable();
        await goToStoreButton.click();
        await browser.pause(1000) //  poor internet connection     
        const headline = $('.main-header')
        await expect (await headline.getText()).toEqual('Book Store');
       

    });
    it.only('should filter list of books', async ()=>{
        // go to store
        const goToStoreButton = $('#gotoStore');
        await browser.pause(1000); //poor internent connection
        await expect (goToStoreButton).toBeClickable();
        await goToStoreButton.click();


        // filter
        const searchField = await $('input[id="searchBox"]');
        expect (searchField).toBeDisplayed;
        expect (searchField).toBeEnabled;
        const rowsPerPage = $('[aria-label="rows per page"');
        await rowsPerPage.selectByVisibleText('5 rows');
       
        // unfiltered list
        const table = await $('.rt-table').$('.rt-tbody');
        const unfilteredbookRowsCount = await table.$$('[role="row"]').length;
        

        //rows in table        
        await expect (unfilteredbookRowsCount).toEqual(5);
        console.log(await rowsPerPage.getText('option:checked'));
        console.log('počet radku - knihy: '+  unfilteredbookRowsCount);
        
        //rows in table changed 
        await rowsPerPage.selectByVisibleText('5 rows');
        await browser.pause(500);
        await expect (await unfilteredbookRowsCount).toEqual(5);
        console.log(await rowsPerPage.getText('option:checked'));
        console.log('počet radku - knihy: '+  unfilteredbookRowsCount);
        
        
        // filtered list
        const searchText = 'lea'
        await searchField.setValue(searchText);
        await browser.pause(1000);
        const filteredBookRows = await table.$$('[role="row"]');



        const filteredbookRowsCount = await table.$$('[role="row"]').length;
        console.log('počet filtrovaných knih: ' + filteredbookRowsCount);
        await expect(filteredbookRowsCount).toBeLessThanOrEqual(unfilteredbookRowsCount);
        
        

        for (const row of filteredBookRows){
            //select rows with text

            //get title of filtered book
            const cols = await row.$$('[role="gridcell"]');
            console.log(await cols[1].getText());
            //await expect(cols[1]).toHaveTextContaining(searchText, { ignoreCase: true });
        }



    });


});