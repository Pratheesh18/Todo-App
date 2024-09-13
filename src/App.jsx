import { BrowserRouter as Router , Routes , Route,Navigate } from 'react-router-dom';
import { AuthProvider} from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Register from './components/Register';
import Todo from './components/Todo/Todo';
import './App.css';


function App() {
  return (
    <>
       <AuthProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/todo' element={ <Todo /> } />
            <Route path="*" element={<Navigate to="/register" />} />
          </Routes>
        </Router>
        <ToastContainer hideProgressBar={true} autoClose={2000} position='bottom-right' />
       </AuthProvider>
    </>
  )
}

export default App
