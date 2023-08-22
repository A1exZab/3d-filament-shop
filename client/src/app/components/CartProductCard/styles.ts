import styled from 'styled-components'

export const CartProductWrapper = styled.div`
	display: flex;
	align-items: center;
	height: 100px;
	padding: 5px 10px;
	border-bottom: 1px solid #f5f5f5;
`
export const CartCardImage = styled.img.attrs<{ file: string }>((props) => ({
	src: import.meta.env.VITE_REACT_API_URL + props.file
}))`
	height: 80px;
	width: 80px;
	margin-right: 20px;
`
export const CartCardInfo = styled.div`
	display: flex;
	flex-grow: 1;
	flex-direction: column;
	margin-right: 20px;

	& span {
		font-size: 12px;
		font-weight: var(--fw-m);
		color: var(--colors-secondary);
	}

	& span:nth-child(1) {
		font-size: 18px;
		font-weight: var(--fw-b);
		text-transform: uppercase;
		color: var(--colors-text);
		margin-bottom: 6px;
	}
`
