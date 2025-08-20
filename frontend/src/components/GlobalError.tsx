import { isRouteErrorResponse } from 'react-router';

export const GlobalError = ({
	error,
	resetErrorBoundary,
}: {
	error?: unknown;
	resetErrorBoundary?: () => void;
}) => {
	// Nicely formatted fallback for route and runtime errors
	if (isRouteErrorResponse(error)) {
		return (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
				<div className="w-full max-w-2xl bg-white rounded-lg shadow-lg border-l-4 border-red-500 overflow-hidden">
					<div className="flex items-start justify-between gap-4 p-6">
						<div>
							<h2 className="text-2xl font-semibold text-red-600">
								{error.status} — {error.statusText}
							</h2>
							<p className="mt-2 text-sm text-gray-600">{String(error.data)}</p>
						</div>
						<div className="flex-shrink-0">
							{resetErrorBoundary ? (
								<button
									className="inline-flex items-center gap-2 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
									onClick={() => resetErrorBoundary()}>
									Retry
								</button>
							) : (
								<button
									className="inline-flex items-center gap-2 rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
									onClick={() => window.location.reload()}>
									Reload
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	} else if (error instanceof Error) {
		return (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
				<div className="w-full max-w-2xl bg-white rounded-lg shadow-lg border-l-4 border-red-500 overflow-hidden">
					<div className="p-6">
						<div className="flex items-start justify-between">
							<div>
								<h2 className="text-2xl font-semibold text-red-600">
									Application Error
								</h2>
								<p className="mt-2 text-sm text-gray-600">{error.message}</p>
							</div>
							<div className="flex items-center gap-2">
								{resetErrorBoundary ? (
									<button
										className="inline-flex items-center gap-2 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
										onClick={() => resetErrorBoundary()}>
										Retry
									</button>
								) : null}
								<button
									className="inline-flex items-center gap-2 rounded bg-gray-600 px-3 py-2 text-white hover:bg-gray-700"
									onClick={() => window.location.reload()}>
									Reload
								</button>
							</div>
						</div>

						<div className="mt-4">
							<p className="text-sm text-gray-500">
								The stack trace is shown below for debugging:
							</p>
							<pre className="mt-3 max-h-64 overflow-auto rounded bg-gray-100 p-4 text-xs text-gray-800">
								{error.stack}
							</pre>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
				<div className="w-full max-w-lg bg-white rounded-lg shadow-lg border-l-4 border-yellow-500 p-6">
					<h2 className="text-2xl font-semibold text-yellow-600">
						Unknown Error
					</h2>
					<p className="mt-2 text-sm text-gray-600">
						An unexpected error occurred.
					</p>
					<div className="mt-4 flex gap-2">
						<button
							className="rounded bg-gray-600 px-3 py-2 text-white hover:bg-gray-700"
							onClick={() => window.location.reload()}>
							Reload
						</button>
						{resetErrorBoundary ? (
							<button
								className="rounded bg-green-600 px-3 py-2 text-white hover:bg-green-700"
								onClick={() => resetErrorBoundary()}>
								Retry
							</button>
						) : null}
					</div>
				</div>
			</div>
		);
	}
};

export const ErrorBoundaryWrapper: React.FC = (props) => (
	<GlobalError {...props} />
);
