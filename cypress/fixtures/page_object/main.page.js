class MainPage {
  get selectSearchInputField() {
    return cy.get('#twotabsearchtextbox');
  }

  get selectKindleUnlimitedEligibleCheckBox() {
    return cy.get('#p_n_feature_nineteen_browse-bin\\/9045887011').find('input[type="checkbox"]');
  }

  get select4StarsAndUp() {
    return cy.get('#p_72\\/1248987011');
  }

  get searchResultLocator() {
    return cy.get('[data-component-type="s-search-result"]');
  }

  get titleRecipeElement() {
    return '[data-cy="title-recipe"]';
  }

  get bookFullPriceElement() {
    return '.a-offscreen';
  }

  get bookTitleElement() {
    return '.a-size-medium.a-color-base.a-text-normal';
  }

  get selectFirstBookInSearchResult() {
    return cy.get(this.bookTitleElement).first();
  }

  get assignFirstBookInSearchResultData() {
    const result = {};
    return this.searchResultLocator.first().then($result => {
      result.asin = $result.attr('data-asin');
      result.uuid = $result.attr('data-uuid');
      cy.wrap($result)
        .find(this.bookTitleElement)
        .invoke('text')
        .then($text => {
          result.title = $text;
          return result;
        });
      cy.wrap($result)
        .find(this.bookFullPriceElement)
        .invoke('text')
        .then($text => {
          result.price = $text;
          return result;
        });
    });
  }

  get selectReadForFreeButton() {
    return cy.get('#upsell-button');
  }

  get selectSignInButton() {
    return cy.get('#a-autoid-0-announce');
  }

  get productTitle() {
    return cy.get('#productTitle')
  }

  get productDetails() {
    return cy.get('#detailBullets_feature_div')
  }
}
export default new MainPage();
