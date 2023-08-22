import styled, { css } from 'styled-components'

export const ErrorStyles = css`
	display: inline-flex;
	align-items: center;
	gap: 6px;
	color: var(--colors-danger);
	user-select: none;
`

export const SubmitButtonStyles = css`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 12px;
	border: none;
	color: white;
	cursor: pointer;
	transition: all 0.3s ease;
	user-select: none;
`

export const FormStyles = css`
	display: flex;
	flex-direction: column;
	width: max-content;
	padding: 20px 40px;
	border-radius: 10px;
	box-shadow: 0 0 3px #cecece;
`

export const FormTitleStyles = css`
	display: inline-block;
	font-size: 20px;
	margin-bottom: 20px;
	color: var(--colors-text);
	font-weight: var(--fw-sb);
`

export const FormTextFieldStyles = css`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 30px;
	color: var(--colors-text);
	margin-bottom: 10px;
`

export const AuthForm = styled.form`
	${FormStyles}
	& span:last-of-type {
		display: inline-block;
		color: var(--colors-secondary);
		font-size: 12px;
		margin-top: 8px;

		& a {
			color: var(--colors-primary);
		}
	}
`

export const AuthTitle = styled.span`
	${FormTitleStyles}
`

export const AuthTextField = styled.div<{ error?: string }>`
	${FormTextFieldStyles}
	position: relative;

	& label {
		font-size: 14px;
		font-weight: var(--fw-m);
		user-select: none;
	}

	& input {
		width: 220px;
		height: 24px;
		font-size: 14px;
		font-weight: var(--fw-l);
		padding: 0 8px;
		border: 1px solid #cecece;
		border-radius: 12px;
		border-color: ${({ error }) => (error ? 'red' : 'none')};

		&:focus {
			outline: none;
			border: 1px solid var(--colors-primary);
		}
	}

	& div {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 24px;
		width: 24px;
		position: absolute;
		top: 0;
		right: 2px;

		& svg {
			position: absolute;
			color: var(--colors-secondary);
			cursor: pointer;
		}
	}
`

export const AuthCheckboxField = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 30px;
	color: var(--colors-text);
	margin-bottom: 10px;

	& div {
		width: 220px;
		display: flex;
		align-items: center;
	}

	& label {
		font-size: 14px;
		font-weight: var(--fw-m);
		user-select: none;
	}

	& input {
		height: 22px;
		cursor: pointer;
	}
`

export const AuthSubmitButton = styled.button<{ disabled: boolean }>`
	${SubmitButtonStyles}
	height: 30px;
	font-size: 14px;
	margin-top: 10px;
	border-radius: 15px;
	background-color: ${({ disabled }) => (disabled ? '#cecece' : 'var(--colors-primary)')};

	&:hover {
		font-weight: ${({ disabled }) => (disabled ? 'var(--fw-m)' : 'var(--fw-sb)')};
	}
`

export const AuthError = styled.span`
	${ErrorStyles}
	font-size: 14px;
	margin-bottom: 10px;
`

export const AuthResponseError = styled.span`
	${ErrorStyles}
	font-size: 14px;
`

export const PropertyForm = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
	font-size: 12px;
`

export const PropertyTitle = styled.span`
	display: inline-block;
	font-size: 14px;
	margin-bottom: 8px;
	color: var(--colors-text);
	font-weight: var(--fw-sb);
`

export const PropertyTextField = styled.div<{ error?: string }>`
	display: flex;
	flex-direction: column;
	gap: 5px;
	color: var(--colors-text);
	margin-bottom: 8px;

	& label {
		font-size: 12px;
		font-weight: var(--fw-m);
		user-select: none;
	}

	& input {
		height: 20px;
		padding: 0px 8px;
		border-radius: 12px;
		font-size: 12px;
		font-weight: var(--fw-l);
		border: 1px solid #cecece;
		border-color: ${({ error }) => (error ? 'var(--colors-danger)' : 'none')};

		&:focus {
			outline: none;
			border: 1px solid var(--colors-primary);
		}
	}
`

export const PropertySubmitButton = styled.button<{ disabled: boolean }>`
	${SubmitButtonStyles}
	height: 24px;
	border-radius: 12px;
	font-size: 12px;
	background-color: ${({ disabled }) => (disabled ? '#cecece' : 'var(--colors-primary)')};

	&:hover {
		font-weight: ${({ disabled }) => (disabled ? 'var(--fw-m)' : 'var(--fw-sb)')};
	}
`

export const PropertyError = styled.span`
	${ErrorStyles}
	font-size: 12px;
	margin-bottom: 6px;
`

export const PropertyResponseError = styled(PropertyError)`
	margin-top: 6px;
`

export const ProductForm = styled.form`
	${FormStyles}
`

export const ProductTitle = styled.span`
	${FormTitleStyles}
`
export const ProductTextField = styled.div<{ error?: string }>`
	${FormTextFieldStyles}
	& label {
		width: 150px;
		font-size: 14px;
		font-weight: var(--fw-m);
		user-select: none;
	}

	& input {
		height: 24px;
		width: 240px;
		padding: 0px 8px;
		border-radius: 12px;
		font-size: 14px;
		font-weight: var(--fw-l);
		border: 1px solid #cecece;
		border-color: ${({ error }) => (error ? 'var(--colors-danger)' : 'none')};

		&:focus {
			outline: none;
			border: 1px solid var(--colors-primary);
		}
	}
`

export const ProductSelectField = styled.div<{ error?: string }>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 30px;
	color: var(--colors-text);
	margin-bottom: 10px;

	& > span {
		width: 150px;
		font-size: 14px;
		font-weight: var(--fw-m);
		user-select: none;
	}
`

export const ProductFileField = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 30px;
	color: var(--colors-text);
	margin-bottom: 10px;

	& span {
		width: 150px;
		font-size: 14px;
		font-weight: var(--fw-m);
		user-select: none;
	}

	& > div {
		height: 24px;
		width: 240px;
		position: relative;

		& label {
			height: 100%;
			width: 130px;
			min-width: max-content;
			padding: 0 10px;
			font-size: 12px;
			display: flex;
			align-items: center;
			gap: 6px;
			background-color: #f5f5f5;
			transition: all 0.3s ease;
			border-radius: 12px;
			cursor: pointer;

			& svg {
				height: 14px;
				width: 14px;
			}

			&:hover {
				background-color: var(--colors-primary);
				color: white;
			}
		}

		& input {
			display: none;
		}

		&:last-child div {
			position: absolute;
			top: 28px;
			display: flex;
			align-items: center;
			font-size: 10px;
			color: var(--colors-secondary);
		}
	}
`

export const ProductSubmitButton = styled.button<{ error?: string; disabled: boolean }>`
	${SubmitButtonStyles}
	height: 30px;
	border-radius: 15px;
	font-size: 14px;
	margin-top: ${({ error }) => (error ? '0' : '10px')};
	background-color: ${({ disabled }) => (disabled ? '#cecece' : 'var(--colors-primary)')};

	&:hover {
		font-weight: ${({ disabled }) => (disabled ? 'var(--fw-m)' : 'var(--fw-sb)')};
	}
`

export const ProductError = styled.span`
	${ErrorStyles}
	font-size: 14px;
	margin-bottom: 10px;
`
