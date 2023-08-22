import styled from 'styled-components'

export const RadioLabel = styled.label.attrs<{ id?: string }>((props) => ({
	htmlFor: props.id
}))`
	font-size: 14px;
	cursor: pointer;
	display: flex;
	align-items: center;

	& > input {
		display: none;
	}
`

export const CustomRadio = styled.span<{ selected: boolean }>`
	top: -1px;
	cursor: pointer;
	min-width: 14px;
	width: 14px;
	height: 14px;
	border: 1px solid ${({ selected }) => (selected ? 'var(--colors-primary)' : '#cecece')};
	border-radius: 50%;
	display: inline-block;
	position: relative;

	&::after {
		content: '';
		min-width: 9px;
		width: 9px;
		height: 9px;
		background: var(--colors-primary);
		position: absolute;
		border-radius: 50%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		opacity: ${({ selected }) => (selected ? '1' : '0')};
		transition: opacity 0.3s;
	}
`
export const RadioText = styled.div`
	color: var(--colors-text);
	font-size: 12px;
	margin-left: 8px;
`
