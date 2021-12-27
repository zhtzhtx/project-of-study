import React from 'react'
import { tile } from "../styles/style"
import More from "./More";
export default function SearchItem({ isInit, icon, content, index, showList, setShowList, handleClick, handleEdit, handleDel }) {
    return (
        <div css={tile} onClick={handleClick} >
            {
                isInit
                    ? null
                    : <More
                        index={index}
                        showList={showList}
                        setShowList={setShowList}
                        handleEdit={handleEdit}
                        handleDel={handleDel}
                    />
            }
            <div className='tile-icon' >
                <img src={icon}></img>
            </div>
            <div className='tile-title' >
                <span>{content}</span>
            </div>
        </div>
    )
}
