import React, { memo } from 'react';

interface ButtonProps {
	onClick: ((id: number) => void) | (() => void); // Handler for button click
	id?: number; // Optional ID associated with the button
	disabled?: boolean; // Whether the button is disabled
	children: React.ReactNode; // Content inside the button
}

const Button: React.FC<ButtonProps> = ({ onClick, id, disabled, children }) => {
	const handleClick = () => {
		if (onClick) {
			if (id !== undefined) {
				// If ID is defined, call the handler with the ID
				(onClick as (id: number) => void)(id);
			} else {
				// If ID is not needed, call the handler without parameters
				(onClick as () => void)();
			}
		}
	};

	return (
		<button onClick={handleClick} disabled={disabled}>
			{children}
		</button>
	);
};

export default memo(Button);
