import Image from "next/image";
import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";
import ReviewStars from "./ReviewStars";

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image }) {
	const dispatch = useDispatch();

	const [rating] =
		useState(Math.floor(Math.random() * MAX_RATING - MIN_RATING + 1)) +
		MIN_RATING;

	const [hasPrime] = useState(Math.random() < 0.5);

	const addItemToBasket = () => {
		const product = {
			id,
			title,
			price,
			rating,
			description,
			category,
			image,
			hasPrime,
		};

		dispatch(addToBasket(product));
	};

	return (
		<div className='relative z-30 flex flex-col p-10 m-5 bg-white'>
			<p className='absolute text-xs italic text-gray-400 right-2 top-2'>
				{category}
			</p>

			<Image height={200} width={200} objectFit='contain' src={image} />

			<h4 className='my-3'>{title}</h4>

			<ReviewStars rating={rating} />

			<p className='my-2 text-xs line-clamp-2'>{description}</p>

			<div className='mb-5'>
				<Currency quantity={price} currency='EUR' />
			</div>

			{hasPrime && (
				<div className='flex items-center -mt-5 space-x-2'>
					<img className='w-12' src='https://links.papareact.com/fdw' alt='' />
					<p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
				</div>
			)}

			<button className='mt-auto button' onClick={addItemToBasket}>
				Add to Basket
			</button>
		</div>
	);
}

export default Product;
