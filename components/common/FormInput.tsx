import {useState, useCallback, useEffect, useMemo, memo} from 'react'
import styled from 'styled-components'
import {useController, UseControllerOptions} from 'react-hook-form'
import {getCssStable} from 'utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    setVal?: () => void
    isShowScore?: boolean
    pwChangeRight?: number
    isClear?: boolean
    padding?: string
    txtColor?: string
    txtFontSize?: string
    placeholder: string
    placeholderCss?: string
    borderColor?: string
    borderErrorColor?: string
    borderRadius?: number
    isError?: boolean
}

interface PsdEyeProps {
    isShowScore?: boolean
    pwChangeRight?: number
}

interface ClearProps extends PsdEyeProps {
    isPassword?: boolean
    isClear?: boolean
}

interface ScoreItemProps {
    index: number
    psdIndex: number
}

const FormInput = memo(
    (props: InputProps & UseControllerOptions): JSX.Element => {
        const {field} = useController(props)
        const {type, setVal, isClear, isShowScore, pwChangeRight} = props
        const {value} = field

        const [psdType, setPsdType] = useState(type)

        const [useSecurity, setUserSecurity] = useState(true)

        useEffect(() => {
            const canUseSecurity = getCssStable('input', 'webkitTextSecurity')
            if (!canUseSecurity) {
                setUserSecurity(false)
            }
        }, [])

        const switchType = useCallback(() => {
            setPsdType((type) => (type === 'password' ? 'text' : 'password'))
        }, [])

        return (
            <Wrap>
                <Input
                    className={useSecurity && psdType === 'password' ? 'psword' : psdType}
                    {...field}
                    {...props}
                    type={useSecurity && psdType === 'password' ? 'psword' : psdType}
                    autoComplete="off"
                />

                {isClear && value && value.length > 0 && (
                    <ClearIcon
                        onClick={setVal}
                        isPassword={type === 'psword' || type === 'password'}
                        isShowScore={isShowScore}
                        isClear={isClear}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="8" fill="#A7ACB8" />
                            <path d="M8 8L15.7782 15.7782" stroke="white" />
                            <path d="M16 8L8.22182 15.7782" stroke="white" />
                        </svg>
                    </ClearIcon>
                )}

                {type && (type === 'password' || type === 'psword') && (
                    <PasswordChangeIcon pwChangeRight={pwChangeRight} isShowScore={isShowScore} onClick={switchType}>
                        {psdType === 'password' || psdType === 'psword' ? (
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4 8C4.7619 9.33333 7.42857 12 12 12C16.5714 12 19.2381 9.33333 20 8"
                                    stroke="#A7ACB8"
                                />
                                <path d="M7 15.5H8V12.5H7V15.5Z" fill="#A7ACB8" />
                                <path d="M16 15.5H17V12.5H16V15.5Z" fill="#A7ACB8" />
                                <path d="M11.5 16.5H12.5V13.5H11.5V16.5Z" fill="#A7ACB8" />
                            </svg>
                        ) : (
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12.0003 11.9434C11.0264 11.9434 10.2314 12.6863 10.2314 13.5987C10.2314 14.5127 11.0246 15.2557 12.0003 15.2557C12.9743 15.2557 13.7674 14.5127 13.7674 13.5987C13.7674 12.6863 12.9743 11.9434 12.0003 11.9434Z"
                                    fill="#A7ACB8"
                                />
                                <path
                                    d="M20.0022 13.5869C19.9378 13.2833 19.825 13.129 19.5869 12.8188C19.3487 12.5068 19.3093 12.4129 18.7132 11.9165C16.819 10.3416 14.2588 9.062 11.8668 9.11902C10.5509 9.14921 9.36749 9.48967 8.08918 10.0029C7.10806 10.397 6.20035 10.8934 5.41796 11.5391C5.0402 11.8511 4.6499 12.21 4.42611 12.594C4.42611 12.594 4.23454 12.859 4.111 13.1844C4.03223 13.3923 4 13.6372 4 13.8116C4 14.2611 4.31868 14.5848 4.31868 14.5848C4.47265 14.7475 4.69645 14.947 4.85758 15.0963C5.40543 15.6095 5.97118 16.0103 6.59602 16.3793C7.27994 16.7835 8.03189 17.1441 8.83218 17.4158C9.76137 17.7311 10.9 18.0514 11.8668 18.0581C12.6904 18.0648 13.6447 17.8602 14.4449 17.6137C14.8979 17.4745 16.5092 16.76 17.9236 15.8695C19.1697 15.0846 20.124 14.1571 20.0022 13.5869ZM11.9975 16.4799C10.3038 16.4799 8.92706 15.1885 8.92706 13.6037C8.92706 12.0188 10.3038 10.7274 11.9975 10.7274C13.6894 10.7274 15.068 12.0171 15.068 13.6037C15.0662 15.1885 13.6894 16.4799 11.9975 16.4799Z"
                                    fill="#A7ACB8"
                                />
                                <rect x="6.27539" y="6.07031" width="1" height="3.22009" fill="#A7ACB8" />
                                <rect x="16.5879" y="6.07031" width="1" height="3.22009" fill="#A7ACB8" />
                                <path d="M11.5 5H12.5V8.22009H11.5V5Z" fill="#A7ACB8" />
                            </svg>
                        )}
                    </PasswordChangeIcon>
                )}

                {isShowScore && <PsdSocre val={value} />}
            </Wrap>
        )
    }
)

const PsdSocre = memo(({val}: {val: string}) => {
    // 判断输入密码的类型
    const charMode = useCallback((iN) => {
        if (iN >= 48 && iN <= 57)
            // 数字
            return 1
        if (iN >= 65 && iN <= 90)
            // 大写
            return 2
        if (iN >= 97 && iN <= 122)
            // 小写
            return 4
        return 8
    }, [])

    // 计算密码模式
    const bitTotal = useCallback((num) => {
        let modes = 0
        for (let i = 0; i < 6; i++) {
            if (num & 1) modes++
            num >>>= 1
        }
        return modes
    }, [])

    // 返回强度级别
    const checkStrong = useCallback((sPW) => {
        if (!sPW || sPW.length <= 6) return 0 // 暂定6位
        let Modes = 0
        for (let i = 0; i < sPW.length; i++) {
            // 密码模式
            Modes |= charMode(sPW.charCodeAt(i))
        }
        return bitTotal(Modes)
    }, [])

    const psdIndex = useMemo(() => {
        return checkStrong(val)
    }, [val])

    return (
        <ScoreWrap>
            <ScoreItem index={3} psdIndex={psdIndex}></ScoreItem>
            <ScoreItem index={2} psdIndex={psdIndex}></ScoreItem>
            <ScoreItem index={1} psdIndex={psdIndex}></ScoreItem>
        </ScoreWrap>
    )
})

const Wrap = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`

const Input = styled.input<InputProps>`
    width: 100%;
    height: 100%;
    padding: ${(props) => props.padding};
    box-sizing: border-box;
    position: relative;
    border: ${(props) => (props.isError ? `1px solid ${props.borderErrorColor}` : `1px solid ${props.borderColor}`)};
    box-sizing: border-box;
    background: transparent !important;
    border-radius: ${(props) => `${props.borderRadius}px`};
    outline: none;
    box-shadow: none;
    color: ${(props) => props.txtColor || 'rgba(0, 0, 0, .85)'};
    font-size: ${(props) => props.txtFontSize};
    line-height: 17px;

    &.psword {
        font-family: text-security-disc;
        /* text-security     : disc; */
        -webkit-text-security: disc;
    }

    :-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #fff inset;
    }

    ::-ms-reveal {
        display: none;
    }

    ::-webkit-input-placeholder {
        /* WebKit, Blink, Edge */
        color: ${(props) => props.placeholderCss};
    }
    :-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: ${(props) => props.placeholderCss};
    }
    ::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: ${(props) => props.placeholderCss};
    }
    :-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: ${(props) => props.placeholderCss};
    }
    ::-ms-input-placeholder {
        /* Microsoft Edge */
        color: ${(props) => props.placeholderCss};
    }
    ::placeholder {
        /* Most modern browsers support this now. */
        color: ${(props) => props.placeholderCss};
    }
`

const ClearIcon = styled.div<ClearProps>`
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: ${(props) => {
        if (!props.isPassword) {
            return '12px'
        }

        if (props.isClear && props.isShowScore) {
            return '54px'
        }

        return '40px'
    }};
    top: 8px;
    cursor: pointer;
    user-select: none;
`

const PasswordChangeIcon = styled.div<PsdEyeProps>`
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: ${(props) => (props.isShowScore ? `${props.pwChangeRight || 24}px` : `${props.pwChangeRight || 12}px`)};
    top: 8px;
    cursor: pointer;
    user-select: none;
`

const ScoreWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 4px;
    height: 16px;
    position: absolute;
    right: 12px;
    top: 12px;
`

const ScoreItem = styled.div<ScoreItemProps>`
    width: 4px;
    height: 4px;
    background: ${(props) => {
        if (props.psdIndex === 0) {
            return '#F2F2F2'
        }

        if (props.psdIndex === 1) {
            if (props.index === 1) {
                return '#E94747'
            }
            return '#F2F2F2'
        }

        if (props.psdIndex === 2) {
            if (props.index <= 2) {
                return '#DE812B'
            }
            return '#F2F2F2'
        }

        if (props.psdIndex === 3) {
            return '#0EA786'
        }
    }};
`

export default FormInput
