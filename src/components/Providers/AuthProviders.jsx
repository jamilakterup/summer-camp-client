import {createContext, useEffect, useState} from "react";
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from "firebase/auth";
import app from "../../firebase/firebase.config";
import {GoogleAuthProvider} from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProviders = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signUpWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const signUpUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const updateUser = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    };

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    };

    const logOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            // axios post
            if (currentUser) {
                axios.post('http://localhost:5000/jwt', {email: currentUser.email})
                    .then(data => {
                        console.log(data.data.token)
                        localStorage.setItem('access-token', data.data.token);
                        setLoading(false);
                    })
            } else {
                localStorage.removeItem('access-token');
            }
            setLoading(false);
        })
        return () => {
            return unsubscribe();
        }
    }, [])



    const authInfo = {
        user,
        loading,
        setLoading,
        signUpUser,
        signInUser,
        logOutUser,
        updateUser,
        signUpWithGoogle
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;