import { HWrapper } from 'app/styles/components'
import { styled } from 'styled-components'

export const CartContentWrapper = styled(HWrapper)`
	padding: 0;
`

export const CartProducts = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	margin-right: 30px;
	padding: 18px;
	border-radius: 10px;
	box-shadow: 0 0 3px #cecece;
`
