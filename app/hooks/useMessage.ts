import { App } from 'antd'

export const useMessage = () => {
	const { message, modal, notification } = App.useApp()

	return { message, modal, notification }
}
