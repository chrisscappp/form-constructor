import { FormDetail } from "entities/Form";

export function validateFormCard(form: FormDetail) {
	
	if (!form) {
		return ['Форма не найдена']
	}

	let errors: string[] = []

	for (let i = 0; i < form.questions.length; i++) {
		if (
      form.questions[i].type !== "input" &&
      form.questions[i].type !== "textarea" &&
      form.questions[i].answers?.length === 0
    ) {
      errors.push("На все вопросы в форме должен быть дан ответ");
      break;
    }
	}
	
	return errors
}