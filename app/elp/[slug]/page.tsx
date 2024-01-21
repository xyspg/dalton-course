import React from "react";
import client from "@/lib/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Page = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const query = `
    *[_type == "ELP" && slug.current == "${slug}"]{
    programNameZH,
    programNameEN,
    "heroImage": heroImage.asset->url,
    "pdfURL": PDF.asset->url
    }
    `;
  let data = await client.fetch(query);
  data = data[0];

  return (
    <div className="p-4 flex flex-col gap-2 md:my-8 md:max-w-3xl">
      <h1 className="text-2xl">{data.programNameZH}</h1>
      <h2>{data.programNameEN}</h2>
      <img src={data.heroImage} alt="hero image" width={500} height={500} />
      <a href={`${data.pdfURL}`} target="_blank">
        <Button variant="outline" className="w-40">
          Download PDF
        </Button>
      </a>
    </div>
  );
};

export default Page;
