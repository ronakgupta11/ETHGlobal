import React from 'react'
import * as pinataSDK from "@pinata/sdk";
import { useState } from "react";

import { BigNumber } from "ethers";
import {abi,contractAddress} from "../constants/index.js"
import { useContractWrite, usePrepareContractWrite } from 'wagmi'



const fs = require('fs');

export const Upload = () => {
    const pinata = new pinataSDK('96f029350cf8f6076154', 'fb9e999ebb31a98d69f3d6464af7aaa333e4697207f36f79ec71659094c69c98');
    const { config } = usePrepareContractWrite({
        address: contractAddress,
        abi: abi,
        functionName: 'listCourse',
      });
    const { data, isLoading, isSuccess, write } = useContractWrite(config);
    const zero = BigNumber.from("0");
    const [imageUrl,setImageUrl] = useState("");
    const [name,setName] = useState("");
    const[description,setDescription] = useState("");
    const [price,setPrice] = useState(zero);
    const [videoUrl,setVideoUrl] = useState("");
    const [file,setFile] = useState(null);


    
    async function pinToIPFS(){
        const readableStreamForFile = fs.createReadStream(file);
        const options = {
            pinataMetadata: {
                name: name,
                
            },
            pinataOptions: {
                cidVersion: 0
            }
        };
        pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
            //handle results here
            console.log(result);
        }).catch((err) => {
            //handle error here
            console.log(err);
        });
    }

    function handleImage(e){
        setImageUrl(e.target.value);

    }
    function handleFile(e){
        setFile(e.target.files[0])
        console.log(e.target.files[0])
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
        console.log(e.target.value)
        setPrice(e.target.value);

    }


    // const upload = async () => {
    //     try {
    //         props.setLoading(true);
    //       // Get the signer from web3Modal, which in our case is MetaMask
    //       // No need for the Signer here, as we are only reading state from the blockchain
    //       const signer = await props.getSigner(true);
    //       // We connect to the Contract using a signer because we want the owner to
    //       // sign the transaction
    //       const shopContract = new ethers.Contract(
    //         SHOP_CONTRACT_ADDRESS,
    //         abi,
    //         signer
    //       );
    //     //   setLoading(true);
    //       // call the startGame function from the contract
    //       const tx = await shopContract.listProduct(imageUrl,name,category,price,quantity,token);
    //       await tx.wait();
    //       props.setLoading(false);
    //     } catch (err) {
    //       console.error(err);
    //       props.setLoading(false);
    //     }
    //   };
    

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
                        <input onChange={handlePrice} className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" type="text" id="product-category" placeholder="Enter Price in matic"></input>
                    </div>
                
                    <div className='m-5'>
                        <label className= " block"for ="course-file"><span className='text-white'>Choose Course banner</span></label>
                        <input onChange={handleFile} className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100" type="file" id="product-image"></input>
                    </div>

                    
             
                    <div >
                        <button onClick={pinToIPFS} className="btn-form btn btn-light wallet-btn wallet-btn">{"Upload Product"}</button>
                    </div>
        </div>   

    </div>

    </div>
    );

}
