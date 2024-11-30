import { AxiosError } from "axios"
import { FormSimplify } from "entities/Form"
import { $api } from "shared/api/api"

export async function releaseForm(form: FormSimplify) {
	try {
		const response = await $api.put<FormSimplify>(`/releaseForm/${form.id}`, form)
		return response.data
	} catch (e: unknown) {
		const err = e as AxiosError
		console.error("Error", err.message)
	}
}