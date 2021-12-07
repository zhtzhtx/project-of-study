import { css } from '@emotion/react'

const container = css`
    width: 400px;
    margin: 0 auto;
    padding: 50px 50px 30px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 8px rgb(0 0 0 / 10%);
    vertical-align: middle;
    display: inline-block;
    text-align: center;
    font-size: 14px;
    & ,*{
        box-sizing:border-box
    }
`
const title = css`
    margin: 0 auto 50px;
    padding: 10px;
    font-weight: 400;
    color: #969696;
    font-size: 18px;
    & .label{
        padding: 10px;
        color: #969696;
        cursor: pointer;
        &.active{
            font-weight: 700;
            color: #ea6f5a;
            border-bottom: 2px solid #ea6f5a;
        }
    }
    & b{
        font-weight: 700;
        padding:10px;
    }
`

const inputBox = css`
    position: relative;
    & > .tooltip-inner{
        position: absolute;
        top:0%;
        left:101%;
        max-width: 280px;
        padding: 14px 0;
        color: #333;
        border: 1px solid #ea6f5a;
        background-color: #fff;
        text-align: center;
        border-radius: 4px;
        & > span{
            vertical-align: middle;
            display: block;
            white-space: normal;
            min-width: 230px;
            word-break:break-all;
        }
    }
`

const input = css`
    width: 100%;
    height: 50px;
    margin-bottom: 0;
    padding: 4px 12px 4px 35px;
    border: 1px solid #c8c8c8;
    border-radius: 0 0 4px 4px;
    background-color: hsla(0,0%,71%,.1);
    vertical-align: middle;
`

const button = css`
    margin-top: 20px;
    width: 100%;
    padding: 9px 18px;
    font-size: 18px;
    border: none;
    border-radius: 25px;
    color: #fff;
    background: #42c02e;
    cursor: pointer;
    outline: none;
    display: block;
    clear: both;
`
const signUpMsg = css`
    margin: 10px 0;
    padding: 0;
    text-align: center;
    font-size: 12px;
    line-height: 20px;
    color: #969696;
`
const alertStyle = css`
    position: fixed;
    top:10%;
    left:40%;
    color:red;
    padding: 10px;
    font-size:18px;
    border: 1px solid red;
    border-radius: 5px;
`

export { container, title, input, inputBox, button, signUpMsg, alertStyle }