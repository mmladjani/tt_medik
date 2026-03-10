import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  Droplets,
  HeartHandshake,
  HeartPulse,
  Package,
} from "lucide-react";
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
    <Link
      href={href}
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

        <h3 className="mb-3 text-2xl font-black tracking-tighter text-white md:text-3xl">
          {title}
        </h3>

        <p className="mb-6 max-w-[320px] text-sm leading-relaxed text-white/80 transition-all duration-500 group-hover:text-white">
          {desc}
        </p>

        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00a3ad]">
          Istraži program
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
        </span>
      </div>
    </Link>
  );
}

const programs: ProgramCardProps[] = [
  {
    title: "Stoma program",
    desc: "Vrhunska rešenja za negu i kvalitetan život sa stomom uz ConvaTec tehnologiju.",
    icon: Package,
    image: "/assets/tt_medik_heading.jpg",
    href: "/stoma-program",
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

export function ProductPrograms({ className }: { className?: string }) {
  return (
    <section className={cn("bg-white pb-32 pt-0", className)}>
      <div className="tt-container max-w-[90rem]">
        <div className="mb-20">
          <span className="mb-4 block text-lg font-black uppercase tracking-[0.12em] text-[#00a3ad] md:text-xl">
            Naš program
          </span>
          <h2 className="mb-8 text-4xl font-black tracking-tighter text-[#00344d] md:text-6xl">
            Medicinska rešenja
          </h2>
          <p className="w-full text-lg leading-relaxed text-slate-600 md:text-xl">
            Kao zvanični distributer kompanije{" "}
            <Link
              href="https://www.convatec.com/sr-rs/"
              target="_blank"
              rel="noreferrer"
              className="relative inline-block font-semibold text-[#0077a0] transition-colors duration-300 hover:text-[#00a3ad] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              ConvaTec
            </Link>
            , nudimo sveobuhvatnu paletu proizvoda koji postavljaju standarde u modernoj
            medicinskoj nezi.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {programs.slice(0, 4).map((program) => (
            <ProgramCard key={program.title} {...program} />
          ))}
          <div className="md:col-span-2">
            <ProgramCard {...programs[4]} />
          </div>
        </div>
      </div>
    </section>
  );
}
