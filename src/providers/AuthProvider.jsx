import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

   const createUser = (name, email, password) => {
    if (!/\S+@\S+\.\S+/.test(email)) {
        return Promise.reject(new Error('Invalid email format'));
    }

    setLoading(true);
    return createUserWithEmailAndPassword(auth,  email, password, name);
};

    const signIn = (email,password) =>{
        setLoading(true);
        console.log(email);
        return signInWithEmailAndPassword(auth,email,password)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const loggeduser = { email: currentUser.email };
                const userEmail = currentUser?.email || user?.email;
                setUser(currentUser);
                console.log('current User', currentUser);
                setLoading(false);
    
                axios.post('http://localhost:5000/jwt', loggeduser, { withCredentials: true })
                    .then((res) => {
                        console.log('token response', res.data);
                    });
            } else {
                setUser(null); // set user to null if there is no authenticated user
                setLoading(false);
                axios.post('http://localhost:5000/logout', loggeduser, {
                    withCredentials: true,
                }).then((res) => {
                    console.log(res.data);
                });
            }
        });
        return () => {
            return unSubscribe();
        };
    }, []);

    const logout = () =>{
        setLoading(true);
        return signOut(auth);
    }

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logout
    }
    return (
        <AuthContext.Provider value = {authInfo}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;