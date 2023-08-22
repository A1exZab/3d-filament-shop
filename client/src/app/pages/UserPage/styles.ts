import { styled } from 'styled-components'

export const UserBlock = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 10px;

	& > span:nth-child(1) {
		font-weight: var(--fw-b);
		font-size: 18px;
		margin-bottom: 15px;
	}

	& div {
		font-size: 16px;
		margin-bottom: 10px;
	}

	& a {
		color: var(--colors-primary);
	}
`

export const UserInfoField = styled.div`
	display: inline-flex;
	align-items: center;
	height: 18px;
	gap: 10px;

	& span:nth-child(1) {
		font-weight: var(--fw-sb);
		font-size: 14px;
	}

	& input {
		height: 18px;
		border-radius: 9px;
		padding-left: 5px;
		border: 1px solid var(--colors-danger);
		 max-width: 100%;
	}

	& svg {
		cursor: pointer;		

	& div {
		font-size: 14px;
		margin-bottom: 10px;
	}
`

export const CompletedOrdersBlock = styled.div`
	display: flex;
	flex-direction: column;

	& > span {
		font-weight: var(--fw-b);
		font-size: 16px;
		margin-bottom: 15px;
	}
`
