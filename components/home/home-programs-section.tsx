import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Droplets,
  HeartHandshake,
  HeartPulse,
  Package,
} from "lucide-react";
import { ActionLink } from "@/components/design-system/ActionLink";
import { BrandLink } from "@/components/design-system/BrandLink";
import { Container } from "@/components/design-system/Container";
import { SectionHeader } from "@/components/design-system/SectionHeader";
import { cn } from "@/lib/utils";

interface ProgramCardProps {
  title: string;
  desc: string;
  icon: LucideIcon;
  image: string;
  href: string;
  isFeatured?: boolean;
}

function ProgramCard({
  title,
  desc,
  icon: Icon,
  image,
  href,
  isFeatured = false,
}: ProgramCardProps) {
  return (
    <article
      className={`group relative block overflow-hidden rounded-[2.5rem] shadow-xl transition-all duration-500 hover:-translate-y-2 ${
        isFeatured ? "h-[400px] lg:col-span-2" : "h-[500px]"
      }`}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={title}
          fill
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00344d] via-[#00344d]/60 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-10">
        <div className="mb-6 inline-flex self-start rounded-[1.5rem] bg-white/10 p-4 text-[#00a3ad] backdrop-blur-md transition-all duration-300 group-hover:bg-[#00a3ad] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#00a3ad]/40">
          <Icon size={28} strokeWidth={2} />
        </div>

        <h3 className="mb-3 text-2xl font-black tracking-tighter text-white md:text-3xl">{title}</h3>

        <p className="mb-6 max-w-[320px] text-sm leading-relaxed text-white/80 transition-all duration-500 group-hover:text-white">
          {desc}
        </p>

        <ActionLink href={href}>Istraži program</ActionLink>
      </div>
    </article>
  );
}

const programs: ProgramCardProps[] = [
  {
    title: "Stoma program",
    desc: "Vrhunska rešenja za negu i kvalitetan život sa stomom uz ConvaTec tehnologiju.",
    icon: Package,
    image: "/assets/tt_medik_heading.jpg",
    href: "/tipovi-stome",
  },
  {
    title: "Intenzivna nega",
    desc: "Specijalizovana oprema i potrošni materijal za najzahtevnije medicinske jedinice.",
    icon: Activity,
    image: "/assets/cover-photo-homepage.jpg",
    href: "/proizvodi-za-jedinice-intenzivne-nege",
  },
  {
    title: "Inkontinencija",
    desc: "Diskretna i efikasna rešenja dizajnirana da pruže sigurnost i udobnost korisnicima.",
    icon: Droplets,
    image: "/assets/tt_medik_heading.jpg",
    href: "/inkontinencija",
  },
  {
    title: "Program za negu rana",
    desc: "Moderni materijali koji ubrzavaju proces zarastanja i štite integritet kože.",
    icon: HeartPulse,
    image: "/assets/cover-photo-homepage.jpg",
    href: "/program-za-negu-rana",
  },
  {
    title: "Kutak za osobe sa stomom",
    desc: "Edukacija, podrška i zajednica za sve koji traže informacije i savete o životu sa stomom.",
    icon: HeartHandshake,
    image: "/assets/cover-photo-homepage.jpg",
    href: "/kutak-za-osobe-sa-stomom",
    isFeatured: true,
  },
];

export function HomeProgramsSection({ className }: { className?: string }) {
  return (
    <section className={cn("bg-white pb-32 pt-0", className)}>
      <Container>
        <SectionHeader
          label="Naš program"
          title="Medicinska rešenja"
          description={
            <>
              Kao zvanični distributer kompanije <BrandLink>ConvaTec</BrandLink>
              , nudimo sveobuhvatnu paletu proizvoda koji postavljaju standarde u modernoj
              medicinskoj nezi.
            </>
          }
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {programs.slice(0, 4).map((program) => (
            <ProgramCard key={program.title} {...program} />
          ))}
          <div className="md:col-span-2">
            <ProgramCard {...programs[4]} />
          </div>
        </div>
      </Container>
    </section>
  );
}

export { HomeProgramsSection as ProductPrograms };
