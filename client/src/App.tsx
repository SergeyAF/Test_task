import React, { useEffect } from 'react';
import './App.scss';
import TickerDashboard from './components/TickerDashboard/TickerDashboard';
import NavBar from './components/navBar/navBar';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { thunkGetData } from './store/actions/thunks';
import { useAppDispatch } from './hooks/useAppDispatch';
import socket from './socket';
import { Redirect, Route, Switch } from 'react-router-dom';
import TickerInfo from './components/TickerInfo/TickerInfo';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, connected } = useSelector(
    (state: RootState) => state.commonReducer,
  );

  useEffect(() => {
    dispatch(thunkGetData());

    return () => {
      socket.disconnect();
    };
  }, [error]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="App">
      {connected ? (
        <div className="connected">Server Connected</div>
      ) : (
        <div className="disconnected">Server Disconnected</div>
      )}
      {error ? <div className="error">Error: {error}</div> : null}
      <NavBar className="navBar" />
      <TickerDashboard className="dash" />
      <div className="content">
        <Switch>
          <Route exact path="/" component={TickerInfo} />
          <Route path="/:id" component={TickerInfo} />
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
};

export default App;
