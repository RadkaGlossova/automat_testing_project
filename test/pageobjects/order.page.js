import AppPage from '../../test/pageobjects/app.page.js' 
import { ico, substitute, email, contact, tel, start_date_1, end_date_1 } from '../specs/fixtures.js'

;

class OrderPage extends AppPage{
    constructor() {
        super();
        this.url = '/';
    }


    get orderForm() {return $('form');}
    get formTitle() {return $('h3');}
    get formIco() {return $('#ico');}
    get formClient() {return $('#client');}
    get formAddress() {return $('#address');}
    get formSubstitute() {return $('#substitute');}
    get formContact() {return $('#contact_name');}
    get formTel() {return $('#contact_tel');}
    get formEmail() {return $('#contact_mail');}
    get fomrStartDate1() {return $('#start_date_1');}
    get formEndDate1() {return $('#end_date_1');}
    get formChoice() {return $('*=Příměstský tábor');}
    get formChoice2() {return $('*=Škola v přírodě');}
   // get selectBox() {return $$('#camp-date_part').$('[name="xdata[date_part]"]');}
    get studentsCount() {return $('#camp-students');}
    get studentsAge() {return $('#camp-age');} 
    get campAdults() {return $('#camp-adults');} 

    async open() {
        await browser.reloadSession();
        await browser.url(this.url);
        await $('*=Pro učitelé').click();
        // .dropdown-toggle[href="https://team8-2022brno.herokuapp.com/pro-ucitele"]
        await $('*=Objednávka pro MŠ/ZŠ').click();
    }      

    async getFormTitle(){
        return await this.formTitle.getText();
    }

    async fillIco(){
        await this.formIco.setValue(ico);
        await browser.keys('Enter');
       
    }

    async fillForm(){
        await (this.formSubstitute).setValue(substitute);
        await (this.formContact).setValue(contact);
        await (this.formEmail).setValue(email);
        await (this.formTel).setValue(tel);
        await (this.fomrStartDate1).setValue(start_date_1);
        await (this.formEndDate1).setValue(end_date_1);
    }

    async selectForenoon(){
    const selectBox = await $('#camp-date_part');
    console.log(await selectBox.getText('option:checked'));
    await selectBox.selectByVisibleText('Dopolední');
    }
    

    async selectAfternoon(){
    const selectBox = await $('#camp-date_part');
    console.log(await selectBox.getText('option:checked'));
    await selectBox.selectByVisibleText('Odpolední');
    }


}
export default new OrderPage();
