// Next, React
import { FC, useEffect, useState } from "react"
import Link from "next/link"

// Wallet
// import { useWallet, useConnection } from "@solana/wallet-adapter-react"

// // Components
// import { RequestAirdrop } from "../../components/RequestAirdrop"
// import pkg from "../../../package.json"

// Store
// import useUserSOLBalanceStore from "../../stores/useUserSOLBalanceStore"

export const HomeView = ({}) => {
  // const wallet = useWallet()
  // const { connection } = useConnection()

  // const balance = useUserSOLBalanceStore((s) => s.balance)
  // const { getUserSOLBalance } = useUserSOLBalanceStore()

  // useEffect(() => {
  //   if (wallet.publicKey) {
  //     console.log(wallet.publicKey.toBase58())
  //     getUserSOLBalance(wallet.publicKey, connection)
  //   }
  // }, [wallet.publicKey, connection, getUserSOLBalance])

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          LearnIt
          <span className="text-sm font-normal align-top text-slate-700">
            v 1.0.1
          </span>
        </h1>
        <h4 className="md:w-full text-center text-slate-300 my-2">
          <p>Learning Help you reach your goals and reap the rewards</p>
          
        </h4>
        <div className="max-w-md mx-auto mockup-code bg-primary p-6 my-2">
          <pre data-prefix=">">
            <code className="truncate">Start Learning Today..
            </code>
            
          </pre>
        </div>
        
      </div>
    </div>
  )
}
