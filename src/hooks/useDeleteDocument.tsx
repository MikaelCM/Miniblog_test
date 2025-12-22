import { doc, deleteDoc } from "firebase/firestore";
import { useEffect, useReducer, useRef } from "react";
import { db } from "../firebase/config";

type DeleteState = {
    loading: boolean;
    error: string | null;
};

type DeleteAction =
    | { type: "LOADING" }
    | { type: "DELETED_DOC" }
    | { type: "ERROR"; payload: string };

const initialState = {
    loading: false,
    error: null,
};

const deleteReducer = (state: DeleteState, action: DeleteAction) => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null };

        case "DELETED_DOC":
            return { loading: false, error: null }

        case "ERROR":
            return { loading: false, error: action.payload }

        default:
            return state;
    }
};

export const useDeleteDocument = (docCollection: string) => {
    const [response, dispatch] = useReducer(deleteReducer, initialState);

    // Deal with memory leak
    const cancelled = useRef(false);

    const checkCancelBeforeDispatch = (action: DeleteAction) => {
        if (!cancelled.current) {
            dispatch(action);
        };
    };

    const deleteDocument = async (id: string) => {

        checkCancelBeforeDispatch({
            type: "LOADING",
        });

        try {
            await deleteDoc(doc(db, docCollection, id));

            checkCancelBeforeDispatch({
                type: "DELETED_DOC",
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
            cancelled.current = true;
        };
    }, []);

    return { deleteDocument, response };
};