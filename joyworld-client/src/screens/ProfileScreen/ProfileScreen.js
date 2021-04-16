import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import ProfileForum from '../../components/Profile/ContentSections/ProfileForum';
import ProfileGeneral from '../../components/Profile/ContentSections/ProfileGeneral';
import ProfileProducts from '../../components/Profile/ContentSections/ProfileProducts';
import ProfileUpdate from '../../components/Profile/ContentSections/ProfileUpdate';
import Profile from '../../components/Profile/Profile';
import { getUser } from '../../services/api';


const ProfileScreen = () => {
    const [activeMenuItem,setActiveMenuItem] = useState(0);
    const {username} = useParams();
    const [user,setUser] = useState({});
    const [error,setError] = useState();
    const [isLoading, setLoading] = useState(true)

    const menuItems = [
        {
            component: () => <ProfileGeneral user={user}/>,
            title:'Genel Bilgiler',
            isPrivate:false,
        },
        {
            component: () => <ProfileProducts products={user.products}/>,
            title:'Ürünler',
            isPrivate:false,
        },
        {
            component: () => <ProfileForum posts={user.posts}/>,
            title:'Forum Gönderileri',
            isPrivate:false,
        },
        {
            component: () => <ProfileUpdate currentUser={user}/>,
            title:'Bilgileri Güncelle',
            isPrivate:true,
        }
    ]

    useEffect(() => {
        const init = async () => {
            setLoading(true)
            try {
                const {data:{data}} = await getUser(username)
                console.log(data)
                setUser(data)
            } catch(err){
                setError(err)
            }
            setLoading(false)
        }
        init();
    },[username])
    
    if (isLoading||(!user&&!error)) {
        return <Loader/>
    }
    
    return (
        <div>
           <Profile
                menuItems={menuItems}
                activeIndex={activeMenuItem}
                onIndexChange={(index) => setActiveMenuItem(index)}
           />
        </div>
    )
}

export default ProfileScreen
