import { EmbedSDK } from "@pushprotocol/uiembed";
import React from 'react'
import { useEffect } from "react";

export default function Notifications(){
    const account = "0xD7D98e76FcD14689F05e7fc19BAC465eC0fF4161"
    useEffect(() => {
        if (account) { // 'your connected wallet address'
          EmbedSDK.init({
            headerText: 'Hello DeFi', // optional
            targetID: 'sdk-trigger-id', // mandatory
            appName: 'consumerApp', // mandatory
            user: account, // mandatory
            chainId: 1, // mandatory
            viewOptions: {
                type: 'sidebar', // optional [default: 'sidebar', 'modal']
                showUnreadIndicator: true, // optional
                unreadIndicatorColor: '#cc1919',
                unreadIndicatorPosition: 'bottom-right',
            },
            theme: 'light',
            onOpen: () => {
              console.log('-> client dApp onOpen callback');
            },
            onClose: () => {
              console.log('-> client dApp onClose callback');
            }
          });
        }
      
        return () => {
          EmbedSDK.cleanup();
        };
      }, []);
  return (
    <div>Notifications
        <button id="sdk-trigger-id">trigger button</button>
    </div>
  )
}
