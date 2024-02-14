import {useEffect, useState} from 'react';
import Cookies from 'js-cookie';

const useLanguage = (fallbackLang) => {
    const [language, setLanguage] = useState(fallbackLang);
    const tenYears = 10 * 365;
    useEffect(() => {
        const setValidLanguage = (lang) => {
            const supportedLangs = ['ru', 'en',];
            const validLang = supportedLangs.includes( lang ) ? lang : fallbackLang;
            setLanguage(validLang);

            Cookies.set('preferredLang', validLang, {expires: tenYears});
        };

        const cookieLang = Cookies.get('preferredLang');

        if (cookieLang) {
            setValidLanguage(cookieLang);
        } else if (typeof navigator !== 'undefined') {
            const browserLang = navigator.language.split('-')[0];
            setValidLanguage(browserLang);
        }
    }, [fallbackLang]);

    function expSetLanguage(lang) {
        setLanguage(lang)
        Cookies.set('preferredLang', lang, {expires: tenYears});
    }
    return [language, expSetLanguage];
};

export default useLanguage;
