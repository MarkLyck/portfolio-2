import { Stars, Book, Trophy, Briefcase } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const CareerItem = ({
  type,
  title,
  subtitle,
  dates,
}: {
  type: "career" | "award" | "education";
  title: string;
  subtitle: string;
  dates: string;
}) => (
  <Card className="p-4 flex w-full mb-4">
    {type === "education" ? (
      <Stars className="mr-4 text-secondary-foreground" />
    ) : type === "award" ? (
      <Trophy className="mr-4 text-secondary-foreground" />
    ) : (
      <Briefcase className="mr-4 text-secondary-foreground" />
    )}
    <div>
      <h4 className="mb-[2px]">{title}</h4>
      <p className="text-zinc-300 font-light mb-1 text-sm">{subtitle}</p>
      <p className="text-secondary-foreground font-bold text-xs">{dates}</p>
    </div>
  </Card>
);

const BackgroundTabs = () => {
  return (
    <Tabs
      defaultValue="career"
      className="flex flex-col justify-center items-center w-full"
    >
      <TabsList className="bg-card h-12 mb-2 rounded-full [&>[aria-selected=true]]:bg-indigo-600 [&>[aria-selected=true]>.tab-icon]:text-white">
        <TabsTrigger value="career" className="w-[140px] h-10 rounded-full">
          <Briefcase className="tab-icon mr-2 text-secondary-foreground h-4 w-4" />
          Career
        </TabsTrigger>
        <TabsTrigger value="awards" className="w-[140px] h-10 rounded-full">
          <Trophy className="tab-icon mr-2 text-secondary-foreground h-4 w-4" />
          Awards
        </TabsTrigger>
        <TabsTrigger value="education" className="w-[140px] h-10 rounded-full">
          <Stars className="tab-icon mr-2 text-secondary-foreground h-4 w-4" />
          Education
        </TabsTrigger>
      </TabsList>
      <TabsContent value="career" className="w-full max-w-[420px]">
        <CareerItem
          type="career"
          title="Lead web developer"
          subtitle="Colony Networks"
          dates="2019 - Present"
        />
        <CareerItem
          type="career"
          title="Lead web developer"
          subtitle="William Hill"
          dates="2017 - 2019"
        />
        <CareerItem
          type="career"
          title="Fullstack Engineer"
          subtitle="Tether"
          dates="2016 - 2017"
        />
        <CareerItem
          type="career"
          title="Technical Co-founder"
          subtitle="Formula Stocks"
          dates="2014 - Present"
        />
        <CareerItem
          type="career"
          title="Founder"
          subtitle="Arithia"
          dates="2012 - 2014"
        />
      </TabsContent>
      <TabsContent value="awards" className="w-full max-w-[420px]">
        <CareerItem
          type="award"
          title="Winner Mozilla / React Europe Hackathon"
          subtitle="Mozilla"
          dates="May 2018"
        />
        <CareerItem
          type="award"
          title="Winner William Hill Hackathon"
          subtitle="William Hill"
          dates="November 2017"
        />
        <CareerItem
          type="award"
          title="Most helpful"
          subtitle="The Iron Yard"
          dates="September 2016"
        />
      </TabsContent>
      <TabsContent value="education" className="w-full max-w-[420px]">
        <CareerItem
          type="education"
          title="Front-end Engineering Bootcamp"
          subtitle="The Iron Yard"
          dates="2016"
        />
        <CareerItem
          type="education"
          title="Business Administration & economics"
          subtitle="Aarhus University"
          dates="2014 - 2017"
        />
      </TabsContent>
    </Tabs>
  );
};
export default BackgroundTabs;
