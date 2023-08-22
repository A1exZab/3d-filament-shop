import { PiMinusLight, PiPlusLight } from 'react-icons/pi'
import * as S from './styles'

type PlusMinusControlsProps = {
	amount: number
	value: number
	setValue: (callback: (value: number) => number) => void
	size?: string
}

export function PlusMinusControls({ value, setValue, amount, size }: PlusMinusControlsProps) {
	return (
		<S.ButtonsContainer size={size}>
			<S.MinusButtonWrapper size={size} disabled={value <= 1}>
				<PiMinusLight onClick={() => setValue((prev) => prev - 1)} />
			</S.MinusButtonWrapper>
			<span>{value}</span>
			<S.PlusButtonWrapper size={size} disabled={value >= amount}>
				<PiPlusLight onClick={() => setValue((prev) => prev + 1)} />
			</S.PlusButtonWrapper>
		</S.ButtonsContainer>
	)
}
