// CheckUserContext.js
import { createContext, useContext, useState } from 'react';

const CheckUserContext = createContext();

export const useCheckUser = () => {
    return useContext(CheckUserContext);
};

export const CheckUserProvider = ({ children }) => {
    const [checkUser, setCheckuser] = useState(false);

    return (
        <CheckUserContext.Provider value={{ checkUser, setCheckuser }}>
            {children}
        </CheckUserContext.Provider>
    );
};
