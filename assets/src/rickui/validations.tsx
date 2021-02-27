export const ALPHA_NUMERIC_REGEX = new RegExp(/^[a-zA-Z0-9_]*$/).compile()
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/
).compile()

export const EMAIL_REGEX = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
).compile()

export type InputType = 'TextInput' | 'TextArea' | 'Password'

export type FormValues = { [id: string]: string }

export type FormErrors = { [id: string]: string }

export type FormField = {
  field: string
  placeholder: string
  label: string
  inputType: InputType
  validation?: RegExp
  validationMessage?: string
}

export type FormDescription = {
  id: string
  fields: FormField[]
  errors: FormErrors
  isValid: boolean
  submitLabel: string
  loading: boolean
  values: FormValues
}
