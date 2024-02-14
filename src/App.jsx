import {CssBaseline, GeistProvider, Loading, Spinner} from '@geist-ui/core';
import {Navigate, Route, Routes} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ContactsView from "./views/ContactsView.jsx";
import {getTabNamesByLang} from "./services/localizationService.js";
import useLanguage from "./hooks/useLanguage.jsx";

import CustomHeader from "./components/CustomHeader.jsx"
import PolicyView from "./views/PolicyView.jsx"
import HomeView from "./views/HomeView.jsx"

function App() {
    const [themeType, setThemeType] = useState('dark');
    const [lang, setLang] = useLanguage("")
    const [tabNames, setTabNames] = useState(["Главная", "Портфолио", "Контакты"])


    const [tabs, setTabs] = useState([
        {
            location: '/',
            exactLocation: false,
            element: <HomeView lang={lang} themeType={themeType}/>,
        },
        // {
        //     label: tabNames[1],
        //     location: "/portfolio",
        //     exactLocation: false,
        //     showInMenu: true,
        //     element: <PortfolioView lang={lang} themeType={themeType} />,
        // },
        {
            location: "/contacts",
            exactLocation: false,
            element: <ContactsView lang={lang} themeType={themeType}/>
        },
        {
            location: "/policy",
            exactLocation: false,
            element: <PolicyView lang={lang} themeType={themeType}/>
        },
    ])
    const [langs, setLangs] = useState([])

    useEffect(() => {
        setTabs([
            {
                label: tabNames[0],
                location: '/',
                exactLocation: false,
                showInMenu: true,
                element: <HomeView lang={lang} themeType={themeType}/>
            },
            // {
            //     label: tabNames[1],
            //     location: "/portfolio",
            //     exactLocation: false,
            //     showInMenu: true,
            //     element: <PortfolioView lang={lang} themeType={themeType} />,
            // },
            {
                label: tabNames[2],
                location: "/contacts",
                exactLocation: false,
                showInMenu: true,
                element: <ContactsView lang={lang} themeType={themeType}/>
            },
            {
                label: tabNames[3],
                location: "/policy",
                exactLocation: false,
                showInMenu: false,
                element: <PolicyView lang={lang} themeType={themeType}/>
            },
        ])
    }, [tabNames]);

    useEffect(() => {
        async function fetchLocalizedTabNames() {
            let result = await getTabNamesByLang(lang)
            setTabNames(result)
        }

        fetchLocalizedTabNames()
    }, [lang]);

    useEffect(() => {
        setLangs([
            {
                value: "en",
                name: "Eng"
            },
            {
                value: "ru",
                name: "Рус"
            }
        ])
    }, []);
    const setTheme = (matches) => {
        if (matches) {
            setThemeType('dark')
        } else {
            setThemeType('light')
        }
    }

    useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');

        setTheme(mq.matches)

        mq.addEventListener('change', (e) => setTheme(e.matches));
    }, []);

    useEffect(() => {
        document.title = lang === 'en' ? 'MosCode studio' : 'МосКод - студия'
    }, [lang]);

    return (
        <GeistProvider
            themeType={themeType}
        >
            <CssBaseline/>
                <CustomHeader
                    tabs={tabs}
                    setLang={setLang}
                    langs={langs}
                    themeType={themeType}
                    lang={lang}
                />
            <Routes>
                {tabs.map((tab, key) => (
                    <Route exact={tab.exactLocation} key={key} path={tab.location} element={tab.element}/>
                ))}
                <Route path='/*' element={<Navigate to={'/'}/>}/>
            </Routes>
        </GeistProvider>
    )
}

export default App
