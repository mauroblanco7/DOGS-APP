import { useState } from "react";
import { useDispatch } from "react-redux";
import { postDog } from "../actions/index.js";

export const useForm = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateForm(form));
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
    console.log(form);
    dispatch(postDog(form));
    setLoading(false);
    setResponse(true);
    setForm(initialForm);
    setTimeout(() => setResponse(false), 3000);
  }

  return {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
