import { Button } from 'app/components/Button/styles'
import { WrapperStyles } from 'app/styles/components'
import { styled } from 'styled-components'

export const HomePageWrapper = styled.div`
	${WrapperStyles}
	margin-bottom: 50px;
`
export const Banner = styled.div`
	width: 100%;
	height: 600px;
	background-image: url(${import.meta.env.VITE_REACT_API_URL + 'banner.jpg'});
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	margin-bottom: 30px;
`

export const FilterBlock = styled.div`
	display: flex;
	justify-content: space-between;
	height: 24px;
	width: 100%;
`

export const Categories = styled.div`
	display: flex;
	gap: 14px;
	max-width: max-content;
	height: 24px;
`

export const Category = styled(Button)<{ active: boolean }>`
	height: 24px;
	font-weight: var(--fw-m);
	border-radius: 12px;
	background-color: ${({ active }) => (active ? 'var(--colors-primary)' : '#f5f5f5')};
	color: ${({ active }) => (active ? 'white' : 'var(--colors-text)')};
`

export const SearchResult = styled.div`
	display: flex;
	flex-direction: column;

	& span {
		max-width: max-content;
		font-size: 12px;
		font-weight: var(--fw-m);
		color: var(--colors-secondary);
		margin-bottom: 20px;
	}
`

export const ResetSearchButton = styled(Button)`
	max-width: max-content;
	height: 24px;
	border-radius: 12px;
	font-size: 12px;
	font-weight: var(--fw-m);
	background-color: #e6e6e6;
	margin: 20px 0;

	& svg {
		font-size: 14px;
	}

	&: hover {
		opacity: 0.6;
		background-color: #e6e6e6;
		color: var(--colors-text);
	}
`

export const Products = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
	gap: 30px;
`

export const NothingFound = styled.div`
	text-align: center;
	padding: 15px 0;
	font-size: 20px;
	font-weight: var(--fw-sb);
	color: var(--colors-secondary);
`
