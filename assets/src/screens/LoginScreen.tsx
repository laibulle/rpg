import React, { useState } from 'react'

import { Text, View, Center, FormRow, Form, Link } from '../rickui'
import { Login } from '../graphql/__generated__/Login'
import { ApolloError, useMutation } from '@apollo/client'
import { LOGIN } from '../graphql/mutations'
import { isDev } from './../helpers'
import { useDispatch } from 'react-redux'
import {
  EMAIL_REGEX,
  FormDescription,
  PASSWORD_REGEX,
} from '../rickui/validations'
import { useTranslation } from 'react-i18next'
import { storeAuth } from '../actions'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Layout from '../Layout'

type Props = {}

const LoginScreen: React.FC<Props> = () => {
  const [t] = useTranslation()
  const [error, setError] = useState<string | undefined>()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  navigation.setOptions({ headerShown: false })

  const handleCompleted = async (data: Login) => {
    if (data.auth?.accessToken != null) {
      dispatch(storeAuth(data.auth!))
      navigation.navigate('Home')
    }
  }

  const handleError = async (error: ApolloError) => {
    setError(error.message)
  }

  const [login, { loading }] = useMutation<Login>(LOGIN, {
    onCompleted: handleCompleted,
    onError: handleError,
  })

  const [form, setForm] = useState<FormDescription>({
    id: 'login-form',
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
          email: 'johndoe@rpg.dev',
          password: 'P@ssw0rd',
        }
      : {},
    submitLabel: t('signIn'),
    loading: loading,
    isValid: false,
  })

  return (
    <Layout hideTitle={true}>
      <View>
        <Image
          style={{ width: 300, height: 300 }}
          source={require('../../assets/rick-and-morty-portal-shoes-white-clothing-zavvi-23.png')}
        />
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
                login({ variables: { input: values } })
              } else {
                setForm({ ...form, errors })
              }
            },
          }}
        />

        <FormRow>
          <Link
            to="/signup"
            navigate={() => {
              navigation.navigate('Register')
            }}
          >
            <Text>{t('noAccount')}</Text>
          </Link>
        </FormRow>
      </View>
    </Layout>
  )
}

export default LoginScreen
