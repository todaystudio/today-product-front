import Head from 'next/head'
import { ScriptProps } from 'next/script'
import NextNProgress from 'nextjs-progressbar'
import { FC } from 'react'

import { accentColor } from '@config/constants'
import Favicons from './Favicons'

const HeadProvider: FC<ScriptProps> = ({ children }) => {
	return (
		<>
			<NextNProgress
				color={accentColor}
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
			/>
			<Head>
				<meta charSet="UTF-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1.0"
				/>
				<Favicons />

				<meta name="theme-color" content={'#003a8c'} />
				<meta name="msapplication-navbutton-color" content={'#003a8c'} />
				<meta
					name="apple-mobile-wev-app-status-bar-style"
					content={'#003a8c'}
				/>
			</Head>
			{children}
		</>
	)
}

export default HeadProvider
