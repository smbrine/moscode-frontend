export async function getTabNamesByLang(lang) {
    switch (lang) {
        case "ru":
            return ["Главная", "Портфолио", "Контакты"]
        default:
            return ['Main', 'Portfolio', 'Contacts']
    }
}

export async function getAvailableLangs() {
    return [
        {
            value: "en",
            name: "Eng"
        },
        {
            value: "ru",
            name: "Рус"
        }
    ]

}