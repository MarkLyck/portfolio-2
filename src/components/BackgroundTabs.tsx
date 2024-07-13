import { BookOpenTextIcon, Trophy, Briefcase } from "lucide-react";

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
	<Card className="p-4 flex w-full mb-4 hover:bg-border transition-colors duration-200">
		{type === "education" ? (
			<BookOpenTextIcon className="mr-4 text-secondary-foreground" />
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
				<TabsTrigger value="career" className="sm:w-[140px] h-10 rounded-full">
					<Briefcase className="tab-icon mr-2 text-secondary-foreground h-4 w-4" />
					Career
				</TabsTrigger>
				<TabsTrigger
					value="education"
					className="sm:w-[140px] h-10 rounded-full"
				>
					<BookOpenTextIcon className="tab-icon mr-2 text-secondary-foreground h-4 w-4" />
					Education
				</TabsTrigger>
				<TabsTrigger value="awards" className="sm:w-[140px] h-10 rounded-full">
					<Trophy className="tab-icon mr-2 text-secondary-foreground h-4 w-4" />
					Awards
				</TabsTrigger>
			</TabsList>
			<TabsContent value="career" className="w-full max-w-[420px]">
				<p className="text-center text-secondary-foreground mb-2 mt-2">
					+12 years of software engineering
				</p>
				<CareerItem
					type="career"
					title="Lead web developer"
					subtitle="Colony Networks (Remote)"
					dates="2019 - Present"
				/>
				<CareerItem
					type="career"
					title="Freelance contract"
					subtitle="Sensefence • Prototype"
					dates="2020"
				/>
				<CareerItem
					type="career"
					title="Lead Software Engineer"
					subtitle="William Hill"
					dates="2017 - 2019"
				/>
				<CareerItem
					type="career"
					title="Fullstack Engineer"
					subtitle="Tether (Remote • startup)"
					dates="2016 - 2017"
				/>
				<CareerItem
					type="career"
					title="IBM contract"
					subtitle="IBM"
					dates="2016"
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
				<p className="text-center text-secondary-foreground mb-2 mt-2">
					Love developer conferences!
				</p>
				<CareerItem
					type="award"
					title="Extra-ordinary performance"
					subtitle="Colony Networks"
					dates=""
				/>
				<CareerItem
					type="award"
					title="Winner of Mozilla / React Europe Hackathon"
					subtitle="Mozilla"
					dates="May 2018"
				/>
				<CareerItem
					type="award"
					title="Winner of William Hill Hackathon"
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
				<p className="text-center text-secondary-foreground mb-2 mt-2">
					First website at 12 years old, and been hooked ever since.
				</p>

				<CareerItem
					type="education"
					title="Computer Science"
					subtitle="Aarhus University, Denmark"
					dates="2014 - 2017"
				/>
				<CareerItem
					type="education"
					title="HTML and CSS class"
					subtitle="Esbjerg Efterskole, Denmark"
					dates="2007"
				/>
			</TabsContent>
		</Tabs>
	);
};
export default BackgroundTabs;
