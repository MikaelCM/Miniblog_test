import { updateDoc, doc } from "firebase/firestore";
import { useEffect, useReducer, useRef } from "react";
import { db } from "../firebase/config";
import type { Post } from "../types/Post";

type UpdateState = {
    loading: boolean;
    error: string | null;
};

type UpdateAction =
    | { type: "LOADING" }
    | { type: "UPDATED_DOC" }
    | { type: "ERROR"; payload: string }
    ;

const initialState = {
    loading: false,
    error: null,
};

const updateReducer = (state: UpdateState, action: UpdateAction) => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null };

        case "UPDATED_DOC":
            return { loading: false, error: null }

        case "ERROR":
            return { loading: false, error: action.payload }

        default:
            return state;
    };
};

export const useUpdateDocument = (docCollection: string) => {
    const [response, dispatch] = useReducer(updateReducer, initialState);

    // Deal with memory leak
    const isCancelled = useRef(false);

    useEffect(() => {
        return () => {
            isCancelled.current = true;
        };
    }, []);

    const updateDocument = async (id: string, data: Partial<Post>) => {
        if (isCancelled.current) return;

        dispatch({ type: "LOADING" });

        try {
            const docRef = doc(db, docCollection, id);
            await updateDoc(docRef, data);

            if (!isCancelled.current) {
                dispatch({ type: "UPDATED_DOC" });
            }
        } catch (error) {
            if (
                error instanceof Error &&
                !isCancelled.current
            ) {
                dispatch({
                    type: "ERROR",
                    payload: error.message,
                });
            }
        }
    };

    return { updateDocument, response };
};
