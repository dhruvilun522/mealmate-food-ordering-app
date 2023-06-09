import './App.css';
import Home from './screens/Home'
import Login from './screens/Login'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Signup from './screens/Signup';
import { Cartprovider } from './components/Contextreducer';


function App() {
  return (
    <Cartprovider>

    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/createuser' element={<Signup/>} />
        </Routes>
      </div>
    </Router>
    </Cartprovider>

  );
}

export default App;
