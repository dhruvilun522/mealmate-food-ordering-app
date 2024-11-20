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
import MyOrders from './screens/Myorders';



function App() {
  return (
    <Cartprovider>

    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/createuser' element={<Signup/>} />
          <Route exact path='/My-Orders' element={<MyOrders/>}/>
        </Routes>
      </div>
    </Router>
    </Cartprovider>

  );
}

export default App;
