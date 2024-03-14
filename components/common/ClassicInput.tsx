import React, {memo, useEffect, useState, useCallback} from 'react'
import styled from 'styled-components'
import {getCssStable} from 'utils'

// const TYPE_MAP: {[key: string]: string} = {
//     password: 'password',
//     validCcode: 'number',
//     text: 'text',
//     mobile: 'number',
// }

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    height?: number
    isSearch?: boolean
    type?: string
    styles?: object
    borderColor?: string
    placeholder?: string
    align?: string
    value?: string | number
    // onChange: (newValue: string) => void
    isError?: boolean
    suffix?: string | React.ReactNode
    prefixItem?: string | React.ReactNode
    className?: string
    onFocus?: () => void
    isShowScore?: boolean
    focusBorder?: string
    disabled?: boolean
}

interface PsdEyeProps {
    isShowScore?: boolean
}

interface InputProps {
    placeholder?: string
    onFocus?: () => void
    onBlur?: () => void
    type?: string
    value?: string
    onChange?: (e) => void
    clearable?: boolean
    autoComplete?: string
}

interface InpurtWrapProps {
    hasLeftPadding?: boolean
    height?: number
    align?: string
    inputColor?: string
    placeholderColor?: string
}

export default memo(
    ({
        height = 64,
        isSearch = false,
        type = 'text',
        styles = {},
        placeholder = '',
        align = 'center',
        value,
        onChange,
        isError,
        suffix,
        prefixItem,
        className,
        isShowScore,
        focusBorder,
        borderColor,
        disabled,
    }: CustomInputProps) => {
        // const [visible, setVisible] = useState(false)
        const [focused, setFocused] = useState(false)
        const [psdType, setPsdType] = useState(type)
        const [useSecurity, setUserSecurity] = useState(true)

        useEffect(() => {
            const canUseSecurity = getCssStable('input', 'webkitTextSecurity')
            if (!canUseSecurity) {
                setUserSecurity(false)
            }
        }, [])

        const switchType = useCallback(() => {
            // console.log('swiching')
            setPsdType((type) => (type === 'password' ? 'text' : 'password'))
        }, [])

        const defaultedStyles = {
            borderColor: '#e8e8e8',
            focusedBorder: '#408bf9',
            inputColor: '#000',
            placeholderColor: '#B8BDC8',
            ...styles,
        }

        return (
            <Wrap
                height={height}
                className={isSearch ? `search-wrap ${className}` : className}
                isError={isError}
                isFocused={focused}
                disabled={disabled}
                {...defaultedStyles}
            >
                <PrefixWrap>{prefixItem || ' '}</PrefixWrap>
                <InputWrap
                    className={isSearch ? 'search-wrap' : ''}
                    height={height}
                    align={align}
                    hasLeftPadding={!!prefixItem}
                    style={{
                        ...defaultedStyles,
                        borderColor: focusBorder && focused ? focusBorder : borderColor,
                        border: borderColor ? `solid 1px ${borderColor}` : 'none',
                    }}
                >
                    {!disabled && (
                        <Input
                            name="input"
                            placeholder={placeholder}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            className={psdType === 'password' ? 'security-password-input' : ''}
                            type={useSecurity ? 'text' : psdType}
                            value={value as string}
                            onChange={(e) => onChange(e)}
                            clearable={!suffix && type !== 'valid-code' && type !== 'password'}
                            autoComplete={useSecurity ? 'off' : 'new-password'}
                        />
                    )}
                </InputWrap>
                {type === 'password' && (
                    <PasswordChangeIcon isShowScore={isShowScore} onClick={switchType}>
                        {psdType === 'password' ? (
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
                {suffix && type !== 'password' && type !== 'valid-code' && <SuffixWrap>{suffix}</SuffixWrap>}
            </Wrap>
        )
    }
)

interface WrapProps {
    height: number
    isFocused?: boolean
    focusedBorder?: string
    borderColor?: string
    isError?: boolean
    disabled?: boolean
}

const Wrap = styled.div<WrapProps>`
    width: 100%;
    height: ${(props) => `${props.height}px`};
    /* border-bottom: solid 1px;
    border-color: ${(props) => (props.isFocused ? props.focusedBorder : props.borderColor)}; */
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'default')};

    &.search-wrap {
        border: solid 2px #e8e8e8 !important;
        border-radius: ${(props) => `${props.height / 2}px`};
        height: ${(props) => `${props.height}px`} !important;
    }

    .suffix-eye {
        width: 36px;
        height: 36px;
    }
`

const InputWrap = styled.div<InpurtWrapProps>`
    width: 100%;
    height: 100%;
    padding-right: 0 !important;
    padding-left: ${(props) => (props.hasLeftPadding ? '64px' : '0')};
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &.search-wrap {
        padding-left: 128px !important;
        padding-right: 20px !important;
    }

    .za-input {
        width: 100%;
        height: 100%;
        line-height: ${(props) => `${props.height}px`};
        box-sizing: border-box;
        /* padding-right: 0 !important;
    padding-left: ${(props) => (props.hasLeftPadding ? '64px' : '0')}; */
        input {
            text-align: ${(props) => props.align};
            color: ${(props) => `${props.inputColor} !important`};

            ::placeholder {
                color: ${(props) => `${props.placeholderColor} !important`};
                font-size: 14px;
            }
        }
    }

    .za-input--focus {
        padding-right: 0 !important;
    }
`

const Input = styled.input<InputProps>`
    visibility: visible;
    height: 100%;
    border: none !important;
    width: 100%;
    outline: none !important;
`

const PrefixWrap = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`
const SuffixWrap = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-left: 6px;
`

const PasswordChangeIcon = styled.div<PsdEyeProps>`
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: ${(props) => (props.isShowScore ? '4px' : '12px')};
    top: 8px;
    cursor: pointer;
    user-select: none;
`
