import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import { render, getByTestId } from '@testing-library/react';
import View from '../components/';

// expect.extend({ toBeInTheDocument });

const defaultProps = {
  dispatch: ()=>{},
  state:{  
    data: null,
    type: 'user',
    apiCall: false,
    search: null,
  }
}
test('Test for search field', () => {
  const elem = render(
    <View {...defaultProps}/>
  );
  const searchElem = getByTestId('seach-bar');

  expect(searchElem).toBeInTheDocument();
});