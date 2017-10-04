"use strict"

class Util {
    static random(max = 1, min = 0) {
        if(min >= max) return
        let randomValue = Math.random()
        randomValue *= max - min
        randomValue += min
        return randomValue
    }

    static max(array) {
        let max = array[0]
        for(let n of array) {
            if(n > max) max = n
        }
        return max
    }
}