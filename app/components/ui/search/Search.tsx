import { getProductUrl } from '@config/url.config'
import { AutoComplete, Input } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import styles from './Search.module.scss'
import { ISearchElement } from './search.interface'
import { useSearch } from './useSearch'

const Search: FC = () => {
	const { data, handleSearch } = useSearch()
	const [options, setOptions] = useState<
		{ value: string; label: JSX.Element }[]
	>([])

	useEffect(() => {
		if (!data) return
		renderOptions(data)
	}, [data])

	const renderOptions = (arr: ISearchElement[]) => {
		const options: { value: string; label: JSX.Element }[] = arr.map((i) => ({
			value: i.title,
			label: (
				<Link className={styles.link} href={getProductUrl(i.slug)}>
					<div className={styles.title}>
						<Image src={i.imagePath} alt={i.title} width={40} height={40} />
						<div>
							<span>{i.title}</span>
							<i>{i.category}</i>
						</div>
					</div>
					<div className={styles.prices}>
						<div className={styles.lastPrice}>{i.lastPrice}₽</div>
						<div
							className={classNames({
								[styles.percentsUp]: i.percentToLastPrice >= 0,
								[styles.percentsDown]: i.percentToLastPrice < 0,
							})}
						>
							{i.percentToLastPrice}%
						</div>
					</div>
				</Link>
			),
		}))

		setOptions(options)
	}
	return (
		<div>
			<AutoComplete
				dropdownMatchSelectWidth={252}
				virtual
				style={{ width: '100%' }}
				options={options}
				onSelect={() => {}}
				onSearch={handleSearch}
			>
				<Input.Search size="large" placeholder="Поиск товаров" enterButton />
			</AutoComplete>
		</div>
	)
}

export default Search
