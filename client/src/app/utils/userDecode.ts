import { User, DecodedUser } from 'app/types'
import jwt_decode from 'jwt-decode'

export const userDecode = (jwt: string): User => {
	const decoded: DecodedUser = jwt_decode(jwt)
	return {
		userId: decoded.userId,
		firstName: decoded.firstName,
		lastName: decoded.lastName,
		email: decoded.email,
		role: decoded.role
	}
}
