import React from 'react'
import { alertStyle } from '../Style';

export default function Alert({ isSuccess, message }) {
    const successful = {
        color: "green",
        border: "1px solid green"
    }
    return (
        <div css={alertStyle} style={isSuccess ? successful : null}>
            <span>{message}</span>
        </div>
    )
}