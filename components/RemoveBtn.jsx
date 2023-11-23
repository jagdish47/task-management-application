"use client";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

const RemoveBtn = ({ id }) => {
  const router = useRouter();

  const handleRemoveTopic = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/topics/?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Error while Deleting the Topic", error);
    }
  };

  return (
    <div>
      <HiOutlineTrash
        onClick={() => {
          handleRemoveTopic(id);
        }}
        size={24}
        className="hover:text-red-700"
      />
    </div>
  );
};

export default RemoveBtn;
