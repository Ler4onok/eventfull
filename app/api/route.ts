import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

const EVENTS_PER_PAGE = 20;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    // 0 in case of the first page
    const page = Number(searchParams.get("page")) || 0;
   
    const dbEvents = await prisma.event.findMany({
      skip: page * EVENTS_PER_PAGE,
      take: EVENTS_PER_PAGE,
      include: {
        event_to_category: {
          include: {
            categories: true, // Include the categories related to the event_to_category
          },
        },
      },
    });

    // todo: optimize
    const events = dbEvents.map((event) => {
      return {
        ...event,
        categories: event.event_to_category.map(
          (eventCategory) => eventCategory.categories.title
        ),
      };
    });
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({
      error: "An error occurred while fetching events",
    });
  }
}
