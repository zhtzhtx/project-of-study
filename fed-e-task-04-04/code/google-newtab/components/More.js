import React, { useState } from 'react'
import { moreBox, selectList } from "../styles/style"

export default function More({ index, showList, setShowList, handleEdit, handleDel }) {
    const onClickInner = (e) => {
        e.stopPropagation();
        setShowList(index)
    }
    const onClickEdit = (e) => {
        e.stopPropagation();
        handleEdit()
        setShowList(null)
    }
    const onClickDel = (e) => {
        e.stopPropagation();
        handleDel()
        setShowList(null)
    }
    return (
        <>
            <div className='moreBox' css={moreBox} onClick={onClickInner}>
                <img src="/icon_more_vert.svg" />
            </div>
            {
                showList === index
                    ? <div css={selectList}>
                        <div className='dropdown-item' onClick={onClickEdit}>修改快捷方式</div>
                        <div className='dropdown-item' onClick={onClickDel}>移除</div>
                    </div>
                    : null
            }

        </>
    )
}
