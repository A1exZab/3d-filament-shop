export const dataConverter = (isoDate: string): string => {
	const date = new Date(isoDate)

	const dayValue = date.getDate()
	const day: string = dayValue < 10 ? `0${dayValue}` : `${dayValue}`

	const monthValue = date.getMonth() + 1
	const month: string = monthValue < 10 ? `0${monthValue}` : `${monthValue}`

	return `${day}.${month}.${date.getFullYear()}`
}
