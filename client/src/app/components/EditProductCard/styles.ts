import styled from 'styled-components'

export const EditProductWrapper = styled.div`
	display: flex;
	align-items: center;
	height: 80px;
	padding: 5px 10px;
	border-bottom: 1px solid #f5f5f5;
`
export const EditCardImage = styled.img.attrs<{ file: string }>((props) => ({
	src: import.meta.env.VITE_REACT_API_URL + props.file
}))`
	height: 60px;
	width: 60px;
`
export const EditCardInfo = styled.div`
	display: flex;
	flex-grow: 1;
	flex-direction: column;

	& span:nth-child(1) {
		font-size: 18px;
		font-weight: var(--fw-sb);
		margin-left: 20px;
	}
`
export const ButtonsContainer = styled.div`
	display: flex;
	gap: 16px;

	& svg {
		height: 18px;
		width: 18px;
		&:hover {
			color: var(--colors-primary);
			cursor: pointer;
		}
	}

	& svg:nth-child(2) {
		&:hover {
			color: var(--colors-danger);
		}
	}
`
