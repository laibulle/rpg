import React, { useState } from 'react'
import { ApolloError, useMutation } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { Image } from 'react-native'

import { Text, View, FormRow, Form, Link, theme, Button } from '../rickui'
import { REGISTER } from '../graphql/mutations'
import { isDev } from '../helpers'
import {
  ALPHA_NUMERIC_REGEX,
  EMAIL_REGEX,
  FormDescription,
  PASSWORD_REGEX,
} from '../rickui/validations'
import Layout from '../Layout'
import { Register } from '../graphql/__generated__/Register'

type Props = {}

const RegisterScreen: React.FC<Props> = () => {
  const [t] = useTranslation()
  const [error, setError] = useState<string | undefined>()
  const [registerd, setRegisterd] = useState(false)
  const handleCompleted = async (data: Register) => {
    if (data.register?.id != null) {
      setRegisterd(true)
    }
  }

  const handleError = async (error: ApolloError) => {
    setError(error.message)
  }

  const navigation = useNavigation()
  navigation.setOptions({ headerShown: false })

  const [register, { loading }] = useMutation<Register>(REGISTER, {
    onCompleted: handleCompleted,
    onError: handleError,
  })

  const [form, setForm] = useState<FormDescription>({
    id: 'register-form',
    fields: [
      {
        field: 'email',
        label: t('email.label'),
        placeholder: t('email.placeholder'),
        inputType: 'TextInput',
        validation: EMAIL_REGEX,
        validationMessage: 'Invalid email',
      },
      {
        field: 'name',
        label: t('name.label'),
        placeholder: t('name.placeholder'),
        inputType: 'TextInput',
        validation: ALPHA_NUMERIC_REGEX,
        validationMessage: 'Invalid name',
      },
      {
        field: 'password',
        label: t('password.label'),
        placeholder: t('password.placeholder'),
        inputType: 'Password',
        validation: PASSWORD_REGEX,
        validationMessage: 'Invalid password',
      },
    ],
    errors: {},
    values: isDev()
      ? {
          email: 'guillaume.bailleul@gmail.com',
          password: 'P@ssw0rd',
          name: 'Johny62tunning',
        }
      : {},
    submitLabel: t('signUp'),
    loading: loading,
    isValid: false,
  })

  return (
    <Layout hideTitle={true}>
      <View style={theme.styles.mb2}>
        <Image
          style={{ width: 300, height: 300 }}
          source={require('../../assets/rick-and-morty-portal-shoes-white-clothing-zavvi-23.png')}
        />

        {registerd ? (
          <>
            <Text style={{ width: 300, height: 300 }}>{t('codeSent')}</Text>

            <Button
              title={t('signIn')}
              onPress={() => {
                navigation.navigate('Login')
              }}
            />
          </>
        ) : (
          <>
            <FormRow>
              <Text>{error}</Text>
            </FormRow>

            <Form
              form={form}
              actions={{
                onChange: (values) => {
                  setForm({ ...form, values })
                },
                onSubmit: (values, errors) => {
                  if (Object.keys(errors).length == 0) {
                    register({ variables: { input: values } })
                  } else {
                    setForm({ ...form, errors })
                  }
                },
              }}
            />

            <FormRow>
              <Link
                to="/login"
                navigate={() => {
                  navigation.navigate('Login')
                }}
              >
                <Text>{t('alreadyAccount')}</Text>
              </Link>
            </FormRow>
          </>
        )}
      </View>
    </Layout>
  )
}

export default RegisterScreen
