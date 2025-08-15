import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ErrorNotification } from '../ErrorNotification';

// Mock createPortal
vi.mock('react-dom', async () => {
	const actual = await vi.importActual('react-dom');
	return {
		...actual,
		createPortal: (children: React.ReactNode) => children,
	};
});

describe('ErrorNotification', () => {
	const mockOnClose = vi.fn();
	const defaultProps = {
		message: 'Test error message',
		isVisible: true,
		onClose: mockOnClose,
	};

	beforeEach(() => {
		// Create portal root element
		const portalRoot = document.createElement('div');
		portalRoot.setAttribute('id', 'portal-root');
		document.body.appendChild(portalRoot);

		// Mock setTimeout
		vi.useFakeTimers();
	});

	afterEach(() => {
		// Clean up
		const portalRoot = document.getElementById('portal-root');
		if (portalRoot) {
			document.body.removeChild(portalRoot);
		}
		vi.clearAllMocks();
		vi.useRealTimers();
	});

	it('renders when visible and mounted', () => {
		render(<ErrorNotification {...defaultProps} />);

		expect(screen.getByText('Error')).toBeInTheDocument();
		expect(screen.getByText('Test error message')).toBeInTheDocument();
	});

	it('does not render when not visible', () => {
		render(<ErrorNotification {...defaultProps} isVisible={false} />);

		expect(screen.queryByText('Error')).not.toBeInTheDocument();
		expect(screen.queryByText('Test error message')).not.toBeInTheDocument();
	});

	it('calls onClose when close button is clicked', () => {
		render(<ErrorNotification {...defaultProps} />);

		const closeButton = screen.getByRole('button');
		fireEvent.click(closeButton);

		expect(mockOnClose).toHaveBeenCalledTimes(1);
	});

	it('automatically closes after 5 seconds', async () => {
		render(<ErrorNotification {...defaultProps} />);

		// Fast-forward time by 5 seconds
		vi.advanceTimersByTime(5000);

		await waitFor(() => {
			expect(mockOnClose).toHaveBeenCalledTimes(1);
		});
	});

	it('cleans up timer when component unmounts', () => {
		const { unmount } = render(<ErrorNotification {...defaultProps} />);

		// Unmount before timer completes
		unmount();

		// Fast-forward time
		vi.advanceTimersByTime(5000);

		// onClose should not be called after unmount
		expect(mockOnClose).not.toHaveBeenCalled();
	});

	it('cleans up timer when isVisible changes to false', async () => {
		const { rerender } = render(<ErrorNotification {...defaultProps} />);

		// Change isVisible to false
		rerender(<ErrorNotification {...defaultProps} isVisible={false} />);

		// Fast-forward time
		vi.advanceTimersByTime(5000);

		// onClose should not be called
		expect(mockOnClose).not.toHaveBeenCalled();
	});

	it('restarts timer when isVisible changes from false to true', async () => {
		const { rerender } = render(
			<ErrorNotification {...defaultProps} isVisible={false} />
		);

		// Change isVisible to true
		rerender(<ErrorNotification {...defaultProps} isVisible={true} />);

		// Fast-forward time by 4 seconds (should not trigger)
		vi.advanceTimersByTime(4000);
		expect(mockOnClose).not.toHaveBeenCalled();

		// Fast-forward to 5 seconds (should trigger)
		vi.advanceTimersByTime(1000);

		await waitFor(() => {
			expect(mockOnClose).toHaveBeenCalledTimes(1);
		});
	});

	it('renders with correct styling classes', () => {
		render(<ErrorNotification {...defaultProps} />);

		// Find the notification container div (the one with bg-red-500)
		const notification = screen.getByText('Error').closest('.bg-red-500');
		expect(notification).toBeInTheDocument();
		expect(notification).toHaveClass('text-white');
		expect(notification).toHaveClass('px-6');
		expect(notification).toHaveClass('py-4');
		expect(notification).toHaveClass('rounded-lg');
	});

	it('displays the error message correctly', () => {
		const customMessage = 'Custom error message for testing';
		render(<ErrorNotification {...defaultProps} message={customMessage} />);

		expect(screen.getByText(customMessage)).toBeInTheDocument();
	});
});
