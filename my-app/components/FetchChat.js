import React from 'react'
import { useState } from 'react';
import * as PushAPI from "@pushprotocol/restapi";
import { useSigner,useAccount } from 'wagmi'
import {
    createSocketConnection,
    EVENTS
  } from '@pushprotocol/socket';
  import { useEffect } from 'react';

import { ChatComp } from './ChatComp'
export const FetchChat = (props) => {
  const { address, isConnecting, isDisconnected } = useAccount()
  const [conversation,setConversation] = useState([])

  const { data: _signer, isError, isLoading } = useSigner()
  const chatId = props.chatId;
  const user = props.user;
  const pgpKey = props.pgpKey;
  console.log("user:",pgpKey)
  console.log("chatId",chatId)


  useEffect(() => {
    const fetch_data = async ()=> {
      // Fetch user

    
      // Decrypt PGP Key
      const pgpDecryptedPvtKey = props.pgpKey;
    
    
      // Fetch conversation hash
      // conversation hash are also called link inside chat messages
      const conversationHash = await PushAPI.chat.conversationHash({
        account: `eip155:${address}`,
        conversationId: `${chatId}`, // 2nd address
        env: "staging",
      });
      console.log(conversationHash)
    
      // Chat History
      const encryptedChats = await PushAPI.chat.history({
        threadhash: conversationHash.threadHash, // get conversation hash from conversationHash function and send the response threadhash here
        account: `eip155:${address}`,
        limit: 5,
        toDecrypt: false,
        pgpPrivateKey: pgpDecryptedPvtKey,
        env: "staging",
      });
      console.log(encryptedChats)
      
      // Decrypted Chat
      const decryptedChat = await PushAPI.chat.decryptConversation({
        messages: encryptedChats, // array of message object fetched from chat.history method
        connectedUser: user, // user meta data object fetched from chat.get method
        pgpPrivateKey: pgpDecryptedPvtKey, //decrypted private key
        env: "staging",
      });
      console.log(decryptedChat)
    
      
      console.log(decryptedChat);
      setConversation(decryptedChat);
    }

  // console.log(chalk.gray("PushAPI_chat_decryptConversation | Response - 200 OK"));
  // console.log(decryptedChat);




    // Fetch data every 5 seconds
    const intervalId = setInterval(() => {
      fetch_data();
      
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [conversation]);

  const chatRendered = conversation.map((convo,id)=>{
    return(
      <ChatComp key = {id}sender = {convo.fromDID} message={convo.messageContent}/>
    )
  })

  return (
    <ul  className="divide-y divide-solid mt-4 mb-4">
{/* give props in sender and message to chat comp */}

    {chatRendered}
  </ul>
  )
}
