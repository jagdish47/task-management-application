import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Error loading topics");
    }

    return await res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
    return null;
  }
};

const TopicList = async () => {
  const { topics } = await getTopics();

  return (
    <>
      {topics.map((t, idx) => (
        <div
          key={idx}
          className="p-4 border border-slate-400 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
          </div>
          <div className="flex gap-2">
            <RemoveBtn id={t._id} />
            <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={24} className="hover:text-green-900" />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopicList;
