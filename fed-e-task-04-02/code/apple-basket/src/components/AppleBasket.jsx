import React from 'react'
import { observer } from 'mobx-react-lite'
import { useRootStore } from "../store"
import AppleItem from './AppleItem'
import '../styles/AppleBasket.scss'

function AppleBasket() {
    const { AppleStore } = useRootStore()
    const { isPicking, appleNow, appleEaten, appleNowList, addApple } = AppleStore
    return (
        <div className="appleBasket">
            <div className="header">苹果篮子</div>
            <section className="statistic">
                <div className="info">
                    <div className="title">当前</div>
                    <div className="content">{appleNow.number}个苹果，{appleNow.weight}克</div>
                </div>
                <div className="info">
                    <div className="title">已吃掉</div>
                    <div className="content">{appleEaten.number}个苹果，{appleEaten.weight}克</div>
                </div>
            </section>
            <section className="main">
                {
                    appleNowList.length
                        ? appleNowList.map(item => <AppleItem data={item} key={item.id} />)
                        : <div className="empty" >苹果篮子空空如也</div>
                }
            </section>
            <div className="btn-group">
                <button className={isPicking ? 'disabled' : ''} onClick={addApple}>{isPicking ? '正在摘苹果..' : '摘苹果'}</button>
            </div>
        </div>
    )
}





export default observer(AppleBasket)
