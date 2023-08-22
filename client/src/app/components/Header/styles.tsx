import { HWrapper } from 'app/styles/components'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

export const Header = styled.header`
	height: 48px;
	background-color: var(--colors-bg);
	position: sticky;
	top: 0;
	z-index: 50;
`

export const HeaderWrapper = styled(HWrapper)`
	justify-content: space-between;
`

export const HeaderTitle = styled(Link)`
	display: flex;
	align-items: center;
	gap: 4px;
	color: var(--colors-text);
	font-size: 36px;
	text-decoration: none;
	font-weight: var(--fw-b);

	& svg {
		height: 36px;
	}
`

export const HeaderControls = styled.div`
	display: flex;
	height: 30px
	justify-content: space-between;
	align-items: center;
	gap: 12px;
	color: var(--color-text);
	border-radius: 12px;
	user-select: none;

	& svg {
		font-size: 18px;
		cursor: pointer;
	}
`

const HeaderNavStyles = css`
	display: flex;
	align-items: center;
	gap: 4px;
	height: 30px;
	color: var(--colors-text);
	padding: 0 12px;
	border-radius: 15px;
	background-color: var(--color-bg);
	border: 1px solid #f5f5f5;
	font-size: 14px;
	cursor: pointer;
	transition: all 0.3s ease;

	&:hover {
		border: 1px solid var(--colors-primary);
		color: var(--colors-primary);
	}
`

export const HeaderButton = styled.button`
	${HeaderNavStyles}
`

export const HeaderLink = styled(Link)<{ round?: boolean }>`
	text-decoration: none;

	&:visited {
		color: inherit;
	}

	> div {
		height: 14px;
		width: ${({ round }) => (round ? '14px' : '20px')};
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-size: 10px;
		font-weight: var(--fw-sb);
		border-radius: 7px;
		background-color: var(--colors-primary);
	}

	${HeaderNavStyles}
`
