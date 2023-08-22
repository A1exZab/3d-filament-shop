import { ProductPayload } from 'app/types'
import * as S from './styles'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { getMaterialById } from 'app/store/material'
import { BiEditAlt, BiTrash } from 'react-icons/bi'
import { removeProduct } from 'app/store/product'
import { useHistory } from 'react-router-dom'

export function EditProductCard({ name, productId, img, material: materialId }: ProductPayload) {
	const history = useHistory()
	const dispatch = useAppDispatch()
	const material = useAppSelector(getMaterialById(materialId))

	const handleDelete = (id: string) => {
		const confirmDelete = confirm('Вы действительно хотите удалить этот товар?')
		if (confirmDelete) {
			dispatch(removeProduct(id))
		}
	}

	const handleEdit = () => {
		history.push('/admin/edit/' + productId)
	}

	return (
		<S.EditProductWrapper>
			<S.EditCardImage file={img} />
			<S.EditCardInfo>
				<span>{`${material?.name} пластик «${name}»`}</span>
			</S.EditCardInfo>
			<S.ButtonsContainer>
				<BiEditAlt onClick={handleEdit} />
				<BiTrash onClick={() => handleDelete(productId)} />
			</S.ButtonsContainer>
		</S.EditProductWrapper>
	)
}
