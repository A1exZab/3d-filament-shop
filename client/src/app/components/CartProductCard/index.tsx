import { ExtendedProductPayload } from 'app/types'
import * as S from './styles'
import { useAppDispatch } from 'app/hooks'
import { getProductById } from 'app/store/product'
import { useEffect, useState } from 'react'
import { CartProductControls } from './CartProductControls'

type CartProductCardProps = {
	productId: string
	orderElementId: string
	quantity: number
}

export function CartProductCard({ productId, orderElementId, quantity }: CartProductCardProps) {
	const dispatch = useAppDispatch()
	const [product, setProduct] = useState<ExtendedProductPayload>()

	useEffect(() => {
		dispatch(getProductById(productId))
			.unwrap()
			.then((product) => setProduct(product))
	}, [])

	return (
		<>
			{product && (
				<S.CartProductWrapper>
					<S.CartCardImage file={product.img} />
					<S.CartCardInfo>
						<span>{product.name}</span>
						<span>Материал: {product.material.name}</span>
						<span>Цвет: {product.color.name}</span>
						<span>Производитель: {product.manufacturer.name}</span>
					</S.CartCardInfo>
					<CartProductControls
						orderElementId={orderElementId}
						productId={productId}
						quantity={quantity}
						price={product.price}
						limit={product.amount}
					/>
				</S.CartProductWrapper>
			)}
		</>
	)
}
