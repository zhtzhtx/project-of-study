import { css } from '@emotion/react'

const container = css`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const main = css`
    width: 561px;
    text-align:center;
    &>img{
        margin-bottom: 38px;
    }
`

const inputWrapper = css`
    position: relative;
    width: 100%;
    height: 44px;
    font-size: 16px;
    border-radius: 22px;
    box-shadow: 0 1px 6px 0 rgb(32 33 36 / 28%);
    margin-bottom: 16px;
    &>input{
        position: relative;
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 50%;
        padding-inline-end: 44px;
        padding-inline-start: 52px;
        background-color: white;
        font-family: inherit;
        font-size: inherit;
        outline: none;
    }
    &>.icon_search{
        position: absolute;
        left: 12px;
        top: 12px;
    }
    &>.icon_clr{
        position: absolute;
        right: 12px;
        top: 12px;
    }
`

const mostVisited = css`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const tile = css`
    position: relative;
    width: 112px;
    height: 112px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    &:hover{
        background-color: #E8E8E9;
        &>.moreBox{
            display: block;
        }
    }
    &>.tile-icon{
        width: 48px;
        height: 48px;
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        margin-top: 16px;
        background-color: rgba(241, 243, 244, 1);
        border-radius: 50%;
        &>img{
            width: 24px;
            height: 24px;
        }
    }
    &>.tile-title{
        height: 32px;
        display: flex;
        align-items: center;
        color: #000;
        line-height: 16px;
        margin-top: 6px;
        padding: 2px 8px;
        &>span{
            width: 100%;
            font-size: 13px;
            font-weight: 400;
            overflow: hidden;
            text-align: center;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
`

const mask = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgb(0,0,0,0.6);
    z-index: 99;
`

const dialog = css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 512px;
    height: 267px;
    text-align: left;
    border: 0;
    border-radius: 8px;
    box-shadow: 0 0 16px rgb(0 0 0 / 12%), 0 16px 16px rgb(0 0 0 / 24%);
    background: white;
    z-index: 100;
    &>.title{
        font-size: 15px;
        line-height: 15px;
        padding: 20px;
    }
    &>.body{
        padding: 0 20px;
        &>.dialogInput{
            height: 63px;
            font-size: 13px;
            &>label{
                display: block;
                color: rgb(95, 99, 104);
                font-size: 12px;
                font-weight: 500;
                letter-spacing: 0.4px;
                line-height: 10px;
                margin-bottom: 8px;
            }
            &>input{
                width: 100%;
                padding: 5px;
                border: 0;
                outline: 0;
                caret-color: rgb(26, 115, 232);
                background-color: #F1F3F4;
            }
        }
    }
    &>.button-container{
        display: flex;
        justify-content: flex-end;
        padding: 24px 16px 16px 16px;
        &>button{
            width: 67px;
            height: 32px;
            padding: 8px 16px;
            margin-right: 8px;
            font-size: 13px;
            color:  rgb(26, 115, 232);
            border: 1px solid rgb(218, 220, 224);
            border-radius: 4px;
            outline: 0;
            background-color: white;
            cursor: pointer;
            &:hover{
                background-color: rgb(66, 133, 244,0.04)
            }
            &.disabled{
                border: 0;
                color: rgb(128, 134, 139);
                background-color: rgb(241, 243, 244);
                cursor: not-allowed;
            }
        }
    }
`

const moreBox = css`
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 99;
`
const selectList = css`
    position: absolute;
    top: 0;
    right: 0;
    width: 128px;
    background: white;
    box-shadow: rgb(158, 158, 158) 0px 2px 6px 0px;
    outline: none;
    padding: 8px 0;
    z-index: 110;
    &>.dropdown-item{
        display: flex;
        align-items: center;
        color: #000;
        font-size: 13px;
        padding: 0 24px;
        background: none;
        border: none;
        border-radius: 0;
        box-sizing: border-box;
        min-height: 32px;
        text-align: start;
        user-select: none;
        &:hover{
            background-color: #E8E8E9;
        }
    }
`
export { container, main, inputWrapper, mostVisited, tile, mask, dialog, moreBox, selectList }