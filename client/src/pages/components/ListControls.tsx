import React from 'react';
import Button from './Button';

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
			<Button id={undefined} onClick={onSortClick} disabled={false}>
				Sort ({isAscending ? 'ASC' : 'DESC'})
			</Button>
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
