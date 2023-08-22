import { SubmitHandler, useForm } from 'react-hook-form'
import * as F from 'app/styles/form'
import { BiError } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useEffect } from 'react'
import { addMaterial } from 'app/store/material'
import useFormPersist from 'react-hook-form-persist'

type MaterialAddFormProps = {
	formKey: string
}

export function MaterialAddForm({ formKey }: MaterialAddFormProps) {
	const dispatch = useAppDispatch()
	const { error } = useAppSelector((state) => state.material)

	type MaterialFormFields = {
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
	} = useForm<MaterialFormFields>({
		mode: 'all'
	})

	useFormPersist(formKey, { watch, setValue })

	const onSubmit: SubmitHandler<MaterialFormFields> = (data) => {
		dispatch(addMaterial(data))
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
			<F.PropertyTitle>Добавить материал</F.PropertyTitle>
			<F.PropertyTextField
				onChange={() => errors.check && clearErrors('check')}
				error={errors?.name?.message || errors?.check?.message}>
				<label>Название</label>
				<input
					placeholder='Введите название материала'
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
