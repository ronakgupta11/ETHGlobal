import React from 'react'

import { useState } from "react";

import { formatUnits,parseUnits } from 'ethers/lib/utils.js';
import {abi,contractAddress} from "../constants/index.js"
import { useContractWrite, usePrepareContractWrite, useSigner } from 'wagmi'
import * as PushAPI from "@pushprotocol/restapi";





export const Upload = () => {


    
    const [imageUrl,setImageUrl] = useState("");
    const [name,setName] = useState("");
    const[description,setDescription] = useState("");
    const [price,setPrice] = useState(0);
    const [videoUrl,setVideoUrl] = useState("");

    const { config } = usePrepareContractWrite({
        address: contractAddress,
        abi: abi,
        functionName: 'listCourse',
        args:[price,name,description,videoUrl,imageUrl]
      });
    const { data, isLoading, isSuccess, write } = useContractWrite(config);
    const { data: _signer,} = useSigner()
    

    function handleImage(e){
        setImageUrl(e.target.value);

    }
 
    function handleName(e){
        setName(e.target.value);

    }
    function handleDescription(e){
        setDescription(e.target.value);

    }
    function handleVideoUrl(e){
        setVideoUrl(e.target.value);

    }
    function handlePrice(e){
        const p = parseUnits(e.target.value)
        setPrice(p);
        console.log(p)

    }


    const sendNotification = async() => {
        try {
            const signer = await _signer
          const apiResponse = await PushAPI.payloads.sendNotification({
            signer,
            type: 3, // broadcast
            identityType: 2, // direct payload
            notification: {
              title: `[SDK-TEST] notification TITLE: test`,
              body: `[sdk-test] notification BODY Testing notification`
            },
            payload: {
              title: `New Course Update`,
              body: `${name}`,
              cta: "",
              img: `${imageUrl}`
            },
            channel: 'eip155:5:0xD7D98e76FcD14689F05e7fc19BAC465eC0fF4161', // your channel address
            env: 'staging',
            recipients:"eip155:5:0x294d985B6BC5dA375b571B5fDE228334343f4EdF"
          });
          
          // apiResponse?.status === 204, if sent successfully!
          console.log('API repsonse: ', apiResponse);

          
          

        } catch (err) {
          console.error('Error: ', err);
        }
        
      }



    

    return(<div className="product-detail-page">
    <div className="container">
   

        <div className="text-black">
             
                    <div className='m-5'>
                        <input onChange={handleName} className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" type="text" id="product-name" placeholder="Enter Course Name"></input>
                    </div>
                    <div className='m-5'>
                        <textarea onChange={handleDescription} className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"name="myText"  cols="30" rows="4" placeholder="description for course:"></textarea>
                    </div>
                    <div className='m-5'>
                        <input onChange={handleVideoUrl} className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" type="text" id="product-video" placeholder="Enter Video Url"></input>
                    </div>

                    <div className='m-5'>
                        {/* <label className= " block"for ="course-file"><span className='text-white'>Choose Course banner</span></label>
                        <input onChange={handleFile} className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100" type="file" id="product-image"></input> */}
                        <input onChange={handleImage} className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" type="text" id="product-image" placeholder="Enter Image Url"></input>

                    </div>
                    <div className='m-5'>
                        <input onChange={handlePrice} className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" type="text" id="product-price" placeholder="Enter Price in matic"></input>
                    </div>
                

                    
                {/* {disabled={!write || isLoading} onClick={() => write?.()}} */}
                    <div >
                        <button disabled={!write || isLoading} onClick={() => {write?.();
                        sendNotification()}} className="btn-form btn btn-light wallet-btn wallet-btn">{isLoading ? 'Uploading...' : 'Upload Course'}</button>
                    </div>
                    {isSuccess && (
        <div className='text-white'>
          Successfully uploaded your course
          <div>
            <a href={`https://mumbai.polygonscan.com/tx/${data?.hash}`}>polygonScan</a>
          </div>
        </div>
      )}
        </div>   

    </div>

    </div>
    );

}
