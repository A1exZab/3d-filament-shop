import { SubmitHandler, useForm } from 'react-hook-form'
import * as F from 'app/styles/form'
import { BiError } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { addManufacturer } from 'app/store/manufacturer'
import { useEffect } from 'react'
import useFormPersist from 'react-hook-form-persist'

type ManufacturerAddFormProps = {
	formKey: string
}

export function ManufacturerAddForm({ formKey }: ManufacturerAddFormProps) {
	const dispatch = useAppDispatch()
	const { error } = useAppSelector((state) => state.manufacturer)

	type ManufacturerFormFields = {
		name: string
		check?: string
	}

	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		reset,
		watch,
		setValue,
		formState: { errors, isValid }
	} = useForm<ManufacturerFormFields>({
		mode: 'all'
	})

	useFormPersist(formKey, { watch, setValue })

	const onSubmit: SubmitHandler<ManufacturerFormFields> = (data) => {
		dispatch(addManufacturer(data))
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
			<F.PropertyTitle>Добавить производителя</F.PropertyTitle>
			<F.PropertyTextField
				onChange={() => errors.check && clearErrors('check')}
				error={errors?.name?.message || errors?.check?.message}>
				<label>Название</label>
				<input
					placeholder='Введите название производителя'
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
