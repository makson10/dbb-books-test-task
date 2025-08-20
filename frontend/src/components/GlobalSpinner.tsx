const GlobalSpinner = () => (
	<div
		className={`fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4`}
		aria-live="polite"
		role="status">
		<div className="flex flex-col items-center gap-4">
			<svg
				className="w-12 h-12 animate-spin text-white"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden>
				<circle
					className="opacity-25"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					strokeWidth="4"></circle>
				<path
					className="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
			</svg>
			<div className="text-white text-sm">Loading...</div>
		</div>
	</div>
);

export default GlobalSpinner;
