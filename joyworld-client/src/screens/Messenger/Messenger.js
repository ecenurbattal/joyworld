import React, { useEffect, useRef, useState } from 'react'
import { ChatBox, ChatBoxBottom, ChatBoxTop, ChatBoxWrapper, ChatMenu, ChatMessageInput, NoConversationText, NoConversationWrapper, StyledChatWrapper, Wrapper } from './Messenger.styles'
import Input from '../../components/Input/Input'
import Conversation from '../../components/Conversation/Conversation'
import { getCurrentUser } from '../../services/Auth/authService'
import Message from '../../components/Message/Message'
import Button from '../../components/Button/Button'
import { createConversation, createMessage, getConversations, getMessages } from '../../services/api'
import Loader from '../../components/Loader/Loader';
import {io} from 'socket.io-client'
import InternalError from '../../components/Error/InternalError'
import { ErrorMessage } from '../../components/FormElements/WrappedFormElements'

const Messenger = () => {

    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const scrollRef = useRef();
    const [error,setError] = useState('');
    const [isLoading,setLoading] = useState(false);
    const [newConversation,setNewConversation] = useState("");


    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => {
          setArrivalMessage({
              sender:data.sender,
              text:data.text,
              createdAt:Date.now()
          });
        });
      }, []);

      useEffect(() => {
        arrivalMessage &&
          currentChat?.members.includes(arrivalMessage.sender._id) &&
          setMessages((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage, currentChat]);

      useEffect(() => {
        socket.current.emit("addUser", getCurrentUser().user._id);
        socket.current.on("getUsers", (users) => {
          setOnlineUsers(users);
        });
      }, []);

    useEffect(() => {
        const init = async () => {
            setLoading(true)
            try {
                const {data:{data}} = await getConversations(getCurrentUser().user._id)
                setConversations(data)
            } catch (error) {
                setError(error.response.data.message)
            }
            setLoading(false)
        }
        init();
    },[])


    useEffect(() => {
            const init = async () => {
                try {
                    const {data:{data}} = await getMessages(currentChat?._id);
                    setMessages(data)
                } catch (error) {
                    setError(error.response.data.message)
                }
            }
            currentChat && init();
    },[currentChat])

    const handleSubmit  = async (event) => {
        event.preventDefault();
        const message = {
            sender: getCurrentUser().user._id,
            text:newMessage,
            conversationId:currentChat._id
        };

        try {
            const {data:{data}} = await createMessage(message);
            const receiverId = currentChat.members.find(
                (member) => member !== getCurrentUser().user._id
              );
              socket.current.emit("sendMessage", {
                receiverId,
                sender:data.sender,
                text:newMessage
              });
              setMessages([...messages,data])
            setNewMessage('')
        } catch (error) {
            setError(error)
        }
    }

    const handleAddNew = async (event) => {
        event.preventDefault();
        try {
            const {data:{data}} = await createConversation({
                senderUsername : getCurrentUser().user.username,
                receiverUsername : newConversation
            })
            setConversations([...conversations,data])
        } catch (err) {
            if(err.response?.data?.status==='fail') setError('Kullanıcı bulunamadı. Doğru yazdığınızdan emin olunuz.') 
            else setError(err.response?.status)
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior:'smooth'})
    })

    const isUserOnline = (userId, onlineUsers) => {
        return onlineUsers.some((user) => user.userId===userId)
    }

    if(isLoading){
        return <Loader/>
    }

    if(error === 500){
        return <InternalError/>
    }

    return (
        <Wrapper>
            <ChatMenu>
                <StyledChatWrapper>
                    {conversations.map((item,index) => (
                        <div key={`conversation${index}`} onClick={() => setCurrentChat(item)}>
                            <Conversation 
                            conversation={item} 
                            currentUser={getCurrentUser().user} 
                            isOnline = {isUserOnline(item.members.find((member) => member!==getCurrentUser().user._id),onlineUsers)}
                            />
                        </div>
                    ))}
                </StyledChatWrapper>
            </ChatMenu>
            <ChatBox>
                <ChatBoxWrapper>
                    {currentChat ? (
                        <>
                            <ChatBoxTop>
                                {messages.map((message) => (
                                    <div ref={scrollRef}>
                                        <Message message={message} own={message.sender._id === getCurrentUser().user._id}/>
                                    </div>
                                ))}
                            </ChatBoxTop>
                            <ChatBoxBottom>
                                <ChatMessageInput
                                    placeholder={'Bir şeyler yaz...'}
                                    onChange={(e) => {
                                        e.preventDefault()
                                        setNewMessage(e.target.value)
                                    }}
                                    value={newMessage}
                                ></ChatMessageInput>
                                <Button
                                    width={'90%'}
                                    padding={'10px 0'}
                                    onClick={handleSubmit}
                                    text='Gönder'
                                />
                            </ChatBoxBottom>
                        </>
                    ) : (
                       <NoConversationWrapper>
                            <NoConversationText>
                                Yeni bir konuşma başlatmak için bir konuşma seç veya 
                            </NoConversationText>
                            {(error && error !== 500) && <ErrorMessage>{error}</ErrorMessage>}
                            <Input
                                placeholder='Kullanıcı adı giriniz...'
                                value={newConversation}
                                onChange={(event) => setNewConversation(event.target.value)}
                            />
                            <Button
                                text='Yeni kişi ekle'
                                type='button'
                                onClick={handleAddNew}
                            />
                       </NoConversationWrapper>
                    )}
                </ChatBoxWrapper>
            </ChatBox>
        </Wrapper>
    )
}

export default Messenger
