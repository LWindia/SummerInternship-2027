// Cloud Computing course hero visual: "Cloud Computing / AWS + Azure" panel with
// cards for the platforms and services covered in the brochure.

import React from "react";
import Image from "next/image";
import { Cloud, HardDrive, Network, Server } from "lucide-react";
import HeroShowcase from "./HeroShowcase";

const ICON = "h-6 w-6 sm:h-8 sm:w-8";

export default function CloudShowcase() {
  return (
    <HeroShowcase
      config={{
        centerLeft: <Cloud className="h-10 w-10 text-white sm:h-14 sm:w-14" strokeWidth={1.75} />,
        centerRight: <Server className="h-7 w-7 text-white sm:h-10 sm:w-10" />,
        titleTop: "Cloud Computing",
        titleBottom: "AWS + Azure",
        left: [
          {
            label: "AWS",
            // AWS logo file from the project, shown in white for the dark background
            icon: <Image src="/assets/TechStackLogo/awsLogo.svg" alt="" width={48} height={32} className="h-6 w-auto brightness-0 invert sm:h-8" />,
          },
          // No Azure logo file in the project: a cloud icon in Azure blue instead.
          { label: "Azure", icon: <Cloud className={`${ICON} text-[#0078D4]`} /> },
          {
            label: "Python (Boto3)",
            icon: <Image src="/assets/TechStackLogo/pythonLogo.svg" alt="" width={40} height={40} className={ICON} />,
          },
        ],
        right: [
          { label: "EC2", icon: <Server className={`${ICON} text-[#ff0000]`} /> },
          { label: "S3", icon: <HardDrive className={`${ICON} text-white`} /> },
          { label: "VPC", icon: <Network className={`${ICON} text-[#ff0000]`} /> },
        ],
      }}
    />
  );
}
