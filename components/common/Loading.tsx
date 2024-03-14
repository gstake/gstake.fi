import {useEffect} from 'react'

import styled from 'styled-components'

interface StyleProps {
    global?: string
    hasBac?: boolean
    theme?: string
}

const BACK_COLOR = {
    light: 'rgba(255, 255, 255, 0.6)',
    dark: '#181a1e',
}

const LoadingWrap = styled.div<StyleProps>`
    position: ${(props) => (props.global ? 'fixed' : 'absolute')};
    left: 0;
    top: 0;
    width: ${(props) => (props.global ? '100vw' : '100%')};
    height: ${(props) => (props.global ? '100vh' : '100%')};
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    overflow: hidden;
    background: ${(props) => (props.hasBac ? BACK_COLOR[props.theme || 'light'] : 'none')};

    img {
        width: 32px;
        height: 32px;
    }
`

const Loading = ({theme, hasBac, global}: StyleProps) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

    return (
        <LoadingWrap theme={theme} hasBac={hasBac} global={global}>
            <img src={require('../../public/static/img/loading.png')} width="68" height="68" alt="loading..." />
        </LoadingWrap>
    )
}

export default Loading
