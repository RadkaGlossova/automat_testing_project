import {username, password, expectedApplicationsPageRows, searchText} from '../../specs/fixtures.js'
import ApplicationsPage from '../../pageobjects/applications.page.js'
import LoginPage from '../../pageobjects/login.page.js';
import AppPage from '../../pageobjects/app.page.js';

describe('Applications Page', async () => {
    beforeEach( async () => {
        
        await LoginPage.open();
        await LoginPage.login(username,password);

         
        // přechod na stránku s kurzy
        await ApplicationsPage.open();

    });

        it('should show table', async () => {

        // kontrola nadpisu stránky
        await expect (await ApplicationsPage.getTitle()).toMatch('Přihlášky');

        // čeká na načtení tabulky
        await ApplicationsPage.waitForTableToLoad();

        // výpis přihlášených kurzů
        const rows = await ApplicationsPage.getRows();
        await expect (rows.length).toEqual(expectedApplicationsPageRows)

        for (const row of rows){
            const cols = await row.$$('td');
                 expect(cols[0]).toHaveText(/[a-zA-Z]{3,}/);
                 expect(cols[1]).toHaveText(/(Python|JavaScript|Automatizované testování)/);
                 expect(cols[2]).toHaveText(/(\d{2}.\d{2}.\d{4}|\d{2}.\d{2}. - \d{2}.\d{2}.\d{4})/);
                 expect(cols[3]).toHaveText(/\d{1,3}(| \d{0,3}) Kč/);;
    }
  
    });

    it('should filter the table', async () => {
          // kontrola nadpisu stránky
          await expect (await ApplicationsPage.getTitle()).toMatch('Přihlášky');

          // čeká na načtení tabulky
          await ApplicationsPage.waitForTableToLoad();
        
        // počet řádků
        const unfilteredRows = await ApplicationsPage.getRows();
      
        // Filtrování tabulky
        await ApplicationsPage.searchInTable(searchText);

        const filteredRows = await ApplicationsPage.getRows();

        // kontrola, že je vyfiltrováno méně řádků než před filtrováním
        await expect (filteredRows.length).toBeLessThanOrEqual(unfilteredRows.length);


      //!!! bug v chromedriver, zkusit později !!!

          // kontrola, že zobrazuje pouze řádky s filtrovanou frází
        for (const filteredRow of filteredRows) {
            const cols = await filteredRow.$$('td');
            await expect(cols[0]).toHaveTextContaining(searchText);
        }

    

});
});
