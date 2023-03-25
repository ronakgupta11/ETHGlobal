
import Head from "next/head"
import { CreateView } from "../views"

const Create = (props) => {
  return (
    <div>
      <Head>
        <title>Gari vNFT</title>
        <meta name="description" content="Basic Functionality" />
      </Head>
      <CreateView />
    </div>
  )
}

export default Create
