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
				<p className='list-item__id'>
					ID: <strong>{id}</strong>
				</p>
				<p className='list-item__name'>
					<strong>{name}</strong>
				</p>
				<p className='list-item__description'>{description}</p>
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
