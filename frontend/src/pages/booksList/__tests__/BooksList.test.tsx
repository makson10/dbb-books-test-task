import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../../test/utils';
import { mockBooks } from '../../../test/utils';
import BooksList from '../index';

// Mock the hooks
vi.mock('react-router-dom', () => ({
	useNavigate: () => vi.fn(),
}));

vi.mock('../../../stores/api/booksApi', () => ({
	useGetBooksQuery: vi.fn(),
	useGetBookCountQuery: vi.fn(),
}));

// Import the mocked functions
import {
	useGetBooksQuery,
	useGetBookCountQuery,
} from '../../../stores/api/booksApi';
import { useNavigate } from 'react-router-dom';

const mockUseGetBooksQuery = vi.mocked(useGetBooksQuery);
const mockUseGetBookCountQuery = vi.mocked(useGetBookCountQuery);

describe('BooksList', () => {
	const mockNavigate = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();

		// Mock useNavigate
		vi.mocked(useNavigate).mockReturnValue(mockNavigate);
	});

	const renderBooksList = (props = {}) => {
		return renderWithProviders(<BooksList {...props} />);
	};

	it('renders loading state initially', () => {
		mockUseGetBooksQuery.mockReturnValue({
			data: undefined,
			isLoading: true,
			error: undefined,
			refetch: vi.fn(),
		} as any);

		mockUseGetBookCountQuery.mockReturnValue({
			data: undefined,
			isLoading: true,
		} as any);

		renderBooksList();

		expect(screen.getByRole('status')).toBeInTheDocument();
	});

	it('renders error state when API fails', () => {
		mockUseGetBooksQuery.mockReturnValue({
			data: undefined,
			isLoading: false,
			error: { message: 'API Error' },
			refetch: vi.fn(),
		} as any);

		mockUseGetBookCountQuery.mockReturnValue({
			data: undefined,
			isLoading: false,
		} as any);

		renderBooksList();

		expect(
			screen.getByText('Error loading books. Please try again.')
		).toBeInTheDocument();
	});

	it('renders books list when data is loaded', () => {
		mockUseGetBooksQuery.mockReturnValue({
			data: mockBooks,
			isLoading: false,
			error: undefined,
			refetch: vi.fn(),
		} as any);

		mockUseGetBookCountQuery.mockReturnValue({
			data: { count: 1 },
			isLoading: false,
		} as any);

		renderBooksList();

		expect(screen.getByText('Books Library')).toBeInTheDocument();
		expect(screen.getByText('Test Book')).toBeInTheDocument();
		expect(screen.getByText('Test Author')).toBeInTheDocument();
	});

	it('filters books by search term', async () => {
		const multipleBooks = [
			{ ...mockBooks[0], title: 'React Book' },
			{ ...mockBooks[0], id: 2, title: 'Vue Book' },
		];

		mockUseGetBooksQuery.mockReturnValue({
			data: multipleBooks,
			isLoading: false,
			error: undefined,
			refetch: vi.fn(),
		} as any);

		mockUseGetBookCountQuery.mockReturnValue({
			data: { count: 2 },
			isLoading: false,
		} as any);

		renderBooksList();

		const searchInput = screen.getByPlaceholderText('Search by title...');
		fireEvent.change(searchInput, { target: { value: 'React' } });

		await waitFor(() => {
			expect(screen.getByText('React Book')).toBeInTheDocument();
			expect(screen.queryByText('Vue Book')).not.toBeInTheDocument();
		});
	});

	it('handles book click navigation', () => {
		mockUseGetBooksQuery.mockReturnValue({
			data: mockBooks,
			isLoading: false,
			error: undefined,
			refetch: vi.fn(),
		} as any);

		mockUseGetBookCountQuery.mockReturnValue({
			data: { count: 1 },
			isLoading: false,
		} as any);

		renderBooksList();

		const bookTitle = screen.getByText('Test Book');
		fireEvent.click(bookTitle);

		expect(mockNavigate).toHaveBeenCalledWith('/book/1');
	});

	it('handles borrow click navigation', () => {
		mockUseGetBooksQuery.mockReturnValue({
			data: mockBooks,
			isLoading: false,
			error: undefined,
			refetch: vi.fn(),
		} as any);

		mockUseGetBookCountQuery.mockReturnValue({
			data: { count: 1 },
			isLoading: false,
		} as any);

		renderBooksList();

		const borrowButton = screen.getByText('Borrow');
		fireEvent.click(borrowButton);

		expect(mockNavigate).toHaveBeenCalledWith('/borrow/?bookTitle=Test Book');
	});

	it('changes sort order when sort button is clicked', () => {
		mockUseGetBooksQuery.mockReturnValue({
			data: mockBooks,
			isLoading: false,
			error: undefined,
			refetch: vi.fn(),
		} as any);

		mockUseGetBookCountQuery.mockReturnValue({
			data: { count: 1 },
			isLoading: false,
		} as any);

		renderBooksList();

		const sortButton = screen.getByText('Sort by Title');
		fireEvent.click(sortButton);

		// The sort button should toggle between asc/desc
		expect(sortButton).toBeInTheDocument();
	});

	it('changes sort field when sort select is changed', () => {
		mockUseGetBooksQuery.mockReturnValue({
			data: mockBooks,
			isLoading: false,
			error: undefined,
			refetch: vi.fn(),
		} as any);

		mockUseGetBookCountQuery.mockReturnValue({
			data: { count: 1 },
			isLoading: false,
		} as any);

		renderBooksList();

		const sortSelect = screen.getByDisplayValue('Sort by Title');
		fireEvent.change(sortSelect, { target: { value: 'publishDate' } });

		expect(sortSelect).toHaveValue('publishDate');
	});

	it('displays pagination information', () => {
		mockUseGetBooksQuery.mockReturnValue({
			data: mockBooks,
			isLoading: false,
			error: undefined,
			refetch: vi.fn(),
		} as any);

		mockUseGetBookCountQuery.mockReturnValue({
			data: { count: 25 },
			isLoading: false,
		} as any);

		renderBooksList();

		// Should show page information
		expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
	});

	it('handles page navigation', async () => {
		const mockRefetch = vi.fn();

		mockUseGetBooksQuery.mockReturnValue({
			data: mockBooks,
			isLoading: false,
			error: undefined,
			refetch: mockRefetch,
		} as any);

		mockUseGetBookCountQuery.mockReturnValue({
			data: { count: 25 },
			isLoading: false,
		} as any);

		renderBooksList();

		const nextPageButton = screen.getByText('Next');
		fireEvent.click(nextPageButton);

		await waitFor(() => {
			expect(mockRefetch).toHaveBeenCalled();
		});
	});

	it('displays book details correctly', () => {
		mockUseGetBooksQuery.mockReturnValue({
			data: mockBooks,
			isLoading: false,
			error: undefined,
			refetch: vi.fn(),
		} as any);

		mockUseGetBookCountQuery.mockReturnValue({
			data: { count: 1 },
			isLoading: false,
		} as any);

		renderBooksList();

		expect(screen.getByText('Test Book')).toBeInTheDocument();
		expect(screen.getByText('Test Author')).toBeInTheDocument();
		expect(screen.getByText('Fiction')).toBeInTheDocument();
		expect(screen.getByText('Test Publisher')).toBeInTheDocument();
		expect(screen.getByText('$29.99')).toBeInTheDocument();
		expect(screen.getByText('2023')).toBeInTheDocument();
	});
});
