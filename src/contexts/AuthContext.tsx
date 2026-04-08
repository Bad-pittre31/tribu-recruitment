import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { User, Session } from '@supabase/supabase-js';

interface Profile {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    account_status: string;
}

interface AuthContextType {
    user: User | null;
    session: Session | null;
    profile: Profile | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<{ error: string | null }>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch profile for a given user
    async function fetchProfile(userId: string) {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();
            
            if (error) {
                console.warn('Profile fetch error:', error);
                setProfile(null);
            } else {
                setProfile(data as Profile | null);
            }
        } catch (err) {
            console.error('Unexpected profile fetch error:', err);
            setProfile(null);
        }
    }

    useEffect(() => {
        let isMounted = true;

        // Safety valve: never show infinite loading beyond 8 seconds
        const safetyTimeout = setTimeout(() => {
            if (isMounted) {
                console.warn('Auth safety timeout triggered — forcing loading=false');
                setLoading(false);
            }
        }, 8000);

        // fetchProfile is called WITHOUT await in the auth critical path.
        // A slow/failed profile query must never block the auth state from resolving.
        function fetchProfileBackground(userId: string) {
            Promise.resolve(
                supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', userId)
                    .single()
            ).then(({ data, error }) => {
                if (!isMounted) return;
                if (error) {
                    console.warn('Profile fetch error:', error);
                    setProfile(null);
                } else {
                    setProfile(data as Profile | null);
                }
            }).catch((err) => {
                console.error('Unexpected profile fetch error:', err);
                if (isMounted) setProfile(null);
            });
        }

        // onAuthStateChange is the single source of truth for session.
        // Supabase v2 fires INITIAL_SESSION immediately, replacing the need for getSession().
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, s) => {
                if (!isMounted) return;

                setSession(s);
                setUser(s?.user ?? null);

                if (s?.user) {
                    // Kick off profile fetch in the background — do NOT await
                    fetchProfileBackground(s.user.id);
                } else {
                    setProfile(null);
                }

                // Auth state is known — clear loading and the safety timeout
                clearTimeout(safetyTimeout);
                setLoading(false);
            }
        );

        return () => {
            isMounted = false;
            clearTimeout(safetyTimeout);
            subscription.unsubscribe();
        };
    }, []);

    async function signIn(email: string, password: string) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return { error: error?.message ?? null };
    }

    async function signOut() {
        await supabase.auth.signOut();
        setProfile(null);
    }

    return (
        <AuthContext.Provider value={{ user, session, profile, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
