import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ErrorNotificationProps {
	message: string;
	isVisible: boolean;
	onClose: () => void;
}

export function ErrorNotification({
	message,
	isVisible,
	onClose,
}: ErrorNotificationProps) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
		return () => setIsMounted(false);
	}, []);

	useEffect(() => {
		if (isVisible) {
			const timer = setTimeout(() => {
				onClose();
			}, 5000);

			return () => clearTimeout(timer);
		}
	}, [isVisible, onClose]);

	if (!isMounted || !isVisible) return null;

	const portalContainer = document.getElementById('portal-root');
	if (!portalContainer) return null;

	return createPortal(
		<div className="fixed top-4 right-4 z-50 max-w-sm">
			<div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg border-l-4 border-red-600">
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<svg
							className="w-5 h-5 mr-2"
							fill="currentColor"
							viewBox="0 0 20 20">
							<path
								fillRule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="font-medium">Error</span>
					</div>
					<button
						onClick={onClose}
						className="text-white hover:text-red-200 transition-colors">
						<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
							<path
								fillRule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				</div>
				<p className="mt-2 text-sm">{message}</p>
			</div>
		</div>,
		portalContainer
	);
}
