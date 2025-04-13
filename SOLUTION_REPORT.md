# Solution Report

This document outlines the fixes, improvements, and optimizations implemented in the project to enhance functionality, type safety, code maintainability, and user experience.

## 1. Improvements to `ListPage.tsx`

- Added pagination functionality with `currentPage`, `itemsPerPage`, and `totalPages` to handle large datasets.
- Enhanced filtering logic to filter items based on search queries and reset the page to `1` when the query changes.
- Switched from managing a single active item (`activeItemId`) to managing multiple active items using an array (`activeItemIds`).
- Improved sorting logic to toggle between ascending and descending order.
- Improved semantics of html tags.
- Modularized functionality by extracting reusable components:
  - `ActiveItemSubtitle`: Displays the list of active item IDs.
  - `ListControls`: Handles sorting and filtering functionality.
  - `ListItem`: Displays the list of items.
  - `ListPagination`: Manages pagination.
- Implemented conditional rendering to handle three states:
  - **Error state:** Displays an error message.
  - **Loading state:** Displays a loading indicator.
  - **Data state:** Displays the list of items once data is successfully fetched.

---

## 2. Improvements to `SinglePage.tsx`

- Added error handling to display meaningful error messages to users:
  - Displays `"Access denied for this item."` for `403` status codes.
  - Handles other errors with messages like `"Failed to fetch item"` or `"Unknown error occurred."`.
- Introduced a loading state to display `"Loading..."` while data is being fetched.
- Ensured type safety by explicitly typing `useParams` as `{ id: string }` and converting `id` to a number for consistency with the rest of the application.
- Implemented conditional rendering to handle three states:
  - **Error state:** Displays an error message.
  - **Loading state:** Displays a loading indicator.
  - **Data state:** Displays item details once data is successfully fetched.

---


## 3. Improvements to `ListItem.tsx`
- Moved the "Set Active" button outside the `Link` element to avoid unintended navigation when clicking the button.
- Improved semantics of html tags.

---

## 4. New Additions

- Component `Button` improved & updated.
- Created a `hooks` folder to store custom hooks:
  - `useData`: Handles data fetching with loading and error states.
  - `useSort`: Handles sorting logic with ascending/descending order toggling.
- Added interfaces for all components. 
- Centralized type definitions in a dedicated `types.ts` file:
  - `ItemType`: Represents the structure of list items.
  - `SortReturnType`: Defines the return type for the `useSort` hook.
- Updated styles to improve the visual appearance and user experience.

---

## 5. Improvements to useData.ts
- Type Safety:
	- Replaced `any` with `ItemType` to ensure type safety and consistency with the centralized type definitions in `types.ts`.
- Error Handling:
	- Added loading and error states to handle asynchronous data fetching and provide feedback to users:
		- Displays a loading indicator while data is being fetched.
		- Displays an error message if the fetch operation fails.
	- Used `try-catch` with `unknown` type for safer error handling and narrowed errors using `instanceof Error`.
- Prevent Unnecessary State Updates:
  - Implemented logic to avoid unnecessary state updates by comparing the current and new data using `JSON.stringify`. This ensures that the component only re-renders when the data has actually changed.
- Auto-Refresh with Cleanup:
	- Added auto-refresh functionality using `setInterval` to periodically fetch data.
	- Ensured proper cleanup of the interval in the `useEffect` cleanup function to prevent memory leaks.

---

## 6. Improvements to useStore.ts
- Type Safety:
	- Replaced `any` with `ItemType` and `SortReturnType` to ensure type safety and consistency with the centralized type definitions in `types.ts`.
- Simplified Sorting Logic:
  - Simplified the sorting logic to toggle between ascending and descending order using a boolean `(isAscending)`. This makes the code more concise and easier to maintain.
- Reusable Toggle Function:
	- Created a reusable `toggleSortOrder` function to toggle between ascending and descending order. This improves readability and avoids redundant logic.

---

## 7. Proposed Improvements
- <ins>Lazy Loading with TanStack Virtual</ins>
	- Description:
		- The current implementation uses pagination to manage large datasets. However, rendering many items on a single page can still impact performance.
		- **Lazy loading** (virtualization) ensures that only visible items are rendered, improving performance for long lists.
	- Proposal:
		- Integrate **TanStack Virtual**, a modern and actively maintained library for list virtualization.
		- Use it to render only the visible items on the current page, combining it with existing pagination logic.
	- Integration with Pagination:
		- Combine lazy loading with pagination:
			- Pagination fetches data page by page.
			- Lazy loading renders only visible items on the current page.
	- Benefits:
		- Reduces rendering time and memory usage.
		- Handles large datasets efficiently without compromising performance.
		- Enhances user experience by rendering only visible elements.
 
- <ins>Infinite Scroll</ins>
	- Description:
		- Instead of pagination, implement infinite scrolling to load data dynamically as the user scrolls down the list.
	- Proposal:
		- Use a library like react-infinite-scroll-component or implement infinite scrolling with the Intersection Observer API .
		- Fetch new data when the user reaches the bottom of the list.
	- Benefits:
		- Provides a more intuitive user interface.
		- Eliminates the need for manual pagination navigation.

- <ins>Unit Testing</ins>
	- Description:
		- The project currently lacks unit tests, making it harder to ensure the correctness of components and hooks.
	- Proposal:
		- Write unit tests for:
			- Custom hooks (useData, useSort).
			- Components (ListItem, Button, ListControls, ListPagination).
			- Core functionality (e.g., event handlers, filtering, sorting).
	- Tools:
		- Use Jest and React Testing Library for testing.
		- Test edge cases (e.g., empty lists, error handling during data fetching).
	- Benefits:
		- Ensures application stability.
		- Simplifies refactoring and adding new features.

- <ins>Error Boundaries</ins>
	- Description:
		- Errors in components can crash the entire application.
	- Proposal:
		- Add Error Boundaries to handle errors gracefully and display a fallback UI instead of a blank screen.
	- Benefits:
		- Prevents critical crashes.
		- Improves reliability and fault tolerance.

- <ins>Debouncing for Search Input</ins>
	- Description:
		- Search queries are sent on every input change, which can be excessive.
	- Proposal:
		- Add debouncing to delay search requests until the user stops typing.
	- Benefits:
		- Reduces the number of API calls.
		- Improves search performance.

- <ins>Accessibility Improvements (WCAG Compliance)</ins>
	- Description:
		- Improve accessibility to meet modern standards.
	- Proposal:
		- Add ARIA attributes to interactive elements (buttons, links, inputs).
	- Benefits:
		- Makes the application accessible to users with disabilities.
		- Aligns with modern development standards.

- <ins>Code Splitting</ins>
	- Description:
		- All code is loaded at once, increasing initial load time.
	- Proposal:
		- Use code splitting with React.lazy and Suspense to load components dynamically.
	- Benefits:
		- Reduces the size of the initial bundle.
		- Speeds up application loading.
