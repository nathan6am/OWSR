import React from "react";

export default function AboutPage() {
  return (
    <div
      className="min-h-screen flex flex-col pt-[85px] w-full bg-fixed bg-cover "
      style={{ backgroundImage: "url(/images/bg.jpg)" }}
    >
      <h1 className="text-center my-8">About</h1>
      <section className="container w-full p-8">
        <h2 className="text-xl mb-2">What is Lorem Ipsum?</h2>
        <p className="mb-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&aposs standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <h2 className="text-xl mb-2">Why do we use it?</h2>
        <p className="mb-4">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using &aposContent here, content here&apos,
          making it look like readable English. Many desktop publishing packages
          and web page editors now use Lorem Ipsum as their default model text,
          and a search for &aposlorem ipsum&apos will uncover many web sites
          still in their infancy. Various versions have evolved over the years,
          sometimes by accident, sometimes on purpose (injected humour and the
          like).
        </p>
      </section>
    </div>
  );
}