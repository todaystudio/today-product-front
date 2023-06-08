import { IUserProfile } from '@services/user/user.interface'
import { Tag } from 'antd'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import styles from '../MeScreen.module.scss'
import ConfirmEmailButton from './ConfirmEmailButton'

interface IMeInfo {
	user: IUserProfile
}

const MeInfo: FC<IMeInfo> = ({ user }) => {
	return (
		<div className={cn(styles.MeInfo, styles.DashboardItem)}>
			<div className={styles.avatar}>
				<Image
					src={user.avatarPath}
					height={100}
					width={100}
					alt="User avatar"
				/>
			</div>
			<div className={styles.info}>
				<div className={styles.name}>
					<span>{user.name}</span>
					{user.isAdmin && <Tag color="cyan">ADMIN</Tag>}
				</div>
				<div className={styles.email}>
					{user.email}
					{!user.emailConfirm && <ConfirmEmailButton />}
				</div>
				<div className={styles.edit}>
					<Link href="me/edit">Изменить</Link>
				</div>
			</div>
		</div>
	)
}

export default MeInfo
