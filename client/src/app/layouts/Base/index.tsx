import { PropsWithChildren } from 'react'

import * as S from './styles'
import { Header } from 'app/components/Header'
import { Footer } from 'app/components/Footer'

export const BaseLayout = ({ children }: PropsWithChildren<unknown>) => {
	return (
		<S.Layout>
			<Header />
			<S.Main>{children}</S.Main>
			<Footer />
		</S.Layout>
	)
}
