import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const EVENTS_PER_PAGE = 20;

export async function GET(req: NextRequest) {
  try {
    const page = req.nextUrl.searchParams.get("page");
    // 0 in case of the first page
    const pageIndex = page ? parseInt(page) : 0;

    const [dbEvents, totalEvents] = await Promise.all([
      prisma.event.findMany({
        skip: pageIndex * EVENTS_PER_PAGE,
        take: EVENTS_PER_PAGE,
        include: {
          event_to_category: {
            include: {
              categories: true, // Include the categories related to the event_to_category
            },
          },
        },
      }),
      prisma.event.count(),
    ]);

    // todo: optimize
    const events = dbEvents.map((event) => {
      return {
        ...event,
        categories: event.event_to_category.map(
          (eventCategory) => eventCategory.categories.title
        ),
      };
    });
    return NextResponse.json({ events, totalEvents });
  } catch (error) {
    return NextResponse.json(error);
  } finally {
    await prisma.$disconnect();
  }
}
