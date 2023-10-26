import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When(/I visit the homepage/, () => {
  cy.visit('/');
});

Then(/I should see a message/, () => {
  cy.get('body').should('contain', 'Hello!');
});
