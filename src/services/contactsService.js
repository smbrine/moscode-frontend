import axios from "axios";

const apiEndpoint = import.meta.env.VITE_BACKEND_ENDPOINT || ''

export async function sendContacts(name, phone, email, message) {
    if (!phone.length && !email.length) {
        throw Error('Invalid credentials!')
    }
    const form = {
        name: name || '',
        email: email || '',
        phone: phone || '',
        message: message || '',
    }
    console.log(form)
    let result = await axios.post(`${apiEndpoint}/api/submit-form`, form).catch((e) => {
            return false
        })
        if (result) {
            return result.status.toString().startsWith('2')
        }
        return result
}