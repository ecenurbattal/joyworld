import React from 'react'
import { ContentsWrapper, Description, Name, ProfilePic, Stat, Stats } from '../Profile.styles';
import account from '../../../images/account.png';

const ProfileGeneral = ({user}) => {

    return (
        <ContentsWrapper>
            <ProfilePic src={!!(user?.avatar) ? "data:image/png;base64," + user?.avatar : account}></ProfilePic>
            <Name>{user?.name}</Name>
            <Description>{user?.email}</Description>
            <Description>{user?.description}</Description><br/>
            <h4>{`★ ${user?.trustPoint?.point} / 5.0`}</h4>
            <p>{`${user?.trustPoint?.count} oy`}</p>
            <Stats>
                <Stat>
                    <h4>{user?.products?.length}</h4>
                    <h4>Ürün</h4>
                </Stat>
                <Stat>
                    <h4>{user?.posts?.length}</h4>
                    <h4>Post</h4>
                </Stat>
            </Stats>
        </ContentsWrapper>
    )
}

export default ProfileGeneral;
