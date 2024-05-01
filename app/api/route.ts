import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const dbEvents = await prisma.event.findMany({
      where: {
        startDate: {
          gt: yesterday,
        },
      },
      include: {
        event_to_category: {
          include: {
            categories: true, // Include the categories related to the event_to_category
          },
        },
      },
      orderBy: {
        startDate: 'asc',
      },
    });

    const dbCategories = await prisma.category.findMany();
    const categories = dbCategories.map((category) => category.title);

    const events = dbEvents.map((event) => {
      return {
        ...event,
        categories: event.event_to_category.map(
          (eventCategory) => eventCategory.categories.title
        ),
      };
    });
    return NextResponse.json({events, categories});
  } catch (error) {
    return NextResponse.json(error);
  } finally {
    await prisma.$disconnect();
  }
}
