import React, { createContext, useContext, useState } from "react";

type LoadingContextType = {
    isLoading: boolean;
    setLoading(state: boolean): void;
}

interface LoadingContextProviderType {
    children: React.ReactNode
}

export const LoadingContext = createContext<LoadingContextType>(
    {} as LoadingContextType
);

export const LoadingContextProvider = ({
    children
}: LoadingContextProviderType) => {
    const [isLoading, setIsLoading] = useState(false);

    const setLoading = (state: boolean) => {
        setIsLoading(state)
    }
    return (
        <LoadingContext.Provider
            value={
                {
                    isLoading,
                    setLoading
                }
            }
        >
            {children}
        </LoadingContext.Provider>
    )
}

export function useLoading(): LoadingContextType {
    const context = useContext(LoadingContext);

    return context;
}