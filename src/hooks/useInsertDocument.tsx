import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useEffect, useReducer, useRef } from "react";
import { db } from "../firebase/config";

type InsertState = {
    loading: boolean;
    error: string | null;
};

type InsertAction =
    | { type: "LOADING" }
    | { type: "INSERTED_DOC" }
    | { type: "ERROR"; payload: string };

const initialState = {
    loading: false,
    error: null,
};

const insertReducer = (state: InsertState, action: InsertAction): InsertState => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null };

        case "INSERTED_DOC":
            return { loading: false, error: null }

        case "ERROR":
            return { loading: false, error: action.payload }

        default:
            return state;
    };
};

export const useInsertDocument = <T extends object>(docCollection: string) => {
    const [response, dispatch] = useReducer(insertReducer, initialState);

    // Deal with memory leak
    const cancelled = useRef(false);

    const checkCancelBeforeDispatch = (action: InsertAction) => {
        if (!cancelled.current) {
            dispatch(action);
        }
    }

    const insertDocument = async (document: T) => {

        checkCancelBeforeDispatch({
            type: "LOADING",
        });

        try {
            const newDocument = { ...document, createdAt: Timestamp.now() };

            
            await addDoc(
                collection(db, docCollection), 
                newDocument
            );

            checkCancelBeforeDispatch({
                type: "INSERTED_DOC",
            });

        } catch (error) {

            if (error instanceof Error) {
                checkCancelBeforeDispatch({
                    type: "ERROR",
                    payload: error.message
                });
            };

        };
    };

    useEffect(() => {
        return () => {
            cancelled.current = true
        };
    }, [])

    return { insertDocument, response };
};