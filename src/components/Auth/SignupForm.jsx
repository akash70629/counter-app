/** @format */

import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/operations/authAPI";
import { registerValidation } from "@/validations/validation";

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Form Submission
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerValidation.validate(
        { firstName, lastName, email, password, confirmPassword },
        { abortEarly: false }
      );
      setErrors({});
      // console.log("Form Submitted", formData);
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }

    // Send data to backend for create account
    dispatch(
      signUp(firstName, lastName, email, password, confirmPassword, navigate)
    );

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className='py-2'>
      {/* Form */}
      <form
        noValidate
        onSubmit={handleOnSubmit}
        className='flex w-full font-semibold flex-col gap-y-6 text-black border-[2px] border-black p-6 rounded-md'
      >
        <div className='flex gap-x-4'>
          <label>
            <p className='mb-1 text-[0.95rem] leading-[1.375rem]'>First Name</p>
            <input
              required
              type='text'
              name='firstName'
              value={firstName}
              onChange={handleOnChange}
              placeholder='Enter first name'
              className='form-style w-full  p-2 border-[1px] bg-white border-black rounded-md  text-black'
            />
            {errors.firstName && (
              <div className='text-red-600'>{errors.firstName}</div>
            )}
          </label>
          <label>
            <p className='mb-1 text-[0.95rem] leading-[1.375rem] text-richblack-5'>
              Last Name
            </p>
            <input
              required
              type='text'
              name='lastName'
              value={lastName}
              onChange={handleOnChange}
              placeholder='Enter last name'
              className='form-style p-2 border-[1px] border-black bg-white rounded-md w-full text-black'
            />
            {errors.lastName && (
              <div className='text-red-600'>{errors.lastName}</div>
            )}
          </label>
        </div>
        <label className='w-full'>
          <p className='mb-1 text-[0.95rem] leading-[1.375rem] '>
            Email Address
          </p>
          <input
            required
            type='text'
            name='email'
            value={email}
            onChange={handleOnChange}
            placeholder='Enter email address'
            className='form-style w-[96%]  p-2 border-[1px] bg-white border-black rounded-md  text-black'
          />
          {errors.email && <div className='text-red-600'>{errors.email}</div>}
        </label>
        <div className='flex gap-x-4'>
          <label className='relative'>
            <p className='mb-1 text-[0.95rem] leading-[1.375rem] text-richblack-5'>
              Create Password
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name='password'
              value={password}
              onChange={handleOnChange}
              placeholder='Enter Password'
              className='form-style w-full !pr-10  p-2 border-[1px] bg-white border-black rounded-md  text-black'
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className='absolute right-3 top-[35px] z-[10] cursor-pointer'
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill='#000000' />
              ) : (
                <AiOutlineEye fontSize={24} fill='#000000' />
              )}
            </span>
            {errors.password && (
              <div className='text-red-600'>{errors.password}</div>
            )}
          </label>
          <label className='relative'>
            <p className='mb-1 text-[0.95rem] leading-[1.375rem] text-richblack-5'>
              Confirm Password
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name='confirmPassword'
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder='Confirm Password'
              className='form-style w-full !pr-10 border-black  p-2 border-[1px] bg-white rounded-md  text-black'
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className='absolute right-3 top-[35px] z-[10] cursor-pointer text-black'
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill='#000000' />
              ) : (
                <AiOutlineEye fontSize={24} fill='#000000' />
              )}
            </span>
            {errors.confirmPassword && (
              <div className='text-red-600'>{errors.confirmPassword}</div>
            )}
          </label>
        </div>
        <button
          type='submit'
          className='mt-6 font-semibold py-[8px] px-[12px] text-white p-2 border-[1px] rounded-md  bg-red-600 hover:bg-red-700 border-red-800'
        >
          Create Account
        </button>
        <div className='flex gap-2 flex-col mt-2'>
          <div className='flex gap-2 justify-center items-center'>
            <span className='h-[1px] bg-black w-[70%]'></span>
            <span>OR</span>
            <span className='h-[1px] bg-black w-[70%]'></span>
          </div>
          <div className='flex flex-row mx-auto gap-4 justify-center items-center'>
            <div className=' font-normal text-black select-none'>
              Have an account?
            </div>
            <button
              className='text-blue-700 hover:text-blue-950 font-semibold cursor-pointer'
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
