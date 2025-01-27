export const changeQueryParams = (
    searchParams: URLSearchParams, params: object
): URLSearchParams => {
    /**
     * @params object with key-value pairs what we set in query string
     */

        // Create a new URLSearchParams object based on the current searchParams
    const newSearchParams = new URLSearchParams(searchParams);

    // Iterate over the key-value pairs and set them in the newSearchParams
    Object.entries(params).forEach(([key, value]) => {
        newSearchParams.set(key, value);
    });

    // Update the search parameters in the URL
    return newSearchParams
};


export const deleteQueryParams = (
    searchParams: URLSearchParams, keys: string[]
): URLSearchParams => {
    /**
     * @keys array with query param keys to delete
     */

        // Create a new URLSearchParams object based on the current searchParams
    const newSearchParams = new URLSearchParams(searchParams);

    for (const key of keys) {
        newSearchParams.delete(key);
    }

    return newSearchParams
};