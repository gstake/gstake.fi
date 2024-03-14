import styled from 'styled-components'
// import {useTranslation} from 'next-i18next'
// import {useRouter} from 'next/router'

interface LinkObj {
    title?: string
    titleKey: string
    'zh-CN': string
    'zh-HK': string
    en: string
}
interface LinkGroupObj {
    title?: string
    titleKey: string
    visibleLang: string[]
    items: LinkObj[]
}

const Footer = () => {
    // const router = useRouter()
    // const {t} = useTranslation('common')
    return (
        <Wrapper>
            <div className="inner">
                <ContentBlock></ContentBlock>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.footer`
    width: 100%;
    min-width: 1200px;
    position: relative;
    background: #101215;

    .inner {
        width: 1200px;
        margin: 0 auto;
        height: 440px;
        padding-top: 122px;
    }
`

const ContentBlock = styled.div`
    padding-bottom: 56px;
    border-bottom: 1px solid rgba(253, 254, 255, 0.1);
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`

export default Footer
