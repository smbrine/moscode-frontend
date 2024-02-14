import {useEffect, useState} from 'react';
import ContactsView from "./ContactsView.jsx";
import HomeText from "../components/HomeText.jsx";


const HomeView = ({lang, themeType}) => {
    const [screenWidth, setScreenWidth] = useState(400)
    const [isWide, setIsWide] = useState(true);

    useEffect(() => {
        setScreenWidth(window.innerWidth)
        setIsWide(screenWidth > 615)

        const handleResize = () => {
            setScreenWidth(window.innerWidth)
            setIsWide(screenWidth > 615);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [screenWidth]);

    return (
        <>
            <HomeText isWide={isWide} lang={lang}/>
            <ContactsView lang={lang} themeType={themeType}/>
            {/*<PortfolioView lang={lang} />*/}
        </>
    );
};

export default HomeView;
