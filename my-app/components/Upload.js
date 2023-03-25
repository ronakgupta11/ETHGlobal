import React from 'react'
import * as pinataSDK from "@pinata/sdk";
import * as fs from "fs"
import { useState } from "react";

import { BigNumber } from "ethers";
import {abi,SHOP_CONTRACT_ADDRESS} from "../constants/index.js"

const pinata = new pinataSDK('96f029350cf8f6076154', 'fb9e999ebb31a98d69f3d6464af7aaa333e4697207f36f79ec71659094c69c98');

export const Upload = () => {
    const zero = BigNumber.from("0");
    const [imageUrl,setImageUrl] = useState("");
    const [name,setName] = useState("");
    const[description,setDescription] = useState("");
    const [price,setPrice] = useState(zero);
    const [videoUrl,setVideoUrl] = useState("");


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
   

        <div className="product-form">
             
                    <div>
                        <input onChange={handleName} className="input-area" type="text" id="product-name" placeholder="Enter Course Name"></input>
                    </div>
                    <div>
                        <textarea onChange={handleDescription} className="input-area desc-input" name="myText"  cols="30" rows="10" placeholder="description for course:"></textarea>
                    </div>
                    <div >
                        <input onChange={handleVideoUrl} className="input-area" type="text" id="product-video" placeholder="Enter Video Url"></input>
                    </div>

                    <div>
                        <input onChange={handlePrice} className="input-area" type="text" id="product-category" placeholder="Enter Price in matic"></input>
                    </div>
                
                    <div>
                        <label for ="course-file">upload course banner:    </label>
                        <input onChange={handleImage} className="input-area" type="file" id="product-image"></input>
                    </div>

                    
             
                    <div >
                        <button onClick={handleDescription} className="btn-form btn btn-light wallet-btn wallet-btn">{"Upload Product"}</button>
                    </div>
        </div>   

    </div>

    </div>
    );

}
