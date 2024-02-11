import React, {useEffect, useState} from 'react';
import {Link, Select, Tabs, Text} from "@geist-ui/core";
import {Navigate} from "react-router-dom";

function itoa(i) {
    return i.toString()
}

const getValueFromHref = (arr) => {
    let ind = arr.findIndex(obj => obj.location === window.location.pathname)
    return itoa(ind === -1 ? 0 : ind);
}


const CustomHeader = ({tabs, setLang, langs, themeType, lang}) => {
    const [isWide, setIsWide] = useState(window.innerWidth > 615);
    const [isWideEnough, setIsWideEnough] = useState(window.innerWidth > 800);

    useEffect(() => {
        const handleResize = () => {
            setIsWide(window.innerWidth > 615);
            setIsWideEnough(window.innerWidth > 800);
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLangSwitch = (lng) => {
        setLang(lng)
        localStorage.setItem('preferredLang', lng)
    }

    return (
        <header style={{height: "80px", display: "flex", width: "100vw", minWidth: '370px'}}>
            <Link
                href={"/"}
                style={{
                    marginLeft: "16px", marginTop: "8px"
                }}
            >
                <img
                    alt={''}
                    src={themeType === 'light' ? '/logo_light.png' : '/logo_dark.png'}
                    style={{
                        height: "64px", width: "64px",
                        padding: 0,
                        minWidth: '64px'
                    }}
                />
            </Link>
            <Tabs
                initialValue={getValueFromHref(tabs)}
                marginTop={"16px"}
                marginLeft={"0px"}
                marginRight={"8px"}
                style={{
                    // width: "60vw",
                    minWidth: "150px",
                    // maxWidth: "300px"
                }}
            >
                {tabs.map((tab, key) => (
                    tab.showInMenu
                        ? <Tabs.Item
                            label={tab.label}
                            value={itoa(key)}
                            key={key}
                        >
                            <Navigate to={tab.location}/>
                        </Tabs.Item>
                        : null
                ))}
            </Tabs>
            {
                isWide
                    ? isWideEnough
                        ? (lang === 'en'
                                ? <Text h1 style={{
                                    textAlign: "center",
                                    position: 'absolute',
                                    left: '50%',
                                    transform: 'translateX(-50%)', // Updated for both horizontal and vertical centering
                                    margin: '0 auto'
                                }}>MosCode</Text>
                                : <Text h1 style={{
                                    textAlign: "center",
                                    position: 'absolute',
                                    left: '50%',
                                    transform: 'translateX(-50%)', // Updated for both horizontal and vertical centering
                                    margin: '0 auto'
                                }}>МосКод</Text>
                        )
                        :
                        (lang === 'en'
                                ? <Text h1 style={{ textAlign: "center", margin: '0 auto', }}>MosCode</Text>
                                : <Text h1 style={{ textAlign: "center", margin: '0 auto', }}>МосКод</Text>
                        )
                    : null
            }
            <Select
                initialValue={localStorage.getItem('preferredLang') || lang || "en"}
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