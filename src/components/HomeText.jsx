import {Text} from "@geist-ui/core";
import cls from './HomeText.module.css'

const HomeText = ({isWide, lang}) => {
    return (
        <div>
            {
                !isWide
                    ? <Text h1 className={cls.homeTextHeader}>{lang === 'en' ? 'MosCode' : "МосКод"}</Text>
                    : null
            }
            <Text className={cls.homeText} style={{
                margin: '0 auto',
                maxWidth: 'min(80vw, 570px)',
            }}>
                {lang === 'en'
                    ? 'We are a company that specializes in the development of websites and mobile applications. ' +
                    'We are ready to execute any project tailored to your needs, ranging from small startups to large corporations. ' +
                    'Our team is comprised of experienced professionals dedicated to delivering high-quality services. ' +
                    'We are open to bartering and pro bono work, aiming to positively impact our community and assist in business growth. ' +
                    'Please leave your contact information, and we will get in touch with you!'
                    : 'Мы — компания, специализирующаяся на разработке сайтов и мобильных приложений. ' +
                    'Готовы реализовать любой проект, адаптированный под ваши потребности, от малых стартапов до крупных корпораций. ' +
                    'Наша команда состоит из опытных профессионалов, нацеленных на предоставление высококачественных услуг. ' +
                    'Мы открыты к бартеру и работе на общественных началах, стремясь оказывать положительное влияние на наше сообщество и помогать в росте бизнеса. ' +
                    'Оставьте свои контактные данные, и мы с вами свяжемся!'
                }
            </Text>
        </div>
    );
};

export default HomeText;