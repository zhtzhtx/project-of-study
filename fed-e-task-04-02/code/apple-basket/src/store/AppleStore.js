import { makeObservable, observable, action, computed } from "mobx"

export default class AppleStore {
    constructor() {
        this.appleList = []
        this.isPicking = false
        makeObservable(this, {
            appleList: observable,
            isPicking: observable,
            addApple: action.bound,
            appleNow: computed,
            appleEaten: computed
        })
    }
    get appleNow() {
        const list = this.appleList.filter(apple => !apple.isEaten)
        const totalWeight = list.reduce((tol, cur) => {
            return tol = tol + cur.weight
        }, 0)
        return { number: list.length, weight: totalWeight }
    }
    get appleEaten() {
        const list = this.appleList.filter(apple => apple.isEaten)
        const totalWeight = list.reduce((tol, cur) => {
            return tol = tol + cur.weight
        }, 0)
        return { number: list.length, weight: totalWeight }
    }
    get appleNowList() {
        return this.appleList.filter(apple => !apple.isEaten)
    }
    async addApple() {
        // const res = await fetch('https://hacker-news.firebaseio.com/v0/jobstories.json')
        if (this.isPicking) return
        const mock = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true)
            }, 1500)
        })
        this.isPicking = true
        await mock
        let weight = Math.floor(200 + Math.random() * 50);
        this.appleList.push({
            id: this.appleList.length + 1,
            weight: weight,
            isEaten: false
        });
        this.isPicking = false
    }
    eatApple(data) {
        data.isEaten = true
    }
}