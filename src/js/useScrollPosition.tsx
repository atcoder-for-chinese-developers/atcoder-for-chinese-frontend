import { useEffect, useState } from "react";

export function useScrollPosition() {
    const [scrollPosition, setScrollPosition] = useState<number>(window.pageYOffset);

    useEffect(() => {
        function handleScroll() {
            setScrollPosition(window.pageYOffset);
        }

        window.addEventListener("scroll", handleScroll);

        return () => { window.removeEventListener("scroll", handleScroll); };
    }, [])

    return scrollPosition;
}
