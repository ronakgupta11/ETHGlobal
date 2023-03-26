import React from 'react'
import { ChatComp } from './ChatComp'
export const FetchChat = (props) => {
  return (
    <ul  className="divide-y divide-solid mt-4 mb-4">
{/* give props in sender and message to chat comp */}
    <ChatComp/>
    <ChatComp/> 
    <ChatComp/>

  </ul>
  )
}
