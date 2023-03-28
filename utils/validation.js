import * as yup from 'yup'

const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required('Email Address is required'),
    password: yup
      .string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
})

const signupValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter valid email")
        .required('Email Address is required'),
    password: yup
        .string()
        .min(6, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Password must be confirmed'),
})

const changePasswordValidationScheme = yup.object().shape({
  password: yup
    .string()
    .required('Please enter your current password'),
  newPassword: yup
    .string()
    .min(6, ({ min }) => `New password must be at least ${min} characters`)
    .required('New password must be filled'),
  confirmNewPassword: yup
  .string()
  .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
  .required('New password must be confirmed'),
})

const userInfoValidationSchema = yup.object().shape({
    firstName: yup
      .string()
      .required('Please enter your first name'),
    lastName: yup
      .string()
      .default('')
      .nullable(),
    dob: yup
      .date()
      .default(() => new Date())
      .required('Please enter your date of birth'),
})

const userHealthValidationSchema = yup.object().shape({
    insulin: yup
      .string()
      .required('Please select one'),
    cholesterol: yup
      .string()
      .required('Please select one'),
    bloodPressure: yup
      .string()
      .required('Please select one'),
    alcoholConsumption: yup
      .string()
      .required('Please select one'),
    smokingStatus: yup
      .string()
      .required('Please select one'),
    diet: yup
      .string()
      .required('Please select one'),
    sex: yup
      .string()
      .required('Please select one'),
    height: yup
      .string()
      .matches(/^\d*\.?\d*$/, { message: 'Height must be a number' })
      .required('Please enter your height in cm'),
    weight: yup
      .string()
      .matches(/^\d*\.?\d*$/, { message: 'Weight must be a number' })
      .required('Please enter your weight in kg'),
    bloodType: yup
      .string()
      .required('Please select one'),
})

export { loginValidationSchema, signupValidationSchema, changePasswordValidationScheme, userInfoValidationSchema, userHealthValidationSchema }
