import { Container } from "@/components/design-system/Container";
import { StomaPageIntro } from "@/components/pages/stoma-page-intro";
import { StomaSubnav } from "@/components/pages/stoma-subnav";

type StomaPageTopProps = {
  label: string;
  title: string;
  description: string;
  currentPage: "tipovi-stome" | "nega-stome" | "stoma-pomagala";
};

export function StomaPageTop({
  label,
  title,
  description,
  currentPage,
}: StomaPageTopProps) {
  return (
    <Container className="flex flex-col gap-8 pt-4">
      <div className="flex justify-center">
        <StomaSubnav currentPage={currentPage} />
      </div>
      <StomaPageIntro label={label} title={title} description={description} />
    </Container>
  );
}
