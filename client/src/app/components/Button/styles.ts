import styled from 'styled-components'

export const Button = styled.button<{ size?: string }>`
	display: flex;
	align-items: center;
	height: ${({ size }) => (size === 'large' ? '40px' : '30px')};
	padding: ${({ size }) => (size === 'large' ? '0 14px' : '0 12px')};
	border-radius: ${({ size }) => (size === 'large' ? '20px' : '25px')};
	background-color: #f5f5f5;
	border: none;
	font-size: 14px;
	color: var(--colors-text);
	font-weight: var(--fw-l);
	cursor: pointer;
	transition: all 0.3s ease;
	user-select: none;

	&:hover {
		color: white;
		border: none;
		background-color: var(--colors-primary);
	}
`
