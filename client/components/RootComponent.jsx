import React  from 'react';
import ReactDOM  from 'react-dom';
import { Provider } from 'react-redux';
import Store from '../../imports/client/store/store';
import FactorApp from '../../imports/client/components/FactorApp';

const AppRoot = React.createClass({
  render: () => {return (
    <div>
      <Provider store={Store}>
          <FactorApp/>
      </Provider>
    </div>
  )}
});

Meteor.startup(()=> {
    ReactDOM.render(
        <AppRoot />,
        document.getElementById('app')
    );
});


