import prisma from "@/prisma/prisma";
import { adjustTextSize } from "@/utils/adjustText";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dbEvents = await prisma.event.findMany({
      where: {
        OR: [
          {
            startDate: {
              gt: yesterday,
            },
          },
          {
            endDate: {
              gt: today,
            },
          },
        ],
      },
      include: {
        event_to_category: {
          include: {
            categories: true, // Include the categories related to the event_to_category
          },
        },
      },
      orderBy: {
        startDate: "asc",
      },
    });

    const dbCategories = await prisma.category.findMany();
    const categories = dbCategories.map((category) => category.title);

    const events = dbEvents.map((event) => {
      return {
        ...event,
        title: adjustTextSize(event.title),
        categories: event.event_to_category.map(
          (eventCategory) => eventCategory.categories.title
        ),
      };
    });
    return NextResponse.json({ events, categories });
  } catch (error) { 
    return NextResponse.json(error);
  } finally {
    await prisma.$disconnect();
  }
}
