import Link from "next/link"
import { FC, useEffect, useState } from "react"


import * as PushAPI from "@pushprotocol/restapi";
import { useSigner,useAccount } from 'wagmi'
import {
    createSocketConnection,
    EVENTS
  } from '@pushprotocol/socket';


export const ChatRoomView = (props) => {
  const { address, isConnecting, isDisconnected } = useAccount()

  const { data: _signer, isError, isLoading } = useSigner()
  const [pgpKey,setPgpKey] = useState(null);
  const [requests,setRequests] = useState([]);
  const [groups,setGroups] = useState([]);
  const user = props.user;
 
  useEffect(() => {
    const fetchKey = async(user)=>{
      const decryptedPvtKey = await PushAPI.chat.decryptPGPKey({
        encryptedPGPPrivateKey: user.encryptedPrivateKey,
        signer: _signer}
    );
    setPgpKey(decryptedPvtKey);
    }
    const fetchData = async () => {
      const requests = await PushAPI.chat.requests({
        account: `eip155:${address}`,
        toDecrypt: true,
        pgpPrivateKey: pgpKey,
        env: 'staging',
    });
    //   const json = await res.json();
    const chats = await PushAPI.chat.chats({
      account: `eip155:${address}`,
      toDecrypt: true,
      pgpPrivateKey: pgpKey,
      env: 'staging',
  }) 
    
      setRequests(requests);
      setGroups(chats.filter(obj => obj.groupInformation));
      
      
      
    };
    fetchKey(user);


    // Fetch data every 5 seconds
    const intervalId = setInterval(() => {
      {pgpKey && fetchData()}
      
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [user,pgpKey]);

  const groupsRendered = groups.map((g,i) => {
    const id = g.groupInformation.chatId;
    const name = g.groupInformation.groupName;
    return(
      <li className="flex items-center m-4 bg-primary w-96 justify-between p-5 rounded-md">
      <Link className="m-auto " href={`/chat/${id}`}>{name}</Link>
      </li>

    )
  })

  const requestsRendered = requests.map((r,i)=>{
    const id = r.groupInformation.chatId;
    const name = r.groupInformation.groupName;
    return(
      <li className="flex items-center m-4 bg-primary w-96 justify-between p-5 rounded-md">
            <p>{name}</p>
            <button onClick={()=>approve(pgpKey,id)} className=" bg-base-100 m-2  btn btn-sm rounded-btn">approve</button>
          </li>

    )
  })


  async function approve(pgpDecryptedPvtKey,chatId){
    const response = await PushAPI.chat.approve({
      status: 'Approved', 
      signer:_signer,
      pgpPrivateKey: pgpDecryptedPvtKey,
      env:"staging",
      senderAddress : `${chatId}` // receiver's address or chatId of a group
    });
  }
  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          Chat Rooms
        </h1>
        {/* CONTENT GOES HERE */}
        <div className="text-center flex flex-col w-5/5 items-center">

          {/*request block for groups*/}
          {Boolean(requests.length) && <div className="w-4/5 m-auto flex flex-col items-center" >

          <p className="italic"> Group Requests</p>
          <ul>
          {requestsRendered}
          </ul>
          </div>}
          <div className="w-4/5 m-auto flex flex-col items-center">
            <p className="italic">
              Your Chat Rooms
            </p>
            <ul>
            {groupsRendered}


            </ul>
            

          </div>
        </div>
      </div>
    </div>
  )
}
