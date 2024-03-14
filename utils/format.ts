import moment from 'moment'
import Decimal from 'decimal.js'
import pako from 'pako'

export function formatDecimal(num: number | string, decimal = 2): number | string {
    if (num === null || Number.isNaN(Number(num))) return '--'

    if (+num === 0) return '0'

    let prefix = ''
    num = num.toString()

    if (num[0] === '-') {
        prefix = '-'
        num = num.substr(1)
    }

    const index = num.indexOf('.')
    if (index !== -1) {
        num = num.substring(0, decimal + index + 1)
    } else {
        num = num.substring(0)
    }

    const result = parseFloat(num).toFixed(decimal)
    return prefix ? -1 * +result : result
}

export function changeToPercentWithToFixed(num: number, decimal = 2): string {
    if (Number.isNaN(Number(num))) {
        return `${num}`
    }

    let str = Number(num * 100).toFixed(decimal)
    str += '%'
    return str
}

export function toThousands(val: number | string): string {
    if (!val) return ''
    const str = `${val}`
    return str.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
}

export function formatDate(date, fmt) {
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

export function formatLeftTime(time: number | string, maxTime = null): string {
    if (time) {
        const _t = Number(moment(time).format('m'))
        if (_t > 0) {
            return `${_t + 1 > maxTime && maxTime ? maxTime : _t + 1}分钟`
        }
        // if (Number(moment(time).format('s')) > 0) {
        //   return `${moment(time).format('s')}秒`
        // }
        return '1分钟'
    }
    return ''
}

export function bankFormat(val: string): string {
    if (!val) return ''
    const str = `${val}`
    return str
        .replace(/[^\dA-Z]/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim()
}

export function noSpaceNumber(val) {
    if (!val) return ''
    const str = `${val}`
    return str.replace(/\s|\xA0/g, '')
}
/*
format a string|number to a string without scientific notation
*/
export function noScifiFormat(x: number | string): string {
    if (!x) return ''
    if (Math.abs(+x) < 1.0) {
        const e = parseInt(x.toString().split('e-')[1], 10)
        if (e) {
            const a = new Decimal(10).pow(new Decimal(e).minus(1).valueOf()).valueOf()
            x = new Decimal(x).mul(a).valueOf()
            x = `0.${new Array(e).join('0')}${x.toString().substring(2)}`
        }
    } else {
        let e = parseInt(x.toString().split('+')[1], 10)
        if (e > 20) {
            e -= 20
            x = +x / 10 ** e
            x = x.toString() + new Array(e + 1).join('0')
        }
    }
    return x.toString()
}

export function formatWsData(data: any) {
    return new Promise((resolve) => {
        if (data instanceof Blob) {
            try {
                const reader = new FileReader()
                reader.onload = () => {
                    const result = pako.ungzip(reader.result, {to: 'string'})
                    resolve(result)
                }
                reader.readAsArrayBuffer(data)
            } catch (error) {
                resolve('')
            }
        } else if (typeof data === 'string') {
            resolve(data)
        }
    })
}

export function toThousandsWithFloat(val) {
    if (!val) return ''
    const str = `${val}`
    if (str.indexOf('.') !== -1) {
        return `${str.split('.')[0].replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')}.${str.split('.')[1]}`
    }
    return str.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
}

export function getLimitNumber(value, precision) {
    const [intPart, floatPart] = value.split('.')
    if (!value) {
        return value
    }
    if (value.indexOf('.') === -1) {
        return value
    }
    if (intPart.length + floatPart.length > precision) {
        if (intPart.length === precision) {
            return intPart
        }
        const lastFloats = floatPart.slice(0, precision - 1 - intPart.length)
        return Number(`${intPart}.${lastFloats}`)
    }

    return Number(value) || '-'
}
