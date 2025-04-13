import React from 'react';

interface ActiveItemSubtitleProps {
	activeItemIds: number[];
}

const ActiveItemSubtitle: React.FC<ActiveItemSubtitleProps> = ({
	activeItemIds,
}) => {
	return (
		<div className='list-subtitle'>
			Active Item ID:{' '}
			{activeItemIds.length > 0 ? activeItemIds.join(', ') : 'Empty'}
		</div>
	);
};

export default ActiveItemSubtitle;
