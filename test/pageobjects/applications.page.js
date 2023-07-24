import AppPage from '../../test/pageobjects/app.page.js' 

class ApplicationsPage extends AppPage {

    constructor() {
        super()
        this.url = '/admin/prihlasky';
    }

    get table() {return $('.datatable')};
    get rows() {return this.table.$('tbody').$$('tr');}
    get loading() {return $('#DataTables_Table_0_processing');}
    get searchInput() {return $('input[type="search"]');}

    async open() {
        await browser.url(this.url);
    }

    async waitForTableToLoad(){
        await browser.pause(1000);
        await this.loading.waitForDisplayed({reverse: true});
    }

    async searchInTable(searchText) {
        await this.searchInput.setValue(searchText);
    }

    async getTableRow(){
        await this.waitForTableToLoad();
        return this.rows;
    }
    
    async getAppButton(){
        return $('=Přihlášky')
    }
    
    async getRows(){
        return $('.dataTable').$('tbody').$$('tr')
    }
    
    

}

export default new ApplicationsPage();
