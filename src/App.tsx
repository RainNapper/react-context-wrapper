import React, { useContext } from 'react';
import ContextWrapper from './ContextWrapper';
import LoadingSplash from './LoadingSplash';
import { userContext, userReducer } from './userContext';

const App = () => {
  return (
    <div className="App">
      <ContextWrapper
        context={userContext}
        reducer={userReducer}
        loadingBuilder={() => <LoadingSplash />}
        childrenBuilder={() => <Home />}
        initialStateBuilder={async () => {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          return {
            user: "user@website.com",
            settings: {
              setting1: false,
              setting2: "abc"
            }
          }
        }}
      />
    </div>
  );
}

const Home = () => {
  const { state, dispatch } = useContext(userContext)
  return <div>
    <div>
      Hello {state.user}
    </div>
    <div>
      Settings:
      <ul>
        <li>setting1: {`${state.settings.setting1}`}</li>
        <li>setting2: {state.settings.setting2}</li>
      </ul>
    </div>
  </div>
}

export default App;
