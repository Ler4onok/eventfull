import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const EVENTS_PER_PAGE = 3;

export async function GET(req: NextRequest) {
  try {
    const page = req.nextUrl.searchParams.get("page");
    const pageIndex = page ? parseInt(page) : 0;
    
    // 0 in case of the first page

    const dbEvents = await prisma.event.findMany({
      skip: pageIndex * EVENTS_PER_PAGE,
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
    console.log("error", error);
    return NextResponse.json(error);
  } finally {
    await prisma.$disconnect();
  }
}
