class RegisterPage {  
      get selectCreateYourAmazonAccount() {
        return cy.get('#createAccountSubmit');
      }
    
      fillCreateAccountForm(customerName, email, password) {
        cy.get('#ap_customer_name').type(customerName);
        cy.get('#ap_email').type(email);
        cy.get('#ap_password').type(password);
        cy.get('#ap_password_check').type(password);
        return cy.get('#continue');
      }
}
export default new RegisterPage