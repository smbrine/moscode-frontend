import React, {useState} from 'react';
import {Button, Checkbox, Input, Link, Text} from "@geist-ui/core";
import {Phone} from "@geist-ui/icons";

const RequestForm = ({
                         lang,
                         setUserCredentials,
                         handleSubmit,

                     }) => {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")
    const [legalCheckbox, setLegalCheckbox] = useState(true)
    const [phoneError, setPhoneError] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [legalError, setLegalError] = useState(false)
    const handleNameChange = (e) => {
        let value = e.target.value
        const regex = /^[A-Za-zА-Яа-я]*$/;
        if (regex.test(value)) {
            setNameError(false)
            setName(value);
        } else {
            return null
        }
    }
    const handlePhoneChange = (e) => {
        let value = e.target.value
        const regex = /^[0-9-+\s()]*$/;


        if (regex.test(value)) {
            setPhoneError(false)
            setPhone(value);
        } else {
            return null;
        }
    }
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }

    const handleLegalCheckbox = (e) => {
        setLegalCheckbox(!legalCheckbox)
        setLegalError(false)
    }

    function handleFormSubmit(e) {
        if (!legalCheckbox) {
            setLegalError(true)
            return null
        }

        if (0 < name.length && name.length < 2) {
            setNameError(true);
            return null
        }

        const cleanedPhone = phone.replace(/[() +-]/g, '');

        if (cleanedPhone.startsWith('7') && cleanedPhone.length === 11) {
            setUserCredentials({name: name, phone: cleanedPhone, message: message});
            handleSubmit(name, phone, message)
            setPhone("")
            setName("")
            setMessage("")
        } else if (cleanedPhone.startsWith('8') && cleanedPhone.length === 11){
            let sevenPhone = cleanedPhone.replace('8', '7')
            setUserCredentials({name: name, phone: sevenPhone, message: message});
            handleSubmit(name, sevenPhone, message)
            setPhone("")
            setName("")
            setMessage("")
        }else {
            setPhoneError(true)
            return null
        }
    }

    return (
        <form style={{display: "grid", width: "90vw", maxWidth: "280px", margin: "0 auto", minWidth: '280px'}}>
            <Text h3 style={{fontSize: '24px'}}>{lang === 'en' ? 'Learn more' : 'Узнать больше'}</Text>
            <Input
                scale={2}
                clearable
                marginBottom={"16px"}
                width={"100%"}
                placeholder={lang === 'en' ? 'Name...' : 'Имя...'}
                value={name}
                onChange={handleNameChange}
                style={{zIndex: 1}}
                type={nameError ? 'error' : 'secondary'}
            />
            <Input
                scale={2}
                clearable
                marginBottom={'16px'}
                width={"100%"}
                placeholder={'+7 (999) 999-99-99'}
                value={phone}
                onChange={handlePhoneChange}
                htmlType={'tel'}
                type={phoneError ? 'error' : 'secondary'}
            />
            <Input
                scale={2}
                clearable
                marginBottom={'16px'}
                width={"100%"}
                placeholder={lang === 'en' ? 'Message' : 'Сообщение'}
                value={message}
                onChange={handleMessageChange}
                type={'secondary'}
            />
            <Button
                icon={<Phone/>}
                style={{width: '75%', margin: "0 auto"}}
                type="secondary"
                onClick={handleFormSubmit}
            >
                {lang === 'en' ? 'Submit' : 'Оставить заявку'}
            </Button>
            <Checkbox
                checked={legalCheckbox}
                onClick={handleLegalCheckbox}
                marginTop={'16px'} scale={1}
                margin={0} padding={0}
            >
                {
                    lang === 'en'
                        ? <Text p
                                type={legalError ? 'error' : 'default'}
                                style={{
                                    fontSize: '12px',
                                    // width: '150%',
                                }}
                                margin={0}
                                padding={0}
                        >
                            I consent to the <Link href={'/policy'}>privacy policy</Link>
                        </Text>
                        : <Text p
                                type={legalError ? 'error' : 'default'}
                                style={{
                                    fontSize: '12px',
                                    // width: '150%',
                                }}
                                margin={0}
                                padding={0}
                        >
                            Я согласен с <Link href={'/policy'}>политикой конфиденциальности</Link>
                        </Text>
                }
            </Checkbox>

        </form>
    );
};

export default RequestForm;