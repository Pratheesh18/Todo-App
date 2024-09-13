import { BrowserRouter as Router , Routes , Route,Navigate } from 'react-router-dom';
import { AuthProvider} from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Todo from './components/Todo/Todo';


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
       </AuthProvider>
    </>
  )
}

export default App
