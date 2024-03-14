import {createContext, useState, useContext, ReactNode} from 'react'

interface DataProps {
    quote: object
    options: object
    swap: object
    depth: object
    transaction: object
}

interface SetParamsProps {
    key: string
    val: object
}

// interface SetDataProps {
//     setWsData: ({ key, val}: SetParamsProps) => void
// }

const WsContext = createContext<{
    wsData: DataProps
    setWsData: ({key, val}: SetParamsProps) => void
} | null>(null)

export const WsProvider = ({children}: {children: ReactNode}) => {
    const [wsData, setData] = useState<DataProps>({
        quote: {},
        options: {},
        swap: {},
        depth: {},
        transaction: {},
    })

    const setWsData = ({key, val}: SetParamsProps) => {
        if (key === 'transaction') {
            const _prevData = wsData['transaction'][val['symbol']] || []

            setData({
                ...wsData,
                [key]: {
                    [val['symbol']]: [..._prevData, ...val['val']],
                },
            })
        } else {
            setData({
                ...wsData,
                [key]: {
                    ...wsData[key],
                    ...val,
                },
            })
        }
    }

    return <WsContext.Provider value={{wsData, setWsData}}>{children}</WsContext.Provider>
}

export const useWsContent = () => {
    const context = useContext(WsContext)

    if (!context) {
        throw new Error('useAuth必须在AuthProvider中使用')
    } else {
        return context
    }
}
