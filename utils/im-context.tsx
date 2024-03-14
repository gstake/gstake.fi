import {createContext, useState, useContext, ReactNode} from 'react'

interface ImDataProps {
    sdkAppId: string
    userId: string
    userSig: string
}

const IMContext = createContext<
    | {
          imData?: ImDataProps
          updateImData: (newData) => void
      }
    | undefined
>(undefined)

export const ImProvider = ({children}: {children: ReactNode}) => {
    const [imData, setImData] = useState<ImDataProps>({
        sdkAppId: '',
        userId: '',
        userSig: '',
    })

    const updateImData = (newData: ImDataProps) => {
        setImData(newData)
    }

    return <IMContext.Provider value={{imData, updateImData}}>{children}</IMContext.Provider>
}

export const useIM = () => {
    const context = useContext(IMContext)

    if (!context) {
        throw new Error('useIM必须在AuthProvider中使用')
    } else {
        return context
    }
}
