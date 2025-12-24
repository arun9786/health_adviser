import { useState } from "react";
import Button from "../components/Button";

export default function BasicDetails({ onNext }) {
  const [form, setForm] = useState({
    age: "",
    gender: "",
    height: "",
    weight: ""
  });

  const isValid =
    form.age && form.gender && form.height && form.weight;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-xl shadow max-w-lg w-full">

        <h2 className="text-2xl font-bold mb-6">
          Tell us a bit about yourself
        </h2>

        {/* Age */}
        <input
          type="number"
          placeholder="Age"
          className="w-full mb-4 p-3 border rounded-lg"
          value={form.age}
          onChange={e => setForm({ ...form, age: e.target.value })}
        />

        {/* Gender */}
        <select
          className="w-full mb-4 p-3 border rounded-lg"
          value={form.gender}
          onChange={e => setForm({ ...form, gender: e.target.value })}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        {/* Height */}
        <input
          type="number"
          placeholder="Height (cm)"
          className="w-full mb-4 p-3 border rounded-lg"
          value={form.height}
          onChange={e => setForm({ ...form, height: e.target.value })}
        />

        {/* Weight */}
        <input
          type="number"
          placeholder="Weight (kg)"
          className="w-full mb-6 p-3 border rounded-lg"
          value={form.weight}
          onChange={e => setForm({ ...form, weight: e.target.value })}
        />

        <Button
          label="Continue"
          disabled={!isValid}
          onClick={() => onNext(form)}
        />

        <p className="text-xs text-gray-400 mt-4">
          This information helps us calculate accurate health insights.
        </p>
      </div>
    </div>
  );
}
