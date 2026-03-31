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

        async function initializeAuth() {
            try {
                const { data: { session: s }, error } = await supabase.auth.getSession();
                
                if (error) throw error;

                if (isMounted) {
                    setSession(s);
                    setUser(s?.user ?? null);
                    if (s?.user) {
                        await fetchProfile(s.user.id);
                    }
                }
            } catch (err) {
                console.error("Supabase getSession error:", err);
                if (isMounted) {
                    setUser(null);
                    setSession(null);
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        initializeAuth();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, s) => {
                try {
                    if (!isMounted) return;
                    
                    setSession(s);
                    setUser(s?.user ?? null);
                    
                    if (s?.user) {
                        await fetchProfile(s.user.id);
                    } else {
                        setProfile(null);
                    }
                } catch (err) {
                    console.error("Auth state change error:", err);
                } finally {
                    if (isMounted) setLoading(false);
                }
            }
        );

        return () => {
            isMounted = false;
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
