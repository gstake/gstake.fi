import {memo, useState, useEffect, useRef, ReactElement, ReactNode, isValidElement, useCallback} from 'react'
import styled from 'styled-components'
import toArray from 'rc-util/lib/Children/toArray'
// import Select, { Option } from 'rc-select'

interface HandleOpenProps {
    isOpen?: boolean
    height?: number
    isDisable?: boolean
}

interface SelectProps {
    placeholder?: string
    value: string
    children: string | ReactNode
    onChange: (val: string) => void
    style?: object
    height?: number
    className?: string
    closeFlag?: number
    disabled?: boolean
}

export default memo(
    ({
        closeFlag,
        value,
        style = {},
        onChange,
        children,
        placeholder,
        className,
        height,
        disabled = false,
    }: SelectProps) => {
        const optionsRef = useRef()
        const [data, setData] = useState([])
        const [curText, setCurText] = useState('')
        const [curValue, setCurValue] = useState(value)
        const [isOpen, setIsOpen] = useState(false)
        const [isSelected, setIsSelected] = useState(true)

        useEffect(() => {
            setIsOpen(false)
        }, [closeFlag])

        const handleToggleDropdown = useCallback(
            (e) => {
                if (!disabled) {
                    e.preventDefault()
                    setIsOpen(!isOpen)
                }
            },
            [isOpen, disabled]
        )

        useEffect(() => {
            setCurValue(value)
        }, [value])

        useEffect(() => {
            onChange && onChange(curValue)
        }, [curValue])

        useEffect(() => {
            if (children) {
                setData(convertChildrenToData(children as ReactNode))
            }
        }, [children])

        useEffect(() => {
            if (data?.length) {
                const targetVal = data.find((x) => x.value === value)
                // targetVal && setCurText(targetVal.children)
                if (targetVal) {
                    setCurText(targetVal.children)
                    setIsSelected(true)
                } else {
                    setIsSelected(false)
                }
            }
        }, [data, value])

        return (
            <SelectWrap height={height} className={className} style={{...style}} isOpen={isOpen} isDisable={disabled}>
                <input type="hidden" value={curText} />
                <span
                    className={`${!isSelected ? 'not-selected' : ''} ${disabled ? 'disabled' : ''}`}
                    onClick={handleToggleDropdown}
                >
                    {isSelected ? curText : placeholder}
                </span>
                <SuffixWrap height={height} onClick={handleToggleDropdown} isOpen={isOpen}>
                    {/* <Image
                    className="icon-img"
                    src="/static/img/search_form_arrow.png"
                    alt="logo of MetaWorld"
                    width={20}
                    height={20}
                /> */}
                    <img
                        className="icon-img"
                        src={require('../../public/static/img/search_form_arrow.png')}
                        alt="logo of MetaWorld"
                        width={20}
                        height={20}
                    />
                </SuffixWrap>

                <OptionsWrap isOpen={isOpen} ref={optionsRef}>
                    {data.length > 0 &&
                        data.map((item, index) => (
                            <SingleOption
                                key={index}
                                isOpen={curValue === item.value}
                                onClick={(e) => {
                                    if (!disabled) {
                                        e.preventDefault()
                                        setCurText(item.children)
                                        setCurValue(item.value)
                                        setIsOpen(false)
                                    }
                                }}
                                // value={value}
                            >
                                {item.children}
                            </SingleOption>
                        ))}
                </OptionsWrap>
                {isOpen && <OptionMask onClick={() => setIsOpen(false)}></OptionMask>}
            </SelectWrap>
        )
    }
)

interface OptionProps {
    value: string
    children: string | ReactNode
}

export const CustomOption = memo(({value, children}: OptionProps) => {
    return <SingleOption value={value}>{children}</SingleOption>
})

const SelectWrap = styled.div<HandleOpenProps>`
    width: auto;
    min-width: 100px;
    height: ${(props) => (props.height ? `${props.height}px` : '32px')};
    position: relative;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    border-color: ${(props) => (props.isOpen ? '#1657d2' : '#d9d9d9')};
    border-radius: 2px;
    transition: all 0.3s;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-right: 20px;
    cursor: ${(props) => (props.isDisable ? 'not-allowed' : 'pointer')};

    input {
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        /* opacity: 0; */
        z-index: 6;
    }

    span {
        display: block;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        cursor: pointer;
        font-size: 12px;
        color: ${(props) => (props.isOpen ? '#bfbfbf' : '#000')};
        &.not-selected {
            color: #bfbfbf !important;
        }
        &.disabled {
            cursor: not-allowed;
        }
    }
`

const OptionsWrap = styled.div<HandleOpenProps>`
    display: ${(props) => (props.isOpen ? 'block' : 'none')};
    position: absolute;
    top: 32px;
    left: 0;
    z-index: 5;
    box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
    padding: 4px 0;
    border-radius: 2px;
    outline: none;
    width: 100%;
    background: #fff;
`

const SingleOption = styled.div<HandleOpenProps & {value?: string}>`
    padding: 5px 12px;
    font-size: 12px;
    cursor: pointer;
    background: ${(props) => (props.isOpen ? '#e6f3ff !important' : 'auto')};

    &:hover {
        background: #f5f5f5;
    }
`

const SuffixWrap = styled.div<HandleOpenProps>`
    position: absolute;
    height: ${(props) => (props.height ? `${props.height}px` : '32px')};
    top: 0;
    right: 0;
    width: 32px;
    /* height: 32px; */
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .icon-img {
        width: 20px;
        height: 20px;
        transform: ${(props) => `rotate(${props.isOpen ? '180deg' : 0})`};
        /* transition: all 0.5s; */
    }
`

const OptionMask = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 4;
`

type Key = string | number

interface OptionData extends OptionCoreData {
    /** Save for customize data */
    [prop: string]: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface OptionCoreData {
    key?: Key
    disabled?: boolean
    value: Key
    title?: string
    className?: string
    style?: React.CSSProperties
    label?: React.ReactNode
    /** @deprecated Only works when use `children` as option data */
    children?: React.ReactNode
}

interface OptionGroupData {
    key?: Key
    label?: React.ReactNode
    options: OptionData[]
    className?: string
    style?: React.CSSProperties

    /** Save for customize data */
    [prop: string]: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

type OptionsType = (OptionData | OptionGroupData)[]

function convertNodeToOption(node: React.ReactElement): OptionData {
    const {
        key,
        props: {children, value, ...restProps},
    } = node as React.ReactElement

    return {key, value: value !== undefined ? value : key, children, ...restProps}
}

export function convertChildrenToData(nodes: ReactNode, optionOnly = false): OptionsType {
    return toArray(nodes)
        .map((node: ReactElement, index: number): OptionData | OptionGroupData | null => {
            if (!isValidElement(node) || !node.type) {
                return null
            }

            const {
                type: {isSelectOptGroup},
                key,
                props: {children, ...restProps},
            } = node as ReactElement & {
                type: {isSelectOptGroup?: boolean}
            }

            if (optionOnly || !isSelectOptGroup) {
                return convertNodeToOption(node)
            }

            return {
                key: `__RC_SELECT_GRP__${key === null ? index : key}__`,
                label: key,
                ...restProps,
                options: convertChildrenToData(children),
            }
        })
        .filter((data) => data)
}
