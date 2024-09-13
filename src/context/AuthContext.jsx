import React , { createContext,useEffect , useContext , useState} from 'react';

const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [currentUser , setCurrentUser] = useState(() => {
        return localStorage.getItem('currentUser') || null;
    });

    useEffect(() => {
        if(currentUser){
            localStorage.setItem('currentUser',currentUser);
        }else{
            localStorage.removeItem('currentUser');
        }
    },[currentUser])

    const login = (user) => {
        setCurrentUser(user);
    };

    const logout = () => {
        setCurrentUser(null);
    };

    

    return(
        <AuthContext.Provider value={{currentUser,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
};



export const useAuth = () => useContext(AuthContext);