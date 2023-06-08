import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import logoImage from '../../../../assets/logos/logo-dark.svg'

const Logo: FC = () => {
	return (
		<Link href="/">
			<Image
				src={logoImage}
				width={160}
				height={35}
				alt={'Today Cinema'}
				draggable={false}
			/>
		</Link>
	)
}

export default Logo
