import { HeroSection } from "@/components/home/hero-section";
import { QuickLinks } from "@/components/home/quick-links";
import { NewsSection } from "@/components/home/news-section";
import { ServicesDirectory } from "@/components/home/services-directory";
import { ResourceCenter } from "@/components/home/resource-center";
import { DirectorySection } from "@/components/home/directory-section";
import { StatisticsSection } from "@/components/home/statistics-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <QuickLinks />
      <NewsSection />
      <ServicesDirectory />
      <ResourceCenter />
      <DirectorySection />
      <StatisticsSection />
    </>
  );
}
