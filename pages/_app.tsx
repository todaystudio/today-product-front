import { TypeComponentAuthFields } from '@shared/types/auth.type'
import type { AppProps } from 'next/app'

import MainProvider from '../app/providers/MainProvider'
import '../styles/globals.css'

type TypeAppProps = AppProps & TypeComponentAuthFields

export default function App({ Component, pageProps }: TypeAppProps) {
	return (
		<MainProvider Component={Component}>
			<Component {...pageProps} />
		</MainProvider>
	)
}
