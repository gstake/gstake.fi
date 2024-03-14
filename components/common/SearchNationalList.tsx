import {useState, useCallback, useEffect} from 'react'
import styled from 'styled-components'
import {Scrollbars} from 'react-custom-scrollbars'
import {useTranslation} from 'next-i18next'

import {useDebounce} from 'utils/index'
import NationalData from 'public/static/national.json'
import NationalCNData from 'public/static/national.json'

interface NationalProps {
    area_code: string
    region_code: string
}

interface SearchNationalProps {
    chooseCallback: (res: NationalProps) => void
}

const SearchNationalList = ({chooseCallback}: SearchNationalProps): JSX.Element => {
    const {
        i18n: {language},
    } = useTranslation('register')
    const {t} = useTranslation('common')
    const [searchText, setSearchText] = useState('')
    const [nationResult, setNationRes] = useState(NationalCNData)
    const debounceTxt = useDebounce(searchText, 300)

    useEffect(() => {
        const data = language === 'en' || language === 'ko-KR' ? NationalData : NationalCNData
        setNationRes(data)
    }, [language])

    useEffect(() => {
        const result = NationalData.filter(
            (item) =>
                item['name_cn'].indexOf(debounceTxt) > -1 ||
                item['name_en'].toLowerCase().indexOf(debounceTxt) > -1 ||
                item['name_hk'].indexOf(debounceTxt) > -1 ||
                item['area_code'].indexOf(debounceTxt) > -1
        )
        setNationRes(result)
    }, [debounceTxt])

    const handleInputChange = useCallback((e) => {
        const val = e.target.value.toLowerCase()
        setSearchText(val)
    }, [])

    return (
        <Wrap
            onClick={(e) => {
                e.nativeEvent.stopImmediatePropagation()
            }}
        >
            <InputWrap>
                <SearchIcon />
                <Input placeholder={t('search')} onChange={handleInputChange} />
            </InputWrap>

            <ScrollBar
                renderThumbVertical={({style, ...props}) => (
                    <div {...props} style={{...style, backgroundColor: '#ECEEF1', width: '2px !important'}} />
                )}
                style={{height: 183}}
            >
                <ListWrap>
                    {nationResult &&
                        nationResult.length > 0 &&
                        nationResult.map((item) => (
                            <li
                                key={item.name_cn}
                                onClick={() => {
                                    chooseCallback(item)
                                }}
                            >
                                <span>
                                    {(language === 'en' || language === 'ko-KR') && item.name_en}
                                    {language === 'zh-CN' && item.name_cn}
                                    {language === 'zh-HK' && item.name_hk}
                                </span>
                                <span>+{item.area_code}</span>
                            </li>
                        ))}
                </ListWrap>
            </ScrollBar>
        </Wrap>
    )
}

const SearchIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="6.25" stroke="#A7ACB8" strokeWidth="1.5" />
        <rect x="15" y="15.707" width="1.5" height="5" transform="rotate(-45 15 15.707)" fill="#A7ACB8" />
    </svg>
)

const Wrap = styled.div`
    width: 380px;
    height: 248px;
    position: absolute;
    top: 46px;
    z-index: 2;
    padding: 12px 0;
    background: #fff;
    border: 1px solid rgba(103, 111, 129, 0.1);
    box-sizing: border-box;
    border-radius: 2px;
`

const InputWrap = styled.div`
    width: 356px;
    height: 36px;
    padding-left: 16px;
    display: flex;
    align-items: center;
    margin: 0 auto;
    position: relative;
    margin-bottom: 8px;
    border: 1px solid #e7e8ec;
    box-sizing: border-box;
    border-radius: 2px;
`

const Input = styled.input`
    flex: 1;
    height: 12px;
    padding-left: 12px;
    border: 0;
    outline: none;
    box-shadow: none;
    line-height: 12px;
    font-weight: 400;
    font-size: 12px;
    background: #fff;

    ::-webkit-input-placeholder {
        /* WebKit, Blink, Edge */
        color: rgba(103, 111, 129, 0.5);
    }
    :-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: rgba(103, 111, 129, 0.5);
    }
    ::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: rgba(103, 111, 129, 0.5);
    }
    :-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: rgba(103, 111, 129, 0.5);
    }
    ::-ms-input-placeholder {
        /* Microsoft Edge */
        color: rgba(103, 111, 129, 0.5);
    }
    ::placeholder {
        /* Most modern browsers support this now. */
        color: rgba(103, 111, 129, 0.5);
    }
`

const ScrollBar = styled(Scrollbars)`
    width: 100%;
    margin: -1px auto 0;
    & > div {
        overflow-x: hidden !important;
        margin-bottom: 0 !important;
    }

    & > div:nth-of-type(2) {
        display: none !important;
    }
`

const ListWrap = styled.ul`
    width: 356px;
    height: 100%;
    margin: 0 auto;
    list-style: none;

    li {
        width: 100%;
        height: 36px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
        background: #fff;
        color: rgba(103, 111, 129, 0.5);
        font-size: 12px;
        line-height: 12px;
        border-radius: 2px;
        cursor: pointer;

        &:hover {
            background: rgba(167, 172, 184, 0.2);
        }
    }
`

export default SearchNationalList
