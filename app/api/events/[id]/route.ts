import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const { id } = params;

    const dbEvent = await prisma.event.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        event_to_category: {
          include: {
            categories: true // Include the categories related to the event_to_category
          }
        }
      }
    });

    // todo: find better solution for many to many relation handling
    const event = {...dbEvent, categories: dbEvent?.event_to_category.map(eventCategory => eventCategory.categories.title)}
    return NextResponse.json(event)
  } catch (error) {
    return NextResponse.json({
      error: "An error occurred while fetching the event",
    });
  }
}
