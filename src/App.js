import './App.css';
import NavbarMain from './Components/Navbar';
import {Outlet} from 'react-router-dom'
import axios from 'axios';

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_BE_URL;
  return (
    <div className="App">
      <NavbarMain/>
      <Outlet/>
    </div>
  );
}

export default App;
