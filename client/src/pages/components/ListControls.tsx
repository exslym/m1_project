import React from 'react';

interface ListControlsProps {
	isAscending: boolean;
	onSortClick: () => void;
	query: string;
	onQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ListControls: React.FC<ListControlsProps> = ({
	isAscending,
	onSortClick,
	query,
	onQueryChange,
}) => {
	return (
		<div className='list-controls'>
			<button onClick={onSortClick}>
				Sort ({isAscending ? 'ASC' : 'DESC'})
			</button>
			<input
				type='text'
				placeholder='Filter by ID'
				value={query}
				onChange={onQueryChange}
			/>
		</div>
	);
};

export default ListControls;
