import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import SessionContext from '../../contexts/SessionContext';
import { TabInlineContent, TabInlineWrapper } from './Tabs.styles';

const WelcomeTab = () => {
    const {isAuthenticated} = useContext(SessionContext);
    const user = {
        name:'Ece Nur Battal'
    }
    return (
        <TabInlineWrapper>
            <TabInlineContent >
                {isAuthenticated&&`Sayın ${user.name},`} JoyWorld'e Hoşgeldiniz.</TabInlineContent>
            {!isAuthenticated&& (
            <TabInlineContent>
                Çizgi roman dünyasına dalmak, kitaplar hakkında bilgi edinmek, JoyWorld'de yer alan ürünlere göz atmak, satın almak veya satış yapmak için
                <Link to="/register"> BİZE KATILIN</Link> 
            </TabInlineContent>
            )}
        </TabInlineWrapper>
    )
}

export default WelcomeTab