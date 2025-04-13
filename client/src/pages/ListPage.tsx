import React, { useMemo, useState } from 'react';
import useData from '../hooks/useData';
import useSort from '../hooks/useSort';
import {
	ActiveItemSubtitle,
	ListControls,
	ListItem,
	ListPagination,
} from './components';

function ListPage() {
	const { items, loading, error } = useData();
	const [sortedItems, isAscending, toggleSortOrder] = useSort(items);

	const [query, setQuery] = useState<string>(''); // Search query
	const [activeItemIds, setActiveItemIds] = useState<number[]>([]); // Array of active item IDs
	const [currentPage, setCurrentPage] = useState<number>(1); // Current page
	const itemsPerPage = 10; // Number of items per page

	// Filters items based on the search query
	const filteredItems = useMemo(() => {
		return sortedItems.filter(item =>
			`${item.id}`.toLowerCase().includes(query.toLowerCase().trim()),
		);
	}, [sortedItems, query]);

	// Pagination
	const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
	const paginatedItems = useMemo(() => {
		const start = (currentPage - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		return filteredItems.slice(start, end);
	}, [filteredItems, currentPage, itemsPerPage]);

	// Handles changes in the search input
	const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value);
		setCurrentPage(1); // Reset to the first page when the query changes
	};

	// Toggle active status for an item
	const toggleActiveStatus = (id: number) => {
		if (activeItemIds.includes(id)) {
			// If the item is already active, remove it from the list
			setActiveItemIds(activeItemIds.filter(activeId => activeId !== id));
		} else {
			// Otherwise, add it to the list
			setActiveItemIds([...activeItemIds, id]);
		}
	};

	return (
		<div className='list-wrapper'>
			<div className='list-header'>
				<h1 className='list-title'>Items List</h1>
				{loading && <div>Loading...</div>}
				{error && <div>Error: {error}</div>}
			</div>

			{!loading && !error && (
				<>
					<ActiveItemSubtitle activeItemIds={activeItemIds} />

					<ListControls
						isAscending={isAscending}
						onSortClick={toggleSortOrder}
						query={query}
						onQueryChange={handleQueryChange}
					/>

					<ul className='list-container'>
						{paginatedItems.length === 0 && <span>No items found</span>}
						{paginatedItems.map(item => (
							<ListItem
								key={item.id}
								isActive={activeItemIds.includes(item.id)} // Check if the item is active
								id={item.id}
								name={item.name}
								description={item.description}
								onSetActive={toggleActiveStatus} // Pass the toggle function
							/>
						))}
					</ul>

					<ListPagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={setCurrentPage}
					/>
				</>
			)}
		</div>
	);
}

export default ListPage;
