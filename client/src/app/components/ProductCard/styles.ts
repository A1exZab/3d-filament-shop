import { styled } from 'styled-components'

export const CardWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 360px;
	& a {
		text-decoration: none;
		color: var(--colors-text);

		&:visited {
			color: var(--colors-text);
		}
	}
`

export const CardImage = styled.img.attrs<{ file: string }>((props) => ({
	src: import.meta.env.VITE_REACT_API_URL + props.file
}))`
	height: 360px;
	width: 360px;
	border-radius: 10px;
	user-select: none;
	margin-bottom: 16px;
`

export const CardInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 12px;
	margin-bottom: 16px;

	& span:nth-child(1) {
		height: 56px;
		font-size: 24px;
		font-weight: var(--fw-sb);
	}

	& span:nth-child(2) {
		font-weight: var(--fw-sb);
	}
`
