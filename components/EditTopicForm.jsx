"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const EditTopicForm = ({ id }) => {
  const router = useRouter();

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const onEditHandle = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });

      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error while updating the user:", error);
    }
  };

  return (
    <form onSubmit={onEditHandle} className="flex flex-col gap-3">
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
        value={newTitle}
        onChange={(e) => {
          setNewTitle(e.target.value);
        }}
      />

      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Description"
        value={newDescription}
        onChange={(e) => {
          setNewDescription(e.target.value);
        }}
      />

      <button
        type="submit"
        className="bg-green-600 text-white font-bold py-3 px-6 w-fit"
      >
        Update Topic
      </button>
    </form>
  );
};
