import { FormQuestionType } from "entities/Form";

export const fieldTypeTranslate: Record<FormQuestionType, string> = {
	checkbox: "Несколько вариантов ответа",
	input: "Поле ввода",
	radio: "Один вариант ответа",
	textarea: "Большое поле ввода",
	listbox: "Выпадающий список"
}