import React from "react";
import api from '../utils/axios';
export const AuthContext = React.createContext({
    
}); 
export const AuthProvider = ({ children }) => { 
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }, []);
    const login = async (email, password) => {
        try {
            const {data}=await api.post('/auth/login', { email, password });
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            localStorage.setItem('token', data.token);
            return data;
        } catch (error) {
            console.error('Error saving user data to localStorage:', error);
        }
    };
    const register = async (name, email, password) => { 
        try {   
            const {data} = await api.post('/auth/register', { name, email, password });
            return data;    
        } catch (error) {

            console.error('Error registering user:', error);
        }
    }   

    const verifyOTP = async (email, otp) => {
        try {
            const {data} = await api.post('/auth/verify-otp', { email, otp });
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            return data;
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }
    
    return (
        <AuthContext.Provider value={{ user, setUser, login, verifyOTP, loading, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};