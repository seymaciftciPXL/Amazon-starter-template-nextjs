import moment from "moment/moment";
import { getSession, useSession } from "next-auth/react";
import Header from "../components/Header";
import { db } from "../../firebase";
import Order from "../components/Order";

// function Orders({ orders }) {
function Orders({ orders }) {
	const { data: session } = useSession();

	return (
		<div>
			<Header />
			<main className='max-w-screen-lg p-10 mx-auto'>
				<h1 className='pb-1 mb-2 text-3xl border-b border-yellow-400'>
					Your Orders
				</h1>

				{session ? (
					<div className='mt-5 space-y-4'>
						{orders?.map(
							({ id, amount, amountShipping, items, timestamp, images }) => (
								<Order
									key={id}
									id={id}
									amount={amount}
									amountShipping={amountShipping}
									items={items}
									timestamp={timestamp}
									images={images}
								/>
							)
						)}
					</div>
				) : (
					<h2>Please sign in to see your orders</h2>
				)}
			</main>
		</div>
	);
}

export default Orders;

export async function getServerSideProps(context) {
	const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

	// Get the users logged in credentials...
	const session = await getSession(context);

	if (!session) {
		return {
			props: {},
		};
	}

	if (!db) {
		return { props: {} };
	}

	// Firebase db
	const stripeOrders = await db
		.collection("users")
		.doc(session?.user?.email)
		.collection("orders")
		.orderBy("timestamp", "desc")
		.get();

	// Stripe orders
	const orders = await Promise.all(
		stripeOrders.docs.map(async (order) => ({
			id: order.id,
			amount: order.data().amount,
			amountShipping: order.data().amount_shipping,
			images: order.data().images,
			timestamp: moment(order.data().timestamp.toDate()).unix(),
			items: (
				await stripe.checkout.session.listLineItems(order.id, { limit: 100 })
			).data(),
		}))
	);

	return {
		props: { orders },
	};
}
