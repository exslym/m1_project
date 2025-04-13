import React from 'react';

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
			<button
				disabled={currentPage === 1}
				onClick={() => onPageChange(currentPage - 1)}
			>
				Prev
			</button>
			<span>{`Page ${currentPage} of ${totalPages}`}</span>
			<button
				disabled={currentPage === totalPages}
				onClick={() => onPageChange(currentPage + 1)}
			>
				Next
			</button>
		</div>
	);
};

export default ListPagination;
