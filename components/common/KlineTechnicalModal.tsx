import {memo, useCallback} from 'react'
import styled from 'styled-components'
import {useTranslation} from 'next-i18next'

interface StyleProps {
    isActive?: boolean
    theme?: string
}

const KlineTechnicalModal = memo(
    ({
        data,
        handleChange,
        close,
        theme = 'dark',
    }: {
        data: {main: string; sub: string}
        handleChange: (k: string, v: string) => void
        close: () => void
        theme?: string
    }) => {
        const {t} = useTranslation('spot')

        const handleClick = useCallback(
            (e, k, v) => {
                e.nativeEvent.stopImmediatePropagation()
                handleChange(k, v)
            },
            [handleChange]
        )

        return (
            <Wrapper theme={theme}>
                <ItemWrapper>
                    <div className="header">
                        <h4 className="title">{t('klineMainTechTitle')}</h4>
                        <div className="button" onClick={close}>
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M9.18725 8.00868L13.0174 4.17851L11.8389 3L8.00874 6.83017L4.1784 2.99984L2.99989 4.17835L6.83023 8.00868L3.00007 11.8388L4.17859 13.0173L8.00874 9.1872L11.8387 13.0172L13.0172 11.8387L9.18725 8.00868Z"
                                    fill="#4A5160"
                                />
                            </svg>
                        </div>
                    </div>

                    <div className="row">
                        <ItemTechTitle
                            theme={theme}
                            isActive={data.main === 'MA'}
                            onClick={(e) => handleClick(e, 'main', data.main === 'MA' ? '' : 'MA')}
                        >
                            MA
                        </ItemTechTitle>
                        <ItemTechTitle
                            theme={theme}
                            isActive={data.main === 'BOLL'}
                            onClick={(e) => handleClick(e, 'main', data.main === 'BOLL' ? '' : 'BOLL')}
                        >
                            BOLL
                        </ItemTechTitle>
                    </div>
                </ItemWrapper>
                <Line />
                <ItemWrapper>
                    <h4 className="title">{t('klineSubTechTitle')}</h4>
                    <div className="row">
                        <ItemTechTitle
                            theme={theme}
                            isActive={data.sub === 'VOL'}
                            onClick={(e) => handleClick(e, 'sub', data.sub === 'VOL' ? '' : 'VOL')}
                        >
                            VOL
                        </ItemTechTitle>
                        <ItemTechTitle
                            theme={theme}
                            isActive={data.sub === 'KDJ'}
                            onClick={(e) => handleClick(e, 'sub', data.sub === 'KDJ' ? '' : 'KDJ')}
                        >
                            KDJ
                        </ItemTechTitle>
                        <ItemTechTitle
                            theme={theme}
                            isActive={data.sub === 'RSI'}
                            onClick={(e) => handleClick(e, 'sub', data.sub === 'RSI' ? '' : 'RSI')}
                        >
                            RSI
                        </ItemTechTitle>
                        <ItemTechTitle
                            theme={theme}
                            isActive={data.sub === 'MACD'}
                            onClick={(e) => handleClick(e, 'sub', data.sub === 'MACD' ? '' : 'MACD')}
                        >
                            MACD
                        </ItemTechTitle>
                    </div>
                </ItemWrapper>
            </Wrapper>
        )
    }
)

const Wrapper = styled.div<StyleProps>`
    padding: 0 16px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: ${(props) => (props.theme === 'light' ? '#fff' : '#202327')};
    box-shadow: ${(props) => (props.theme === 'light' ? '0px 2px 12px rgba(0, 0, 0, 0.08)' : 'none')};
    border-radius: 2px;
    z-index: 100000;
`

const ItemWrapper = styled.div`
    height: 74px;
    padding-top: 12px;
    margin: 0 auto;

    .header {
        height: 24px;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .button {
            width: 16px;
            height: 16px;
            display: flex;
            align-items: center;
            cursor: pointer;
        }
    }

    h4.title {
        width: 100%;
        height: 20px;
        margin: 4px 0 0;
        color: #676f81 !important;
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
    }

    div.row {
        width: 100%;
        height: 20px;
        margin: 8px 0 0;
        line-height: 20px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
`

const ItemTechTitle = styled.div<StyleProps>`
    width: 58px;
    font-weight: 700;
    font-size: 12px;
    line-height: 20px;
    text-align: left;
    color: ${(props) => {
        if (props.theme === 'light' && !props.isActive) {
            return '#101215'
        }
        if (props.isActive) {
            return '#1665E3'
        }
        return '#fff'
    }};
    cursor: pointer;
    user-select: none;
`

const Line = styled.div`
    width: 120px;
    height: 1px;
    background: #676f81;
    opacity: 0.1;
    margin: 0 auto;
`

export default KlineTechnicalModal
