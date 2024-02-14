import {useEffect, useState} from 'react';
import {Text} from "@geist-ui/core";
import RequestForm from "../components/RequestForm.jsx";

import ContactsList from "../components/ContactsList.jsx"
import {sendContacts} from "../services/contactsService.js";

const ContactsView = ({lang, themeType}) => {
    const [contacts, setContacts] = useState([
        {
            name: lang === 'en' ? "Daniil" : "Даниил",
            image: themeType === 'dark' ? '/user-profile-white.svg' : '/user-profile-black.svg',
            url: "https://t.me/u314d0or",
            role: lang === 'en' ? 'Manager' : 'Менеджер',
            username: '@u314d0or'
        },
        {
            name: lang === 'en' ? "Nick" : "Николай",
            image: themeType === 'dark' ? '/user-profile-white.svg' : '/user-profile-black.svg',
            url: "https://t.me/smbrinee",
            role: lang === 'en' ? 'Tech lead' : 'Техлид',
            username: '@smbrinee'
        },
    ])
    const [userCredentials, setUserCredentials] = useState({})


    useEffect(() => {
        setContacts([
            {
                name: lang === 'en' ? "Daniil" : "Даниил",
                image: themeType === 'dark' ? '/user-profile-white.svg' : '/user-profile-black.svg',
                url: "https://t.me/u314d0or",
                role: lang === 'en' ? 'Manager' : 'Менеджер',
                username: '@u314d0or'
            },
            {
                name: lang === 'en' ? "Nick" : "Николай",
                image: themeType === 'dark' ? '/user-profile-white.svg' : '/user-profile-black.svg',
                url: "https://t.me/smbrinee",
                role: lang === 'en' ? 'Tech lead' : 'Техлид',
                username: '@smbrinee'
            },
        ])
    }, [lang]);

    return (
        <div style={{textAlign: "center"}}>
            <Text
                h2
                style={{fontSize: '36px'}}
            >
                {lang === 'en' ? 'Contacts' : 'Контакты'}</Text>
            <RequestForm
                lang={lang}
                setUserCredentials={setUserCredentials}
                handleSubmit={sendContacts}
            />
                <ContactsList
                    lang={lang}
                    themeType={themeType}
                    listOfContacts={contacts}
                    style={{width: '90vw', margin: '16px auto', maxWidth: '660px', minWidth: '370px'}}
                />
        </div>
    );
};

export default ContactsView;