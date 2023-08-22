import * as S from './styles'
import { UseFormRegister, FieldValues } from 'react-hook-form'

type RadioButtonProps = {
	register: UseFormRegister<FieldValues>
	name: string
	fieldName: string
	value: string
	price: number | undefined
	checkedDelivery: string | undefined
}

export function RadioButton({
	register,
	fieldName,
	name,
	price,
	value,
	checkedDelivery
}: RadioButtonProps) {
	return (
		<S.RadioLabel>
			<input {...register(fieldName, { required: true })} type='radio' value={value} />
			<S.CustomRadio selected={checkedDelivery === value} />
			<S.RadioText>
				{price ? name : name + '*'} — {price ? price + ' ₽' : 'оплата при получении'}
			</S.RadioText>
		</S.RadioLabel>
	)
}
