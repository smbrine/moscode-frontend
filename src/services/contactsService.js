import axios from "axios";

const apiEndpoint = import.meta.env.VITE_BACKEND_ENDPOINT || ''
export async function sendContacts (name, phone, message) {
    const form = {
        name: name || '',
        phone: phone,
        message: message || ''
    }
    console.log(form)
    let result = await axios.post(`${apiEndpoint}/api/submit-form`, form)
    console.log(result)
    return result.data
}