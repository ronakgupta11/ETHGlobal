
import { FetchChat } from "@/components/FetchChat"
import { useRouter } from "next/router";

import Head from "next/head"
import * as PushAPI from "@pushprotocol/restapi";
import { useSigner,useAccount } from 'wagmi'

  import { useState,useEffect } from "react";


const ChatRoom = () => {
  const { address } = useAccount()
  const router = useRouter();

  const { data: _signer } = useSigner()
  const chatId = router.query.id;
  const [userData,setUser] = useState(null);
  const [pgpKey,setpgpkey] = useState(null);
  const [message,setMessage] = useState("");


  // async function getUser(){

  //   const userData = await PushAPI.user.get({
  //     account: `eip155:${address}`,
  //     env: 'staging',
  //   });
  //   // console.log(userData);
  //   setUser(userData);
  //   return userData
  // }
  function handleMessage(e){
    setMessage(e.target.value);

  }

  async function decryptedPvtKeyFun(){

    const userData = await PushAPI.user.get({
      account: `eip155:${address}`,
      env: 'staging',
    });
    setUser(userData);

    const decryptedPvtKey = await PushAPI.chat.decryptPGPKey({
      encryptedPGPPrivateKey: userData.encryptedPrivateKey,
      signer: _signer}
  );
    // console.log(decryptedPvtKey);
    setpgpkey(decryptedPvtKey);
    return decryptedPvtKey;
  }

async function sendMessage(decryptedPGPKey){

const response = await PushAPI.chat.send({
messageContent: {message},
messageType: 'Text', // can be "Text" | "Image" | "File" | "GIF" 
receiverAddress: `${chatId}`,
signer: _signer,
pgpPrivateKey: decryptedPGPKey,
env: 'staging',
});
  }

// useEffect(()=>{
  
//   decryptedPvtKeyFun();

// },[])
  return (
    <div>
      <Head>
        <title>Gari vNFT</title>
        <meta name="description" content="Basic Functionality" />
      </Head>
      
      {/* <ChatRoomView /> */}
      <div className="bg-primary w-96 m-auto  mt-10 mb-20 pb-24 flex flex-col items-center p-4 ">
        <p onClick={decryptedPvtKeyFun}> 
        Chat Group

        {/* render group name here using clicked link */}
        </p>
        {/* give props in chat id to fetch chat  */}
        {pgpKey && userData && <FetchChat pgpKey = {pgpKey} chatId = {chatId} user={userData}/>}
        <input  className=" text-black placeholder:italic placeholder:text-slate-400 block bg-white w-full  rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" type="text" id="message" placeholder="send..."></input>
        <button onClick={() => sendMessage(pgpKey)} className=" mt-4 bg-base-100 m-3 btn btn-sm rounded-btn">Send</button>
        
      </div>
    </div>
  )
}

export default ChatRoom
