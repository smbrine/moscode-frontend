import {useState} from 'react';
import {Button, Checkbox, Input, Link, Text, useToasts} from "@geist-ui/core";
import {Phone} from "@geist-ui/icons";
import cls from './RequestForm.module.css'

function isEmailFieldValid(value) {
    const symbolsEmailRegex = /^[-+_.@a-zA-Z0-9]+$/;
    const broadEmailRegex = /^[+-_.a-zA-Z0-9]+@[-_a-zA-Z0-9]+\.[-_a-zA-Z0-9]+$/
    const strictEmailRegex = /^(?=[a-zA-Z0-9._+-]{2,}@)([a-zA-Z0-9_+-]+(?:\.[a-zA-Z0-9_+-]+)*)@(?=[a-zA-Z0-9.-]{2,}\.)([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*)\.([a-zA-Z]{2,})$/;

    if (value.length > 0) {
        if (!symbolsEmailRegex.test(value)) {
            return false
        }
        if (broadEmailRegex.test(value) && !strictEmailRegex.test(value)) {
            return false
        }
    }
    return true
}

function isEmailValid(value) {
    const strictEmailRegex = /^(?=[a-zA-Z0-9._+-]{2,}@)([a-zA-Z0-9_+-]+(?:\.[a-zA-Z0-9_+-]+)*)@(?=[a-zA-Z0-9.-]{2,}\.)([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*)\.([a-zA-Z]{2,})$/;
    const broadEmailRegex = /^[+-_.a-zA-Z0-9]+@[-_a-zA-Z0-9]+\.[-_a-zA-Z0-9]+$/
    if (broadEmailRegex.test(value)) {
        return strictEmailRegex.test(value);
    }
    return false
}

function isPhoneFieldValid(value) {
    const regex = /^[0-9-+\s()]*$/;
    let isBeginningValid = [
        value.startsWith('7'),
        value.startsWith('8'),
        value.startsWith('+') && (value.length === 1 || value[1] === '7'),
    ].some(Boolean)


    if (value.length) {

        if (!regex.test(value)) {
            return false
        }

        if (!isBeginningValid) {
            return false
        }

    }

    if (regex.test(value) && isBeginningValid && value.length >= 11) {
        let testingPhone = value.replace(/[() +-]/g, '');
        const beginningRegex = /^[78]+[0-9]*$/

        if (testingPhone.length > 11) {
            return false
        } else if (testingPhone.length < 11) {
            return true
        }

        return testingPhone.length === 11 && beginningRegex.test(testingPhone);
    }
    return true
}

function isPhoneValid(value) {
    let testingPhone = value.replace(/[() +-]/g, '');
    const beginningRegex = /^[78]+[0-9]*$/

    if (testingPhone.length !== 11) {
        return false
    }
    return beginningRegex.test(testingPhone);
}


const RequestForm = ({
                         lang,
                         setUserCredentials,
                         handleSubmit,
                     }) => {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")
    const [email, setEmail] = useState("")
    const [legalCheckbox, setLegalCheckbox] = useState(true)
    const [phoneError, setPhoneError] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [legalError, setLegalError] = useState(false)
    const {setToast} = useToasts({
        maxHeight: '150px',
        placement: 'topRight'
    })

    function handleNameChange(e) {
        let value = e.target.value
        const regex = /^[A-Za-zА-Яа-я]*$/;
        setNameError(!regex.test(value))
        setName(value);
    }

    function handlePhoneChange(e) {
        let value = e.target.value
        setPhoneError(!isPhoneFieldValid(value))
        setPhone(value);
    }

    function handleEmailChange(e) {
        let value = e.target.value
        setEmailError(!isEmailFieldValid(value))
        setEmail(value)
    }

    function handleMessageChange(e) {
        setMessage(e.target.value);
    }

    function handleNameClear(e) {
        setNameError(false)
        setName('')
    }

    function handlePhoneClear(e) {
        setPhoneError(false)
        setPhone('')
    }

    function handleEmailClear(e) {
        setEmailError(false)
        setEmail('')
    }

    function handleMessageClear(e) {
        setMessage('')
    }

    function handleLegalCheckbox(e) {
        setLegalCheckbox(!legalCheckbox)
        setLegalError(!legalError)
    }

    async function handleFormSubmit(e) {
        e.preventDefault();

        if (!legalCheckbox) {
            setLegalError(true)
            setToast(
                {
                    text: lang === 'en'
                        ? <Text p>We cannot collect your data without your consent to the <Link href={'/policy'} icon
                                                                                                color>privacy
                            policy</Link></Text>
                        :
                        <Text p>Мы не можем принять ваши данные без вашего согласия с <Link href={'/policy'} icon color>политикой
                            конфиденциальности</Link></Text>,
                    type: "error"
                }
            )
            return null
        }

        if (!email && !phone) {
            setPhoneError(true)
            setEmailError(true)
            setToast(
                {
                    text: lang === 'en'
                        ? <Text p>We cannot accept your request with neither phone number nor email provided.</Text>
                        : <Text p>Мы не можем принять Вашу заявку без номера телефона или почты</Text>,
                    type: "error"
                }
            )
            return null
        }

        if (0 < name.length && name.length < 2) {
            setNameError(true);
            setToast(
                {
                    text: lang === 'en'
                        ? <Text p>Seems like your name is either too short or too long for us!</Text>
                        :
                        <Text p>Похоже, что Ваше имя показалось нам либо слишком длинным, либо слишком коротким</Text>,
                    type: "error"
                }
            )
            return null
        }

        if (name.length > 50) {
            setNameError(true);
            setToast(
                {
                    text: lang === 'en'
                        ? <Text p>Seems like your name is either too short or too long for us!</Text>
                        :
                        <Text p>Похоже, что Ваше имя показалось нам либо слишком длинным, либо слишком коротким</Text>,
                    type: "error"
                }
            )
            return null
        }

        let phoneIsValid = isPhoneValid(phone)
        let emailIsValid = isEmailValid(email)

        if (!phoneIsValid && !emailIsValid) {
            setPhoneError(true)
            setEmailError(true)
            setToast(
                {
                    text: lang === 'en'
                        ? <Text p>We cannot accept your request with neither correct phone number nor correct email
                            provided. If you think it was a mistake, please message us at <Link href={'t.me/smbrinee'}
                                                                                                icon
                                                                                                color>telegram</Link>,
                            we will figure it out</Text>
                        : <Text p>Мы не можем принять Вашу заявку без корректного номера телефона или корректной почты.
                            Если Вы считаете, что произошла ошибка, напишите нам в <Link href={'t.me/smbrinee'} icon
                                                                                         color>telegram</Link>,
                            разберемся!</Text>,
                    type: "error",

                }
            )
            return null
        }

        const formPhone = phoneIsValid ? phone.replace(/[() +-]/g, '') : ''
        const formEmail = emailIsValid ? email : ''


        let success = await handleSubmit(name, formPhone, formEmail, message)

        if (success) {
            setToast(
                {
                    text: `Dear ${name || 'user'}, we have successfully received your credentials.`
                }
            )
            setPhone("")
            setName("")
            setMessage("")
            setEmail("")
            return null
        } else {
            setToast({
                text: lang === 'en'
                    ? `Dear ${name || 'user'}, although your data seems correct, seems like we are currently having some problems with receiving them. Please try again later.`
                    : `Уважаемый ${name || 'пользователь'}, несмотря на то, что Ваши данные скорее всего верны, похоже что на данный момент мы испытываем некоторые трудности с их получением. Попробуйте еще раз.`,
                type: 'error'
            })
        }
    }

    return (<>
        <label htmlFor={'clientForm'}><Text h3 className={cls.formHeader} >{lang === 'en' ? 'Learn more' : 'Узнать больше'}</Text></label>
        <form className={cls.requestForm} id={'clientForm'}>
            <Input
                scale={2}
                clearable
                marginBottom={"16px"}
                width={"100%"}
                placeholder={lang === 'en' ? 'Name...' : 'Имя...'}
                value={name}
                onChange={handleNameChange}
                type={nameError ? 'error' : 'secondary'}
                inputMode={'text'}
                onClearClick={handleNameClear}
                autoComplete={'name'}
                autoCapitalize={'words'}
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
                inputMode={'tel'}
                onClearClick={handlePhoneClear}
                type={phoneError ? 'error' : 'secondary'}
                autoComplete={'tel'}
            />
            <Input
                scale={2}
                clearable
                marginBottom={'16px'}
                width={"100%"}
                placeholder={'example@mxscxde.ru'}
                value={email}
                onChange={handleEmailChange}
                htmlType={'email'}
                inputMode={'email'}
                onClearClick={handleEmailClear}
                type={emailError ? 'error' : 'secondary'}
                autoComplete={'email'}
            />
            <Input
                scale={2}
                clearable
                marginBottom={'16px'}
                width={"100%"}
                placeholder={lang === 'en' ? 'Message' : 'Сообщение'}
                value={message}
                onChange={handleMessageChange}
                onClearClick={handleMessageClear}
                type={'secondary'}
            />
            <Button
                icon={<Phone/>}
                className={cls.submitButton}
                type="secondary"
                onClick={handleFormSubmit}
                htmlType={'submit'}
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
                                className={cls.policyConsentText}
                                margin={0}
                                padding={0}
                        >
                            I consent to the <Link href={'/policy'}>privacy policy</Link>
                        </Text>
                        : <Text p
                                type={legalError ? 'error' : 'default'}
                                className={cls.policyConsentText}
                                margin={0}
                                padding={0}
                        >
                            Я согласен с <Link href={'/policy'}>политикой конфиденциальности</Link>
                        </Text>
                }
            </Checkbox>
        </form>
        </>
    );
};

export default RequestForm;