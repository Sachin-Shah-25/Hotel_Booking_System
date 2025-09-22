import React from 'react'
import { toast } from 'react-toastify'
function MessageComp({status},{msg}) {
  return (
    <div>
      {
        status==409
        ? toast.error(msg)
        : toast.error("Something Went Wrong ")
      }
    </div>
  )
}

export default MessageComp