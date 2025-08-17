import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

interface ToastMessage {
	title: string;
	description: string;
	icon?: React.ReactNode;
	action: {
		label: string;
		onClick: () => void;
	};
}

const toastMessages: ToastMessage[] = [
	{
		title: "Contattaci su WhatsApp",
		description: "Hai domande? Scrivici su WhatsApp!",
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
				<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
				<path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
				<path d="M9 10a0.5 .5 0 0 0 1 0v-1a0.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a0.5 .5 0 0 0 0 -1h-1a0.5 .5 0 0 0 0 1" />
			</svg>
		),
		action: {
			label: "Contattaci",
			onClick: () => window.open("https://wa.me/393513491091", "_blank")
		}
	},
	{
		title: "Vuoi unirti alla squadra?",
		description: "Contattaci su WhatsApp per informazioni",
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
				<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
				<path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
				<path d="M9 10a0.5 .5 0 0 0 1 0v-1a0.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a0.5 .5 0 0 0 0 -1h-1a0.5 .5 0 0 0 0 1" />
			</svg>
		),
		action: {
			label: "Contattaci",
			onClick: () => window.open("https://wa.me/393513491091?text=Ciao! Vorrei informazioni sulla squadra", "_blank")
		}
	},
	/*
	{
		title: "Prossima partita",
		description: "Vuoi sapere quando gioca l'Atletico CerCast?",
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
				<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
				<path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
				<path d="M9 10a0.5 .5 0 0 0 1 0v-1a0.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a0.5 .5 0 0 0 0 -1h-1a0.5 .5 0 0 0 0 1" />
			</svg>
		),
		action: {
			label: "Info partite",
			onClick: () => window.open("https://wa.me/393513491091?text=Quando è la prossima partita?", "_blank")
		}
	}*/
];

export default function RandomToast() {
	const currentIndexRef = useRef(0);

	useEffect(() => {
		function showNextToast() {
			// Dismiss all existing toasts before showing a new one
			toast.dismiss();
			
			const currentMessage = toastMessages[currentIndexRef.current];
			
			try {
				toast(currentMessage.title, {
					description: currentMessage.description,
					icon: currentMessage.icon,
					action: currentMessage.action,
					duration: 8000,
				});
			} catch (error) {
				console.error('Error showing toast:', error);
			}

			// Move to next message in round-robin fashion
			currentIndexRef.current = (currentIndexRef.current + 1) % toastMessages.length;
		}

		function scheduleNextToast() {
			const delay = Math.random() * 20000 + 10000; // 10-30 seconds
			setTimeout(() => {
				showNextToast();
				// Schedule next toast
				scheduleNextToast();
			}, delay);
		}

		// Start the round-robin toast system after a delay
		const initialDelay = setTimeout(scheduleNextToast, 5000);

		return () => {
			clearTimeout(initialDelay);
		};
	}, []);

	return null;
}
