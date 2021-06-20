import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import InternalError from '../../components/Error/InternalError';
import Loader from '../../components/Loader/Loader';
import ProfileExchanges from '../../components/Profile/ContentSections/ProfileExchanges';
import ProfileForum from '../../components/Profile/ContentSections/ProfileForum';
import ProfileGeneral from '../../components/Profile/ContentSections/ProfileGeneral';
import ProfileOrders from '../../components/Profile/ContentSections/ProfileOrders';
import ProfileProducts from '../../components/Profile/ContentSections/ProfileProducts';
import ProfileUpdate from '../../components/Profile/ContentSections/ProfileUpdate';
import Profile from '../../components/Profile/Profile';
import { deleteExchange, getExchanges, getOrders, getUser, updateExchange, updateOrder, updateUser } from '../../services/api';
import { exchangeEnum, orderEnum } from '../../config/Constants';


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
            component: () => <ProfileExchanges 
                exchanges={user.exchanges} 
                onChangeStatusOP = {handleChangeStatusOP}
                onDeleteBP = {handleDeleteBP}
                onAcceptRating={handleAcceptRatingExchange}
            />,
            title:'Takas İstekleri',
            isPrivate:true,
        },
        {
            component: () => <ProfileOrders
                orders={user.orders}
                onChangeStatusRP={handleChangeStatusRP}
                onAcceptRating={handleAcceptRatingOrder}
            />,
            title:'Siparişler',
            isPrivate:true,
        },
        {
            component: () => <ProfileUpdate currentUser={user}/>,
            title:'Bilgileri Güncelle',
            isPrivate:true,
        },
    ]

    useEffect(() => {
        const init = async () => {
            setLoading(true)
            try {
                const {data:{data}} = await getUser(username)
                setUser(data)
            } catch(err){
                if(err.response.status===500) setError(err.response.status)
                else setError(err.response.data.message)
            }
            setLoading(false)
        }
        init();
    },[username])
    

    useEffect(() => {
        const init = async () => {
            setLoading(true)
            try {
                const {data:{data}} = await getExchanges(username)
                setUser(prevState => {
                    return {
                        ...prevState,
                        exchanges:data
                    }
                })
                console.log(data)
            } catch(err){
                if(err.response.status===500) setError(err.response.status)
                else setError(err.response.data.message)
            }
            setLoading(false)
        }
        init();
    },[username])

    useEffect(() => {
        const init = async () => {
            setLoading(true)
            try {
                const {data:{data}} = await getOrders(username)
                setUser(prevState => {
                    return {
                        ...prevState,
                        orders:data
                    }
                })
                console.log(data)
            } catch(err){
                if(err.response.status===500) setError(err.response.status)
                else setError(err.response.data.message)
            }
            setLoading(false)
        }
        init();
    },[username])

    const handleChangeStatusOP = async (opID,isAccept,currentStatus) => {
        let status;
        if(currentStatus===exchangeEnum.WAITING){
            status = isAccept ? exchangeEnum.ACCEPTED : exchangeEnum.DENIED
        } else if(currentStatus===exchangeEnum.ACCEPTED){
            status = isAccept ? exchangeEnum.COMPLETED : exchangeEnum.FAILED
        }
        try {
            await updateExchange(opID,{status:status})
            window.location.reload();
        } catch(err) {
            console.log(err.response)
            setError(500)
        }
    }

    const handleChangeStatusRP = async (opID,isAccept) => {
        const status = isAccept ? orderEnum.COMPLETED : orderEnum.FAILED
        try {
            await updateOrder(opID,{status:status})
            window.location.reload();
        } catch(err) {
            setError(500)
        }
    }

    const handleDeleteBP = async (bpId) => {
        try {
            await deleteExchange(bpId);
            window.location.reload();
        } catch(error) {
            setError(500)
        }
    }

    const handleAcceptRatingOrder = async (value,restProps) => {
        try {
            const response = await updateUser(restProps.ownerUsername,{trustPoint:value})
            if(response.data.status!=='failure'){
                await updateOrder(restProps.orderId,{isRated:true})
            }
            alert('Kullanıcı başarıyla oylandı.')
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    const handleAcceptRatingExchange = async (value,restProps) => {
        const object = restProps.isBidder ? {isRated:{bidder:true}} : {isRated:{owner:true}}
        try {
            const response = await updateUser(restProps.ratedUsername,{trustPoint:value})
            if(response.data.status!=='failure'){
                await updateExchange(restProps.exchangeId,object)
            }
            alert('Kullanıcı başarıyla oylandı.')
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }


    if (isLoading||(!user&&!error)) {
        return <Loader/>
    }

    if (error) {
        if(error===500) return <InternalError/>
        else return <h1>{error}</h1>
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
