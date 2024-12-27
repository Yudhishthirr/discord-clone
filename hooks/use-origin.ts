import { useEffect, useState } from "react";

export const useOrigin = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    let origin = "";

    if (typeof window !== "undefined") {
        if (window.location.origin) {
            origin = window.location.origin;
        }
    }


    if (!mounted) return "";

    return origin;
};