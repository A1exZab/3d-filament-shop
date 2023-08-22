import styled from 'styled-components'

export const SearchInput = styled.div`
	display: flex;
	align-items: center;
	position: relative;
	& input {
		height: 24px;
		width: 150px;
		font-size: 12px;
		border: 1px solid #f5f5f5;
		border-radius: 12px;
		padding: 0 8px;

		&::placeholder {
			color: var(--colors-secondary);
		}

		&:focus {
			outline: none;
			border: 1px solid var(--colors-primary);
		}
	}

	& svg {
		height: 16px;
		width: 16px;
		transform: scaleX(-1);
		position: absolute;
		right: 8px;
		color: var(--colors-secondary);
		cursor: pointer;

		&:hover {
			color: var(--colors-primary);
		}
	}
`
