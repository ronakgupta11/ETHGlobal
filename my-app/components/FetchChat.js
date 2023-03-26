import React from 'react'
import { useState } from 'react';
import * as PushAPI from "@pushprotocol/restapi";
import { useSigner,useAccount } from 'wagmi'
import {
    createSocketConnection,
    EVENTS
  } from '@pushprotocol/socket';

import { ChatComp } from './ChatComp'
export const FetchChat = (props) => {
  const { address, isConnecting, isDisconnected } = useAccount()

  const { data: _signer, isError, isLoading } = useSigner()
  const chatId = props.chatId;
  const [user,setUser ]=useState(null);
  const [decryptedPGPKey,setDecryptedPGPKey] = useState(null);
  const [message,setMessage] = useState("");


async function sendMessage(decryptedPGPKey){






const response = await PushAPI.chat.send({
messageContent: {message},
messageType: 'Text', // can be "Text" | "Image" | "File" | "GIF" 
receiverAddress: `eip155:${chatId}`,
signer: _signer,
pgpPrivateKey: decryptedPGPKey,
env: 'staging',
});
  }


  return (
    <ul  className="divide-y divide-solid mt-4 mb-4">
{/* give props in sender and message to chat comp */}
    <ChatComp/>
    <ChatComp/> 
    <ChatComp/>

  </ul>
  )
}
