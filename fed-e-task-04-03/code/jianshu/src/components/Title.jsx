import React from 'react'
import { title } from '../Style';

export default function Title({ type, changeType }) {
    return (
        <div css={title}>
            <div className="normal-title">
                <span className={type === 0 ? 'label active' : 'label'} onClick={() => changeType(0)}>登录</span>
                <b>·</b>
                <span className={type === 1 ? 'label active' : 'label'} onClick={() => changeType(1)}>注册</span>
            </div>
        </div>
    )
}
