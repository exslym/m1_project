import { useEffect, useState } from 'react';
import { ItemType } from '../types/types';

function useData() {
	const [items, setItems] = useState<ItemType[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const fetchItems = async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/items`);
			if (!response.ok) {
				throw new Error(`Failed to fetch items: ${response.statusText}`);
			}

			const data = await response.json();
			// Update data only if it has changed
			setItems(prevItems => {
				if (JSON.stringify(prevItems) !== JSON.stringify(data)) {
					return data;
				}
				return prevItems;
			});
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message || 'Unknown error occurred.');
			} else {
				setError('Unknown error occurred.');
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		// Initial fetch
		fetchItems();
		// Set up interval for auto-refresh
		const intervalId = setInterval(fetchItems, 10000);
		// Cleanup interval on component unmount
		return () => clearInterval(intervalId);
	}, []);

	return { items, loading, error };
}

export default useData;
