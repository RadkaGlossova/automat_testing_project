class AppPage {

    
    get toast() { return $('.toast-message');}
    get title() {return $('h1');}
    get currentUser() {return $('.navbar-right').$('strong');}
    get logoutDropdownToggle() {return $('.dropdown-toggle');}
    get logoutButton() {return $('#logout-link');}
    get loggedOutUser () {return $('.navbar-right').$('.nav-item');}

    get fieldError() { return $('.invalid-feedback'); }


    async open() {
        await browser.url('/');
    }
    
    async getFieldError() {
        return await this.fieldError.getText();
    }
    async getToastMessage() {
        return await this.toast.getText();
    }
    async getFieldError() {
        return await this.fieldError.getText();
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