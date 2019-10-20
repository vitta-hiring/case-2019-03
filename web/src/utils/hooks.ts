import { useEffect, useRef } from "react";

export function usePrevious(value: any): typeof value {
	const ref = useRef();

	useEffect(() => {
		ref.current = value;
	});

	return ref.current;
}

export function useListener(
	target: HTMLElement | Window | Document,
	event: string,
	callback: React.EventHandler<any>,
	...args: any[]
) {
	const ref: { current: any } = useRef();

	useEffect(() => {
		ref.current = callback;
	});

	useEffect(() => {
		const fn = (ev: Event) => ref.current(ev);

		target.addEventListener(event, fn, ...args);

		return () => target.removeEventListener(event, fn, ...args);
	}, []);
}
