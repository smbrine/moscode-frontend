import {useEffect, useState} from 'react';
import {Select, Tabs, Text} from "@geist-ui/core";
import {Link, useLocation, useNavigate} from 'react-router-dom'
import cls from './CustomHeader.module.css'

function itoa(i) {
    return i.toString()
}

const getValueFromHref = (arr, pathname) => {
    let ind = arr.findIndex(obj => obj.location === pathname)
    return itoa(ind === -1 ? 0 : ind);
}


const CustomHeader = ({tabs, setLang, langs, themeType, lang}) => {
    const [screenWidth, setScreenWidth] = useState(0)
    const [isWide, setIsWide] = useState(false);
    const [isWideEnough, setIsWideEnough] = useState(false);
    const [tabsValue, setTabsValue] = useState(0)
    const currentLocation = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        setScreenWidth(window.innerWidth)
        setIsWide(screenWidth > 615)
        setIsWideEnough(screenWidth > 800)
        const handleResize = () => {
            setScreenWidth(window.innerWidth)
            setIsWide(screenWidth > 615);
            setIsWideEnough(screenWidth > 800)
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, [screenWidth]);

    useEffect(() => {
        setTabsValue(getValueFromHref(tabs, currentLocation.pathname))
    }, [tabs, currentLocation.pathname]);

    const handleLangSwitch = (lng) => {
        setLang(lng)
    }

    function handleLogoClick(e) {
        e.preventDefault()
        navigate('/')
    }

    function handleNavChange(e) {
        return navigate(tabs[e].location)
    }

    return (
        <header className={cls.wrapper}>
            <Link
                to={"/"}
                onClick={handleLogoClick}
                className={cls.logoLink}
            >
                <img
                    alt={'logo'}
                    src={themeType === 'light' ? '/logo_light.png' : '/logo_dark.png'}
                    className={cls.logoImg}
                />
            </Link>
            <Tabs
                initialValue={getValueFromHref(tabs, currentLocation.pathname)}
                value={tabsValue}
                marginTop={"16px"}
                marginLeft={"0px"}
                marginRight={"8px"}
                style={{
                    // width: "60vw",
                    minWidth: "150px",
                    // maxWidth: "300px"
                }}
                onChange={handleNavChange}
            >
                {tabs.map((tab, key) => (
                    tab.showInMenu
                        ? <Tabs.Item
                            label={tab.label}
                            value={itoa(key)}
                            key={key}
                        >
                        </Tabs.Item>
                        : null
                ))}
            </Tabs>
            {
                isWide
                    ? isWideEnough
                        ? (lang === 'en'
                                ? <Text h1 className={cls.headerWideEnough}>MosCode</Text>
                                : <Text h1 className={cls.headerWideEnough}>МосКод</Text>
                        )
                        :
                        (lang === 'en'
                                ? <Text h1 className={cls.headerWide}>MosCode</Text>
                                : <Text h1 className={cls.headerWide}>МосКод</Text>
                        )
                    : null
            }
            <Select
                initialValue={
                    lang
                }
                value={lang}
                onChange={handleLangSwitch}
                marginLeft={"auto"}
                marginTop={"22px"}
                marginRight={"16px"}
                width={"48px"}
                style={{minWidth: "48px"}}
                placeholder={'lang'}
            >
                {langs.map((lng, key) => (
                    <Select.Option key={key} value={lng.value}>{lng.name}</Select.Option>
                ))}
            </Select>
        </header>
    );
};

export default CustomHeader;