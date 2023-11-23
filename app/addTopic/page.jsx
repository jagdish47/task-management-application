"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const InitialTopic = {
  title: "",
  description: "",
};

export default function AddTopic() {
  const router = useRouter();

  const [data, setData] = useState(InitialTopic);

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleAddTopic = async (e) => {
    e.preventDefault();

    if (!data.title || !data.description) {
      alert("Title and Description are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      data.title = "";
      data.description = "";

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.error("Failed to Create Topic : ", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleAddTopic} className="flex flex-col gap-3">
        <input
          value={data.title}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Topic Title"
          onChange={(e) => {
            handleOnChange(e);
          }}
          name="title"
        />

        <input
          value={data.description}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Topic Description"
          onChange={(e) => {
            handleOnChange(e);
          }}
          name="description"
        />

        <button
          type="submit"
          className="bg-green-600 text-white font-bold py-3 px-6 w-fit"
        >
          Add Topic
        </button>
      </form>
    </div>
  );
}
