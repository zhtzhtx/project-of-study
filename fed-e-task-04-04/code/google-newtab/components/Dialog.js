import React, { useState, useEffect } from 'react'
import { dialog } from "../styles/style"

export default function Dialog({ setDialog, addQuickLink, initalData }) {
    const [name, setName] = useState("")
    const [url, setUrl] = useState("")
    const emitData = () => {
        if (!name || !url) return
        const data = { name, url }
        addQuickLink(data)
        setDialog(false)
    }
    useEffect(() => {
        if (initalData) {
            setName(initalData.name)
            setUrl(initalData.url)
        }
    }, [])
    return (
        <div css={dialog}>
            <div className='title'>添加快捷方式</div>
            <div className='body'>
                <div className='dialogInput'>
                    <label htmlFor='dialogInputName'>名称</label>
                    <input id='dialogInputName' autoComplete="off" value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <div className='dialogInput'>
                    <label htmlFor='dialogInputUrl'>网址</label>
                    <input id='dialogInputUrl' autoComplete="off" value={url} onChange={(event) => setUrl(event.target.value)} />
                </div>
            </div>
            <div className='button-container'>
                <button onClick={() => setDialog(false)}>取消</button>
                <button className={(name && url) ? null : 'disabled'} onClick={emitData}>完成</button>
            </div>
        </div>
    )
}
