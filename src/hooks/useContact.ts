import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';

export interface TribuContact {
    id: string;
    contact_name: string;
    contact_role: string;
    contact_email: string;
    contact_phone: string | null;
    calendly_url: string | null;
}

export function useContact() {
    const { user } = useAuth();
    const [contact, setContact] = useState<TribuContact | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) { setLoading(false); return; }

        async function fetch() {
            const { data } = await supabase
                .from('tribu_contacts')
                .select('*')
                .eq('user_id', user!.id)
                .limit(1)
                .single();

            setContact(data as TribuContact | null);
            setLoading(false);
        }
        fetch();
    }, [user]);

    return { contact, loading };
}
