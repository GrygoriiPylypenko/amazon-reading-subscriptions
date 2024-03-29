class SearchBar {
  get selectSearchInputField() {
    return cy.get('[name="site-search"]').find('input').first();
  }
}
export default new SearchBar();
