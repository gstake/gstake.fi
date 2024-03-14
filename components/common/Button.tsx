import {useCallback} from 'react'
import styled from 'styled-components'

interface ButtonProps {
    loading?: boolean
    disabled?: boolean
    onClick?: (event) => void
    children?: any
    className?: string
    type?: 'button' | 'submit' | 'reset'
}

export default ({loading, disabled, onClick, children, className, type}: ButtonProps) => {
    const handleClick = useCallback(
        (e) => {
            if (loading || disabled) {
                return
            }
            onClick && onClick(e)
        },
        [loading, disabled, onClick]
    )

    return (
        <ButtonWrap type={type} className={`${className} ${disabled ? 'disabled' : ''}`} onClick={handleClick}>
            {children}
        </ButtonWrap>
    )
}

const ButtonWrap = styled.button`
    cursor: pointer;

    &.disabled {
        cursor: not-allowed;
    }
    &:focus-visible {
        border: none;
        outline: none;
    }
`
