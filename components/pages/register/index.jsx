"use client";

import { useRegisterForm } from "@/components/hooks/useRegisterForm";

const cities = ["Colombo", "Kandy", "Galle", "Jaffna", "Kurunegala"];

export default function RegisterForm() {
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
    <>
      <form
        onSubmit={handleSubmit}
        className="py-4 mt-4 border-t flex flex-col gap-5"
      >
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <div className="flex gap-3">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="flex-1"
          />
          <input
            placeholder="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
            className="flex-1"
          />
        </div>
        <input
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="flex gap-3">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="flex-1"
          />
          <input
            type="password"
            placeholder="Re-Password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            required
            className="flex-1"
          />
        </div>

        <div>
          <label>Gender:</label>
          {["Male", "Female", "Other"].map((g) => (
            <label key={g} className="ml-3">
              <input
                type="radio"
                value={g}
                checked={gender === g}
                onChange={(e) => setGender(e.target.value)}
                required
              />{" "}
              {g}
            </label>
          ))}
        </div>

        <select value={city} onChange={(e) => setCity(e.target.value)} required>
          <option value="">-- Select City --</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-green-700 text-white p-3 font-bold">
          Register
        </button>
      </form>

      <div className="bg-slate-100 mt-2 p-2">
        {error.map((e, i) => (
          <div
            key={i}
            className={`${success ? "text-green-800" : "text-red-600"}`}
          >
            {e}
          </div>
        ))}
      </div>
    </>
  );
}
