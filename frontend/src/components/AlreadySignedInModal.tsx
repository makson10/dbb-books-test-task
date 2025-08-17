type Props = {
	onLogout: () => void;
	onGoHome?: () => void;
};

export default function AlreadySignedInModal({ onLogout, onGoHome }: Props) {
	const goHome = onGoHome ?? (() => (window.location.href = '/'));

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
			<div className="bg-white max-w-lg w-full p-6 rounded shadow-lg">
				<h2 className="text-xl font-bold mb-4">You are already signed in</h2>
				<p className="mb-6">A session token was found in your cookies.</p>
				<div className="flex gap-4 justify-end">
					<button
						onClick={onLogout}
						className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer">
						Log out
					</button>
					<button
						onClick={goHome}
						className="px-4 py-2 bg-gray-200 rounded cursor-pointer">
						Go to Home
					</button>
				</div>
			</div>
		</div>
	);
}
