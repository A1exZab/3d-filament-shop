export type SignUpPayload = {
	firstName: string
	lastName: string
	email: string
	password: string
	role: 'USER' | 'ADMIN'
}

export type SignInPayload = {
	email: string
	password: string
}

export type AuthResponse = {
	accessToken: string
	refreshToken: string
}
