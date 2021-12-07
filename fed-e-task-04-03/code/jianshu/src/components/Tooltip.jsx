import React from 'react'

export default function Tooltip({message}) {
    return (
        <div className="tooltip-inner">
            <span>{message}</span>
        </div>
    )
}
