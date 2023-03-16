import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { IntmaxWalletSigner } from "webmax";
import { useState } from 'react';

import {Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

async function connectIntmax(){
  const signer = new IntmaxWalletSigner();
  const account = await signer.connectToAccount();
  return signer}

export default function ConnectWallet() {
  const [open, setOpen] = useState(false);
  return (
    <div>ConnectWallet
        {/* <ConnectButton accountStatus="address"/> */}
        {/* <Button onClick={connectIntmax} variant="contained">Sign Up</Button> */}
        {/* <button >Sign Up</button> */}
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
  Open Dialog
</Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
  <DialogTitle>Dialog Title</DialogTitle>
  <DialogContent>
    Dialog Content
  </DialogContent>
  <DialogActions>
    <Button variant='contained'>

    <ConnectButton/>
    </Button>
  </DialogActions>
  <DialogActions>
    <Button variant='contained' onClick={() => connectIntmax()} color="primary">
      Sign Up
    </Button>
  </DialogActions>
  <DialogActions>
    <Button onClick={() => setOpen(false)} color="primary">
      Close
    </Button>
  </DialogActions>
</Dialog>
    </div>
  )
}
