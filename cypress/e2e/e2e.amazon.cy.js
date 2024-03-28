import MainPage from '../fixtures/page_object/main.page';
import RegisterPage from '../fixtures/page_object/register.page';
import { faker } from '@faker-js/faker';
let customerName;
let email;
let password;

describe('End-To-End test for Amazon Reading Subscription', () => {
  before('Load faker data and visit HomePage', () => {
    customerName = faker.person.fullName();
    email = faker.internet.email();
    password = faker.internet.password();
    cy.visit('/');
  });

  it('End-To-End test select first book from search result and register', () => {
    MainPage.selectSearchInputField.type('Reading subscription{enter}');
    MainPage.selectKindleUnlimitedEligibleCheckBox.check({ force: true });
    MainPage.select4StarsAndUp.click();
    MainPage.assignFirstBookInSearchResultData.as('firstBookData');
    MainPage.selectFirstBookInSearchResult.click();
    cy.get('@firstBookData').then($firstBook => {
      MainPage.productTitle.invoke('text').then(text => {
        const trimmedText = text.trim();
        expect(trimmedText).to.eq($firstBook.title);
      });
      MainPage.productDetails.find('span').contains($firstBook.asin).should('exist');
    });
    MainPage.selectReadForFreeButton.click();
    MainPage.selectSignInButton.click();
    RegisterPage.selectCreateYourAmazonAccount.click();
    RegisterPage.fillCreateAccountForm(customerName, email, password);
  });
});
