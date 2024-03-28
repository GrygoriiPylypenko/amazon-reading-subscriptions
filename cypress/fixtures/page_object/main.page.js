class MainPage {
  get titleRecipeSelector() {
    return '[data-cy="title-recipe"]';
  }

  get selectReadForFreeButton() {
    return cy.get('#upsell-button');
  }

  get selectSignInButton() {
    return cy.get('#a-autoid-0-announce');
  }

  get productTitle() {
    return cy.get('#title').children('span').first();
  }

  get productDetails() {
    return cy.get('#detailBullets_feature_div');
  }

  get selectKindleUnlimitedEligibleCheckBox() {
    return cy.get('[aria-label="Kindle Unlimited Eligible"]').find('input[type="checkbox"]');
  }

  searchResultLocator(searchResultNumber = 1) {
    return cy.get(`[data-cel-widget="search_result_${searchResultNumber}"]`);
  }

  /**
   *
   * @param {number} searchResultNumber- Specify search result on page 1-16
   * @returns Search Result Element by number
   */
  selectBookFromSearchResult(searchResultNumber = 1) {
    return this.searchResultLocator(searchResultNumber).find(this.titleRecipeSelector).find('span').first();
  }

  /**
   *
   * @param {number} searchResultNumber- Specify search result on page 1-16
   * @returns Book search result data
   * This method stores ASIN and book Title from search result
   */
  assignBookInSearchResultData(searchResultNumber = 1) {
    const result = {};
    return this.searchResultLocator(searchResultNumber).then($result => {
      result.asin = $result.attr('data-asin');
      cy.wrap($result)
        .find(this.titleRecipeSelector)
        .find('span')
        .first()
        .invoke('text')
        .then($text => {
          result.title = $text;
          return result;
        });
    });
  }

  /**
   *
   * @param {number} starsCount - The number of stars given by the customer 1-4 & Up
   */
  selectCustomerReviewStars(starsCount = 3) {
    if (starsCount >= 1 && starsCount <= 4) {
      cy.get('#reviewsRefinements').find(`[aria-label="${starsCount} Stars & Up"]`).click();
    } else {
      cy.log(`Stars count must be from 1 to 4, your input ${starsCount} is invalid`);
    }
  }
}
export default new MainPage();
