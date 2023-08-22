import { useState } from 'react'
import * as S from './styles.ts'
import { Button } from '../Button'
import { PlusMinusControls } from '../PlusMinusControls'
import { useAppSelector } from 'app/hooks/useAppSelector.ts'
import { useAppDispatch } from 'app/hooks/useAppDispatch.ts'
import { getCurrentProduct } from 'app/store/product.ts'
import { addCartElement, resetCartError } from 'app/store/cart.ts'

type AddProductToCartProps = {
	productId: string
	size?: string
}

export default function AddProductToCart({ productId, size }: AddProductToCartProps) {
	const [quantity, setQuantity] = useState(1)
	const dispatch = useAppDispatch()
	const product = useAppSelector(getCurrentProduct(productId))
	const addToCartError = useAppSelector((state) => state.cart.error)
	const [added, setAdded] = useState('')

	const handleAddToCart = () => {
		if (product) {
			dispatch(addCartElement({ ...product, quantity }))
				.unwrap()
				.then((product) => {
					setAdded(
						`Всего добавлено ${product?.amount} ед. данного товара на сумму ${product?.sum} ₽`
					)
					setTimeout(() => setAdded(''), 5000)
				})
				.catch(() =>
					setTimeout(() => {
						dispatch(resetCartError())
					}, 5000)
				)
		}
	}

	return (
		<>
			{product && (
				<S.AddProductToCartWrapper>
					<S.ControlsBlock size={size}>
						<PlusMinusControls
							size={size}
							amount={product.amount}
							value={quantity}
							setValue={setQuantity}
						/>
						<Button size={size} onClick={handleAddToCart}>
							Добавить в корзину
						</Button>
					</S.ControlsBlock>
					{added && quantity < product!.amount && <S.AddedSpan>{added}</S.AddedSpan>}
					{quantity >= product!.amount && !addToCartError && (
						<S.AddToCartError>{`К сожалению, доступно только ${product.amount} ед. данного товара`}</S.AddToCartError>
					)}
					{addToCartError?.error === productId && (
						<S.AddToCartError>{addToCartError.message}</S.AddToCartError>
					)}
				</S.AddProductToCartWrapper>
			)}
		</>
	)
}
