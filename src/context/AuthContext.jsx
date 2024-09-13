import React , { createContext,useEffect , useContext , useState} from 'react';

const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [currentUser , setCurrentUser] = useState(() => {
         const savedUser = localStorage.getItem('currentUser');
         return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        if(currentUser){
            localStorage.setItem('currentUser',JSON.stringify(currentUser));
            console.log("Userss",currentUser)
        }else{
            localStorage.removeItem('currentUser');
        }
    },[currentUser])

    const login = (user) => {
        console.log("User",user)
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