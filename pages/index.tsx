import {useState, useEffect} from 'react'
import {NextSeo} from 'next-seo'
// import {useTranslation} from 'next-i18next'
// import styled from 'styled-components'
import {useViewportScroll} from 'framer-motion'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'

import Header from 'components/common/Header'
import Banner from 'components/pages/IndexPage/components/Banner'
import About from 'components/pages/IndexPage/components/About'
import Contact from 'components/pages/IndexPage/components/Contact'

const Index = (): JSX.Element => {
    // const {t} = useTranslation('common')
    const [sTop, setSTop] = useState(0)
    const {scrollY} = useViewportScroll()

    useEffect(() => {
        scrollY.onChange((v) => {
            setSTop(v)
        })
    }, [scrollY])

    return (
        <div className="container">
            <style jsx global>{`
                body ::-webkit-scrollbar {
                    width: 6px;
                }
                body ::-webkit-scrollbar-track {
                    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                    border-radius: 2px;
                    background-color: #fff;
                }
                body ::-webkit-scrollbar-thumb {
                    border-radius: 2px;
                    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                    background-color: #848e9c;
                }
                body ::-webkit-scrollbar-corner {
                    background-color: #848e9c;
                }
            `}</style>
            <NextSeo
                title={'Gstake - Liquid Staking for DePin'}
                description={'Gstake is a liquid staking solution for DePin'}
                additionalMetaTags={[
                    {
                        property: 'keywords',
                        content: 'DePin, TheGraph, Arweave, Livepeer, Liquid staking, LST',
                    },
                ]}
            />
            <Header sTop={sTop} isIndex={true} />
            <Banner />
            <About />
            <Contact />
        </div>
    )
}

// const Footer = styled.div`
//     width: 100%;
//     height: 384px;
//     background: #0c0d14;
//     overflow: hidden;
//     position: relative;

//     .main {
//         position: absolute;
//         left: 50%;
//         top: 50%;
//         transform: translate(-50%, -50%);
//         display: flex;
//         justify-content: center;
//         align-items: center;

//         a {
//             width: 147px;
//             height: 192px;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             transition: all 0.5s;
//             margin-right: 120px;

//             &:last-child {
//                 margin: 0;
//             }

//             &:hover {
//                 transform: translateY(-20px);
//             }
//         }
//     }
// `

export const getStaticProps = async ({locale}) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['index', 'common'])),
        },
    }
}

export default Index
