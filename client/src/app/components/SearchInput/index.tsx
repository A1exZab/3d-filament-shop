import { useEffect, useState } from 'react'
import * as S from './styles'
import { BiSearch } from 'react-icons/bi'

type SearchInputProps = {
	search: string
	setSearch: (value: string) => void
}

export function SearchInput({ search, setSearch }: SearchInputProps) {
	const [inputValue, setInputValue] = useState('')

	useEffect(() => {
		if (!search) {
			setInputValue('')
		}
	}, [search])

	const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			const input = e.target as HTMLInputElement
			input.blur()
			setSearch(inputValue)
		}
	}

	return (
		<S.SearchInput>
			<input
				placeholder='Поиск'
				onKeyDown={(e) => handleSubmit(e)}
				onChange={(e) => setInputValue(e.target.value)}
				value={inputValue}
			/>
			<BiSearch
				onClick={() => {
					setSearch(inputValue)
				}}
			/>
		</S.SearchInput>
	)
}
