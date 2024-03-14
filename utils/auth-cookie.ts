import nookies from 'nookies'
import {v4 as uuidv4} from 'uuid'

const LOCAL_TOKEN = 'LOCAL_USER_TOKEN'
const LOCAL_UUID = 'LOCAL_USER_UUID'

export const setTokenCookie = (ctx = null, val: string) => {
    // Set
    if (!val) {
        nookies.destroy(ctx, LOCAL_TOKEN, {
            path: '/',
        })

        if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token')
            localStorage.removeItem('reg_account')
        }
    } else {
        nookies.set(ctx, LOCAL_TOKEN, val, {
            path: '/',
            maxAge: 30 * 24 * 60 * 60,
        })

        if (typeof window !== 'undefined') {
            localStorage.setItem('access_token', val)
        }
    }
}

export const getTokenCookie = (ctx = null) => {
    const cookies = nookies.get(ctx)
    if (cookies[LOCAL_TOKEN] && typeof window !== 'undefined') {
        localStorage.cookie = cookies[LOCAL_TOKEN]
    }
    //  && localStorage.cookie = cookies[LOCAL_TOKEN]
    return cookies[LOCAL_TOKEN] || ''
}

export const generateLocalUUID = (ctx = null) => {
    let _token = ''
    // Set
    if (typeof window !== 'undefined') {
        _token = localStorage.uuid
    }

    if (!_token) {
        _token = uuidv4().replace(/-/g, '')
    }

    nookies.set(ctx, LOCAL_UUID, _token, {
        path: '/',
        maxAge: 30 * 24 * 60 * 60,
    })

    if (typeof window !== 'undefined') {
        localStorage.setItem('uuid', _token)
    }

    return _token
}

export const getUUIDCookie = (ctx = null) => {
    const cookies = nookies.get(ctx)

    if (!cookies[LOCAL_UUID]) {
        return generateLocalUUID(ctx)
    }

    if (typeof window !== 'undefined') {
        localStorage.setItem('uuid', cookies[LOCAL_UUID])
    }

    return cookies[LOCAL_UUID] || ''
}

export const getLangCookie = (ctx = null) => {
    const cookies = nookies.get(ctx)

    if (typeof window !== 'undefined') {
        let _lang = 'en'
        let oldLang = 'en'
        const {pathname} = window.location
        const _urlLang = pathname.split('/')[1]

        if (['ZH-CN', 'ZH-HK'].indexOf(_urlLang.toUpperCase()) > -1) {
            _lang = _urlLang
            oldLang = _urlLang.toUpperCase().indexOf('CN') > -1 ? 'zh' : 'hk'
        } else if (_urlLang.toUpperCase() === 'KO-KR') {
            _lang = 'ko-KR'
            oldLang = 'kr'
        }

        localStorage.setItem('site_lang', oldLang)

        return _lang
    }

    return cookies['NEXT_LOCALE'] || 'en'
}

export const setFinanceCookie = (ctx = null, val: string) => {
    // Set
    if (!val) {
        nookies.destroy(ctx, 'FINANCE_RATE', {
            path: '/',
        })

        if (typeof window !== 'undefined') {
            localStorage.removeItem('FINANCE_RATE')
        }
    } else {
        nookies.set(ctx, 'FINANCE_RATE', val, {
            path: '/',
            maxAge: 30 * 24 * 60 * 60,
        })

        if (typeof window !== 'undefined') {
            localStorage.setItem('FINANCE_RATE', val)
        }
    }
}

export const getFinanceCookie = (ctx = null) => {
    const cookies = nookies.get(ctx)

    return cookies['FINANCE_RATE'] || ''
}
