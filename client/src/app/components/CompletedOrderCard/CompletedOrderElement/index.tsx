import * as S from './styles'
import { getProductById } from 'app/store/product'
import { useState, useEffect } from 'react'
import { useAppDispatch } from 'app/hooks'
import { ExtendedProductPayload } from 'app/types/product'

type CompletedOrderElementProps = {
	productId: string
	amount: number
}

export function CompletedOrderElement({ productId, amount }: CompletedOrderElementProps) {
	const [product, setProduct] = useState<ExtendedProductPayload>()
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getProductById(productId))
			.unwrap()
			.then((result) => setProduct(result))
	}, [])

	return (
		<>
			{product && (
				<S.ElementText>{`${product.material.name} пластик «${
					product.name
				}», ${product.color.name.toLowerCase()} — ${amount} шт.`}</S.ElementText>
			)}
		</>
	)
}
