import {Text, User} from "@geist-ui/core";

const ContactsList = ({lang, themeType, listOfContacts, style}) => {
    return (
        <div style={style}>
            {listOfContacts.map((contact, key) => (
                <User
                    src={contact.image}
                    name={contact.name}
                    style={{
                        margin: '8px 0 0 8px',
                        padding: '8px 0 8px 8px',
                        minWidth: "150px",
                        border: themeType === 'dark' ? '1px solid white' : '1px solid black',
                        borderRadius: '8px',
                        width: '40%'
                    }}
                    key={key}
                    altText={'profile-pic'}
                >
                    <div>
                        <Text margin={0}>{contact.role}</Text>
                        <User.Link href={contact.url}>{contact.username}</User.Link>
                    </div>
                </User>
            ))}
        </div>
    );
};

export default ContactsList;