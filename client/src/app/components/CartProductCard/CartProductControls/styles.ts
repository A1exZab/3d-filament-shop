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

export const ButtonsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
`

export const ButtonsContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 6px;
	height: 30px;
	border-radius: 15px;
	background-color: var(--color-bg);
	font-size: 14px;
	transition: all 0.3s ease;

	& > span {
		font-weight: var(--fw-sb);
		user-select: none;
	}

	& > svg {
		height: 20px;
		width: 20px;
		&:hover {
			color: var(--colors-danger);
			cursor: pointer;
		}
	}
`

export const MinusButtonWrapper = styled(Button)`
	pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`

export const PlusButtonWrapper = styled(Button)`
	pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`

export const ProductPrice = styled.div`
	font-weight: var(--fw-sb);
	margin: 0 12px;
	user-select: none;
`

export const AddToCartError = styled.span`
	display: inline-block;
	color: var(--colors-danger);
	font-size: 12px;
	position: absolute;
	bottom: -12px;
`
