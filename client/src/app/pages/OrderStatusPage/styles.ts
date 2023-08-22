import { VCWrapper } from 'app/styles/components'
import { styled } from 'styled-components'

export const OrderStatusWrapper = styled(VCWrapper)`
	& a {
		color: var(--colors-primary);
		text-decoration: none;
		font-weight: var(--fw-m);
		font-size: 18px;
	}
`

export const OrderStatusTitle = styled.div<{ success: boolean }>`
	display: inline-flex;
	align-items: center;
	gap: 10px;
	font-size: 32px;
	color: var(--colors-text);
	font-weight: var(--fw-sb);
	margin-bottom: 10px;

	& svg {
		color: ${({ success }) => (success ? 'var(--colors-primary)' : 'var(--colors-danger)')};
	}
`
