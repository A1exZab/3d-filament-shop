import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Footer = styled.footer`
	margin-top: 15px;
	padding: 15px 0 5px 0;
	border-top: 1px solid #f5f5f5;
`

export const FooterBlock = styled.div`
	height: 80px;
	display: flex;
	flex-direction: column;
	font-size: 14px;
	flex-grow: 1;

	&:first-of-type {
		justify-content: space-between;

		& span {
			font-weight: var(--fw-m);
		}
	}

	& > span {
		max-width: max-content;
		font-weight: var(--fw-sb);
		margin-bottom: 6px;
	}
`

export const FooterLink = styled(Link)`
	width: max-content;
	margin-top: 6px;
	color: var(--colors-text);
	text-decoration: none;

	&:visited {
		color: inherit;
	}

	&:hover {
		color: var(--colors-primary);
		font-weight: var(--fw-m);
	}
`
