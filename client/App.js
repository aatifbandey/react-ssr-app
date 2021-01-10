
import React from 'react';

import { Provider } from 'react-redux';
import { object } from 'prop-types';

import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

import { StaticRouter } from 'react-router-dom'

import ErrorBoundary from './components/ErrorBoundary';
import ErrorView from './components/ErrorView';

import { configureStore  } from './store';

const { store } = configureStore({});
import Routes from './routes';

function App( ) {
  return (
    <Provider store={store}>
      
    		<ErrorBoundary render={() => <ErrorView />}>
   				<StaticRouter history={history}>
        			<Routes />
        		</StaticRouter>
    		</ErrorBoundary>
		
    </Provider>
  );
}

App.propTypes = {
  history: object.isRequired,
};


export default App;
