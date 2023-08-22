import { useAppDispatch } from 'app/hooks'
import * as S from './styles'
import { useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { PiMinusLight, PiPlusLight } from 'react-icons/pi'
import { removeCartElement, updateCartElement } from 'app/store/cart'

type CartProductControlsProps = {
	orderElementId: string
	productId: string
	price: number
	quantity: number
	limit: number
}

export function CartProductControls({
	orderElementId,
	productId,
	quantity,
	price,
	limit
}: CartProductControlsProps) {
	const [value, setValue] = useState(quantity)
	const dispatch = useAppDispatch()

	const handleDelete = (id: string) => {
		const confirmDelete = confirm('Вы действительно хотите удалить этот товар?')
		if (confirmDelete) {
			dispatch(removeCartElement(id))
		}
	}

	const handlePlus = () => {
		setValue((prev) => {
			dispatch(
				updateCartElement({
					orderElementId,
					productId,
					amount: value + 1,
					sum: (value + 1) * price
				})
			)
			return prev + 1
		})
	}

	const handleMinus = () => {
		setValue((val) => {
			dispatch(
				updateCartElement({
					orderElementId,
					productId,
					amount: value - 1,
					sum: (value - 1) * price
				})
			)

			return val - 1
		})
	}

	return (
		<S.ButtonsWrapper>
			<S.ButtonsContainer>
				<S.MinusButtonWrapper disabled={value <= 1}>
					<PiMinusLight onClick={handleMinus} />
				</S.MinusButtonWrapper>
				<span>{value}</span>
				<S.PlusButtonWrapper disabled={value >= limit}>
					<PiPlusLight onClick={handlePlus} />
				</S.PlusButtonWrapper>
				<S.ProductPrice>{quantity * price} ₽</S.ProductPrice>
				<IoCloseOutline onClick={() => handleDelete(productId)} />
			</S.ButtonsContainer>
			{value >= limit && (
				<S.AddToCartError>{`Доступно только ${limit} ед. товара`}</S.AddToCartError>
			)}
		</S.ButtonsWrapper>
	)
}
