import * as S from './styles'
import { useHistory } from 'react-router-dom'
import { IoCloseOutline } from 'react-icons/io5'

type FullWindowLayoutProps = {
	children: React.ReactNode | React.ReactNode[]
	onClose?: () => void
}

export const FullWindowLayout = ({ children, onClose }: FullWindowLayoutProps) => {
	const history = useHistory()
	const goBack = () => history.goBack()
	return (
		<S.Layout>
			<IoCloseOutline onClick={onClose || goBack} />
			<S.Main>{children}</S.Main>
		</S.Layout>
	)
}
