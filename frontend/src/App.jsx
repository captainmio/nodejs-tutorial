
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/header';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
 
    <BrowserRouter>
      <Header />
      <div className="container">
        <Routes>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>

  )
}

export default App
