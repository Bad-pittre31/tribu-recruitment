import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';

export interface CRASubmission {
    id: string;
    month: number;
    year: number;
    status: string;
    expected_days: number;
    worked_days: number;
    submitted_at: string | null;
}

export interface CRADay {
    id: string;
    cra_submission_id: string;
    day_date: string;
    day_status: string;
}

export function useCRA() {
    const { user } = useAuth();
    const [submission, setSubmission] = useState<CRASubmission | null>(null);
    const [days, setDays] = useState<CRADay[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    const fetchOrCreateCRA = useCallback(async () => {
        if (!user) return;

        // Try to fetch existing CRA for current month
        let { data: existing } = await supabase
            .from('cra_submissions')
            .select('*')
            .eq('user_id', user.id)
            .eq('month', currentMonth)
            .eq('year', currentYear)
            .single();

        // Create if not exists
        if (!existing) {
            const { data: created } = await supabase
                .from('cra_submissions')
                .insert({
                    user_id: user.id,
                    month: currentMonth,
                    year: currentYear,
                    status: 'draft',
                    expected_days: 20,
                    worked_days: 0,
                })
                .select()
                .single();
            existing = created;
        }

        if (existing) {
            setSubmission(existing as CRASubmission);

            // Fetch days
            const { data: dayData } = await supabase
                .from('cra_days')
                .select('*')
                .eq('cra_submission_id', existing.id)
                .order('day_date', { ascending: true });
            setDays((dayData as CRADay[]) || []);
        }

        setLoading(false);
    }, [user, currentMonth, currentYear]);

    useEffect(() => {
        fetchOrCreateCRA();
    }, [fetchOrCreateCRA]);

    async function toggleDay(date: string) {
        if (!submission || submission.status === 'submitted') return;

        const existingDay = days.find(d => d.day_date === date);

        if (existingDay) {
            // Toggle: worked → empty → delete
            if (existingDay.day_status === 'worked') {
                await supabase.from('cra_days').delete().eq('id', existingDay.id);
                setDays(prev => prev.filter(d => d.id !== existingDay.id));
            }
        } else {
            // Create new worked day
            const { data } = await supabase
                .from('cra_days')
                .insert({
                    cra_submission_id: submission.id,
                    day_date: date,
                    day_status: 'worked',
                })
                .select()
                .single();

            if (data) {
                setDays(prev => [...prev, data as CRADay]);
            }
        }

        // Update worked_days count
        const newCount = days.filter(d => d.day_status === 'worked' && d.day_date !== date).length +
            (existingDay ? 0 : 1);

        await supabase
            .from('cra_submissions')
            .update({ worked_days: newCount })
            .eq('id', submission.id);

        setSubmission(prev => prev ? { ...prev, worked_days: newCount } : null);
    }

    async function submitCRA() {
        if (!submission) return;
        setSubmitting(true);

        const workedCount = days.filter(d => d.day_status === 'worked').length;

        await supabase
            .from('cra_submissions')
            .update({
                status: 'submitted',
                worked_days: workedCount,
                submitted_at: new Date().toISOString(),
            })
            .eq('id', submission.id);

        setSubmission(prev => prev ? {
            ...prev,
            status: 'submitted',
            worked_days: workedCount,
            submitted_at: new Date().toISOString(),
        } : null);

        setSubmitting(false);
    }

    async function unlockCRA() {
        if (!submission || submission.status !== 'submitted') return;
        setSubmitting(true);

        await supabase
            .from('cra_submissions')
            .update({
                status: 'draft',
                submitted_at: null,
            })
            .eq('id', submission.id);

        setSubmission(prev => prev ? {
            ...prev,
            status: 'draft',
            submitted_at: null,
        } : null);

        setSubmitting(false);
    }

    return {
        submission,
        days,
        loading,
        submitting,
        currentMonth,
        currentYear,
        toggleDay,
        submitCRA,
        unlockCRA,
    };
}
