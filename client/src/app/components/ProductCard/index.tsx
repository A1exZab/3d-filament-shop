import { ProductPayload } from 'app/types'
import * as S from './styles'
import { Link } from 'react-router-dom'
import { useAppSelector } from 'app/hooks'
import { getMaterialById } from 'app/store/material'
import { getManufacturerById } from 'app/store/manufacturer'
import AddProductToCart from '../AddProductToCart'

export function ProductCard({
	name,
	productId,
	price,
	img,
	material: materialId,
	manufacturer: manufacturerId
}: ProductPayload) {
	const { isAuth } = useAppSelector((state) => state.user)
	const manufacturer = useAppSelector(getManufacturerById(manufacturerId))
	const material = useAppSelector(getMaterialById(materialId))

	return (
		<S.CardWrapper>
			<Link to={`/product/${productId}`}>
				<S.CardImage file={img} />
				<S.CardInfo>
					<span>{`${material?.name} пластик «${name}»`}</span>
					<span>{price} ₽</span>
					<span>{`«${manufacturer?.name}»`}</span>
				</S.CardInfo>
			</Link>
			{isAuth && <AddProductToCart productId={productId} />}
		</S.CardWrapper>
	)
}
