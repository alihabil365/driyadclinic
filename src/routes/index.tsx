import { createFileRoute } from "@tanstack/react-router";
import { ClinicSite } from "@/components/ClinicSite";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. Iyad Eye Clinic — Specialized Ophthalmology Care" },
      {
        name: "description",
        content:
          "Dr. Iyad Ali Habil — ophthalmology clinic in Ramallah offering cornea, cataract, and laser vision correction consultations. Book online or call 0594599928.",
      },
      {
        property: "og:title",
        content: "Dr. Iyad Eye Clinic — Specialized Ophthalmology Care",
      },
      {
        property: "og:description",
        content:
          "Dr. Iyad Ali Habil — ophthalmology clinic in Ramallah offering cornea, cataract, and laser vision correction consultations. Book online or call 0594599928.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return <ClinicSite />;
}
