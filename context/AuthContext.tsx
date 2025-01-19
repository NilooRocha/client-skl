import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import { User } from "~/types/user";
import { AuthContextType } from "~/types/auth";


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const token = Cookies.get("Authorization");
        setIsAuthenticated(!!token);
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user?.id) return;

            try {
                const response = await fetch(`http://192.168.1.58:8080/user/${user.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (!response.ok) {
                    return
                }

                const userData = await response.json();

                if (!userData) {
                    return
                }

                setUser(userData);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Error fetching user data:", error);
                return
            }
        };

        fetchUserData();
    }, [user]);


    const login = async (email: string, password: string) => {
        try {
            const response = await fetch("http://192.168.1.58:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error("Invalid email or password");
            }

            const userData = await response.json();

            if (!userData) {
                throw new Error("Invalid email or password");
            }
            setUser(userData);
            setIsAuthenticated(true);
            return userData;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const logout = async () => {
        const response = await fetch("http://192.168.1.58:8080/logout", {
            method: "POST",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Failed to logout.");
        }
        Cookies.remove("Authorization");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
