
import { FetchChat } from "@/components/FetchChat"
import Head from "next/head"
import * as PushAPI from "@pushprotocol/restapi";
import { useSigner,useAccount } from 'wagmi'
import {
    createSocketConnection,
    EVENTS
  } from '@pushprotocol/socket';
  import { useState } from "react";

const ChatRoom = (props) => {
  const { address, isConnecting, isDisconnected } = useAccount()

  const { data: _signer } = useSigner()
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
    <div>
      <Head>
        <title>Gari vNFT</title>
        <meta name="description" content="Basic Functionality" />
      </Head>
      
      {/* <ChatRoomView /> */}
      <div className="bg-primary w-96 m-auto  mt-10 mb-20 pb-24 flex flex-col items-center p-4 ">
        <p> 
        Group name
        {/* render group name here using clicked link */}
        </p>
        {/* give props in chat id to fetch chat  */}
        <FetchChat/>
        <input  className=" text-black placeholder:italic placeholder:text-slate-400 block bg-white w-full  rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" type="text" id="message" placeholder="send..."></input>
        <button className=" mt-4 bg-base-100 m-3 btn btn-sm rounded-btn">Send</button>
        
      </div>
    </div>
  )
}

export default ChatRoom
