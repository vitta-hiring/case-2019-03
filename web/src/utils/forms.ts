import { ValidationError } from "yup";

const reduceElements = (
	element: typeof HTMLInputElement.prototype,
	acumulator: { [x: string]: string | { [x: string]: string } }
): typeof acumulator => {
	const payload = { ...acumulator };
	const name =
		element.name && element.name.length ? element.name : element.id;
	if (name && name.length) {
		if (name.includes(".")) {
			const nameSplit = name.split(".");
			payload[nameSplit[0]] = {
				[nameSplit[1]]: element.value
			};
		} else {
			payload[name] = element.value;
		}
	}
	return payload;
};

export const makePayload = (elements: HTMLFormControlsCollection) => {
	return [].slice
		.call(elements)
		.reduce<{ [x: string]: string | { [x: string]: string } }>(
			(result, current: typeof HTMLInputElement.prototype) => {
				if (
					!current.value ||
					(current.type === "radio" && !current.checked)
				) {
					return result;
				}
				return reduceElements(current, result);
			},
			{}
		);
};

export const makeErrorsFromYup = (error: { inner: ValidationError[] }) => {
	return error.inner.reduce(
		(result, current) => ({
			...result,
			[current.path]: current.message
		}),
		{}
	);
};
