"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function useRegisterForm() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = [];
    if (!username) newErrors.push("Username is required");
    if (!name) newErrors.push("Name is required");
    if (!surname) newErrors.push("Surname is required");
    if (!mobile) newErrors.push("Mobile number is required");
    if (!email) newErrors.push("Email is required");
    if (!password) newErrors.push("Password is required");
    if (password !== rePassword) newErrors.push("Passwords do not match");
    if (!gender) newErrors.push("Gender is required");
    if (!city) newErrors.push("City is required");

    if (newErrors.length > 0) {
      setError(newErrors);
      setSuccess(false);
      return;
    }

    try {
      const userID = uuidv4();

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userID,
          username,
          name,
          surname,
          mobile,
          email,
          password,
          gender,
          city,
        }),
      });

      const { msg, success } = await res.json();
      setError(msg);
      setSuccess(success);

      if (success) {
        setUsername("");
        setName("");
        setSurname("");
        setMobile("");
        setEmail("");
        setPassword("");
        setRePassword("");
        setGender("");
        setCity("");
      }
    } catch (err) {
      setError(["Something went wrong. Try again later."]);
      setSuccess(false);
    }
  };

  return {
    username,
    name,
    surname,
    mobile,
    email,
    password,
    rePassword,
    gender,
    city,
    error,
    success,
    setUsername,
    setName,
    setSurname,
    setMobile,
    setEmail,
    setPassword,
    setRePassword,
    setGender,
    setCity,
    handleSubmit,
  };
}
