import {
    collection,
    query,
    orderBy,
    onSnapshot,
    where,
    Query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import type { Post } from "../types/Post";

const useFetchDocuments = (docCollection: string, search?: string | null, uid?: string | null) => {
    const [documents, setDocuments] = useState<Post[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);

        const collectionRef = collection(db, docCollection);
        let q: Query;

        if (search) {
            q = query(
                collectionRef,
                where("tagsArray", "array-contains", search),
                orderBy("createdAt", "desc")
            );
        } else if (uid) {
            q = query(
                collectionRef,
                where("uid", "==", uid),
                orderBy("createdAt", "desc")
            );
        } else {
            q = query(collectionRef, orderBy("createdAt", "desc"));
        }

        const unsubscribe = onSnapshot(
            q,
            (querySnapshot) => {
                const results = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...(doc.data() as Omit<Post, "id">),
                }));

                setDocuments(results);
                setLoading(false);
            }, (err) => {
                setError(err.message);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [docCollection, search, uid]);

    return { documents, loading, error };
};

export default useFetchDocuments;