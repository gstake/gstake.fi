import {memo} from 'react'
import styled from 'styled-components'
import {useTranslation} from 'next-i18next'

import Modal from 'components/common/Modal'

interface ModalProps {
    title?: string
    content?: string | React.ReactNode
    close?: () => void
    loading?: boolean
    visible?: boolean
}

export default memo(({title, content, close, visible}: ModalProps) => {
    const {t} = useTranslation('spot')

    return (
        <Modal
            isOpen={visible}
            onRequestClose={close}
            // footer={null}
            overlayDismiss={true}
            // closable={false}
            style={{
                content: {
                    width: '440px',
                    borderRadius: '2px',
                },
            }}
        >
            <ModalInfoHeader>
                <span>{title || t('notice')}</span>
                <CloseBtn onClick={close}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.021 1L12.2134 12.1924" stroke="#676F81" strokeWidth="1.5" />
                        <path d="M11.979 1L0.786615 12.1924" stroke="#676F81" strokeWidth="1.5" />
                    </svg>
                </CloseBtn>
            </ModalInfoHeader>

            <ModalContent>
                <ModalText>{content}</ModalText>
                <BtnGroup>
                    <RightBtn
                        // loading={loading}
                        onClick={close}
                    >
                        {t('iknow')}
                    </RightBtn>
                </BtnGroup>
            </ModalContent>
        </Modal>
    )
})

const ModalInfoHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px 0 34px;
    border-bottom: 1px solid #e4eaef;
    height: 64px;

    span {
        font-size: 22px;
        line-height: 28px;
        font-weight: bold;
        color: #000;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        svg {
            margin-right: 8px;
        }
    }
`
const CloseBtn = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`
// 姝ｆ枃閮ㄥ垎
const ModalContent = styled.div`
    padding: 24px;

    .content-intro {
        color: rgba(16, 18, 21, 1);
    }
`

const ModalText = styled.div`
    font-family: PingFang SC;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 22px;
    color: #101215;
`

// 左右排列的按钮组合容器
const BtnGroup = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 20px;

    button + button {
        margin-left: 16px;
    }
`

// const CancelTextBtn = styled.div`
//     width: 110px;
//     height: 44px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 16px;
//     line-height: 24px;
//     color: #676f81;
//     cursor: pointer;
//     margin-right: 14px;

//     &:hover {
//         color: #1665e3;
//     }
// `

// 右按钮（带禁止样式）
const RightBtn = styled.div`
    width: 110px;
    height: 44px;
    background-color: #1665e3;
    border-radius: 2px;
    font-size: 16px;
    line-height: 24px;
    border: 0;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        color: #fff;
        background-color: #447de3;
    }
    &:active {
        color: #fff;
        background-color: #1665e3;
    }
    &:focus {
        color: #fff;
        background-color: #1665e3;
    }
`
