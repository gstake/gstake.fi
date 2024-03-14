import {createContext, useState, useContext, ReactNode, useEffect} from 'react'
import {getTokenCookie, setTokenCookie} from 'utils/auth-cookie'

const AuthContext = createContext<
    | {
          userToken: string
          setToken: (token: string) => void
          pending: boolean
      }
    | undefined
>(undefined)

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [userToken, setUserToken] = useState<string>('')
    const [pending, setPending] = useState(true)
    const setToken = (token: string) => {
        if (!token) {
            setTokenCookie(null, '')
        }
        setUserToken(token)
    }

    useEffect(() => {
        const token = getTokenCookie()
        setPending(false)
        setUserToken(token)
    }, [])

    return <AuthContext.Provider value={{userToken, setToken, pending}}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth必须在AuthProvider中使用')
    } else {
        return context
    }
}
