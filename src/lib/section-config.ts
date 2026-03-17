import type { StaticImageData } from "next/image";
import backGardenLayout from "../../assets/back-garden-layout.jpeg";
import flowerBedLayout from "../../assets/flower-bed-layout.jpeg";
import frontGardenLayout from "../../assets/front-garden-layout.jpeg";

export type SectionConfig = {
  asset?: {
    alt: string;
    caption: string;
    image: StaticImageData;
    title: string;
  };
  description: string;
  eyebrow: string;
};

const sectionConfigs: Record<string, SectionConfig> = {
  back: {
    asset: {
      alt: "Back garden layout plan",
      caption: "Current back garden reference layout. Click to open the full image.",
      image: backGardenLayout,
      title: "Back Garden Layout",
    },
    description:
      "This view isolates the back garden markdown plans and the current layout reference image.",
    eyebrow: "Back collection",
  },
  "flower-bed": {
    asset: {
      alt: "Flower bed layout plan",
      caption: "Current flower bed reference layout. Click to open the full image.",
      image: flowerBedLayout,
      title: "Flower Bed Layout",
    },
    description:
      "This view isolates the flower bed markdown plans and the current layout reference image.",
    eyebrow: "Flower bed collection",
  },
  front: {
    asset: {
      alt: "Front garden layout plan",
      caption: "Current front garden reference layout. Click to open the full image.",
      image: frontGardenLayout,
      title: "Front Garden Layout",
    },
    description:
      "This view isolates the front garden markdown plans and the current layout reference image.",
    eyebrow: "Front collection",
  },
};

export function getSectionConfig(section: string): SectionConfig {
  return (
    sectionConfigs[section] ?? {
      description:
        "This view isolates the markdown plans for this section and keeps the document list grouped in one place.",
      eyebrow: "Section collection",
    }
  );
}
