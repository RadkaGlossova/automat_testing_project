class AppPage {

    
    get toast() { return $('.toast-message'); }
    get title() {return $('h1');}
    get toast() {return $('.toast-message');}
    get currentUser() {return $('.navbar-right').$('strong');}
    get logoutDropdownToggle() {return $('.dropdown-toggle');}
    get logoutButton() {return $('#logout-link');}
    get loggedOutUser () {return $('.navbar-right').$('.nav-item');}

    async open() {
        await browser.url('/');
    }
    
    async getFieldError() {
        return await this.fieldError.getText();
    }
    async getToastMessage() {
        return await this.toast.getText();
    }
    async getTitle(){
        return await this.title.getText();
    }
    async logout(){
        await this.logoutDropdownToggle.click(); 
        await this.logoutButton.click();
    }
    async getCurrentUser(){
        return await this.currentUser.getText();
    }

}

export default AppPage;