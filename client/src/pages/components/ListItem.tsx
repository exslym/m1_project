import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

interface ListItemProps {
	id: number;
	name: string;
	description: string;
	isActive: boolean;
	onSetActive: (id: number) => void; // Handler for toggling the active status of the item
}

const ListItem: React.FC<ListItemProps> = ({
	id,
	name,
	description,
	isActive,
	onSetActive,
}) => {
	return (
		<li className={isActive ? 'list-item active' : 'list-item'}>
			<Link to={`/${id}`}>
				<div className='list-item-actions'>
					<div>
						ID: <b>{id}</b>
					</div>
				</div>
				<div>{name}</div>
				<div className='list-item__description'>{description}</div>
			</Link>

			<div className='list-item-button'>
				<Button
					id={id}
					onClick={() => onSetActive(id)} // Toggle active status
					disabled={false} // Always enabled
				>
					{isActive ? 'Active' : 'Set Active'}
				</Button>
			</div>
		</li>
	);
};

export default ListItem;
