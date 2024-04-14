import { memo } from 'react'
// import {useTranslation} from 'next-i18next'
// import {useRouter} from 'next/router'
// import _throttle from 'lodash/throttle'
import styled from 'styled-components'
// import Dropdown from 'rc-dropdown'
// import Menu, {Item as MenuItem} from 'rc-menu'
import 'rc-dropdown/assets/index.css'
import Image from 'next/image'
// import useChangeLanguage from 'hooks/useChangeLanguage'

interface Props {
    isIndex?: boolean
    sTop?: number
}

// const menuItems = (handleChangeLang) => [
//     <MenuItem key="1">
//         <a href="javascript:;" onClick={() => handleChangeLang('en')}>
//             English
//         </a>
//         <a href="javascript:;" onClick={() => handleChangeLang('zh-CN')}>
//             简体中文
//         </a>
//     </MenuItem>,
// ]
// const menu = (handleChangeLang) => <Menu>{menuItems(handleChangeLang)}</Menu>

const Header = memo(({ isIndex }: Props) => {
    // const {t} = useTranslation('index')
    // const topRef = useRef(0)
    // const [hideBack, setHideBack] = useState(true)
    // const [hideHeader, setHideHeader] = useState(false)
    // const [topMap, setTopMap] = useState([])
    // const [curActiveNav, setCurActiveNav] = useState('home')

    // const router = useRouter()

    // const MENU_ITEMS = [
    //     {title: 'HOME', id: 'home'},
    //     {title: t('indexTeam'), id: 'team'},
    //     {title: 'Investments', id: 'investment'},
    //     {title: 'Contact us', id: 'contact'},
    // ]

    // const handlerY = useCallback(
    //     _throttle(() => {
    //         const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0

    //         setHideHeader(scrollTop > topRef.current)
    //         setHideBack(scrollTop === 0)
    //         topRef.current = scrollTop

    //         for (let i = 0; i < topMap.length; i++) {
    //             if (scrollTop > topMap[i] && (!topMap[i + 1] || scrollTop < topMap[i + 1])) {
    //                 setCurActiveNav(MENU_ITEMS[i].id)
    //             }
    //         }
    //     }, 10),
    //     [topMap]
    // )

    // const createTopMap = useCallback(() => {
    //     const _topMap = MENU_ITEMS.map((x) => {
    //         const _ele = document.getElementById(x.id)
    //         return _ele?.offsetTop
    //     })
    //     setTopMap(_topMap)
    // }, [])

    // const handleNav = useCallback(
    //     (index) => {
    //         if (!topMap.length || (index !== 0 && !topMap[index])) {
    //             return
    //         }
    //         window.scroll({
    //             top: index === 0 ? 0 : topMap[index] + 10,
    //             left: 0,
    //             behavior: 'smooth',
    //         })
    //     },
    //     [topMap]
    // )

    // useEffect(() => {
    //     if (typeof window !== 'undefined' && !topMap.length) {
    //         createTopMap()
    //         return
    //     }
    //     handlerY()
    // }, [sTop, topMap])

    // const LANGUAGE_ARR = {
    //     en: 'English',
    //     'zh-CN': '简体中文',
    //     // 'zh-HK': '繁体中文',
    // }

    // const changeLanguage = useChangeLanguage()
    // const handleChangeLang = useCallback((lang) => {
    //     changeLanguage(lang)
    // }, [])

    return (
        <HeaderWrap
            // className={`${hideBack ? '' : 'hasBack'} ${hideHeader ? 'hide' : ''}`}
            isIndex={isIndex}
        >
            <div className={`inner indexPage}`}>
                <a rel="noopener noreferrer" href={'/'}>
                    <LogoSvg />
                </a>

                <HeaderOptWrap>
                    <NavList>
                        {/* {MENU_ITEMS.map((item, i) => (
                            <li
                                key={item.id}
                                onClick={() => handleNav(i)}
                                className={`${curActiveNav === item.id ? 'active' : ''}`}
                            >
                                {item.title}
                            </li>
                        ))} */}
                        {/* <li>
                            <div className="dropWrap">
                                <Dropdown overlay={menu(handleChangeLang)} overlayClassName="dropdownMenu">
                                    <span className="title">
                                        {LANGUAGE_ARR[router.locale]}
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M6 9L12 15L18 9" stroke="#fff" strokeWidth="2" />
                                        </svg>
                                    </span>
                                </Dropdown>
                            </div>
                        </li> */}

                        <ContactGroup>
                            <a target="_blank" rel="noopener" href="https://docs.gstake.fi">
                                <SingleContact title="Gstake Docs">
                                    <Image
                                        className="higher-more"
                                        src={'/static/img/gstake_book.png'}
                                        alt="intro bg"
                                        width={48}
                                        height={48}
                                    />
                                </SingleContact>
                            </a>
                            <a target="_blank" rel="noopener" href="https://github.com/gstake">
                                <SingleContact title="Github">
                                    <Image
                                        className="higher-more"
                                        src={'/static/img/gstake_github1.png'}
                                        alt="intro bg"
                                        width={48}
                                        height={48}
                                    />
                                </SingleContact>
                            </a>
                            <a target="_blank" rel="noopener" href="https://twitter.com/gstakefinance">
                                <SingleContact title="X (Twitter)">
                                    <Image
                                        className="higher-more"
                                        src={'/static/img/gstake_x1.png'}
                                        alt="intro bg"
                                        width={48}
                                        height={48}
                                    />
                                </SingleContact>
                            </a>
                            <a target="_blank" rel="noopener" href="https://discord.gg/TcHv2Awp6d">
                                <SingleContact title="Discord">
                                    <Image
                                        className="higher-more"
                                        src={'/static/img/gstake_discord1.png'}
                                        alt="intro bg"
                                        width={48}
                                        height={48}
                                    />
                                </SingleContact>
                            </a>
                            {/* <a target="_blank" rel="noopener" href="https://t.co/WKy3Hl4rVX">
                                <SingleContact title="Farcaster">
                                    <Image
                                        className="higher-more"
                                        src={'/static/img/gstake_far.png'}
                                        alt="intro bg"
                                        width={48}
                                        height={48}
                                    />
                                </SingleContact>
                            </a> */}
                            <a href="mailto:info@gstake.fi">
                                <SingleContact title="E-Mail">
                                    <Image
                                        className="higher-more"
                                        src={'/static/img/gstake_mail.png'}
                                        alt="intro bg"
                                        width={48}
                                        height={48}
                                    />
                                </SingleContact>
                            </a>
                        </ContactGroup>
                    </NavList>
                </HeaderOptWrap>
            </div>
        </HeaderWrap>
    )
})

export default Header

const HeaderWrap = styled.div<Props>`
    height: 108px;
    width: 100%;
    padding: 0 50px;
    box-sizing: border-box;
    background: linear-gradient(180deg, rgba(17, 20, 25, 0.4) 0%, rgba(13, 16, 23, 0.4) 100%);
    border: 1.5px solid #2E3549;
    z-index: 10;
    transition: all 0.3s;
    border-radius: 54px;
    position: relative;
    /* &.hasBack {
        background: #1a73ef;
    } */
    /* &.hide {
        transform: translateY(-92px);
    } */

    .inner {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 auto;

        a {
            display: flex;
        }

        &.indexPage {
            justify-content: flex-start;
        }
    }
`

const HeaderOptWrap = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const NavList = styled.ul`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;

    > .link {
        color: #fff;
        font-family: Bai Jamjuree;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%; /* 25.2px */
        text-decoration: none;
        opacity: 0.8;
    }

    li {
        height: 48px;
        padding: 0 20px;
        background: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-right: 4px;
        user-select: none;
        border-radius: 56px;
        font-family: DINPro;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        color: #676f81;

        &:hover {
            background: rgba(103, 111, 129, 0.2);

            &:last-child {
                background: none;
            }
        }

        a {
            height: 35px;
            display: flex;
            align-items: center;
            padding: 0 12px;
            font-weight: bold;
            font-size: 18px;
            color: #676f81;
            text-decoration: none;
            border-radius: 8px;
        }

        &.active {
            background: rgba(103, 111, 129, 0.2);
            color: #fff;
            a {
                color: #fff;
            }
        }

        .dropWrap span.title {
            height: 35px;
            display: flex;
            align-items: center;
            padding: 0 12px;
            font-family: DINPro;
            font-style: normal;
            font-weight: bold;
            font-size: 18px;
            cursor: pointer;
            border-radius: 8px;
            color: #fff;

            svg {
                transition: all 0.3s;
                margin-left: 8px;
            }

            &:hover {
                /* background: rgba(103, 111, 129, 0.1); */

                svg {
                    transform: rotate(180deg);
                }
            }
        }
    }
`

// const AppButton = styled.a`
//     text-decoration: none;
//     display: flex;
//     padding: 8px 24px;
//     justify-content: center;
//     align-items: center;
//     gap: 10px;
//     min-width: 148px;
//     height: 42px;
//     color: rgba(255, 255, 255, 0.8);
//     font-family: Bai Jamjuree;
//     font-size: 18px;
//     font-style: normal;
//     font-weight: 600;
//     line-height: 140%; /* 25.2px */
//     border-radius: 4px;
//     margin-left: 64px;
//     position: relative;
//     cursor: pointer;

//     &::before {
//         content: '';
//         position: absolute;
//         inset: 0;
//         border-radius: 4px;
//         padding: 2px; /* control the border thickness */
//         background: linear-gradient(180deg, #23ac62 0%, #006ebe 100%);
//         -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
//         -webkit-mask-composite: xor;
//         mask-composite: exclude;
//         pointer-events: none;
//         transition: all 0.5s;
//     }

//     &::after {
//         content: '';
//         position: absolute;
//         inset: 0;
//         border-radius: 4px;
//         padding: 2px; /* control the border thickness */
//         background: linear-gradient(180deg, #006ebe 0%, #23ac62 100%);
//         -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
//         -webkit-mask-composite: xor;
//         mask-composite: exclude;
//         pointer-events: none;
//         opacity: 0;
//         transition: all 0.5s;
//     }

//     &:hover {
//         &:before {
//             opacity: 0;
//         }
//         &:after {
//             opacity: 1;
//         }
//     }
// `

const ContactGroup = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    gap: 32px;

    > a {
        text-decoration: none;
    }
`

const SingleContact = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    > img {
        width: 48px;
        height: 48px;
    }
`

const ContactUsButton = styled.a`
    width: 792px;
    height: 78px;
    margin-top: 30px;
    background: #181e29;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 8px;
    text-decoration: none;

    .title {
        font-family: Poppins;
        font-size: 24px;
        font-weight: 500;
        line-height: 34px;
        letter-spacing: 0em;
        text-align: left;
        color: #fff;
    }
    .sub-title {
        font-family: Poppins;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0em;
        text-align: left;
        color: #8d95aa;
    }
`


export const LogoSvg = () => (
    <svg width="180" height="49" viewBox="0 0 180 49" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M83.9327 35.8184H72.133C70.8631 35.8184 69.7083 35.5797 68.6685 35.1025C67.6287 34.6252 66.7381 33.9732 65.9966 33.1465C65.2637 32.3198 64.6969 31.3482 64.2963 30.2317C63.8958 29.1152 63.6955 27.9221 63.6955 26.6522C63.6955 25.3908 63.8958 24.2061 64.2963 23.0982C64.6969 21.9817 65.2637 21.0101 65.9966 20.1834C66.7381 19.3482 67.6287 18.6919 68.6685 18.2147C69.7083 17.7289 70.8631 17.486 72.133 17.486H83.9327V20.1067H72.133C71.2296 20.1067 70.4157 20.2814 69.6912 20.6309C68.9753 20.9718 68.3659 21.4405 67.8631 22.0371C67.3688 22.6252 66.9853 23.3155 66.7125 24.1081C66.4483 24.9007 66.3162 25.7488 66.3162 26.6522C66.3162 27.5556 66.4483 28.4078 66.7125 29.209C66.9853 30.0016 67.3688 30.6962 67.8631 31.2928C68.3659 31.8809 68.9753 32.3453 69.6912 32.6863C70.4157 33.0272 71.2296 33.1976 72.133 33.1976H81.312V27.9689H70.2154V25.3482H83.9327V35.8184ZM102.546 31.2417C102.546 31.8723 102.427 32.4689 102.188 33.0314C101.95 33.5854 101.622 34.0712 101.204 34.4888C100.795 34.8979 100.309 35.2218 99.7466 35.4604C99.1926 35.699 98.6003 35.8184 97.9696 35.8184H86.8347V33.1976H97.9696C98.2338 33.1976 98.4853 33.1465 98.7239 33.0442C98.9625 32.9419 99.1713 32.8013 99.3503 32.6223C99.5293 32.4434 99.6699 32.2388 99.7722 32.0087C99.8745 31.7701 99.9256 31.5144 99.9256 31.2417C99.9256 30.9775 99.8745 30.726 99.7722 30.4874C99.6699 30.2488 99.5293 30.04 99.3503 29.861C99.1713 29.682 98.9625 29.5414 98.7239 29.4391C98.4853 29.3283 98.2338 29.2729 97.9696 29.2729H90.7594C90.214 29.2729 89.7026 29.1706 89.2253 28.9661C88.748 28.7615 88.3304 28.4846 87.9725 28.1351C87.623 27.7772 87.3461 27.3596 87.1415 26.8823C86.937 26.405 86.8347 25.8936 86.8347 25.3482C86.8347 24.8027 86.937 24.2914 87.1415 23.8141C87.3461 23.3368 87.623 22.9235 87.9725 22.574C88.3304 22.2161 88.748 21.9348 89.2253 21.7303C89.7026 21.5257 90.214 21.4235 90.7594 21.4235H101.242V24.0314H90.7594C90.3929 24.0314 90.0819 24.1593 89.8262 24.415C89.579 24.6621 89.4554 24.9732 89.4554 25.3482C89.4554 25.7147 89.579 26.0257 89.8262 26.2814C90.0819 26.5286 90.3929 26.6522 90.7594 26.6522H97.9696C98.6003 26.6522 99.1926 26.7715 99.7466 27.0101C100.309 27.2488 100.795 27.5769 101.204 27.9945C101.622 28.4121 101.95 28.8979 102.188 29.4519C102.427 30.0059 102.546 30.6025 102.546 31.2417ZM110.242 35.8184H107.622V24.0314H103.697V21.4235H107.622V16.182H110.242V21.4235H119.409V24.0314H110.242V35.8184ZM137.46 35.8184H124.369C123.73 35.8184 123.133 35.699 122.579 35.4604C122.025 35.2218 121.539 34.8979 121.122 34.4888C120.704 34.0712 120.376 33.5854 120.137 33.0314C119.899 32.4689 119.779 31.8723 119.779 31.2417C119.779 30.6025 119.899 30.0059 120.137 29.4519C120.376 28.8979 120.704 28.4121 121.122 27.9945C121.539 27.5769 122.025 27.2488 122.579 27.0101C123.133 26.7715 123.73 26.6522 124.369 26.6522H133.522V29.2729H124.369C124.096 29.2729 123.84 29.3283 123.602 29.4391C123.363 29.5414 123.154 29.682 122.975 29.861C122.796 30.04 122.656 30.2488 122.553 30.4874C122.451 30.726 122.4 30.9775 122.4 31.2417C122.4 31.5144 122.451 31.7701 122.553 32.0087C122.656 32.2388 122.796 32.4434 122.975 32.6223C123.154 32.8013 123.363 32.9419 123.602 33.0442C123.84 33.1465 124.096 33.1976 124.369 33.1976H134.839V26.0002C134.839 25.736 134.784 25.4846 134.673 25.2459C134.57 25.0073 134.43 24.7985 134.251 24.6195C134.072 24.4405 133.863 24.2999 133.624 24.1976C133.386 24.0868 133.134 24.0314 132.87 24.0314H122.4V21.4235H132.87C133.509 21.4235 134.106 21.5428 134.66 21.7814C135.214 22.0201 135.7 22.3482 136.117 22.7658C136.535 23.1749 136.863 23.6564 137.102 24.2104C137.34 24.7644 137.46 25.361 137.46 26.0002V35.8184ZM158.183 35.8184H154.437L146.792 29.6692L143.749 32.1493V35.8184H141.129V16.182H143.749V29.3752L153.286 21.4235H156.84L148.697 28.0968L158.183 35.8184ZM175.889 26.0002C175.889 26.6394 175.769 27.236 175.531 27.79C175.292 28.3439 174.964 28.8297 174.546 29.2473C174.137 29.6564 173.651 29.9803 173.089 30.2189C172.535 30.4576 171.943 30.5769 171.312 30.5769H161.276C161.464 30.9604 161.698 31.3141 161.98 31.638C162.261 31.9618 162.576 32.2388 162.926 32.4689C163.275 32.699 163.654 32.878 164.063 33.0059C164.481 33.1337 164.916 33.1976 165.367 33.1976H173.933V35.8184H165.367C164.379 35.8098 163.45 35.6181 162.58 35.2431C161.711 34.8596 160.953 34.3439 160.305 33.6962C159.666 33.04 159.159 32.2772 158.784 31.4078C158.409 30.5385 158.221 29.6096 158.221 28.6209C158.221 27.6323 158.409 26.7033 158.784 25.834C159.159 24.9647 159.666 24.2061 160.305 23.5584C160.953 22.9022 161.711 22.3865 162.58 22.0115C163.45 21.628 164.379 21.432 165.367 21.4235H171.312C171.943 21.4235 172.535 21.5428 173.089 21.7814C173.651 22.0201 174.137 22.3482 174.546 22.7658C174.964 23.1749 175.292 23.6564 175.531 24.2104C175.769 24.7644 175.889 25.361 175.889 26.0002ZM171.312 27.9689C171.576 27.9689 171.828 27.9178 172.066 27.8155C172.305 27.7132 172.514 27.5726 172.693 27.3936C172.872 27.2147 173.012 27.0059 173.115 26.7672C173.217 26.5286 173.268 26.2729 173.268 26.0002C173.268 25.736 173.217 25.4846 173.115 25.2459C173.012 25.0073 172.872 24.7985 172.693 24.6195C172.514 24.4405 172.305 24.2999 172.066 24.1976C171.828 24.0868 171.576 24.0314 171.312 24.0314H165.367C164.788 24.0314 164.242 24.1337 163.731 24.3382C163.228 24.5428 162.776 24.824 162.376 25.182C161.984 25.5314 161.656 25.949 161.392 26.4348C161.136 26.9121 160.97 27.4235 160.893 27.9689H171.312Z"
            fill="white"
        />
        <path
            d="M35.655 10.6607C36.2343 11.5263 36.5436 12.5439 36.5436 13.585C36.5433 13.8027 36.5295 14.0189 36.5027 14.2327H31.9277C31.5638 14.2327 31.2687 14.5273 31.2687 14.8906C31.2687 15.254 31.5638 15.5486 31.9277 15.5486H36.1608C35.8978 16.2001 35.5045 16.7988 34.9974 17.3051C34.0091 18.2918 32.6691 18.8469 31.2713 18.8487C30.2285 18.8487 29.2092 18.54 28.3422 17.9616C27.4752 17.3832 26.7994 16.5611 26.4004 15.5993C26.0013 14.6375 25.8969 13.5792 26.1003 12.5581C26.3038 11.5371 26.8059 10.5992 27.5432 9.86302C28.2806 9.12688 29.22 8.62556 30.2427 8.42246C31.2654 8.21936 32.3255 8.3236 33.2889 8.722C34.2523 9.12039 35.0757 9.79505 35.655 10.6607Z"
            fill="url(#paint0_linear_1252_1400)"
        />
        <path
            d="M18.09 30.0337C19.5682 30.0163 21.0426 29.8799 22.4989 29.6258C23.0393 29.5403 23.5336 29.4679 23.9883 29.4284C22.0112 28.1849 20.0341 27.4019 18.749 27.4019C18.5742 27.4019 18.4066 27.3326 18.283 27.2092C18.1594 27.0858 18.09 26.9184 18.09 26.7439C18.09 26.5694 18.1594 26.4021 18.283 26.2787C18.4066 26.1553 18.5742 26.086 18.749 26.086H18.751C22.1852 26.0873 30.6102 31.7023 30.6102 36.6133C30.6102 36.618 30.6129 36.6219 30.6129 36.6265V37.2864C-2.91869 44.5748 65.0598 44.9853 31.9309 37.2943V36.6133C31.9309 31.7023 40.356 26.7453 43.7902 26.7439H43.7922C43.967 26.7439 44.1346 26.8133 44.2582 26.9367C44.3818 27.0601 44.4512 27.2274 44.4512 27.4019C44.4512 27.5764 44.3818 27.7438 44.2582 27.8672C44.1346 27.9905 43.967 28.0599 43.7922 28.0599C42.5071 28.0599 40.53 28.8428 38.5529 30.0864C39.0076 30.1259 39.5019 30.1982 40.0423 30.2838C41.4986 30.5379 42.973 30.6743 44.4512 30.6917C49.137 30.6917 52.1949 22.0659 52.3267 21.6974C52.3752 21.5535 52.373 21.3972 52.3202 21.2548C52.2674 21.1123 52.1674 20.9922 52.0367 20.9144C51.9048 20.8356 51.7494 20.8056 51.5976 20.8297C51.4458 20.8537 51.3073 20.9303 51.2063 21.046C51.1931 21.0658 49.4797 22.8422 45.1762 22.0527C38.5312 20.8289 35.6907 28.3731 35.2999 28.8494C33.9924 29.9217 32.8563 31.1868 31.9309 32.6011V22.7626C34.3148 22.5922 36.5393 21.5049 38.1363 19.7298C39.7332 17.9546 40.5779 15.63 40.4925 13.2455C40.4071 10.861 39.3982 8.60264 37.6784 6.94589C35.9585 5.28913 33.6618 4.36328 31.2719 4.36328C28.882 4.36328 26.5853 5.28913 24.8655 6.94589C23.1456 8.60264 22.1368 10.861 22.0514 13.2455C21.966 15.63 22.8106 17.9546 24.4076 19.7298C26.0045 21.5049 28.2291 22.5922 30.6129 22.7626V32.6057C29.6872 31.1895 28.5502 29.9228 27.2413 28.8494C26.8505 27.7151 24.01 20.1709 17.365 21.3947C13.0615 22.1843 11.3481 20.4078 11.3349 20.3881C11.2339 20.2723 11.0954 20.1958 10.9436 20.1717C10.7918 20.1477 10.6364 20.1777 10.5045 20.2565C10.3738 20.3342 10.2738 20.4544 10.221 20.5968C10.1682 20.7393 10.1659 20.8955 10.2145 21.0394C10.3463 21.4079 13.4042 30.0337 18.09 30.0337ZM24.6816 13.5847C24.6816 12.2834 25.0681 11.0113 25.7923 9.92932C26.5164 8.84731 27.5457 8.00399 28.7499 7.50599C29.9541 7.008 31.2792 6.8777 32.5576 7.13157C33.836 7.38545 35.0103 8.0121 35.932 8.93227C36.8536 9.85244 37.4813 11.0248 37.7356 12.3011C37.9899 13.5774 37.8594 14.9004 37.3606 16.1027C36.8618 17.3049 36.0171 18.3325 34.9333 19.0555C33.8495 19.7785 32.5754 20.1643 31.2719 20.1643C29.5246 20.1624 27.8495 19.4686 26.614 18.2351C25.3785 17.0016 24.6835 15.3292 24.6816 13.5847Z"
            fill="url(#paint1_linear_1252_1400)"
        />
        <defs>
            <linearGradient
                id="paint0_linear_1252_1400"
                x1="31.2706"
                y1="4.36328"
                x2="31.2706"
                y2="42.9087"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#36FF93" />
                <stop offset="1" stopColor="#006EBE" />
            </linearGradient>
            <linearGradient
                id="paint1_linear_1252_1400"
                x1="31.2706"
                y1="4.36328"
                x2="31.2706"
                y2="42.9087"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#36FF93" />
                <stop offset="1" stopColor="#006EBE" />
            </linearGradient>
        </defs>
    </svg>
)
