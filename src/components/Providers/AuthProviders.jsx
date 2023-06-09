import {createContext, useEffect, useState} from "react";
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth";
import app from "../../firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProviders = ({children}) => {
    const [user, setUser] = useState(null);

    const signUpUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const updateUser = (user, name) => {
        return updateProfile(user, {displayName: name})
            .then(() => { })
            .catch(err => console.log(err));
    };

    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    };

    const logOutUser = () => {
        return signOut(auth);
    };


    useEffect(() => {
        onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
        })
    }, [])



    const authInfo = {
        user,
        signUpUser,
        signInUser,
        logOutUser,
        updateUser
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;