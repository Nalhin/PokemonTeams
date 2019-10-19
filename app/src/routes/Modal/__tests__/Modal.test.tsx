import * as React from 'react';
import Modal from '../Modal';
import { renderWithStore } from '../../../../test/utils/renderWithStore';

describe('Modal Component', () => {
  it('Should fire closeAllModal if history gets popped', () => {
    const closeAllModal = jest.fn();

    const { history } = renderWithStore(
      <Modal closeAllModal={closeAllModal} isModalOpen={true} />,
    );

    history.goBack();

    expect(closeAllModal).toHaveBeenCalledTimes(1);
  });
});
