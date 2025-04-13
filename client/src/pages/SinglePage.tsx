import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ItemType } from '../types/types';

function SinglePage() {
	const [item, setItem] = useState<ItemType | null>(null);
	const [error, setError] = useState<string | null>(null);
	const { id: idString } = useParams<{ id: string }>();
	const id = Number(idString);

	useEffect(() => {
		const fetchItem = async () => {
			try {
				const response = await fetch(`${process.env.API_URL}/items/${id}`);
				// Handle 403 status before parsing JSON
				if (response.status === 403) {
					setError('Access denied for this item.');
					return; // Exit early to avoid calling response.json()
				}

				// Handle other non-OK responses
				if (!response.ok) {
					throw new Error(`Failed to fetch item.`);
				}

				const data = await response.json();
				setItem(data);
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message || 'Unknown error occurred.');
				} else {
					setError('Unknown error occurred.');
				}
			}
		};

		fetchItem();
	}, [id]);

	if (error) {
		return (
			<div className='detail error'>
				<Link to={'/'}>Go Back</Link>
				<h2>Error</h2>
				<p>{error}</p>
			</div>
		);
	}

	if (!item) {
		return (
			<div className='detail loading'>
				<Link to={'/'}>Go Back</Link>
				<h2>Loading...</h2>
			</div>
		);
	}

	return (
		<div className='detail'>
			<Link to={'/'}>Go Back</Link>
			<h2>Item Details</h2>
			<p>ID: {item.id}</p>
			<p>Name: {item.name}</p>
			<p>Description: {item.description}</p>
		</div>
	);
}

export default SinglePage;
