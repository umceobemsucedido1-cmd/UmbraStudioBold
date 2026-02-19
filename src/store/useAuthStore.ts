import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';

interface AuthState {
    user: User | null;
    session: Session | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    initialize: () => Promise<void>;
    signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    session: null,
    isAuthenticated: false,
    isLoading: true,

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

    signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null, session: null, isAuthenticated: false });
    },
}));
