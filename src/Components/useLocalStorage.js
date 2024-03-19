import { useState, useEffect } from "react";

export function useLocalStorage(initialState, key) {
    const [value, setValue] = useState(function () {
        const storedData = localStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : initialState;
    });

    useEffect(
        function () {
            localStorage.setItem(key, JSON.stringify(value));
        },
        [value, setValue, key]
    );

    return { value, setValue };
}
