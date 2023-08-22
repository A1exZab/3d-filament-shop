import { PropsWithChildren, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import * as S from './styles'
import { getAllProducts } from 'app/store/product'
import { getAllColors } from 'app/store/color'
import { getAllMaterials } from 'app/store/material'
import { getAllManufacturers } from 'app/store/manufacturer'

export function LoaderWrapper({ children }: PropsWithChildren<unknown>) {
	const dispatch = useAppDispatch()
	const productLoadingStatus = useAppSelector((state) => state.product.isLoading)
	const colorLoadingStatus = useAppSelector((state) => state.color.isLoading)
	const manufacturerLoadingStatus = useAppSelector((state) => state.manufacturer.isLoading)
	const materialLoadingStatus = useAppSelector((state) => state.material.isLoading)

	const isLoading =
		productLoadingStatus || colorLoadingStatus || manufacturerLoadingStatus || materialLoadingStatus

	useEffect(() => {
		dispatch(getAllColors())
		dispatch(getAllManufacturers())
		dispatch(getAllMaterials())
		dispatch(getAllProducts())
	}, [])

	if (isLoading)
		return (
			<S.LoaderContainer>
				<S.Loader />
			</S.LoaderContainer>
		)

	return children
}
