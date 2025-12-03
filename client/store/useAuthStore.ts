import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: string;  
    username: string;
    email: string;
}

interface AuthState {
    token: string | null;
    user: User | null;

    // Actions
    login: (data: { token: string; user: User }) => void; // Updated to accept user as an object
    logout: () => void;
}

export const useAuthor = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,

            login: ({ token, user }) =>  // Updated parameter destructuring
                set({
                    token,
                    user,
                }),

            logout: () =>
                set({
                    token: null,
                    user: null,
                }),
        }),
        {
            name: 'auth-data', // Key for local storage
        }
    )
);
