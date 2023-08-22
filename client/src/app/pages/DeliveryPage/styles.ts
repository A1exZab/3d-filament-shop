import { styled } from 'styled-components'

export const DeliveryPlaces = styled.div`
	display: flex;
	flex-direction: column;

	& > span {
		color: var(--colors-secondary);
		font-size: 14px;
	}
`

export const DeliveryBlock = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 15px;

	& span {
		font-size: 14px;
		margin-bottom: 5px;
	}

	& span:nth-child(1) {
		font-size: 16px;
		font-weight: var(--fw-sb);
	}

	& a {
		color: var(--colors-primary);
	}
`
export const DeliveryTerms = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 30px;

	& span:nth-child(1) {
		font-weight: var(--fw-sb);
		font-size: 16px;
		margin-bottom: 15px;
	}

	& span:nth-child(2) {
		font-weight: var(--fw-b);
		margin-bottom: 15px;
	}

	& span {
		font-size: 14px;
		display: inline-block;
	}
`
