import styled from 'styled-components'

const Button = styled.div<{ size?: string; disabled?: boolean }>`
	display: flex;
	padding: 0 6px;

	& > svg {
		color: var(--colors-secondary);
		font-size: 16px;
		cursor: pointer;

		&:hover {
			color: var(--colors-primary);
		}
	}
`

export const ButtonsContainer = styled.div<{ size?: string }>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 6px;
	height: ${({ size }) => (size === 'large' ? '40x' : '30px')};
	border-radius: ${({ size }) => (size === 'large' ? '20px' : '15px')};
	padding: 0 4px;
	background-color: var(--color-bg);
	border: 1px solid #f5f5f5;
	font-size: 14px;
	transition: all 0.3s ease;

	& > span {
		font-weight: var(--fw-sb);
		user-select: none;
	}
`

export const MinusButtonWrapper = styled(Button)`
	pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`

export const PlusButtonWrapper = styled(Button)`
	pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`
