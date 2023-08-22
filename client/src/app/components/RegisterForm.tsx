import { useState, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as F from 'app/styles/form'
import { Link } from 'react-router-dom'
import { BiError } from 'react-icons/bi'
import { PiEyeLight, PiEyeClosedLight } from 'react-icons/pi'
import { SignUpPayload } from 'app/types'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { signUp } from 'app/store/user'
import useFormPersist from 'react-hook-form-persist'

type RegisterFormProps = {
	formKey: string
}

export function RegisterForm({ formKey }: RegisterFormProps) {
	const [showPassword, setShowPassword] = useState(false)
	const { authError } = useAppSelector((state) => state.user)
	const dispatch = useAppDispatch()

	type RegisterFormFields = {
		firstName: string
		lastName: string
		email: string
		password: string
		role: boolean
		auth?: string
	}

	const {
		register,
		handleSubmit,
		setError,

		clearErrors,
		watch,
		setValue,
		formState: { errors, isValid }
	} = useForm<RegisterFormFields>({
		mode: 'all'
	})

	useFormPersist(formKey, { watch, setValue })

	const passwordValidator = {
		isCapitalSymbol: (v: string) => {
			const capitalRegExp = /\p{Lu}+/gu
			return capitalRegExp.test(v) || 'Должна быть хотя бы одна заглавная буква'
		},

		isContainDigit: (v: string) => {
			const digitRegExp = /\d+/g
			return digitRegExp.test(v) || 'Должно быть хотя бы одно число'
		},

		min: (v: string) => {
			return v.length >= 8 || 'Минимальное количество символов — 8'
		},

		max: (v: string) => {
			return v.length <= 16 || 'Максимальное количество символов — 16'
		}
	}

	const onSubmit: SubmitHandler<RegisterFormFields> = (data) => {
		const newData: SignUpPayload = { ...data, role: data.role ? 'ADMIN' : 'USER' }
		dispatch(signUp(newData))
			.unwrap()
			.then(() => sessionStorage.removeItem(formKey))
	}

	useEffect(() => {
		if (authError) {
			setError('auth', {
				type: 'manual',
				message: authError.message
			})
		}
	}, [authError])

	return (
		<F.AuthForm autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
			<F.AuthTitle>Регистрация</F.AuthTitle>
			<F.AuthTextField error={errors?.firstName?.message}>
				<label>Имя</label>
				<input
					placeholder='Введите имя'
					{...register('firstName', { required: 'Поле обязательно для заполнения' })}
				/>
			</F.AuthTextField>
			{errors?.firstName && (
				<F.AuthError>
					<BiError /> {errors?.firstName?.message}
				</F.AuthError>
			)}

			<F.AuthTextField error={errors?.lastName?.message}>
				<label>Фамилия</label>
				<input
					placeholder='Введите фамилию'
					{...register('lastName', { required: 'Поле обязательно для заполнения' })}
				/>
			</F.AuthTextField>
			{errors?.lastName && (
				<F.AuthError>
					<BiError /> {errors?.lastName?.message}
				</F.AuthError>
			)}

			<F.AuthTextField
				onChange={() => errors.auth && clearErrors('auth')}
				error={errors?.email?.message}>
				<label>Email</label>
				<input
					placeholder='Введите email'
					{...register('email', {
						required: 'Поле обязательно для заполнения',
						pattern: {
							value: /^\S+@\S+\.\S+$/g,
							message: 'Некорректный email'
						}
					})}
				/>
			</F.AuthTextField>
			{errors?.email && (
				<F.AuthError>
					<BiError /> {errors?.email?.message}
				</F.AuthError>
			)}

			<F.AuthTextField error={errors?.password?.message}>
				<label>Пароль</label>
				<input
					placeholder='Введите пароль'
					type={showPassword ? 'text' : 'password'}
					{...register('password', {
						required: 'Поле обязательно для заполнения',
						validate: passwordValidator
					})}
				/>
				<div onClick={() => setShowPassword((prevState) => !prevState)}>
					{showPassword ? <PiEyeLight /> : <PiEyeClosedLight />}
				</div>
			</F.AuthTextField>
			{errors?.password && (
				<F.AuthError>
					<BiError /> {errors?.password?.message}
				</F.AuthError>
			)}

			<F.AuthCheckboxField>
				<label>Админ</label>
				<div>
					<input type='checkbox' {...register('role')} />
				</div>
			</F.AuthCheckboxField>

			{errors.auth && (
				<F.AuthResponseError>
					<BiError /> {errors.auth.message}
				</F.AuthResponseError>
			)}

			<F.AuthSubmitButton type='submit' disabled={!isValid}>
				Отправить
			</F.AuthSubmitButton>

			<span>
				Уже зарегистрированы? <Link to='/auth/signin'>Авторизация</Link>
			</span>
		</F.AuthForm>
	)
}
