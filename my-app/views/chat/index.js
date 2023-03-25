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
        <div className="text-center">
          {/* <FetchCandyMachine /> */}
          <ul>
            <li><Link href="/chat/1">new room</Link></li>
            <li><Link href="/chat/2">new room</Link></li>
            <li><Link href="/chat/3">new room</Link></li>
            <li><Link href="/chat/4">new room</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
