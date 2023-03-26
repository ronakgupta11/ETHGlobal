import React, { useEffect } from 'react'
import Link from 'next/link'
import { useContractWrite, usePrepareContractWrite, useSigner } from 'wagmi'
import {abi,contractAddress} from "../constants/index.js"
import { formatUnits,parseUnits } from 'ethers/lib/utils.js';
import { useRouter } from 'next/router.js';


export const CourseCard = (props) => {
  const router = useRouter();

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: 'buy',
    args:[props.id]
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  const { data: _signer,} = useSigner()
  



useEffect(()=>{
  if(isSuccess){
    router.push("https://platform-test.polygonid.com/claim-link/e9c54a34-6ed3-43df-a5bd-6b3de935620b")


  }
},[isSuccess])


  return (
    <div className='bg-primary rounded-md h-80 m-10 flex flex-col items-center'>
    <img className='m-5 w-100' src={props.image}>
    
    </img>
    <Link className='italic' href="/display/123">
    {props.name}
    
    </Link>
    <div className='flex '>

    <button disabled={!write || isLoading} onClick={() => {write?.()}} className="bg-base-100 m-3 btn btn-sm rounded-btn">Enroll</button>
    <button  className="bg-base-100 m-3 btn btn-sm rounded-btn">Open</button>
    </div>
    
</div>
  )
}
