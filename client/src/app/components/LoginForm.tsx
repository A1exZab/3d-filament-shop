import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as F from 'app/styles/form'
import { Link } from 'react-router-dom'
import { BiError } from 'react-icons/bi'
import { PiEyeLight, PiEyeClosedLight } from 'react-icons/pi'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { signIn } from 'app/store/user'
import useFormPersist from 'react-hook-form-persist'

type LoginFormProps = {
	formKey: string
}

export function LoginForm({ formKey }: LoginFormProps) {
	const [showPassword, setShowPassword] = useState(false)
	const { authError } = useAppSelector((state) => state.user)
	const dispatch = useAppDispatch()

	type LoginFormFields = {
		email: string
		password: string
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
	} = useForm<LoginFormFields>({
		mode: 'all'
	})

	useFormPersist(formKey, { watch, setValue })

	const onSubmit: SubmitHandler<LoginFormFields> = (data) => {
		dispatch(signIn(data))
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
			<F.AuthTitle>Авторизация</F.AuthTitle>
			<F.AuthTextField
				onChange={() => errors.auth && clearErrors('auth')}
				error={errors?.email?.message}>
				<label>Email</label>
				<input
					placeholder='Введите email'
					{...register('email', {
						required: 'Поле обязательно для заполнения'
					})}
				/>
			</F.AuthTextField>
			{errors?.email && (
				<F.AuthError>
					<BiError /> {errors?.email?.message}
				</F.AuthError>
			)}

			<F.AuthTextField
				onChange={() => errors.auth && clearErrors('auth')}
				error={errors?.password?.message}>
				<label>Пароль</label>
				<input
					placeholder='Введите пароль'
					type={showPassword ? 'text' : 'password'}
					{...register('password', {
						required: 'Поле обязательно для заполнения'
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

			{errors.auth && (
				<F.AuthResponseError>
					<BiError /> {errors.auth.message}
				</F.AuthResponseError>
			)}

			<F.AuthSubmitButton type='submit' disabled={!isValid}>
				Отправить
			</F.AuthSubmitButton>
			<span>
				Еще не зарегистрированы? <Link to='/auth/signup'>Регистрация</Link>
			</span>
		</F.AuthForm>
	)
}
