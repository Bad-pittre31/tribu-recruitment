import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';

export interface Document {
    id: string;
    document_name: string;
    document_type: string;
    file_path: string;
    file_url: string | null;
    uploaded_by: string;
    status: string;
    created_at: string;
}

export function useDocuments() {
    const { user } = useAuth();
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const fetchDocuments = useCallback(async () => {
        if (!user) {
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('documents')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            setDocuments((data as Document[]) || []);
        } catch (err) {
            console.error('Fetch documents error:', err);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchDocuments();
    }, [fetchDocuments]);

    async function uploadDocument(file: File, docType: string = 'other', missionId?: string) {
        if (!user) return;
        setUploading(true);

        const filePath = `${user.id}/${Date.now()}_${file.name}`;

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
            .from('documents')
            .upload(filePath, file);

        if (uploadError) {
            console.error('Upload error:', uploadError);
            setUploading(false);
            return;
        }

        // Get public URL (though we use download for private bucket)
        const { data: urlData } = supabase.storage
            .from('documents')
            .getPublicUrl(filePath);

        // Insert metadata row
        const { error: dbError } = await supabase.from('documents').insert({
            user_id: user.id,
            mission_id: missionId || null,
            document_name: file.name,
            document_type: docType,
            file_path: filePath,
            file_url: urlData.publicUrl,
            uploaded_by: 'freelancer',
            status: 'available',
        });

        if (dbError) {
            console.error('Database metadata error:', dbError);
        }

        await fetchDocuments();
        setUploading(false);
    }

    async function downloadDocument(doc: Document) {
        if (!doc.file_path) return;
        const { data, error } = await supabase.storage
            .from('documents')
            .download(doc.file_path);

        if (error || !data) {
            console.error('Download error:', error);
            return;
        }

        const url = URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = doc.document_name;
        a.click();
        URL.revokeObjectURL(url);
    }

    async function deleteDocument(doc: Document) {
        if (!user) return;
        // Guard: candidates can only delete their own uploads, not Tribu's
        if (doc.uploaded_by === 'tribu') return;

        try {
            // 1. Remove from Supabase Storage
            if (doc.file_path) {
                const { error: storageError } = await supabase.storage
                    .from('documents')
                    .remove([doc.file_path]);
                if (storageError) {
                    console.error('Storage delete error:', storageError);
                    // Don't abort — still try to remove the DB row
                }
            }

            // 2. Remove the metadata row from the DB
            const { error: dbError } = await supabase
                .from('documents')
                .delete()
                .eq('id', doc.id)
                .eq('user_id', user.id); // safety: only own documents

            if (dbError) {
                console.error('Database delete error:', dbError);
                return;
            }

            // 3. Refresh local state optimistically
            setDocuments((prev) => prev.filter((d) => d.id !== doc.id));
        } catch (err) {
            console.error('Delete document error:', err);
        }
    }

    return { documents, loading, uploading, uploadDocument, downloadDocument, deleteDocument };
}
