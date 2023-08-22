import { SubmitHandler, useForm } from 'react-hook-form'
import * as S from './styles'
import { BiError } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useEffect, useState } from 'react'
import { getOrderId, getTotalSum, resetCart } from 'app/store/cart'
import { DeliveryMethodResponse, OrderStatus } from 'app/types'
import { RadioButton } from 'app/components/RadioButton'
import { Link, useHistory } from 'react-router-dom'
import deliveryService from 'app/services/delivery.service'
import { confirmOrder } from 'app/store/order'
import { updateProductAmount } from 'app/store/product'
import { checkCartProducts } from 'app/utils/checkCartProducts'
import { Loader } from 'app/components/Loader'

export function OrderingForm() {
	const dispatch = useAppDispatch()
	const history = useHistory()
	const orderElements = useAppSelector((state) => state.cart.entities)
	const orderId = useAppSelector(getOrderId())
	const totalPrice = useAppSelector(getTotalSum())
	const [orderStatus, setOrderStatus] = useState<OrderStatus>(OrderStatus.NEW)
	const [deliveryPrice, setDeliveryPrice] = useState(0)
	const [deliveries, setDeliveries] = useState<DeliveryMethodResponse[]>()
	const { isLoading } = useAppSelector((state) => state.order)

	useEffect(() => {
		;(async () => {
			const delivery = await deliveryService.getDeliveries()
			setDeliveries(delivery)
		})()
	}, [])

	type DeliveryFormFields = {
		city: string
		postCode: string
		address: string
		delivery: string
	}

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid }
	} = useForm<Partial<DeliveryFormFields>>({
		mode: 'all'
	})

	const checkedDelivery = watch('delivery')

	useEffect(() => {
		if (checkedDelivery) {
			const price = deliveries?.find((delivery) => delivery._id === checkedDelivery)?.price
			if (price) {
				setDeliveryPrice(price)
			} else {
				setDeliveryPrice(0)
			}
		}
	}, [checkedDelivery])

	const onSubmit: SubmitHandler<Partial<DeliveryFormFields>> = async (data) => {
		const address = `${data.address}, ${data.city}, ${data.postCode}`

		if (orderId && address && data.delivery) {
			const checked = await checkCartProducts(orderId)
			if (orderElements && checked) {
				await dispatch(
					confirmOrder({
						orderId: orderId,
						status: OrderStatus.PROCESSED,
						address: address,
						delivery: data.delivery,
						sum: totalPrice + deliveryPrice
					})
				)

				orderElements.forEach(async (element) => {
					await dispatch(
						updateProductAmount({ productId: element.productId, amount: element.amount })
					)
				})

				setOrderStatus(OrderStatus.PROCESSED)
			} else {
				setOrderStatus(OrderStatus.FAILED)
			}
		}
	}

	useEffect(() => {
		if (orderStatus === OrderStatus.PROCESSED) {
			dispatch(resetCart())
			history.push(`/orderStatus/${orderStatus}`)
		}

		if (orderStatus === OrderStatus.FAILED) {
			history.push(`/orderStatus/${orderStatus}`)
		}
	}, [orderStatus])

	if (isLoading) {
		return <Loader />
	}

	return (
		<S.OrderingWrapper>
			<S.OrderingForm autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
				<S.OrderingTitle>Оформление заказа</S.OrderingTitle>
				<S.OrderingTitle>Информация о доставке</S.OrderingTitle>
				<S.OrderingTextField error={errors?.city?.message}>
					<label>Город</label>
					<input
						placeholder='Москва'
						{...register('city', {
							required: 'Поле обязательно для заполнения'
						})}
					/>
				</S.OrderingTextField>
				{errors?.city && (
					<S.OrderingError>
						<BiError /> {errors?.city?.message}
					</S.OrderingError>
				)}

				<S.OrderingTextField error={errors?.address?.message}>
					<label>Адрес</label>
					<input
						placeholder='ул. Талалихина, д. 41, стр. 8'
						{...register('address', {
							required: 'Поле обязательно для заполнения'
						})}
					/>
				</S.OrderingTextField>
				{errors?.address && (
					<S.OrderingError>
						<BiError /> {errors?.address?.message}
					</S.OrderingError>
				)}

				<S.OrderingTextField error={errors?.postCode?.message}>
					<label>Почтовый индекс</label>
					<input
						placeholder='109316'
						{...register('postCode', {
							required: 'Поле обязательно для заполнения'
						})}
					/>
				</S.OrderingTextField>
				{errors?.postCode && (
					<S.OrderingError>
						<BiError /> {errors?.postCode?.message}
					</S.OrderingError>
				)}

				{deliveries && (
					<S.DeliverySelect>
						<span>Способ доставки</span>

						<S.RadioGroup>
							{deliveries.map((delivery) => (
								<RadioButton
									key={delivery._id}
									register={register}
									fieldName='delivery'
									name={delivery.name}
									price={delivery.price}
									value={delivery._id}
									checkedDelivery={checkedDelivery}
								/>
							))}
							<span>
								*Цена доставки зависит от способа и места. Информацию о стоимости можно получить на
								сайте CDEK.{' '}
								<Link to={{ pathname: 'https://calc-cdek.ru/#calc' }} target='_blank'>
									Перейти →
								</Link>
							</span>
						</S.RadioGroup>
					</S.DeliverySelect>
				)}

				<S.TotalPrice>Итого: {totalPrice + deliveryPrice} ₽</S.TotalPrice>
				<S.OrderingSubmitButton type='submit' disabled={!isValid}>
					Оформить
				</S.OrderingSubmitButton>
			</S.OrderingForm>
		</S.OrderingWrapper>
	)
}
