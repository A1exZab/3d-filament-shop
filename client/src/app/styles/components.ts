import styled, { css } from 'styled-components'

export const WrapperStyles = css`
	width: 100%;
	height: 100%;
	flex-grow: 1;
	max-width: 1220px;
	margin: 0 auto;
	padding: 0 30px;
`

export const LayoutStyles = css`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	height: 100%;
	width: 100%;
	background-color: var(-colors-bg);
	color: --var(colors-text);
`

export const HWrapper = styled.div`
	${WrapperStyles}
	display: flex;
`

export const VWrapper = styled.div`
	${WrapperStyles}
	display: flex;
	flex-direction: column;
`

export const HCWrapper = styled.div`
	${WrapperStyles}
	display: flex;
	justify-content: center;
	align-items: center;
`

export const VCWrapper = styled.div`
	${WrapperStyles}
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

export const Title = styled.span.attrs<{ id?: string }>((props) => ({
	id: props.id
}))`
	display: inline-block;
	font-size: 24px;
	color: var(--colors-text);
	font-weight: var(--fw-sb);
	padding: 20px 0;
	scroll-margin-top: 32px;
`
export const BoldTitle = styled.span<{ color?: string }>`
	display: inline-block;
	font-size: 32px;
	color: ${({ color }) => (color ? color : 'var(--colors-text)')};
	font-weight: var(--fw-b);
	padding: 20px 0;
`
