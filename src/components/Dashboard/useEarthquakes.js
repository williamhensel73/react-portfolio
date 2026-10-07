import { useState, useEffect, useCallback } from 'react';

export const USGS_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

const useEarthquakes = () => {
    // 4 useState lines: data, loading, error, reloadKey
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        // controller + reset loading/error
        const controller = new AbortController();
        setLoading(true);
        setError(null);

        const fetchEarthquakes = async () => {
            try {
                // fetch → ok check → json → setData → setLoading(false)
                const response = await fetch(USGS_URL, { signal: controller.signal });
                if (!response.ok) {
                    throw new Error('Failed to fetch earthquakes');
                }
                const data = await response.json();
                setData(data);
                setLoading(false);
            } catch (error) {
                if (error.name === 'AbortError') {
                    return;
                }
                setError(error);
                setLoading(false);
            }
        };
        fetchEarthquakes();
        return () => controller.abort();
    }, [reloadKey]);

    const refetch = useCallback(() => setReloadKey(k => k + 1), []);
    return { data, loading, error, refetch };
};
export default useEarthquakes;
