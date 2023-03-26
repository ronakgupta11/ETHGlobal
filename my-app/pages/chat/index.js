
import Head from "next/head"
import { useState } from "react";
import { ChatRoomView } from "../../views"
import * as PushAPI from "@pushprotocol/restapi";
import { useSigner,useAccount } from 'wagmi'
import {
    createSocketConnection,
    EVENTS
  } from '@pushprotocol/socket';

const ChatRoom = (props) => {
  const { address, isConnecting, isDisconnected } = useAccount()

  const { data: _signer, isError, isLoading } = useSigner()
  const [user,setUser ]=useState(null);

    async function createUser(){
        const user = await PushAPI.user.create({signer: _signer,env:"staging"})
        console.log(user);
        return user}

    async function getUser(){

      const userData = await PushAPI.user.get({
        account: `eip155:${address}`,
        env: 'staging',
      });
      console.log(userData);
      setUser(userData)
      return userData
    }


  return (
    <div>
      <Head>
        <title>Gari vNFT</title>
        <meta name="description" content="Basic Functionality" />
      </Head>
     {!user && <div className="m-auto content-center">
        <button className="btn btn-lg rounded-btn m-10" onClick={createUser}>New User Click Here!</button>
        <button className="btn btn-lg rounded-btn m-10" onClick={getUser}>Already Reg. Click Here</button>
      </div>}
      {user && <ChatRoomView user={user}/>}
    </div>
  )
}

export default ChatRoom
