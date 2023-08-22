import { styled } from 'styled-components'

export const OrderCardWrapper = styled.div<{ opened: boolean }>`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-height: content-height;
	transition: all 0.3s ease;
	padding-top: 10px;
	margin-bottom: 10px;
	border-top: 1px solid #cecece;
	position: relative;

	&:first-of-type {
		padding-top: 0;
		border: none;

		& svg {
			top: 0;
		}
	}

	& svg {
		height: 24px;
		width: 24px;
		color: var(--colors-secondary);
		position: absolute;
		right: 0;
		top: 10px;
		transform: ${({ opened }) => (opened ? 'rotate(45deg)' : 'rotate(0)')};
		transition: all 0.3s ease;

		&:hover {
			cursor: pointer;
			color: var(--colors-primary);
		}
	}
`

export const CompletedOrderTitle = styled.div`
	display: flex;
	align-items: center;
	height: 24px;
	font-size: 14px;
	font-weight: var(--fw-sb);
`

export const CompletedOrderInfo = styled.div<{ opened: boolean }>`
	display: ${({ opened }) => (opened ? 'flex' : 'none')};
	justify-content: space-between;
	width: 100%;
	padding: 6px 24px 0 12px;
	transition: all 0.3s ease;
`
export const CompletedOrderInfoBlock = styled.div`
	display: flex;
	flex-direction: column;

	& > span:nth-child(1) {
		font-size: 12px;
		font-weight: var(--fw-sb);
		margin-bottom: 6px;
	}
`
export const OrderTotalPrice = styled.span`
	display: inline-block;
	font-size: 14px;
	font-weight: var(--fw-b);
`
