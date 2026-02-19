import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

interface AuthState {
    user: User | null;
    session: Session | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    imageFxCookies: string | null;
    initialize: () => Promise<void>;
    logout: () => Promise<void>;
    setImageFxCookies: (cookies: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    session: null,
    isAuthenticated: false,
    isLoading: true,
    imageFxCookies: localStorage.getItem('imageFxCookies'),

    initialize: async () => {
        set({ isLoading: true });

        // Check active session
        const { data: { session } } = await supabase.auth.getSession();

        set({
            user: session?.user ?? null,
            session: session,
            isAuthenticated: !!session,
            isLoading: false
        });

        // Listen for auth changes
        supabase.auth.onAuthStateChange((_event, session) => {
            set({
                user: session?.user ?? null,
                session: session,
                isAuthenticated: !!session,
                isLoading: false
            });
        });
    },

    logout: async () => {
        await supabase.auth.signOut();
        localStorage.removeItem('imageFxCookies');
        set({ user: null, session: null, isAuthenticated: false, imageFxCookies: null });
    },

    setImageFxCookies: (cookies: string) => {
        localStorage.setItem('imageFxCookies', cookies);
        set({ imageFxCookies: cookies });
    },
}));
