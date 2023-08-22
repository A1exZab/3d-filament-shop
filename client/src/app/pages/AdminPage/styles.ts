import { HWrapper } from 'app/styles/components'
import { styled } from 'styled-components'

export const AdminPageWrapper = styled(HWrapper)`
	gap: 30px;
`
export const AsideFormsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 18px;
	width: 260px;
	padding: 18px;
	align-items: center;
	border-radius: 10px;
	box-shadow: 0 0 3px #cecece;
`
export const ProductListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	gap: 30px;
	padding: 18px;
	border-radius: 10px;
	box-shadow: 0 0 3px #cecece;
`
export const AddProduct = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	font-size: 12px;

	& span {
		display: inline-block;
		font-size: 14px;
		margin-bottom: 8px;
		color: var(--colors-text);
		font-weight: var(--fw-sb);
	}

	& span:nth-child(2) {
		font-size: 12px;
		font-weight: var(--fw-m);
		user-select: none;
		text-decoration: underline;
		color: var(--colors-primary);
		cursor: pointer;
	}
`
