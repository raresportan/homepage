import React from "react"

function useLocalStorage(key, defaultValue = '') {
    const [state, setState] = React.useState(
        () => (typeof window !== 'undefined' && window.localStorage.getItem(key)) || defaultValue,
    )

    React.useEffect(() => {
        state !== defaultValue && typeof window !== 'undefined' && window.localStorage.setItem(key, state)
    }, [key, state, defaultValue])

    return [state, setState]
}

export default useLocalStorage;