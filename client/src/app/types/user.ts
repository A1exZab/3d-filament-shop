export type User = {
	userId: string
	firstName: string
	lastName: string
	email: string
	role: 'USER' | 'ADMIN'
}

export type DecodedUser = {
	userId: string
	firstName: string
	lastName: string
	email: string
	role: 'USER' | 'ADMIN'
	iat: number
	exp: number
}
