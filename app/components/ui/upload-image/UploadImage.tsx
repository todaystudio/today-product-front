import cn from 'classnames'
import { CSSProperties, FC } from 'react'

import { IProductReturn } from '@services/products/products.interface'
import { FormInstance, Spin } from 'antd'
import styles from './UploadImage.module.scss'
import { useUpload } from './useUpload'

export interface IUploadField {
	folder?: string
	value?: string
	placeholder?: string
	style?: CSSProperties
	isNoImage?: boolean
	form: FormInstance<keyof IProductReturn>
}

const UploadField: FC<IUploadField> = ({
	folder,
	isNoImage = false,
	placeholder,
	style,
	value,
	form,
}) => {
	const { isLoading, uploadFile } = useUpload(form, folder)

	return (
		<div className={cn(styles.field, styles.uploadField)} style={style}>
			<div className={styles.uploadFlex}>
				<label>
					<span>{placeholder}</span>
					<input type="file" onChange={uploadFile} />
				</label>

				{!isNoImage && (
					<div className={styles.uploadImageContainer}>
						{isLoading ? (
							<Spin />
						) : (
							value && <img src={value} alt="" width={100} height={100} />
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default UploadField
