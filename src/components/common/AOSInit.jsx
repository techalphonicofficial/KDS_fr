"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSInit() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false, // animate multiple times while scrolling
            easing: "ease-in-out",
            delay: 100,
            offset: 120,
        });
    }, []);

    return null;
}
