import { useState, useEffect } from 'react';

function getWindowDimensions(divisor) {
    // const { innerWidth: width, innerHeight: height } = window;
    let screenWidth = 800 / divisor
    let screenHeight = 600 / divisor
    return {
        screenWidth,
        screenHeight
    };
}

export default function useWindowDimensions(divisor) {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions(divisor));

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}