import { mount } from 'cypress/vue';
import AddReview from '@/components/AddReview.vue';
import { createTestingPinia } from '@pinia/testing';
import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    addReview: {
      ratingLabel: 'Your rating',
      commentLabel: 'Your comment',
      commentPlaceholder: 'Type your comment...',
      uploadPhoto: 'Upload a photo',
      submitButton: 'Submit',
      fileTooLarge: 'File is too large!',
    },
  },
};

describe('AddReview', () => {
  it('renders correctly and submits when valid', () => {
    const onClose = cy.spy().as('onClose');
    const onSubmit = cy.spy().as('onSubmit');

    mount(AddReview, {
      props: {
        show: true,
        userName: '小明',
        userAvatar: 'https://example.com/avatar.jpg',
        onClose,
        onSubmit,
      },
      global: {
        plugins: [
          createTestingPinia({ createSpy: cy.spy }),
          createI18n({
            legacy: false,
            locale: 'en',
            messages,
          }),
        ],
      },
    });

    cy.get('textarea').type('測試評論');
    cy.get('[data-testid=star-3]').click();
    cy.get('[data-testid=star-3]').should('have.class', 'text-yellow-400');

    cy.contains('Submit').click();

    cy.get('@onSubmit').should('have.been.calledOnce');
    cy.get('@onClose').should('have.been.calledOnce');
  });
});
