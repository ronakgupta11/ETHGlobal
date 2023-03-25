
import Head from "next/head"
import { CandyMachineView } from "../views"

const CandyMachine = (props) => {
  return (
    <div>
      <Head>
        <title>Gari vNFT</title>
        <meta name="description" content="Basic Functionality" />
      </Head>
      <CandyMachineView />
    </div>
  )
}

export default CandyMachine
