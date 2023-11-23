import { EditTopicForm } from "@/components/EditTopicForm";

export default function EditTopic({ params }) {
  const { id } = params;

  return (
    <div>
      <EditTopicForm id={id} />
    </div>
  );
}
