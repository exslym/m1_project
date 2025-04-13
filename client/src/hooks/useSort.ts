import { useMemo, useState } from 'react';
import { ItemType, SortReturnType } from '../types/types';

function useSort(items: ItemType[]): SortReturnType {
	const [isAscending, setIsAscending] = useState<boolean>(true);

	// Sorts items based on the current order
	const sortedItems = useMemo(() => {
		return [...items].sort((a, b) => (isAscending ? a.id - b.id : b.id - a.id));
	}, [items, isAscending]);

	// Toggles the sort order
	const toggleSortOrder = () => {
		setIsAscending(prev => !prev);
	};

	return [sortedItems, isAscending, toggleSortOrder];
}

export default useSort;
