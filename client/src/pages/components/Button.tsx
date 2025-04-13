import React, { memo } from 'react';

interface ButtonProps {
	onClick: (id: number) => void; // Handler for button click, receives the item ID
	id?: number; // Optional ID associated with the button
	disabled?: boolean; // Whether the button is disabled
	children: React.ReactNode; // Content inside the button
}

const Button: React.FC<ButtonProps> = ({ onClick, id, disabled, children }) => {
	const handleClick = () => {
		if (onClick && id !== undefined) {
			onClick(id); // Call the handler with the ID
		}
	};

	return (
		<button onClick={handleClick} disabled={disabled}>
			{children}
		</button>
	);
};

export default memo(Button);
