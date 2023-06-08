import { OFUPService } from '@services/orders-for-update-price/orders-for-update-price.service'
import { message } from 'antd'
import { useMutation, useQuery } from 'react-query'

export const useOFUP = () => {
	const {
		data: orders,
		isLoading,
		refetch,
	} = useQuery('get orders by email', () => OFUPService.getByUser(), {
		select: ({ data }) => data,
	})

	const { mutateAsync: deleteHandler, isLoading: isLoadingDelete } =
		useMutation(
			'delete order for update',
			(id: number) => OFUPService.delete(id),
			{
				onSuccess() {
					message.success('Заявка удалена')
					refetch()
				},
				onError() {
					message.error('Удалить не получилось')
				},
			}
		)

	return {
		deleteHandler,
		isLoadingDelete,
		orders,
		isLoading,
	}
}
