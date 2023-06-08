import MainLayout from '@components/layouts/main-layout/MainLayout'
import { TypeComponentAuthFields } from '@shared/types/auth.type'
import { store } from '@store/store'
import { FC, PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import AuthProvider from './AuthProvider/AuthProvider'
import HeadProvider from './HeadProvider/HeadProvider'
import Message from './Message'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

const MainProvider: FC<TypeComponentAuthFields & PropsWithChildren> = ({
	children,
	Component,
}) => {
	return (
		<HeadProvider>
			<Provider store={store}>
				<Message>
					<QueryClientProvider client={queryClient}>
						<AuthProvider Component={Component}>
							<MainLayout>{children}</MainLayout>
						</AuthProvider>
					</QueryClientProvider>
				</Message>
			</Provider>
		</HeadProvider>
	)
}

export default MainProvider
