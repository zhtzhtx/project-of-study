import React from 'react'
import { inputWrapper } from "../styles/style"

export default function SearchInput() {
    return (
        <div css={inputWrapper}>
            <input type="search" autoComplete="off" placeholder="在 Google 上搜索，或者输入一个网址" />
            <img className='icon_search' src="/search.svg"></img>
            <img className='icon_clr' src="/googlemic_clr_24px.svg"></img>
        </div>
    )
}
