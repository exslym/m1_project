import React from 'react';
import Button from './Button';

interface ListPaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const ListPagination: React.FC<ListPaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	return (
		<div className='list-pagination'>
			<Button
				id={undefined}
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				Prev
			</Button>
			<span>{`Page ${currentPage} of ${totalPages}`}</span>
			<Button
				id={undefined}
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				Next
			</Button>
		</div>
	);
};

export default ListPagination;
