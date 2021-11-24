import React from 'react'
import { observer } from 'mobx-react-lite'
import { useRootStore } from "../store"
import '../styles/AppleItem.scss'

function AppleItem({ data }) {
    const { AppleStore } = useRootStore()
    const { eatApple } = AppleStore
    return (
        <div className="item">
            <div className="apple">
                <img src={require('../images/apple.png').default} alt="" />
            </div>
            <div className="info">
                <div className="name">红苹果 - {data.id}号</div>
                <div className="weight">{data.weight}克</div>
            </div>
            <div className="btn-div">
                <button onClick={() => eatApple(data)}> 吃掉 </button>
            </div>
        </div>
    )
}
export default observer(AppleItem)