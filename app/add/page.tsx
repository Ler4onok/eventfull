import { Form } from "@/components/Form";
import { Section } from "@/components/Section";
import { Banner } from "@/components/banner/Banner";

const Add = () => {
  return (
    <>
      <Banner />
      <Section>
        <div className="flex justify-center items-center">
          <Form />
        </div>
      </Section>
    </>
  );
};

export default Add;
