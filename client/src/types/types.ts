/* 
	Represents an item in the list.
 */
export type ItemType = {
	id: number;
	name: string;
	description: string;
};

/*
	Return type for the useSort hook.
 */
export type SortReturnType = [
	ItemType[], // Sorted array of items.
	boolean, // Boolean indicating the current sort order (true for ascending).
	() => void, // Function to toggle the sort order.
];
