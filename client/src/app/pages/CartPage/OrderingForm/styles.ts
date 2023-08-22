import { SubmitButtonStyles, ErrorStyles } from 'app/styles/form'
import styled from 'styled-components'

export const OrderingWrapper = styled.div`
	width: 360px;
	padding: 18px;
	border-radius: 10px;
	box-shadow: 0 0 3px #cecece;
`

export const OrderingForm = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`

export const OrderingTitle = styled.span`
	&:first-of-type {
		font-size: 24px;
		margin-bottom: 18px;
		color: var(--colors-text);
		font-weight: var(--fw-b);
	}

	display: inline-block;
	font-size: 18px;
	margin-bottom: 12px;
	color: var(--colors-text);
	font-weight: var(--fw-sb);
`

export const OrderingTextField = styled.div<{ error?: string }>`
	display: flex;
	flex-direction: column;
	gap: 5px;
	color: var(--colors-text);
	margin-bottom: 8px;

	& label {
		font-size: 14px;
		font-weight: var(--fw-m);
		user-select: none;
	}

	& input {
		height: 24px;
		padding: 0px 8px;
		border-radius: 12px;
		font-size: 14px;
		font-weight: var(--fw-l);
		border: 1px solid #cecece;
		border-color: ${({ error }) => (error ? 'var(--colors-danger)' : 'none')};

		&:focus {
			outline: none;
			border: 1px solid var(--colors-primary);
		}
	}
`

export const OrderingSubmitButton = styled.button<{ disabled: boolean }>`
	${SubmitButtonStyles}
	height: 30px;
	border-radius: 15px;
	font-size: 14px;
	background-color: ${({ disabled }) => (disabled ? '#cecece' : 'var(--colors-primary)')};

	&:hover {
		font-weight: ${({ disabled }) => (disabled ? 'var(--fw-m)' : 'var(--fw-sb)')};
	}
`

export const OrderingError = styled.span`
	${ErrorStyles}
	font-size: 12px;
	margin-bottom: 6px;
`

export const TotalPrice = styled.div`
	width: 100%;
	font-size: 18px;
	margin-top: 12px;
	padding-top: 6px;
	font-weight: var(--fw-b);
	border-top: 1px solid #cecece;
	align-self: start;
	flex-grow: 1;
`

export const DeliverySelect = styled.div`
	& > span {
		display: inline-block;
		font-size: 14px;
		font-weight: var(--fw-m);
		margin-bottom: 5px;
		user-select: none;
	}
`

export const RadioGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;

	& > span {
		margin-top: 12px;
		color: var(--colors-secondary);
		font-size: 12px;

		& a {
			color: var(--colors-primary);
		}
	}
`
