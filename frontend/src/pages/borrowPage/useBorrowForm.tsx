import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { borrowSchema, type BorrowFormData } from '@/assets/validationSchemas';
import { useBorrowBookMutation } from '@/stores/api/baseApi';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/stores/hooks';

export default function useBorrowForm() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [showError, setShowError] = useState(false);
	const { user: loggedInUser } = useAppSelector((state) => state.user);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		getValues,
		setValue,
	} = useForm<BorrowFormData>({
		resolver: yupResolver(borrowSchema),
	});

	const showErrorNotification = (message: string) => {
		setErrorMessage(message);
		setShowError(true);
	};

	const hideErrorNotification = () => {
		setShowError(false);
		setErrorMessage('');
	};

	const onSubmit = handleSubmit(async (data) => {
		try {
			await borrowBook({ createBorrowBook: data }).unwrap();

			reset();
			navigate('/');
		} catch (error: unknown) {
			console.error('Failed to borrow book:', error);
			// try to safely access nested message
			let maybeMessage = '';
			if (typeof error === 'object' && error !== null) {
				const e = error as Record<string, unknown>;
				const data = e['data'];
				if (typeof data === 'object' && data !== null) {
					const d = data as Record<string, unknown>;
					const msg = d['message'];
					if (typeof msg === 'string') maybeMessage = msg;
				}
			}
			showErrorNotification(maybeMessage);
		}
	});

	useEffect(() => {
		const requestedBookTitle = searchParams.get('bookTitle');
		if (requestedBookTitle) {
			setValue('bookTitle', requestedBookTitle);
		}
	}, [searchParams, setValue]);

	useEffect(() => {
		if (!loggedInUser?.name) return;
		setValue('userName', loggedInUser.name);
	}, [loggedInUser, setValue]);

	const handleCancel = () => navigate('/');

	return {
		register,
		onSubmit,
		errors,
		reset,
		getValues,
		setValue,
		isBorrowing,
		errorMessage,
		showError,
		showErrorNotification,
		hideErrorNotification,
		handleCancel,
	};
}
