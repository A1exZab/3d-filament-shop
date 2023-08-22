import { LayoutStyles } from 'app/styles/components'
import styled from 'styled-components'

export const Layout = styled.div`
	${LayoutStyles}
	position: relative;

	& > svg {
		position: absolute;
		top: 16px;
		right: 16px;
		height: 40px;
		width: 40px;
		color: var(--colors-secondary);
		cursor: pointer;

		&:hover {
			color: var(--colors-primary);
		}
	}
`

export const Main = styled.main`
	display: flex;
	flex-direction: column;
	flex: 1 1 auto;
`
