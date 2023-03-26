import React from 'react'

export const ChatComp = (props) => {
  return (

               


<li>
<p className="italic text-sm">
    from : {props.sender}
  </p>
  <p className="text-base font-semibold">
    {props.message}
  </p>
</li>

    
  );
}
