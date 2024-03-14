import {useEffect, useState} from 'react'
import moment from 'moment'

export const isFalsy = (value: unknown) => (value === 0 ? false : !value) // 所以，log()#3 结束后，就只剩timeout#3在独自等待了

export const useDebounce = <T>(value: T, delay?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedValue(value), delay)

        return () => clearTimeout(timeout)
    }, [value, delay])

    return debouncedValue
}

export const changeToPercent = (num, decimal = 2) => {
    if (Number.isNaN(Number(num))) {
        return num
    }

    let str = Number(num * 100)
        .toFixed(decimal + 1)
        .slice(0, -1)
    str += '%'
    return str
}

export const formatDecimal = (num: number, decimal = 2): number | string => {
    if (num === null || Number.isNaN(Number(num))) return '--'

    if (num * 1 === 0) return '0'

    let prefix = ''
    let numStr = num.toString()

    if (num[0] === '-') {
        prefix = '-'
        numStr = numStr.substr(1)
    }

    const index = numStr.indexOf('.')
    if (index !== -1) {
        numStr = numStr.substring(0, decimal + index + 1)
    } else {
        numStr = numStr.substring(0)
    }

    const result = parseFloat(numStr).toFixed(decimal)
    return Number(`${prefix}${result}`)
}

export const formatDecimalWithOutZero = (num, decimal = 2, direc = 'up') => {
    // direc up舍入 down 舍出
    if (num === null || Number.isNaN(Number(num))) return '-'

    if (num * 1 === 0) return '0'

    let prefix = ''
    num = num.toString()

    const [_first] = num
    if (_first === '-' || _first === '+') {
        prefix = _first
        num = num.substr(1)
    }

    const _deci: any = `1${'0'.repeat(decimal)}` || 100

    const _result = direc === 'up' ? Math.round(num * _deci) / _deci : Math.floor(num * _deci) / _deci

    return `${prefix}${_result}`
}

export const formatDecimalWithZero = (num: any, decimal = 2): string | number => {
    if (num === null || Number.isNaN(Number(num))) return '--'

    if (decimal === 0) return parseInt(num, 10)

    let prefix = ''
    let numStr = num.toString()

    if (numStr[0] === '-') {
        prefix = '-'
        numStr = numStr.substr(1)
    }

    const index = numStr.indexOf('.')
    if (index !== -1) {
        numStr = numStr.substring(0, decimal + index + 1)
    } else {
        numStr = numStr.substring(0)
    }

    const result = parseFloat(numStr).toFixed(decimal)
    return prefix ? -1 * Number(result) : result
}

export const changeToPercentCeil = (num, decimal = 2) => {
    if (Number.isNaN(Number(num))) {
        return num
    }

    let str = Number(num * 100).toFixed(decimal)
    str += '%'
    return str
}

export const formatDate = (date, fmt) => {
    // author: meizz
    if (typeof date === 'string') {
        date = date.replace(/-/g, '/')
    }
    date = new Date(date * 1000)
    const o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds(), // 毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length))

    Object.keys(o).forEach((k) => {
        if (new RegExp(`(${k})`).test(fmt))
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length))
    })
    return fmt
}

export function formatTime(time) {
    return moment(time).format('YYYY-MM-DD HH:mm:ss')
}

// 科学技术法转换
export const transferToNumber = (inputNumber: number): any => {
    if (isNaN(inputNumber)) {
        return inputNumber
    }

    const _input = parseFloat(inputNumber + '')
    const eformat = _input.toExponential() // 转换为标准的科学计数法形式（字符串）
    const tmpArray: any = eformat.match(/\d(?:\.(\d*))?e([+-]\d+)/) // 分离出小数值和指数值
    const number = _input.toFixed(Math.max(0, (tmpArray[1] || '').length - tmpArray[2]))
    return number
}

export const getCurApi = () => {
    if (typeof window !== 'undefined') {
        const {host} = window.location
        const _url = host.split('.').splice(-2, 2).join('.') || 'metaworld.com'

        return `wss://ws.${_url}/v3`
    }
}

export const getCssStable = (elem, attr) => {
    const x = document.createElement(elem)
    const styles = window.getComputedStyle(x)
    const styleList = Object.keys(styles)
    return styleList.indexOf(attr) !== -1
}

export const toArray = <T>(value: T | T[]): T[] => {
    if (Array.isArray(value)) {
        return value
    }
    return value !== undefined ? [value] : []
}
