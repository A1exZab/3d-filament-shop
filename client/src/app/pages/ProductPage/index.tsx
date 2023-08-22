import * as S from './styles'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { getProductById } from 'app/store/product'
import { useEffect, useState } from 'react'
import AddProductToCart from 'app/components/AddProductToCart'
import { ExtendedProductPayload } from 'app/types'
import { LoaderWrapper } from 'app/components/hoc/LoaderWrapper'

export function ProductPage() {
	const { productId } = useParams<{ productId: string }>()
	const dispatch = useAppDispatch()
	const [product, setProduct] = useState<ExtendedProductPayload>()
	const { isAuth } = useAppSelector((state) => state.user)

	useEffect(() => {
		dispatch(getProductById(productId))
			.unwrap()
			.then((result) => setProduct(result))
	}, [])

	return (
		<LoaderWrapper>
			<S.ProductWrapper>
				{product && (
					<>
						<S.ProductImage file={product.img} />
						<S.ProductBlock>
							<S.ProductInfoBlock>
								<span>{product.name}</span>
								<S.PropertyField>
									<span>Материал</span>
									<span>{product.material.name}</span>
								</S.PropertyField>
								<S.PropertyField>
									<span>Вес нетто, г</span>
									<span>{product.weight}</span>
								</S.PropertyField>
								<S.PropertyField>
									<span>Диаметр, мм</span>
									<span>{product.diameter}</span>
								</S.PropertyField>
								<S.ColorPropertyField color={product.color.code}>
									<span>Цвет</span>
									<span>{product.color.name}</span>
								</S.ColorPropertyField>
								<S.PropertyField>
									<span>Темп. экструзии</span>
									<span>{product.hotendTemp} °С</span>
								</S.PropertyField>
								<S.PropertyField>
									<span>Темп. стола</span>
									<span>{product.bedTemp} °С</span>
								</S.PropertyField>
								<S.PropertyField>
									<span>Скорость печати</span>
									<span>{product.printSpeed} мм/с</span>
								</S.PropertyField>
								<S.PropertyField>
									<span>Производитель</span>
									<span>«{product.manufacturer.name}»</span>
								</S.PropertyField>
							</S.ProductInfoBlock>
							<S.ProductPrice>{product.price} ₽</S.ProductPrice>
							{isAuth ? (
								<AddProductToCart size='large' productId={productId} />
							) : (
								<p>
									Для оформления заказа необходима <Link to='/auth/signin'>авторизация</Link>
								</p>
							)}
						</S.ProductBlock>
					</>
				)}
			</S.ProductWrapper>
		</LoaderWrapper>
	)
}
