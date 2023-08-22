import * as C from 'app/styles/components'
import * as F from 'app/styles/form'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { getProductById, updateProduct } from 'app/store/product'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { BiError, BiUpload } from 'react-icons/bi'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { CommonSelect } from 'app/components/CommonSelect'
import { ColorSelect } from 'app/components/ColorSelect'
import { ColorOption, CommonOption, ExtendedProductPayload } from 'app/types'
import { LoaderWrapper } from 'app/components/hoc/LoaderWrapper'

export function EditProductPage() {
	const dispatch = useAppDispatch()
	const { productId } = useParams<{ productId: string }>()
	const history = useHistory()
	const [product, setProduct] = useState<ExtendedProductPayload>()
	const colors = useAppSelector((state) => state.color.entities)
	const materials = useAppSelector((state) => state.material.entities)
	const manufacturers = useAppSelector((state) => state.manufacturer.entities)

	useEffect(() => {
		dispatch(getProductById(productId))
			.unwrap()
			.then((result) => setProduct(result))
	}, [])

	const [fileUploadedName, setFileUploadedName] = useState(product?.img)
	const { error } = useAppSelector((state) => state.product)
	const colorOptions: ColorOption[] = colors
		? colors.map((color) => ({
				value: color.colorId,
				label: color.name,
				color: color.code
		  }))
		: []

	const materialOptions: CommonOption[] = materials
		? materials.map((material) => ({
				value: material.materialId,
				label: material.name
		  }))
		: []
	const manufacturerOptions: CommonOption[] = manufacturers
		? manufacturers.map((manufacturer) => ({
				value: manufacturer.manufacturerId,
				label: manufacturer.name
		  }))
		: []

	type EditProductFormFields = {
		name: string
		material: string
		color: string
		manufacturer: string
		price: number
		diameter: number
		weight: number
		printSpeed: string
		hotendTemp: string
		bedTemp: string
		amount: number
		img: any
		check?: string
	}

	const {
		register,
		handleSubmit,
		control,
		setError,
		reset,
		formState: { errors, isValid }
	} = useForm<EditProductFormFields>({
		mode: 'all'
	})

	useEffect(() => {
		reset({
			name: product?.name,
			color: product?.color.colorId,
			material: product?.material.materialId,
			manufacturer: product?.manufacturer.manufacturerId,
			price: product?.price,
			diameter: product?.diameter,
			weight: product?.weight,
			printSpeed: product?.printSpeed,
			hotendTemp: product?.hotendTemp,
			bedTemp: product?.bedTemp,
			amount: product?.amount
		})
		setFileUploadedName(product?.img)
	}, [product])

	const onSubmit: SubmitHandler<EditProductFormFields> = (data) => {
		dispatch(updateProduct({ productId, payload: data }))
			.unwrap()
			.then(() => history.goBack())
	}

	useEffect(() => {
		if (error) {
			setError('check', {
				type: 'manual',
				message: error.message
			})
		}
	}, [error])

	return (
		<LoaderWrapper>
			<C.HCWrapper>
				<F.ProductForm autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
					<F.ProductTitle>Редактирование товара</F.ProductTitle>
					<F.ProductTextField error={errors?.name?.message}>
						<label>Название</label>
						<input
							placeholder='Введите название товара'
							{...register('name', {
								required: 'Поле обязательно для заполнения'
							})}
						/>
					</F.ProductTextField>
					{errors?.name && (
						<F.ProductError>
							<BiError /> {errors?.name?.message}
						</F.ProductError>
					)}

					<F.ProductSelectField>
						<span>Материал</span>
						<Controller
							control={control}
							name='material'
							rules={{ required: 'Поле обязательно для заполнения' }}
							render={({ field: { onChange, value } }) => (
								<CommonSelect
									isSearchable={false}
									placeholder='Выберете материал'
									options={materialOptions}
									value={materialOptions.find((mt) => mt.value === value)}
									onChange={(val) => onChange(val?.value)}
									defaultValue={materialOptions.find(
										(mt) => mt.value === product?.material.materialId
									)}
									hasError={errors.material?.message !== undefined}
								/>
							)}
						/>
					</F.ProductSelectField>
					{errors?.material && (
						<F.ProductError>
							<BiError /> {errors?.material?.message}
						</F.ProductError>
					)}

					<F.ProductSelectField>
						<span>Цвет</span>
						<Controller
							control={control}
							name='color'
							rules={{ required: 'Поле обязательно для заполнения' }}
							render={({ field: { onChange, value } }) => (
								<ColorSelect
									isSearchable={false}
									placeholder='Выберете цвет'
									options={colorOptions}
									value={colorOptions.find((c) => c.value === value)}
									onChange={(val) => onChange(val?.value)}
									defaultValue={colorOptions.find((c) => c.value === product?.color.colorId)}
									hasError={errors.color?.message !== undefined}
								/>
							)}
						/>
					</F.ProductSelectField>
					{errors?.color && (
						<F.ProductError>
							<BiError /> {errors?.color?.message}
						</F.ProductError>
					)}

					<F.ProductSelectField>
						<span>Производитель</span>
						<Controller
							control={control}
							name='manufacturer'
							rules={{ required: 'Поле обязательно для заполнения' }}
							render={({ field: { onChange, value } }) => (
								<CommonSelect
									isSearchable={false}
									placeholder='Выберете производителя'
									options={manufacturerOptions}
									value={manufacturerOptions.find((mf) => mf.value === value)}
									onChange={(val) => onChange(val?.value)}
									defaultValue={manufacturerOptions.find(
										(mf) => mf.value === product?.manufacturer.manufacturerId
									)}
									hasError={errors.manufacturer?.message !== undefined}
								/>
							)}
						/>
					</F.ProductSelectField>
					{errors?.manufacturer && (
						<F.ProductError>
							<BiError /> {errors?.manufacturer?.message}
						</F.ProductError>
					)}

					<F.ProductTextField error={errors?.price?.message}>
						<label>Цена, руб</label>
						<input
							placeholder='Введите цену'
							{...register('price', {
								required: 'Поле обязательно для заполнения'
							})}
						/>
					</F.ProductTextField>
					{errors?.price && (
						<F.ProductError>
							<BiError /> {errors?.price?.message}
						</F.ProductError>
					)}
					<F.ProductTextField error={errors?.diameter?.message}>
						<label>Диаметр, мм</label>
						<input
							placeholder='Введите диаметр материала'
							{...register('diameter', {
								required: 'Поле обязательно для заполнения'
							})}
						/>
					</F.ProductTextField>
					{errors?.diameter && (
						<F.ProductError>
							<BiError /> {errors?.diameter?.message}
						</F.ProductError>
					)}
					<F.ProductTextField error={errors?.weight?.message}>
						<label>Вес, г</label>
						<input
							placeholder='Введите вес товара'
							{...register('weight', {
								required: 'Поле обязательно для заполнения'
							})}
						/>
					</F.ProductTextField>
					{errors?.weight && (
						<F.ProductError>
							<BiError /> {errors?.weight?.message}
						</F.ProductError>
					)}
					<F.ProductTextField error={errors?.printSpeed?.message}>
						<label>Скорость печати, мм/с</label>
						<input
							placeholder='Введите скорость печати'
							{...register('printSpeed', {
								required: 'Поле обязательно для заполнения'
							})}
						/>
					</F.ProductTextField>
					{errors?.printSpeed && (
						<F.ProductError>
							<BiError /> {errors?.printSpeed?.message}
						</F.ProductError>
					)}
					<F.ProductTextField error={errors?.hotendTemp?.message}>
						<label>Темп. экструзии, °С</label>
						<input
							placeholder='Введите температуру экструзии'
							{...register('hotendTemp', {
								required: 'Поле обязательно для заполнения'
							})}
						/>
					</F.ProductTextField>
					{errors?.hotendTemp && (
						<F.ProductError>
							<BiError /> {errors?.hotendTemp?.message}
						</F.ProductError>
					)}
					<F.ProductTextField error={errors?.bedTemp?.message}>
						<label>Темп. стола, °С</label>
						<input
							placeholder='Введите температуру стола'
							{...register('bedTemp', {
								required: 'Поле обязательно для заполнения'
							})}
						/>
					</F.ProductTextField>
					{errors?.bedTemp && (
						<F.ProductError>
							<BiError /> {errors?.bedTemp?.message}
						</F.ProductError>
					)}
					<F.ProductTextField error={errors?.amount?.message}>
						<label>Количество, шт</label>
						<input
							placeholder='Введите количество товара в наличии'
							{...register('amount', {
								required: 'Поле обязательно для заполнения'
							})}
						/>
					</F.ProductTextField>
					{errors?.amount && (
						<F.ProductError>
							<BiError /> {errors?.amount?.message}
						</F.ProductError>
					)}
					<F.ProductFileField>
						<span>Изображение</span>
						<div>
							<label htmlFor='file'>
								<BiUpload />
								Добавить файл
							</label>
							<div>{fileUploadedName}</div>
							<Controller
								control={control}
								name='img'
								render={({ field: { onChange, value, ...field } }) => (
									<input
										{...field}
										value={value?.fileName}
										onChange={(event) => {
											if (event.target.files) {
												setFileUploadedName(event.target.files[0].name)
												onChange(event.target.files[0])
											}
										}}
										id='file'
										type='file'></input>
								)}
							/>
						</div>
					</F.ProductFileField>
					{errors.check && (
						<F.PropertyResponseError>
							<BiError /> {errors.check.message}
						</F.PropertyResponseError>
					)}
					<F.ProductSubmitButton error={errors.check?.message} type='submit' disabled={!isValid}>
						Обновить
					</F.ProductSubmitButton>
				</F.ProductForm>
			</C.HCWrapper>
		</LoaderWrapper>
	)
}
