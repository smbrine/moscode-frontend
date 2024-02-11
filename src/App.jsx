import {CssBaseline, GeistProvider} from '@geist-ui/core';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import React, {useEffect, useState} from "react";
import HomeView from "./views/HomeView.jsx";
import CustomHeader from "./components/CustomHeader.jsx";
import ContactsView from "./views/ContactsView.jsx";
import {getTabNamesByLang} from "./services/localizationService.js";
import './App.css'
import PolicyView from "./views/PolicyView.jsx";

function App() {
    const [themeType, setThemeType] = useState('dark');
    const [lang, setLang] = useState("")
    const [tabNames, setTabNames] = useState(["Главная", "Портфолио", "Контакты"])
    const [tabs, setTabs] = useState([
        {
            location: '/',
            exactLocation: false,
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
        },
        {
            location: "/policy",
            exactLocation: false,
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
        if (localStorage.getItem('preferredLang')) {
            setLang(localStorage.getItem('preferredLang'))
        } else {
            switch (navigator.language) {
                case "en-US":
                    setLang("en")
                    break;
                default:
                    setLang("ru")
            }
        }
    }, [])

    useEffect(() => {
        document.title = lang === 'en' ? 'MosCode studio' : 'МосКод - студия'
    }, [lang]);

    return (
        <GeistProvider
            themeType={themeType}
        >
            <CssBaseline/>
            <Router>
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
            </Router>
        </GeistProvider>
    )
}

export default App
