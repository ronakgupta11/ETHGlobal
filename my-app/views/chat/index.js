import Link from "next/link"
import { FC } from "react"


export const ChatRoomView = ({}) => {
  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          Chat Rooms
        </h1>
        {/* CONTENT GOES HERE */}
        <div className="text-center flex flex-col w-5/5 items-center">

          {/*request block for groups*/}
          <div className="w-4/5 m-auto flex flex-col items-center" >

          <p className="italic"> Group Requests</p>
          <ul>
          <li className="flex items-center m-4 bg-primary w-96 justify-between p-5 rounded-md">
            <p>chat group 1</p>
            <button className="bg-base-100 rounded-md p-2">approve</button>
          </li>
          </ul>
          </div>
          <div className="w-4/5 m-auto flex flex-col items-center">
            <p className="italic">
              Your Chat Rooms
            </p>
            <ul>
            <li className="flex items-center m-4 bg-primary w-96 justify-between p-5 rounded-md" ><Link className="m-auto" href="/chat/id">new room</Link></li>


            </ul>
            

          </div>
        </div>
      </div>
    </div>
  )
}
