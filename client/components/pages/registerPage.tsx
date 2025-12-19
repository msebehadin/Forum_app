'use client'

import { useForm } from 'react-hook-form'

// Define your form data type
type SignUpFormData = {
  email: string
  password: string
  username: string
  firstName: string
  lastName: string
  terms: boolean 
}

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>()

  const onSubmit = async (data: SignUpFormData) => {
    console.log(data)
    // Your submission logic
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email */}
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      {/* Terms Checkbox */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="terms"
          {...register('terms', {
            required: 'You must accept the terms and conditions',
          })}
          className="mr-2"
        />
        <label htmlFor="terms" className="text-sm">
          I accept the terms and conditions
        </label>
      </div>
      {errors.terms && (
        <p className="text-red-500 text-sm">{errors.terms.message}</p>
      )}

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Sign Up
      </button>
    </form>
  )
}

export default SignUpForm