import {useState, useCallback, useEffect} from 'react'
import styled from 'styled-components'
import {useTranslation} from 'next-i18next'

interface Props {
    initChoose?: string
    handleTimeClick?: (data: any) => void
}

const KlineTimeTool = ({handleTimeClick, initChoose}: Props) => {
    const {t} = useTranslation('spot')

    const [curType, setType] = useState(initChoose || `15${t('klineminute')}`)

    const handleClick = useCallback(
        (val) => {
            if (val.label !== curType) {
                setType(val.label)
                handleTimeClick(val)
            }
        },
        [curType, handleTimeClick]
    )

    const btnList = [
        {
            data: [
                {
                    label: t('klineMinute'),
                    resolution: '1',
                    historyType: 3,
                    wsType: 'kline-1min',
                    wsAddTime: 60000,
                    chartType: 3,
                },
            ],
        },
        {
            data: [
                {
                    class: '',
                    label: `1${t('klineminute')}`,
                    resolution: '1',
                    historyType: 3,
                    wsType: 'kline-1min',
                    wsAddTime: 60000,
                    chartType: 1,
                },
                {
                    class: '',
                    label: `5${t('klineminute')}`,
                    resolution: '5',
                    historyType: 4,
                    wsType: 'kline-5min',
                    wsAddTime: 300000,
                    chartType: 1,
                },
                {
                    class: 'selected',
                    label: `15${t('klineminute')}`,
                    resolution: '15',
                    historyType: 5,
                    wsType: 'kline-15min',
                    wsAddTime: 900000,
                    chartType: 1,
                },
                {
                    class: '',
                    label: `30${t('klineminute')}`,
                    resolution: '30',
                    historyType: 6,
                    wsType: 'kline-30min',
                    wsAddTime: 1800000,
                    chartType: 1,
                },
            ],
        },
        {
            data: [
                {
                    class: '',
                    label: `1${t('klinehour')}`,
                    resolution: '60',
                    historyType: 2,
                    wsType: 'kline-60min',
                    wsAddTime: 3600000,
                    chartType: 1,
                },
                {
                    class: '',
                    label: `4${t('klinehour')}`,
                    resolution: '240',
                    historyType: 7,
                    wsType: 'kline-4h',
                    wsAddTime: 14400000,
                    chartType: 1,
                },
                {
                    class: '',
                    label: `8${t('klinehour')}`,
                    resolution: '480',
                    historyType: 8,
                    wsType: 'kline-8h',
                    wsAddTime: 28800000,
                    chartType: 1,
                },
            ],
        },
        {
            data: [
                {
                    class: '',
                    label: `1${t('klineDay')}`,
                    resolution: '1D',
                    historyType: 1,
                    wsType: 'kline-1day',
                    wsAddTime: 7200000,
                    chartType: 1,
                },
            ],
        },
        {
            data: [
                {
                    class: '',
                    label: `1${t('klineWeek')}`,
                    resolution: '1week',
                    historyType: 9,
                    wsType: 'kline-1week',
                    wsAddTime: 72000000,
                    chartType: 1,
                },
            ],
        },
        {
            data: [
                {
                    class: '',
                    label: `1${t('klineMonth')}`,
                    resolution: '1month',
                    historyType: 10,
                    wsType: 'kline-1month',
                    wsAddTime: 72000000,
                    chartType: 1,
                },
            ],
        },
    ]

    return (
        <Wrapper>
            {btnList.map((item, key) => {
                if (item.data.length === 1) {
                    const _d = item.data[0]
                    return (
                        <li key={_d.wsType}>
                            <button
                                type="button"
                                onClick={() => handleClick(_d)}
                                className={`${curType === _d.label ? 'active' : ''}`}
                            >
                                {_d.label}
                            </button>
                        </li>
                    )
                }
                return (
                    <li key={`group_${key}`}>
                        <ModalWithLabel data={item.data} chooseClick={handleClick} activeVal={curType} />
                    </li>
                )
            })}
        </Wrapper>
    )
}

const ModalWithLabel = ({data, chooseClick, activeVal}) => {
    const [showLabel, setLabel] = useState('')
    const [isMatch, setMatch] = useState(false)

    useEffect(() => {
        if (activeVal && data && data.length) {
            const _match = data.filter((item) => item.label === activeVal)

            if (_match.length) {
                setLabel(_match[0].label)
                setMatch(true)
            } else {
                setLabel(data[0].label)
                setMatch(false)
            }
        }
    }, [activeVal, data])

    return (
        <div className="modalList">
            <span className={`label ${isMatch ? 'active' : ''}`}>{showLabel}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 8V6.71795L6 4L3 6.71795V8H9Z" fill="#676F81" />
            </svg>

            <div className="modalContent">
                {data &&
                    !!data.length &&
                    data.map((item) => (
                        <button
                            key={`button_${item.label}`}
                            type="button"
                            onClick={() => {
                                chooseClick(item)
                            }}
                            className={`${activeVal === item.label ? 'active' : ''}`}
                        >
                            {item.label}
                        </button>
                    ))}
            </div>
        </div>
    )
}

const Wrapper = styled.ul`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    li {
        margin-left: 8px;
        list-style: none;

        &:first-child {
            margin: 0;
        }
    }

    button {
        padding: 4px 6px;
        background: none;
        outline: none;
        box-shadow: none;
        border: 0;
        color: #676f81;
        font-weight: 500;
        font-size: 12px;
        cursor: pointer;

        &.active {
            color: #fff;
        }
    }

    .modalList {
        padding: 4px 6px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        position: relative;

        span.label {
            color: #676f81;
            font-weight: 500;
            font-size: 12px;
            user-select: none;

            &.active {
                color: #fff;
            }
        }

        svg {
            margin-left: 4px;
            transition: all 0.3s;
            transform: rotate(180deg);
        }

        &:hover svg {
            transform: rotate(0deg);
        }

        &:hover .modalContent {
            display: block;
        }

        .modalContent {
            display: none;
            position: absolute;
            left: 0;
            top: 22px;
            width: 46px;
            padding: 4px 0;
            z-index: 10;
            background: #272c35;
            box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);
            border-radius: 2px;
            user-select: none;

            button {
                width: 46px;
                height: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: none;
                outline: none;
                box-shadow: none;
                border: 0;
                color: #676f81;
                font-weight: 500;
                font-size: 12px;

                &:hover,
                &.active {
                    background: rgba(167, 172, 184, 0.06);
                    color: #fff;
                }
            }
        }
    }
`

export default KlineTimeTool
