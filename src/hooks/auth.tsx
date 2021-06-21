import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useEffect } from 'react';
import { database } from '../database';
import { User as UserModel } from '../database/model/User';
import { api } from '../services/api';

interface User {
    id: string;
    user_id: string;
    email: string;
    name: string;
    driver_license: string;
    avatar: string;
    token: string;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    loading: boolean;
    user: User;
    signIn: (credentials: SignInCredentials) => Promise<void>;
    signOut: () => Promise<void>;
    updateUser: (user: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
    children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<User>({} as User);

    async function signIn({ email, password }: SignInCredentials) {
        try {
            const response = await api.post('/sessions', { email, password });
            const { token, user } = response.data;
            api.defaults.headers.authorization = `Bearer ${token}`;

            const userCollection = database.get<UserModel>('users');
            await database.action(async () => {
                await userCollection.create((newUser) => {
                    newUser.user_id = user.id;
                    newUser.name = user.name;
                    newUser.email = user.email;
                    newUser.avatar = user.avatar;
                    newUser.token = token;
                });
            });

            setData({ ...user, token });
        } catch (error) {
            throw new Error(error);
        }
    }

    async function signOut() {
        try {
            const userCollection = database.get<UserModel>('users');
            await database.action(async () => {
                const userSelected = await userCollection.find(data.id);
                await userSelected.destroyPermanently();
            });
            setData({} as User);
        } catch (error) {
            throw new Error(error);
        }
    }

    async function updateUser(user: User) {
        try {
            const userCollection = database.get<UserModel>('users');
            await database.action(async () => {
                const userSelected = await userCollection.find(data.id);
                await userSelected.update((userData) => {
                    userData.name = user.name;
                    userData.driver_license = user.driver_license;
                    userData.avatar = user.avatar;
                });
            });
        } catch (error) {
            console.log(error);

            throw new Error(error);
        }
    }

    useEffect(() => {
        async function loadUserData() {
            const userCollection = database.get<UserModel>('users');
            const response = await userCollection.query().fetch();
            if (response.length > 0) {
                const userData = response[0]._raw as unknown as User;
                api.defaults.headers.authorization = `Bearer ${userData.token}`;
                setData(userData);
            }
            setLoading(false);
        }
        loadUserData();
    }, []);

    return (
        <AuthContext.Provider value={{ loading, user: data, signIn, signOut, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };
