import ConnectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic-model";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newTitle: title, newDescription: description } = await request.json();
  await ConnectMongoDB();

  await Topic.findByIdAndUpdate(id, { title, description });

  return NextResponse.json({ message: "Topic Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  try {
    const { id } = params;
    await ConnectMongoDB();

    const topic = await Topic.findOne({ _id: id });

    if (!topic) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json({ topic }, { status: 200 });
  } catch (error) {
    console.log("Error while Fetching the single Topic : ", error);

    return NextResponse.json(
      { message: "Error while fetching single topic" },
      { status: 500 }
    );
  }
}
