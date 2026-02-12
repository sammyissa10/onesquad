import { services } from "@/lib/constants";
import { notFound } from "next/navigation";
import ServiceDetailClient from "./ServiceDetailClient";

// Static params generation for all 10 service pages
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const relatedServices = services
    .filter((s) => s.category === service.category && s.slug !== service.slug)
    .slice(0, 3);

  const categoryName = service.category === "digital-marketing"
    ? "Digital Marketing"
    : "Web Solutions";

  return <ServiceDetailClient service={service} relatedServices={relatedServices} categoryName={categoryName} />;
}
