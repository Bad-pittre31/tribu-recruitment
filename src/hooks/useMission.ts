import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';

export interface Mission {
    id: string;
    client_name: string;
    job_title: string;
    start_date: string;
    end_date: string;
    mission_daily_rate: number;
    tribu_daily_fee: number;
    mission_status: string;
    average_worked_days_per_month: number;
}

export function useMission() {
    const { user } = useAuth();
    const [mission, setMission] = useState<Mission | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) { setLoading(false); return; }

        async function fetch() {
            try {
                const { data, error } = await supabase
                    .from('missions')
                    .select('*')
                    .eq('user_id', user!.id)
                    .eq('mission_status', 'active')
                    .order('created_at', { ascending: false })
                    .limit(1)
                    .single();

                if (error && error.code !== 'PGRST116') throw error;
                setMission(data as Mission | null);
            } catch (err) {
                console.error('Fetch mission error:', err);
            } finally {
                setLoading(false);
            }
        }
        fetch();
    }, [user]);

    async function updateAvgDays(days: number) {
        if (!mission) return;
        await supabase
            .from('missions')
            .update({ average_worked_days_per_month: days })
            .eq('id', mission.id);
        setMission(prev => prev ? { ...prev, average_worked_days_per_month: days } : null);
    }

    return { mission, loading, updateAvgDays };
}
