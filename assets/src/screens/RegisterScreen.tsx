import React, { useState } from 'react'

import { Text, View, Center, FormRow, Form, Link } from '../rickui'
import { Login } from '../graphql/__generated__/Login'
import { useMutation } from '@apollo/client'
import { LOGIN, REGISTER } from '../graphql/mutations'
import { isDev } from '../helpers'
import { useDispatch } from 'react-redux'
import {
  EMAIL_REGEX,
  FormDescription,
  FormField,
  PASSWORD_REGEX,
} from '../rickui/validations'
import { useTranslation } from 'react-i18next'
import { storeAuth } from '../actions'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Layout from '../Layout'
import { Register } from '../graphql/__generated__/Register'

type Props = {}

const RegisterScreen: React.FC<Props> = () => {
  const [t] = useTranslation()
  const [error, setError] = useState<string | undefined>()
  const dispatch = useDispatch()
  const handleCompleted = async (data: Register) => {
    //if (data.auth?.accessToken != null) {
    //  dispatch(storeAuth(data.auth!))
    //}
  }

  const navigation = useNavigation()
  navigation.setOptions({ headerShown: false })

  const [register, { loading }] = useMutation<Register>(REGISTER, {
    onCompleted: handleCompleted,
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
        field: 'password',
        label: t('email.password'),
        placeholder: t('email.password'),
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
                register({ variables: { input: values } })
              } else {
                setForm({ ...form, errors })
              }
            },
          }}
        />

        <FormRow>
          <Link to="/login" navigate={(to) => {}}>
            <Text>{t('alreadyAccount')}</Text>
          </Link>
        </FormRow>
      </View>
    </Layout>
  )
}

export default RegisterScreen
