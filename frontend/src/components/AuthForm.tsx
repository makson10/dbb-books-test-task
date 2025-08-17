import type { ReactNode } from 'react';
import GoToHome from '@/components/GoToHome';
import AlreadySignedInModal from '@/components/AlreadySignedInModal';

type Props = {
	title: string;
	onSubmit: () => Promise<void> | void;
	isLoading: boolean;
	submitLabel?: string;
	children: ReactNode;
	extraFooter?: ReactNode;
	hasToken: boolean;
	onLogout: () => void;
};

export default function AuthForm({
	title,
	onSubmit,
	isLoading,
	submitLabel = 'Submit',
	children,
	extraFooter,
	hasToken,
	onLogout,
}: Props) {
	return (
		<>
			{hasToken && <AlreadySignedInModal onLogout={onLogout} />}

			<GoToHome />
			<div className="p-12 max-w-md mx-auto">
				<h1 className="text-2xl font-bold mb-6">{title}</h1>

				<form onSubmit={onSubmit} className="space-y-4">
					{children}

					<div className="flex flex-col space-y-4">
						<button
							type="submit"
							disabled={isLoading}
							className={`w-full px-4 py-2 rounded-lg font-medium transition-colors bg-pink-500 text-white hover:bg-pink-600 disabled:opacity-60`}>
							{isLoading ? `${submitLabel}...` : submitLabel}
						</button>

						{extraFooter}
					</div>
				</form>
			</div>
		</>
	);
}
