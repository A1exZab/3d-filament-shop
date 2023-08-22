import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Logo = styled(Link)<{ size?: string }>`
	display: flex;
	align-items: center;
	gap: 4px;
	color: var(--colors-text);
	font-size: ${({ size }) => size || '30px'};
	text-decoration: none;
	font-weight: var(--fw-b);
	user-select: none;

	& svg {
		height: ${({ size }) => size || '30px'};
		tooltip: none;
	}
`
