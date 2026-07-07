import { createFileRoute } from "@tanstack/react-router";
import { ClinicSite } from "@/components/ClinicSite";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. Iyad Eye Clinic — Specialized Ophthalmology Care" },
      {
        name: "description",
        content:
          "Dr. Iyad Ali Habil — ophthalmology clinic offering cornea, cataract, and laser vision correction consultations. Contact via Instagram.",
      },
      {
        property: "og:title",
        content: "Dr. Iyad Eye Clinic — Specialized Ophthalmology Care",
      },
      {
        property: "og:description",
        content:
          "Bilingual (EN/AR) ophthalmology clinic of Dr. Iyad Ali Habil. Cornea, cataract, and laser vision correction consultations.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return <ClinicSite />;
}
