import prisma from "@/prisma/prisma";
// image upload
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
// components
import { buttonStyles } from "./buttons/Button";
// utils
import { createDateFromString } from "@/utils/formatDate";

export async function Form() {
  // todo: error handling
  async function submitForm(formData: FormData) {
    "use server";

    const imageFile = formData.get("image") as File;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const price = formData.get("price") as string;
    const organizer = formData.get("organizer") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;

    const blob = await put(imageFile.name, imageFile, {
      access: "public",
    });
    revalidatePath("/");

    await prisma.event.create({
      data: {
        title: title,
        description: description,
        startDate: createDateFromString(startDate),
        endDate: createDateFromString(endDate),
        imageLink: blob.url,
        location: location ? location : "Funchal",
        price: price ? price : null,
        organizer: organizer ? organizer : null,
        // todo: sourceLink and sourceId can be null
        // todo: add approved field for admin
        sourceLink: "sourceLink",
        sourceId: 1,
      },
    });
  }

  const CustomFormInputs: Array<{
    name: string;
    placeholder: string;
  }> = [
    { name: "title", placeholder: "Event title" },
    { name: "description", placeholder: "Event description" },
    { name: "location", placeholder: "Event location" },
    { name: "price", placeholder: "Event price" },
    { name: "organizer", placeholder: "Event organizer" },
    { name: "startDate", placeholder: "Event start date (format: xx/xx/xxxx)" },
    { name: "endDate", placeholder: "Event end date (format: xx/xx/xxxx)" },
  ];

  return (
    <form action={submitForm}>
      <div className="flex items-center justify-center flex-col gap-4">
        {CustomFormInputs.map(({ name, placeholder }) => {
          return (
            <input
              key={name}
              name={name}
              id={name}
              required
              className="w-[400px] p-4 border border-brandPurple rounded focus:outline-none focus:ring-1 focus:ring-brandPurple"
              placeholder={placeholder}
            />
          );
        })}

        <input
          type="file"
          id="image"
          name="image"
          required
          className="custom-file-upload w-[400px] cursor-pointer p-4 text-grey border border-brandPurple rounded focus:outline-none focus:ring-1 focus:ring-brandPurple flex justify-start items-center gap-4"
        />
        <button type="submit" className={`${buttonStyles}`}>
          Add event
        </button>
      </div>
    </form>
  );
}
