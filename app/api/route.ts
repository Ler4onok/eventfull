import prisma from "@/prisma/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const EVENTS_PER_PAGE = 20;

// todo: fix eslint & prisma issues

export async function GET(req: NextRequest) {
  try {
    // filters
    const categories = req.nextUrl.searchParams.get("categories");
    const location = req.nextUrl.searchParams.get("location");
    const date = req.nextUrl.searchParams.get("date");
    // pagination
    const page = req.nextUrl.searchParams.get("page");
    // 0 in case of the first page
    const pageIndex = page ? parseInt(page) : 0;

    const categoryArray = categories ? categories.split(",") : [];
    const locationArray = location ? location.split(",") : [];

    // filter by category
    const categoryCondition = categories
      ? {
          event_to_category: {
            some: {
              categories: {
                title: {
                  in: categoryArray,
                },
              },
            },
          },
        }
      : {};

      // filter by location
      // location in db is in string format ig. "New York, NY, USA"
      const locationCondition = location
  ? {
      OR: locationArray.map((loc) => ({
        location: {
          contains: loc,
          mode: "insensitive",
        },
      })),
    }
  : {};

  const where = categoryCondition || locationCondition
  ? {
      AND: [categoryCondition, locationCondition].filter(
        (condition): condition is Prisma.EventWhereInput => condition !== undefined
      ),
    }
  : {};

    const [dbEvents, totalEvents] = await Promise.all([
      prisma.event.findMany({
        skip: pageIndex * EVENTS_PER_PAGE,
        take: EVENTS_PER_PAGE,
        where,
        include: {
          event_to_category: {
            include: {
              categories: true, // Include the categories related to the event_to_category
            },
          },
        },
      }),
      prisma.event.count({
        where,
      }),
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
