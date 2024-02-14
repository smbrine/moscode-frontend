import {Text} from "@geist-ui/core";

const PortfolioView = ({lang}) => {
    return (
        <div style={{textAlign: "center"}}>
            <Text h2
                  style={{fontSize: '36px'}}
            >
                {lang === 'en' ? 'Portfolio' : 'Портфолио'}
            </Text>
            <Text style={{margin: `0 auto`, maxWidth: `min(80vw, 570px)`, textAlign: 'left'}}>
                Bacon ipsum dolor amet biltong cupim landjaeger pork belly chicken, cow doner shankle prosciutto. Kevin salami beef burgdoggen boudin tail ribeye hamburger fatback. Short loin tongue t-bone pork loin landjaeger porchetta. Beef ribs pork belly tail jerky ground round kielbasa pork chop turkey shankle sirloin corned beef sausage biltong rump.

                Hamburger tail salami spare ribs filet mignon chicken. Spare ribs t-bone buffalo cow sausage turducken ham boudin. Andouille prosciutto bresaola hamburger tenderloin landjaeger buffalo leberkas shankle. Strip steak fatback alcatra shoulder pork belly filet mignon tail boudin bacon bresaola tri-tip.

                Chicken doner alcatra fatback leberkas cupim shankle prosciutto beef ribs. Brisket prosciutto fatback drumstick turducken shankle. Ham hock pork loin shankle, meatball ground round picanha pancetta jowl porchetta. Pig cow andouille t-bone short ribs buffalo leberkas rump bacon jowl fatback. Doner turducken leberkas short ribs strip steak corned beef bacon cow pork belly.

                Bacon jowl leberkas, doner chicken venison landjaeger. Tenderloin buffalo sirloin, chislic hamburger shank pig tail burgdoggen rump chuck biltong landjaeger drumstick bacon. Pastrami swine pork loin, capicola jowl corned beef ribeye landjaeger sirloin pork chop alcatra prosciutto buffalo beef ribs pancetta. Venison buffalo pork belly ham cow bacon beef chicken boudin swine short loin filet mignon pork chop ribeye chuck. Ribeye shoulder beef ribs kevin jowl capicola fatback ball tip. Chuck pastrami shank, strip steak turkey ham bacon corned beef ribeye. Brisket kielbasa tenderloin pork loin pastrami.

                Porchetta chuck salami beef ribs venison landjaeger ham hock. Frankfurter chislic t-bone chuck ground round tail. Ham hock short loin buffalo picanha, swine alcatra doner venison. Kevin pork burgdoggen buffalo jerky strip steak. Pork pig prosciutto strip steak chuck beef chislic spare ribs shoulder jerky short ribs shankle. Pig tongue drumstick, leberkas landjaeger chicken shankle short ribs turducken tenderloin alcatra chuck strip steak andouille. Chislic cupim spare ribs, t-bone short ribs picanha burgdoggen boudin beef ribs flank ground round drumstick doner ribeye ball tip.

                Does your lorem ipsum text long for something a little meatier? Give our generator a try… it’s tasty!
            </Text>
        </div>
    );
};

export default PortfolioView;