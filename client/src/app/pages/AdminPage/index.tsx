import { useAppSelector } from 'app/hooks'
import { ColorAddForm } from './Forms/ColorForm'
import { ManufacturerAddForm } from './Forms/ManufacturerForm'
import { MaterialAddForm } from './Forms/MaterialForm'
import * as S from './styles'
import { EditProductCard } from 'app/components/EditProductCard'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { LoaderWrapper } from 'app/components/hoc/LoaderWrapper'

export function AdminPage() {
	const products = useAppSelector((state) => state.product.entities)
	const history = useHistory()
	const COLOR_FORM_KEY = 'color-form'
	const MANUFACTURER_FORM_KEY = 'manufacturer-form'
	const MATERIAL_FORM_KEY = 'material-form'

	useEffect(() => {
		sessionStorage.clear()
	}, [])

	return (
		<LoaderWrapper>
			<S.AdminPageWrapper>
				<S.ProductListWrapper>
					{products?.map((product) => (
						<EditProductCard key={product.productId} {...product} />
					))}
				</S.ProductListWrapper>
				<S.AsideFormsWrapper>
					<ColorAddForm formKey={COLOR_FORM_KEY} />
					<ManufacturerAddForm formKey={MANUFACTURER_FORM_KEY} />
					<MaterialAddForm formKey={MATERIAL_FORM_KEY} />
					<S.AddProduct>
						<span>Добавить товар</span>
						<span onClick={() => history.push('/admin/add')}>Страница добавления товара</span>
					</S.AddProduct>
				</S.AsideFormsWrapper>
			</S.AdminPageWrapper>
		</LoaderWrapper>
	)
}
