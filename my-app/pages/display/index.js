
import Head from "next/head"
import { DisplayView } from "../../views"

const Display = (props) => {
  return (
    <div>
      <Head>
        <title>Gari vNFT</title>
        <meta name="description" content="Basic Functionality" />
      </Head>
      <DisplayView />
    </div>
  )
}

export default Display
