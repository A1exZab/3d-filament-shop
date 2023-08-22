import * as C from 'app/styles/components'
import * as S from './styles'
import { ProductCard } from 'app/components/ProductCard'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useEffect, useState } from 'react'
import { getAllProducts, getFilteredProducts } from 'app/store/product'
import { LoaderWrapper } from 'app/components/hoc/LoaderWrapper'
import { SearchInput } from 'app/components/SearchInput'
import { IoCloseOutline } from 'react-icons/io5'

export function HomePage() {
	const dispatch = useAppDispatch()
	const productList = useAppSelector((state) => state.product.entities) || []
	const materials = useAppSelector((state) => state.material.entities) || []
	const [selected, setSelected] = useState<string[]>([])
	const [search, setSearch] = useState<string>('')

	const handleSelect = (categoryId: string): void => {
		if (!selected.includes(categoryId)) {
			setSelected((prev) => [...prev, categoryId])
		} else {
			setSelected((prev) => [...prev.filter((id) => id !== categoryId)])
		}
	}

	useEffect(() => {
		if (!selected.length && !search.length) {
			dispatch(getAllProducts())
			return
		}

		dispatch(getFilteredProducts({ search, selected }))
	}, [search, selected])

	return (
		<LoaderWrapper>
			<S.Banner />
			<S.HomePageWrapper>
				<C.Title id='catalog'>Каталог товаров</C.Title>
				<S.FilterBlock>
					<S.Categories>
						{materials.map((material) => (
							<S.Category
								active={selected.includes(material.materialId)}
								onClick={() => handleSelect(material.materialId)}
								key={material.materialId}>
								{material.name}
							</S.Category>
						))}
					</S.Categories>
					<SearchInput search={search} setSearch={setSearch} />
				</S.FilterBlock>
				{search && (
					<S.SearchResult>
						<S.ResetSearchButton onClick={() => setSearch('')}>
							<IoCloseOutline />
							{`Поиск: ${search}`}
						</S.ResetSearchButton>
						<span>Найдено: {productList.length}</span>
					</S.SearchResult>
				)}
				<S.Products>
					{productList?.map((product) => {
						if (product.amount) {
							return <ProductCard key={product.productId} {...product} />
						}
					})}
					{!productList.length && <S.NothingFound>Ничего не найдено</S.NothingFound>}
				</S.Products>
			</S.HomePageWrapper>
		</LoaderWrapper>
	)
}
