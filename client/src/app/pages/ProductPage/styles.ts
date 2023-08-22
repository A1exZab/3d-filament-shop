import { WrapperStyles } from 'app/styles/components'
import { styled } from 'styled-components'

export const ProductWrapper = styled.div`
	${WrapperStyles}
	display: flex;
	justify-content: center;
	padding-top: 80px;
`

export const ProductImage = styled.img.attrs<{ file?: string }>((props) => ({
	src: import.meta.env.VITE_REACT_API_URL + props.file
}))`
	height: 400px;
	width: 400px;
	margin-right: 100px;
`

export const ControlsWrapper = styled.div`
	display: flex;
	gap: 14px;
	height: 40px;
	margin-top: 12px;
`

export const ProductBlock = styled.div`
	display: flex;
	flex-direction: column;

	& > p {
		color: var(--colors-secondary);
		font-size: 14px;
		margin-top: 0;
		& a {
			color: var(--colors-primary);
		}
	}
`

export const ProductInfoBlock = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 12px;

	& > span:first-of-type {
		font-size: 24px;
		font-weight: var(--fw-xb);
		text-transform: uppercase;
		margin-bottom: 24px;
	}
`

export const ProductPrice = styled.div`
	font-size: 24px;
	font-weight: var(--fw-b);
	margin-bottom: 24px;
`

export const PropertyField = styled.div`
	display: flex;
	width: 100%;
	font-size: 16px;
	gap: 80px;
	margin-bottom: 12px;

	& span:first-of-type {
		font-weight: var(--fw-sb);
		width: 150px;
	}
`

export const ColorPropertyField = styled(PropertyField)<{ color?: string }>`
	& span:last-of-type {
		display: inline-flex;
		align-items: center;
		gap: 6px;

		&::before {
			display: inline-block;
			width: 14px;
			height: 14px;
			border-radius: 50%;
			content: '';
			background-color: ${({ color }) => color};
		}
	}
`
