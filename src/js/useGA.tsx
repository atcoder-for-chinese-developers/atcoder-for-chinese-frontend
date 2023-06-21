import { useLocation } from "react-router-dom";
import ReactGA from 'react-ga4';
import { useEffect, useState } from "react";

export function useGA() {
    const location = useLocation();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (process.env.REACT_APP_GA && !initialized) {
            ReactGA.initialize(process.env.REACT_APP_GA as string);
            setInitialized(true);
        }
    }, [initialized]);

    useEffect(() => {
        ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search + location.hash });
    }, [initialized, location])
}