import React from 'react'
import { View } from 'react-native'
import {
  FormDescription,
  FormErrors,
  FormField,
  FormValues,
} from '../validations'
import Button from './Button'
import Text from './Text'
import FormRow from './FormRow'
import TextInput from './TextInput'

type FormActions = {
  onChange?: (values: FormValues) => void
  onSubmit?: (values: FormValues, errors: FormErrors) => void
}

type Props = { form: FormDescription; actions: FormActions }

const Form: React.FC<Props> = ({ form, actions }) => {
  const renderRow = (
    field: FormField,
    isError: boolean,
    errorColor: string,
    value: any
  ) => {
    switch (field.inputType) {
      case 'Password':
        return (
          <TextInput
            placeholder={field.placeholder}
            secureTextEntry={true}
            placeholderTextColor={isError ? errorColor : undefined}
            label={field.label}
            value={value ? value : ''}
            style={
              isError
                ? { borderColor: errorColor, color: errorColor }
                : undefined
            }
            onChangeText={(v) => {
              const newDict = { ...form.values }
              if (actions.onChange) {
                newDict[field.field] = v
                actions.onChange(newDict)
              }
            }}
          />
        )
      case 'TextInput':
        return (
          <TextInput
            placeholder={field.placeholder}
            placeholderTextColor={isError ? errorColor : undefined}
            label={field.label}
            value={value ? value : ''}
            style={
              isError
                ? { borderColor: errorColor, color: errorColor }
                : undefined
            }
            onChangeText={(v) => {
              const newDict = { ...form.values }
              if (actions.onChange) {
                newDict[field.field] = v
                actions.onChange(newDict)
              }
            }}
          />
        )
      case 'TextArea':
        return (
          <TextInput
            multiline={true}
            placeholder={field.placeholder}
            placeholderTextColor={isError ? errorColor : undefined}
            label={field.label}
            value={value ? value : ''}
            style={
              isError
                ? { borderColor: errorColor, color: errorColor }
                : undefined
            }
            onChangeText={(v) => {
              const newDict = { ...form.values }
              if (actions.onChange) {
                newDict[field.field] = v
                actions.onChange(newDict)
              }
            }}
          />
        )
    }
  }

  return (
    <View>
      {form.fields.map((field, i) => {
        const value = form.values[field.field]
        const error = form.errors[field.field]
        const isError = error != null

        const errorColor = 'red'
        return (
          <FormRow key={`${form.id}-field-${i}`}>
            {renderRow(field, isError, errorColor, value)}

            {isError ? (
              <Text style={{ color: errorColor }}>{error}</Text>
            ) : (
              <></>
            )}
          </FormRow>
        )
      })}
      <FormRow>
        <Button
          loading={form.loading}
          onPress={() => {
            const errors: FormErrors = {}

            form.fields.forEach((i) => {
              const value = form.values[i.field]

              if (
                (i.validation && !value) ||
                (i.validation && !i.validation!.test(form.values[i.field]))
              ) {
                errors[i.field] = i.validationMessage!
              }
            })

            if (actions.onSubmit) {
              actions.onSubmit(form.values, errors)
            }
          }}
          title={form.loading ? 'loading...' : form.submitLabel}
        />
      </FormRow>
    </View>
  )
}

export default Form
