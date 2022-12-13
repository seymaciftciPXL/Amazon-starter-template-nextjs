import moment from "moment/moment";
import Currency from "react-currency-formatter";

function Order({ id, amount, amountShipping, items, timestamp, images }) {
	return (
		<div className='relative border rounded-md'>
			<div className='flex items-center p-5 space-x-10 text-sm text-gray-600 bg-gray-100'>
				<div>
					<p className='text-xs font-bold'>ORDER PLACED</p>
					<p>{moment.unix(timestamp).format("DD MM YYYY")}</p>
				</div>

				<div>
					<p className='text-xs font-bold'>TOTAL</p>
					<p>
						<Currency quantity={amount} currency='EUR' /> - Next Day Delivery
						<Currency quantity={amountShipping} currency='EUR' />
					</p>
				</div>

				<p className='self-end flex-1 text-sm text-right text-blue-500 whitespace-nowrap sm:text-xl'>
					{items.length} items
				</p>

				<p className='absolute w-40 text-xs truncate whitespace-normal top-2 right-2 lg:w-72'>
					ORDER # {id}
				</p>
			</div>

			<div className='p-5 sm:p-10'>
				<div className='flex space-x-6 overflow-x-auto'>
					{images?.map((image) => (
						<img src={image} alt='' className='object-contain h-20 sm:h-32' />
					))}
				</div>
			</div>
		</div>
	);
}

export default Order;
