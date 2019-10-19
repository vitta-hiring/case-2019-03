import produce from "immer";

const INITIAL_STATE = {
	name: "Vitta"
};

const example = (
	state = INITIAL_STATE,
	{ type, payload }: { type: "TEST" | "ANOTHER_TEST"; payload: string }
) =>
	produce(state, draft => {
		switch (type) {
			case "TEST":
				draft.name = payload;
				return;
			case "ANOTHER_TEST":
				draft.name = payload;
				return;
		}
	});

export default example;
