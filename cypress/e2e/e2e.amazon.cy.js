import MainPage from '../fixtures/page_object/main.page';
import RegisterPage from '../fixtures/page_object/register.page';
import { faker } from '@faker-js/faker';
let bookSearchData;
let customerName;
let email;
let password;

describe('End-To-End test for Amazon Reading Subscription', () => {
  before('Load data and visit HomePage', () => {
    cy.fixture('bookSearchData.json').then(data => {
      bookSearchData = data;
    });
    customerName = faker.person.fullName();
    email = faker.internet.email();
    password = faker.internet.password();
    cy.visit('/');
  });

  it('End-To-End test select first book from search result and register', () => {
    MainPage.selectSearchInputField.type('Reading subscription{enter}');
    MainPage.selectKindleUnlimitedEligibleCheckBox.check({ force: true });
    MainPage.selectCustomerReviewStars(bookSearchData.reviewStars);
    MainPage.assignBookInSearchResultData(bookSearchData.searchResult).as('bookData');
    MainPage.selectBookFromSearchResult(bookSearchData.searchResult).click();
    cy.get('@bookData').then($book => {
      MainPage.productTitle.invoke('text').then(text => {
        const trimmedText = text.trim();
        expect(trimmedText).to.eq($book.title);
      });
      MainPage.productDetails.find('span').contains($book.asin).should('exist');
    });
    MainPage.selectReadForFreeButton.click();
    MainPage.selectSignInButton.click();
    RegisterPage.selectCreateYourAmazonAccount.click();
    RegisterPage.fillCreateAccountForm(customerName, email, password).should('be.enabled');
  });
});
