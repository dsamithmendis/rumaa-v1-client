"use client";

import { useRegisterForm } from "@/components/hooks/useRegisterForm";
import {
  cities,
  genders,
  nameLabels,
  passwordLabels,
} from "@/components/lib/register-data";

export default function RegisterPage() {
  const {
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
  } = useRegisterForm();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-0 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md sm:max-w-xl p-6 sm:p-10 bg-white rounded-xl shadow-md flex flex-col gap-6"
      >
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-700 mb-4 uppercase">
          Register
        </h2>

        {/* Username */}
        <div className="relative">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="peer w-full border-b-2 border-gray-300 py-2.5 text-green-700 placeholder-transparent focus:border-green-700 outline-none text-sm sm:text-base"
            placeholder="Username"
          />
          <label className="absolute left-0 -top-3 text-neutral-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:text-base">
            Username
          </label>
        </div>

        {/* Name & Surname */}
        <div className="flex flex-col sm:flex-row gap-4">
          {nameLabels.map((label, i) => {
            const value = i === 0 ? name : surname;
            const setter = i === 0 ? setName : setSurname;
            return (
              <div className="relative flex-1" key={label}>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  required
                  className="peer w-full border-b-2 border-gray-300 py-2.5 text-green-700 placeholder-transparent focus:border-green-700 outline-none text-sm sm:text-base"
                  placeholder={label}
                />
                <label className="absolute left-0 -top-3 text-neutral-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:text-base">
                  {label}
                </label>
              </div>
            );
          })}
        </div>

        {/* Mobile */}
        <div className="relative">
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            className="peer w-full border-b-2 border-gray-300 py-2.5 text-green-700 placeholder-transparent focus:border-green-700 outline-none text-sm sm:text-base"
            placeholder="Mobile"
          />
          <label className="absolute left-0 -top-3 text-neutral-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:text-base">
            Mobile
          </label>
        </div>

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="peer w-full border-b-2 border-gray-300 py-2.5 text-green-700 placeholder-transparent focus:border-green-700 outline-none text-sm sm:text-base"
            placeholder="Email"
          />
          <label className="absolute left-0 -top-3 text-neutral-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:text-base">
            Email
          </label>
        </div>

        {/* Password & Re-password */}
        <div className="flex flex-col sm:flex-row gap-4">
          {passwordLabels.map((label, i) => {
            const value = i === 0 ? password : rePassword;
            const setter = i === 0 ? setPassword : setRePassword;
            return (
              <div className="relative flex-1" key={label}>
                <input
                  type="password"
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  required
                  className="peer w-full border-b-2 border-gray-300 py-2.5 text-green-700 placeholder-transparent focus:border-green-700 outline-none text-sm sm:text-base"
                  placeholder={label}
                />
                <label className="absolute left-0 -top-3 text-neutral-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:text-base">
                  {label}
                </label>
              </div>
            );
          })}
        </div>

        {/* Gender */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-2">
          <span className="text-neutral-500 text-sm sm:text-base">Gender:</span>
          <div className="flex gap-4 flex-wrap">
            {genders.map((g) => (
              <label
                key={g}
                className="flex items-center gap-2 text-neutral-500 text-sm sm:text-base"
              >
                <input
                  type="radio"
                  value={g}
                  checked={gender === g}
                  onChange={(e) => setGender(e.target.value)}
                  required
                  className="accent-green-700"
                />
                {g}
              </label>
            ))}
          </div>
        </div>

        {/* City */}
        <div className="relative mt-2 text-neutral-500">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="w-full border-b-2 border-gray-300 py-2.5 bg-transparent text-sm sm:text-base outline-none focus:border-green-700"
          >
            <option value="">-- Select City --</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-700 text-white py-3 rounded-md font-semibold hover:bg-green-800 transition-colors mt-3 text-sm sm:text-base hover:cursor-pointer"
        >
          Register
        </button>

        {/* Errors & Success */}
        {error.length > 0 && (
          <div className="bg-slate-100 p-3 rounded-md mt-3">
            {error.map((e, i) => (
              <p
                key={i}
                className={
                  success
                    ? "text-green-700 text-sm sm:text-base"
                    : "text-red-600 text-sm sm:text-base"
                }
              >
                {e}
              </p>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}
