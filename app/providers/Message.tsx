import { App } from 'antd'
import { FC, PropsWithChildren } from 'react'

const Message: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return <App>{children}</App>
}

export default Message
