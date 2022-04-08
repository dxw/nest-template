import { Then, When } from 'cypress-cucumber-preprocessor/steps';

When(/I visit the homepage/, () => {
  cy.visit('/');
});

Then(/I should see a message/, () => {
  cy.get('body').should('contain', 'Hello!');
});
