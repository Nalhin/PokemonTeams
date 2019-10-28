import * as React from 'react';
import PokemonModelViewer from '../PokemonModelViewer';
import { cleanup, fireEvent, render } from '@testing-library/react';

const mockConfigureViewer = jest.fn();
const mockLoadModel = jest.fn();
const mockAnimate = jest.fn();
const mockAppendToContainer = jest.fn();
const mockRemoveFromContainer = jest.fn();
const mockHandleResize = jest.fn();

jest.mock('../ModelViewer', () => {
  return jest.fn().mockImplementation(() => {
    return {
      configureViewer: mockConfigureViewer,
      loadModel: mockLoadModel,
      animate: mockAnimate,
      appendToContainer: mockAppendToContainer,
      removeFromContainer: mockRemoveFromContainer,
      handleResize: mockHandleResize,
    };
  });
});

const props = {
  id: '1',
  isLoadingDisabled: false,
};

describe('PokemonModelViewer', () => {
  beforeEach(() => {
    cleanup();
    mockConfigureViewer.mockClear();
    mockLoadModel.mockClear();
    mockAnimate.mockClear();
    mockAppendToContainer.mockClear();
    mockRemoveFromContainer.mockClear();
    mockHandleResize.mockClear();
  });

  it('Should display loading', () => {
    const { getByTestId } = render(<PokemonModelViewer {...props} />);

    const loadingSpinner = getByTestId('loading-spinner');

    expect(loadingSpinner).toBeTruthy();
  });

  it('Should not display loading', () => {
    const { queryByTestId } = render(
      <PokemonModelViewer {...props} isLoadingDisabled={true} />,
    );

    const loadingSpinner = queryByTestId('loading-spinner');

    expect(loadingSpinner).toBeFalsy();
  });

  it('Should call ModelViewer methods correctly', () => {
    render(<PokemonModelViewer {...props} />);

    expect(mockConfigureViewer).toHaveBeenCalledTimes(1);
    expect(mockAppendToContainer).toHaveBeenCalledTimes(1);
    expect(mockRemoveFromContainer).toHaveBeenCalledTimes(0);
  });

  it('Should unmount properly', () => {
    const { unmount } = render(<PokemonModelViewer {...props} />);

    unmount();

    expect(mockRemoveFromContainer).toHaveBeenCalledTimes(1);
  });

  it('Should call handleResize on resize', () => {
    render(<PokemonModelViewer {...props} />);

    fireEvent(window, new Event('resize'));

    expect(mockHandleResize).toHaveBeenCalledTimes(1);
  });
});
