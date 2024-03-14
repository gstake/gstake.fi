import {ReactNode} from 'react'
import styled from 'styled-components'

import Header from 'components/common/Header'

const LoginWithReg = ({children}: {children: ReactNode}): JSX.Element => {
    return (
        <Wrap>
            <Header />
            {children}
        </Wrap>
    )
}

export const LoadingIcon = () => (
    <Loading>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </Loading>
)

export const SuccessIcon = () => (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M1.38304 6.42582L0.224127 7.72368C0.101096 7.86147 0.115267 8.07344 0.255545 8.19361L6.67666 13.6947C6.85008 13.8433 7.11859 13.7747 7.20341 13.5626C9.46236 7.91569 13.5207 3.41172 15.7969 1.25405C15.9139 1.14317 15.9348 0.964752 15.8459 0.83032L15.4387 0.21463C15.3552 0.0884835 15.1971 0.0340127 15.0576 0.0925813C12.3013 1.25031 7.83859 6.09091 5.64854 8.79189C5.53718 8.92924 5.33795 8.95544 5.19534 8.8509L1.82385 6.3795C1.68691 6.27913 1.49613 6.29917 1.38304 6.42582Z"
            fill="#FDFEFF"
        />
    </svg>
)

const Wrap = styled.div`
    width: 100%;
    min-height: 100%;
    padding-bottom: 40px;
    background: #101215;
`

export const FormWrap = styled.div`
    width: 452px;
    height: auto;
    padding: 36px;
    box-sizing: border-box;
    margin: 139px auto 0;
    background: #fff;
    border-radius: 8px;
`

export const Title = styled.h2`
    text-align: center;
    margin-bottom: 16px;
    font-weight: bold;
    font-size: 24px;
    line-height: 34px;
    color: #000;
`

export const InputWrap = styled.div`
    width: 380px;
    /* height: 40px; */
    position: relative;
    /* margin-bottom: 24px; */
`

export const ErrorWrap = styled.p`
    color: #e94747;
    font-size: 12px;
    line-height: 12px;
`

export const NoAccountWrap = styled.p`
    width: 100%;
    height: 12px;
    margin-top: 16px;
    text-align: center;
    color: #676f81;
    font-size: 12px;
    line-height: 12px;

    a {
        color: #3b75e1;
        font-size: 12px;
        line-height: 12px;
        text-decoration: none;
    }
`

export const Loading = styled.div`
    display: inline-block;
    position: relative;
    width: 16px;
    height: 16px;

    & div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 12px;
        height: 12px;
        margin: 2px;
        border: 2px solid #fff;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #fff transparent transparent transparent;
    }

    & div:nth-child(1) {
        animation-delay: -0.45s;
    }
    & div:nth-child(2) {
        animation-delay: -0.3s;
    }
    & div:nth-child(3) {
        animation-delay: -0.15s;
    }

    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`

export const SubmitButton = styled.button`
    width: 380px;
    height: 40px;
    margin-top: 36px;
    text-align: center;
    line-height: 40px;
    background: linear-gradient(90deg, #0053d7 8.93%, #498fff 100%);
    box-shadow: 0px 3px 8px rgba(0, 77, 199, 0.2);
    border: 0;
    cursor: pointer;
    border-radius: 2px;
    color: #fff;
    font-size: 12px;
    line-height: 12px;
    outline: none;

    &:hover {
        background: linear-gradient(270deg, #63b4ff 0%, #1266ee 100%);
        box-shadow: 0px 3px 8px rgba(0, 77, 199, 0.2);
    }
`

export default LoginWithReg
