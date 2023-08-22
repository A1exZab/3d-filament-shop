import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as F from 'app/styles/form'
import { BiError } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { addColor } from 'app/store/color'
import useFormPersist from 'react-hook-form-persist'

type ColorAddFormProps = {
	formKey: string
}

export function ColorAddForm({ formKey }: ColorAddFormProps) {
	const dispatch = useAppDispatch()
	const { error } = useAppSelector((state) => state.color)

	type ColorFormFields = {
		name: string
		code: string
		color?: string
		check?: string
	}

	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		watch,
		setValue,
		reset,
		formState: { errors, isValid }
	} = useForm<ColorFormFields>({
		mode: 'all'
	})

	useFormPersist(formKey, { watch, setValue })

	const onSubmit: SubmitHandler<ColorFormFields> = (data) => {
		dispatch(addColor(data))
			.unwrap()
			.then(() => sessionStorage.removeItem(formKey))
	}

	useEffect(() => {
		if (error) {
			setError('check', {
				type: 'manual',
				message: error.message
			})
		} else {
			reset()
		}
	}, [error])

	return (
		<F.PropertyForm autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
			<F.PropertyTitle>Добавить цвет</F.PropertyTitle>
			<F.PropertyTextField
				onChange={() => errors.check && clearErrors('check')}
				error={errors?.name?.message || errors?.check?.message}>
				<label>Название</label>
				<input
					placeholder='Введите название цвета'
					{...register('name', {
						required: 'Поле обязательно для заполнения'
					})}
				/>
			</F.PropertyTextField>
			{errors?.name && (
				<F.PropertyError>
					<BiError /> {errors?.name?.message}
				</F.PropertyError>
			)}

			<F.PropertyTextField error={errors?.code?.message}>
				<label>Код цвета</label>
				<input
					placeholder='Введите код цвета в HEX формате'
					{...register('code', {
						required: 'Поле обязательно для заполнения',
						pattern: {
							value: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/g,
							message: 'Цвет не соответствует HEX формату'
						}
					})}
				/>
			</F.PropertyTextField>

			{errors?.code && (
				<F.PropertyError>
					<BiError /> {errors?.code?.message}
				</F.PropertyError>
			)}

			{errors.check && (
				<F.PropertyError>
					<BiError /> {errors.check.message}
				</F.PropertyError>
			)}

			<F.PropertySubmitButton type='submit' disabled={!isValid}>
				Добавить
			</F.PropertySubmitButton>
		</F.PropertyForm>
	)
}
