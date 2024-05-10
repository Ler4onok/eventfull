import prisma from "@/prisma/prisma";
import { adjustTextSize } from "@/utils/adjustText";
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
            categories: true, // Include the categories related to the event_to_category
          },
        },
      },
    });

    const noCategories = dbEvent?.event_to_category.length === 0;

    const recommendations = await prisma.event.findMany({
      where: {
        NOT: {
          id: Number(id), // Exclude the current event
        },
        event_to_category: {
          some: {
            categories: {
              title: noCategories
                ? "Other"
                : dbEvent?.event_to_category[0].categories.title,
            },
          },
        },
      },
      take: 4,
    });

    const categories = noCategories
      ? []
      : dbEvent?.event_to_category.map(
          (eventCategory) => adjustTextSize(eventCategory.categories.title)
        );

    // todo: find better solution for many to many relation handling
    const event = { ...dbEvent, categories, recommendations };
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({
      error: "An error occurred while fetching the event",
    });
  }
}
