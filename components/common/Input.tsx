import styled from 'styled-components'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    height?: number
    padding?: string
    txtColor?: string
    txtFontSize?: string
    placeholder?: string
    placeholderCss?: string
    borderColor?: string
    borderErrorColor?: string
    borderRadius?: number
    isError?: boolean
    autoComplete?: string
    fontWeight?: number
}

const InputC = (props: InputProps): JSX.Element => {
    return <Input {...props} />
}

const Input = styled.input<InputProps>`
    width: 100%;
    height: 100%;
    padding: ${(props) => props.padding};
    box-sizing: border-box;
    position: relative;
    border: ${(props) => (props.isError ? `1px solid ${props.borderErrorColor}` : `1px solid ${props.borderColor}`)};
    box-sizing: border-box;
    background: transparent;
    border-radius: ${(props) => `${props.borderRadius}px`};
    outline: none;
    box-shadow: none;
    color: ${(props) => props.txtColor || 'rgba(0, 0, 0, .85)'};
    font-size: ${(props) => props.txtFontSize};
    font-weight: ${(props) => props.fontWeight || 'normal'};
    line-height: 17px;

    ::-webkit-input-placeholder {
        /* WebKit, Blink, Edge */
        color: ${(props) => props.placeholderCss};
    }
    :-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: ${(props) => props.placeholderCss};
    }
    ::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: ${(props) => props.placeholderCss};
    }
    :-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: ${(props) => props.placeholderCss};
    }
    ::-ms-input-placeholder {
        /* Microsoft Edge */
        color: ${(props) => props.placeholderCss};
    }
    ::placeholder {
        /* Most modern browsers support this now. */
        color: ${(props) => props.placeholderCss};
    }
`

export default InputC
