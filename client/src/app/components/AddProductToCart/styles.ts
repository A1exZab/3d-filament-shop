import styled from 'styled-components'

export const AddProductToCartWrapper = styled.div``

export const ControlsBlock = styled.div<{ size?: string }>`
	display: flex;
	height: ${({ size }) => (size === 'large' ? '40px' : '30px')};
	max-width: max-content;
	gap: 12px;
`

export const AddedSpan = styled.span`
	display: inline-block;
	color: var(--colors-primary);
	font-size: 12px;
	margin-top: 8px;
`

export const AddToCartError = styled.span`
	display: inline-block;
	color: var(--colors-danger);
	font-size: 12px;
	margin-top: 8px;
`
