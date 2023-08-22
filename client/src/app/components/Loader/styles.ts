import { HCWrapper } from 'app/styles/components'
import styled, { keyframes } from 'styled-components'

interface LoaderProps {
	width?: string
	height?: string
	duration?: number
}

const spinnerAnimation = keyframes`
from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`

export const Loader = styled.div<LoaderProps>`
	height: ${(props) => (props.height ? props.height : '4rem')};
	width: ${(props) => (props.width ? props.width : '4rem')};
	border: 8px solid #d1d5db;
	border-top-color: var(--colors-primary);
	border-radius: 50%;
	animation: ${spinnerAnimation} ${(props) => (props.duration ? `${props.duration}ms` : '800ms')}
		linear infinite;
`

export const LoaderContainer = styled(HCWrapper)`
	min-height: 100vh;
`
