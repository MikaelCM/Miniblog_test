import { doc, getDoc, type DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';

interface UseFetchDocumentReturn {
    document: DocumentData | null;
    loading: boolean;
    error: string | null;
}

const useFetchDocument = (docCollection: string, id: string | undefined): UseFetchDocumentReturn => {
    const [document, setDocument] = useState<DocumentData | null>(null);
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // Deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        const loadDocument = async () => {
            if (cancelled) return;

            if (!id) return;

            setLoading(true);

            try {

                const docRef = doc(db, docCollection, id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setDocument(docSnap.data());
                } else {
                    setError("Documento não encontrado");
                };

                setLoading(false);

            } catch (error) {
                if (error instanceof Error) {
                    console.log(error);
                    setError(error.message);

                    setLoading(false);
                }
            }

        }

        loadDocument();
    }, [docCollection, id, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { document, loading, error };
}

export default useFetchDocument