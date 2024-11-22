import { FormQuestionType } from "entities/Form";

export const fieldTypeTranslate: Record<FormQuestionType, string> = {
	checkbox: "Чекбокс",
	input: "Поле ввода",
	radio: "Радио боксы",
	textarea: "Большое поле ввода",
	listbox: "Выпадающий список"
}