
import Head from "next/head"
import { ChatRoomView } from "../../views"

const ChatRoom = (props) => {
  return (
    <div>
      <Head>
        <title>Gari vNFT</title>
        <meta name="description" content="Basic Functionality" />
      </Head>
      <ChatRoomView />
    </div>
  )
}

export default ChatRoom
