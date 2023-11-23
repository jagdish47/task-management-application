import ConnectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic-model";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, description } = await request.json();
    await ConnectMongoDB();

    await Topic.create({ title, description });

    return NextResponse.json(
      { message: "Topic Created Successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating topic : ", error);
    return NextResponse.json(
      { message: "Error creating topic" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const topics = await Topic.find();

    return NextResponse.json({ topics }, { status: 200 });
  } catch (error) {
    console.error("Error while fetching data", error);
    NextResponse.json(
      { message: "Error while Fetching data" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    await ConnectMongoDB();
    const deletedTopic = await Topic.findByIdAndDelete(id);

    if (!deletedTopic) {
      return NextResponse.json(
        {
          message: "Topic not found",
          id: id,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Topic Deleted Successfully" },
      { status: 204 }
    );
  } catch (error) {
    const errorResponse = {
      message: "Error while Deleting the Topic",
      error: error.message,
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
