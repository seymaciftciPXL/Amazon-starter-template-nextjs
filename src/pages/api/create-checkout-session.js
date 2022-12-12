const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
	const { items, email } = req.body;

	const transformedItems = items.map((item) => ({
		price_data: {
			currency: "EUR",
			product_data: {
				name: item.title,
				images: [item.image],
			},
			unit_amount: item.price * 100,
		},
		// Line below does not work with current API version
		// description: item.description,
		quantity: 1,
	}));

	console.log("transformedItems", transformedItems);

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		line_items: transformedItems,
		mode: "payment",
		success_url: `${process.env.HOST}/success`,
		cancel_url: `${process.env.HOST}/checkout`,
		metadata: {
			email,
			items: JSON.stringify(items.map((item) => item.image)),
		},
		shipping_address_collection: {
			allowed_countries: ["BE", "GB"],
		},
		shipping_options: [{ shipping_rate: "shr_1ME7yPCO3ozBQcQkWZBh5bee" }],
	});

	res.status(200).json({ id: session.id });
};
