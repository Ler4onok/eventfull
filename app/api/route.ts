import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const dbEvents = await prisma.event.findMany({
      include: {
        event_to_category: {
          include: {
            categories: true // Include the categories related to the event_to_category
          }
        }
      }
    });

    // todo: optimize
    const events = dbEvents.map(event => {
      return {...event, categories: event.event_to_category.map(eventCategory => eventCategory.categories.title)}
    })
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({
      error: "An error occurred while fetching events",
    });
  }
}
