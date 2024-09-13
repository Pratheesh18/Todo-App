import React , { createContext , useContext , useState} from 'react';

const AuthContext = createContext();


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

    const isAuthenticated = !!currentUser;

    return(
        <AuthContext.Provider value={{currentUser,isAuthenticated,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
};



export const useAuth = () => useContext(AuthContext);