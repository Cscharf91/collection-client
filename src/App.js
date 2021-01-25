import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from './modules/NavBar';
import { useEffect, useState } from 'react';
import Home from './modules/Home';
import Login from './modules/auth/Login';
import CreatePractice from './modules/practices/CreatePractice';
import Practice from './modules/practices/Practice';
import EditPractice from './modules/practices/EditPractice';
import CreateCollection from './modules/collections/CreateCollection';
import EditCollection from './modules/collections/EditCollection';
import Collection from './modules/collections/Collection';
import Practices from './modules/practices/Practices';
import Collections from './modules/collections/Collections';
import Invoice from './modules/collections/Invoice';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const currentToken = JSON.parse(localStorage.getItem('token'));
    if (currentUser) setUser(currentUser);
    if (currentToken) setToken(currentToken);
  }, []);

  const logOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
    window.location = "/";
  }

  return (
    <Router>
      <NavBar 
        user={user}
        logOut={logOut}
      />
      <Switch>
        <Route path="/" exact
          render={props => <Home {...props}
            user={user}
          />
          }
        />
        <Route path="/login" exact
          render={props => <Login {...props}
            user={user}
            setUser={setUser}
            token={token}
            setToken={setToken}
          />
          }
        />
        <Route path="/practices" exact
          render={props => <Practices {...props}
            user={user}
            token={token}
          />
          }
        />
        <Route path="/collections" exact
          render={props => <Collections {...props}
            user={user}
            token={token}
          />
          }
        />
        <Route path="/practices/create" exact
          render={props => <CreatePractice {...props}
            user={user}
            token={token}
          />
          }
        />
        <Route path="/practices/:id" exact
          render={props => <Practice {...props}
            user={user}
            token={token}
          />
          }
        />
        <Route path="/practices/:id/edit" exact
          render={props => <EditPractice {...props}
            user={user}
            token={token}
          />
          }
        />
        <Route path="/collections/create" exact
          render={props => <CreateCollection {...props}
            user={user}
            token={token}
          />
          }
        />
        <Route path="/collections/:id" exact
          render={props => <Collection {...props}
            user={user}
            token={token}
          />
          }
        />
        <Route path="/collections/:id/edit" exact
          render={props => <EditCollection {...props}
            user={user}
            token={token}
          />
          }
        />
        <Route path="/collections/:id/invoice" exact
          render={props => <Invoice {...props}
            user={user}
            token={token}
          />
          }
        />
      </Switch>
    </Router>
  );
}

export default App;