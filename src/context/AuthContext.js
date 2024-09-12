import React , {Children, createContext , useContext , useState} from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [currentUser , setCurrentUser] = useState(localStorage.getItem('currentUser'));

    const login = (email) => {
        setCurrentUser(email);
        localStorage.setItem('currentUser',email);
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
    };

    return(
        <AuthContext.Provider value={{currentUser,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}