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
        if (!user) {
            setLoading(false);
            return;
        }

        try {
            // Use upsert to handle race conditions (avoids 409 Conflict)
            const { data: upserted, error: upsertError } = await supabase
                .from('cra_submissions')
                .upsert({
                    user_id: user.id,
                    month: currentMonth,
                    year: currentYear,
                    status: 'draft',
                    expected_days: 20,
                    // worked_days: 0, // Don't reset if it already exists
                }, {
                    onConflict: 'user_id, month, year',
                    ignoreDuplicates: false // We want the data back
                })
                .select()
                .single();

            if (upsertError) throw upsertError;
            let existing = upserted;

            if (existing) {
                setSubmission(existing as CRASubmission);

                // Fetch days
                const { data: dayData, error: daysError } = await supabase
                    .from('cra_days')
                    .select('*')
                    .eq('cra_submission_id', existing.id)
                    .order('day_date', { ascending: true });
                
                if (daysError) throw daysError;
                setDays((dayData as CRADay[]) || []);
            }
        } catch (err) {
            console.error('CRA fetch/create error:', err);
        } finally {
            setLoading(false);
        }
    }, [user, currentMonth, currentYear]);

    useEffect(() => {
        fetchOrCreateCRA();
    }, [fetchOrCreateCRA]);

    async function toggleDay(date: string) {
        if (!submission || submission.status === 'submitted') return;

        try {
            const existingDay = days.find(d => d.day_date === date);
            let nextDays = [...days];

            if (existingDay) {
                // Toggle: worked → delete
                if (existingDay.day_status === 'worked') {
                    const { error } = await supabase.from('cra_days').delete().eq('id', existingDay.id);
                    if (error) throw error;
                    nextDays = days.filter(d => d.id !== existingDay.id);
                    setDays(nextDays);
                }
            } else {
                // Create new worked day
                const { data, error } = await supabase
                    .from('cra_days')
                    .insert({
                        cra_submission_id: submission.id,
                        day_date: date,
                        day_status: 'worked',
                    })
                    .select()
                    .single();

                if (error) throw error;
                if (data) {
                    nextDays = [...days, data as CRADay];
                    setDays(nextDays);
                }
            }

            // Update worked_days count based on latest state
            const workedCount = nextDays.filter(d => d.day_status === 'worked').length;
            
            const { error: subError } = await supabase
                .from('cra_submissions')
                .update({ worked_days: workedCount })
                .eq('id', submission.id);
            
            if (subError) throw subError;
            setSubmission(prev => prev ? { ...prev, worked_days: workedCount } : null);

        } catch (err) {
            console.error('Error toggling day:', err);
        }
    }

    async function submitCRA() {
        if (!submission) return;
        setSubmitting(true);

        try {
            const workedCount = days.filter(d => d.day_status === 'worked').length;

            // 1. Update database
            const { error: updateError } = await supabase
                .from('cra_submissions')
                .update({
                    status: 'submitted',
                    worked_days: workedCount,
                    submitted_at: new Date().toISOString(),
                })
                .eq('id', submission.id);

            if (updateError) throw updateError;

            // 2. Trigger Email Automation (Edge Function)
            console.log('Invoking email automation for submission:', submission.id);
            const { data, error: functionError } = await supabase.functions.invoke('send-cra-submission-email', {
                body: { submissionId: submission.id }
            });

            if (functionError) {
                console.error('Edge Function Invocation Error:', functionError);
            } else if (data && data.error) {
                console.error('Edge Function Logic Error:', data.error);
            } else {
                console.log('Email automation triggered successfully:', data);
            }

            setSubmission(prev => prev ? {
                ...prev,
                status: 'submitted',
                worked_days: workedCount,
                submitted_at: new Date().toISOString(),
            } : null);

        } catch (err) {
            console.error('Error submitting CRA:', err);
        } finally {
            setSubmitting(false);
        }
    }

    async function unlockCRA() {
        if (!submission || submission.status !== 'submitted') return;
        setSubmitting(true);

        try {
            const { error } = await supabase
                .from('cra_submissions')
                .update({
                    status: 'draft',
                    submitted_at: null,
                })
                .eq('id', submission.id);

            if (error) throw error;

            setSubmission(prev => prev ? {
                ...prev,
                status: 'draft',
                submitted_at: null,
            } : null);
        } catch (err) {
            console.error('Error unlocking CRA:', err);
        } finally {
            setSubmitting(false);
        }
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
