import { $, Slot, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { cn } from "@/lib/utils";

type ClassProps = {
  class?: string;
};

type IconProps = ClassProps & {
  fill?: string;
};

const SvgIcon = component$<IconProps>(({ class: className, fill = "none" }) => (
  <svg
    class={cn("h-6 w-6", className)}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <Slot />
  </svg>
));

const Stars = component$<ClassProps>((props) => (
  <SvgIcon class={props.class}>
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
    <path d="M19 15l.9 2.6L22 18.5l-2.1.9L19 22l-.9-2.6-2.1-.9 2.1-.9L19 15Z" />
    <path d="M5 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z" />
  </SvgIcon>
));

const Globe2 = component$<ClassProps>((props) => (
  <SvgIcon class={props.class}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 0 20" />
    <path d="M12 2a15.3 15.3 0 0 0 0 20" />
  </SvgIcon>
));

const UserIcon = component$<ClassProps>((props) => (
  <SvgIcon class={props.class}>
    <path d="M19 21a7 7 0 0 0-14 0" />
    <circle cx="12" cy="7" r="4" />
  </SvgIcon>
));

const FolderIcon = component$<ClassProps>((props) => (
  <SvgIcon class={props.class}>
    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.7-.9L9.6 4A2 2 0 0 0 7.9 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
  </SvgIcon>
));

const StarIcon = component$<ClassProps>((props) => (
  <SvgIcon class={props.class}>
    <polygon points="12 2 15.1 8.3 22 9.3 17 14.2 18.2 21 12 17.8 5.8 21 7 14.2 2 9.3 8.9 8.3 12 2" />
  </SvgIcon>
));

const LaptopIcon = component$<ClassProps>((props) => (
  <SvgIcon class={props.class}>
    <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9" />
    <path d="M2 20h20" />
    <path d="M6 16h12" />
  </SvgIcon>
));

const AtomIcon = component$<ClassProps>((props) => (
  <SvgIcon class={props.class}>
    <circle cx="12" cy="12" r="1" />
    <path d="M20.2 20.2c2-2 .2-7-4-11.2s-9.2-6-11.2-4 .2 7 4 11.2 9.2 6 11.2 4Z" />
    <path d="M3.8 20.2c-2-2-.2-7 4-11.2s9.2-6 11.2-4-.2 7-4 11.2-9.2 6-11.2 4Z" />
  </SvgIcon>
));

const BookOpenTextIcon = component$<ClassProps>((props) => (
  <SvgIcon class={props.class}>
    <path d="M12 7v14" />
    <path d="M16 12h2" />
    <path d="M16 8h2" />
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H12V5H6.5A2.5 2.5 0 0 0 4 7.5v12Z" />
    <path d="M20 19.5A2.5 2.5 0 0 0 17.5 17H12V5h5.5A2.5 2.5 0 0 1 20 7.5v12Z" />
  </SvgIcon>
));

const TrophyIcon = component$<ClassProps>((props) => (
  <SvgIcon class={props.class}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M6 2h12v7a6 6 0 0 1-12 0V2Z" />
    <path d="M12 15v4" />
    <path d="M8 21h8" />
  </SvgIcon>
));

const BriefcaseIcon = component$<ClassProps>((props) => (
  <SvgIcon class={props.class}>
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <path d="M2 13h20" />
  </SvgIcon>
));

const ArrowRightIcon = component$<ClassProps>((props) => (
  <SvgIcon class={props.class}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </SvgIcon>
));

const MailIcon = component$<ClassProps>((props) => (
  <SvgIcon class={props.class}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </SvgIcon>
));

const MailCheckIcon = component$<ClassProps>((props) => (
  <SvgIcon class={props.class}>
    <path d="M22 11.1V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8" />
    <path d="m22 7-10 6L2 7" />
    <path d="m16 19 2 2 4-4" />
  </SvgIcon>
));

const Card = component$<ClassProps>((props) => (
  <div class={cn("rounded-lg border bg-card text-card-foreground shadow-sm", props.class)}>
    <Slot />
  </div>
));

const CardHeader = component$<ClassProps>((props) => (
  <div class={cn("flex flex-col space-y-1.5 p-6", props.class)}>
    <Slot />
  </div>
));

const CardContent = component$<ClassProps>((props) => (
  <div class={cn("p-6 pt-0", props.class)}>
    <Slot />
  </div>
));

const CardFooter = component$<ClassProps>((props) => (
  <div class={cn(" flex items-center p-6 pt-0", props.class)}>
    <Slot />
  </div>
));

const ShinyCard = component$<ClassProps>((props) => (
  <div class="card rounded-lg flex flex-col">
    <div class={cn("inner-card bg-card rounded-lg h-full w-full", props.class)}>
      <Slot />
    </div>
    <div class="blob"></div>
    <div class="fakeblob"></div>
  </div>
));

const Section = component$(() => (
  <div class="flex flex-col justify-center items-center gap-2 pt-8 pb-2 px-2 sm:px-6">
    <Slot />
  </div>
));

const SectionHeader = component$<{ title: string; subtitle: string }>((props) => (
  <div class="flex flex-col justify-center items-center gap-2 mb-8">
    <Slot />
    <h3 class="text-secondary-foreground font-medium uppercase text-sm tracking-wider mb-2">
      {props.title}
    </h3>
    <h2 class="font-medium text-5xl text-center">{props.subtitle}</h2>
  </div>
));

const EmailButton = component$(() => (
  <div class="rotating-effect">
    <a href="mailto:hello@marklyck.com" class="inner-rotating-effect">
      <MailIcon class="mail-closed-icon mr-2 h-5 w-5" />
      <MailCheckIcon class="mail-open-icon mr-2 h-5 w-5 hidden" />
      hello@marklyck.com
    </a>
  </div>
));

const Navbar = component$(() => (
  <nav class="px-6 flex items-center max-w-[80rem] mx-auto">
    <a href="/" class="text-[24px] mr-2">
      <span class="text-indigo-600 text-[24px]">.</span>marklyck
    </a>
    <div class="bg-card px-2 py-1 rounded border border-border font-thin text-zinc-200 text-xs">
      portfolio
    </div>
  </nav>
));

const GithubIcon = component$<ClassProps>((props) => (
  <svg class={props.class} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.45-1.19-1.11-1.51-1.11-1.51-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.97c.85 0 1.7.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.38-.01 2.48-.01 2.82 0 .27.18.59.69.49A10.1 10.1 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
  </svg>
));

const LinkedinIcon = component$<ClassProps>((props) => (
  <svg class={props.class} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.68H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
  </svg>
));

const Benchmark = component$(() => {
  useVisibleTask$(({ cleanup }) => {
    const coldStart = document.getElementById("cold-start");
    if (!sessionStorage.getItem("loaded")) {
      if (coldStart) coldStart.style.opacity = "1";
      sessionStorage.setItem("loaded", "true");
    }

    const checkNavigationTiming = () => {
      const navigationTiming = performance.getEntriesByType("navigation")[0] as
        | PerformanceNavigationTiming
        | undefined;

      if (navigationTiming?.loadEventEnd) {
        const responseTime = navigationTiming.responseEnd;
        const responseEl = document.getElementById("response-end");
        if (responseEl) responseEl.innerHTML = responseTime.toFixed(0);

        if (responseTime < 750) {
          const benchmarkEl = document.getElementById("benchmark");
          if (benchmarkEl) benchmarkEl.style.opacity = "1";
        }
      } else {
        window.setTimeout(checkNavigationTiming, 0);
      }
    };

    window.addEventListener("load", checkNavigationTiming);
    checkNavigationTiming();
    cleanup(() => window.removeEventListener("load", checkNavigationTiming));
  });

  return (
    <div id="benchmark" class="mx-auto mt-4 mb-0 flex flex-col items-center transition-all duration-[5s]">
      <span class="font-light text-center mb-2">
        This website loaded in:{" "}
        <b>
          <span id="response-end" class="font-extrabold text-emerald-600">
            <div class="inline-block w-5 h-3 rounded bg-zinc-900"></div>
          </span>{" "}
          ms ⚡
        </b>
      </span>
      <p id="ideal-response" class="text-xs text-secondary-foreground text-center mb-2">
        <a
          class="underline hover:text-blue-500"
          href="https://www.nngroup.com/articles/response-times-3-important-limits/"
          target="_blank"
        >
          Jakob Nielsen
        </a>{" "}
        defined the ideal response-time based on human perceputal abilities. Anything
        <b class="text-secondary-foreground"> under 100ms is perceived as instant</b>.
      </p>
      <p id="cold-start" class="text-xs text-secondary-foreground">
        ❄️ This was loaded from a cold-start. Refresh the page to see how fast it loads when the Edge-worker is hot!
      </p>
    </div>
  );
});

const Header = component$(() => (
  <Section>
    <div class="grid grid-cols-1 @[60rem]:grid-cols-3 gap-4 mx-auto">
      <ShinyCard class="flex-1 flex flex-col justify-between">
        <CardHeader class="pb-4">
          <img src="/memoji/hello-memoji.webp" alt="@marklyck" class="h-16 w-16 rounded-full bg-background p-1" />
        </CardHeader>
        <CardContent>
          <h2 class="text-3xl mb-2 font-bold">Let's build an internet that sparks joy!</h2>
          <span class="text-secondary-foreground">Mark Lyck • Full-stack Web developer</span>
        </CardContent>
      </ShinyCard>
      <div class="flex flex-1 gap-4 flex-col">
        <ShinyCard>
          <CardHeader class="pb-0 pt-4 px-4">
            <span class="text-2xl font-light text-secondary-foreground">Title</span>
          </CardHeader>
          <CardContent class="pb-4 px-4">
            <h3 class="text-[28px]">Lead Software Engineer</h3>
          </CardContent>
        </ShinyCard>
        <ul class="flex gap-4 w-full">
          <li class="flex-1">
            <a href="https://github.com/marklyck" target="_blank" class="flex items-center justify-center rounded border-border border w-full py-3 text-xl bg-card hover:bg-white text-white hover:text-black">
              <GithubIcon class="mr-2 size-6" />
              Github
            </a>
          </li>
          <li class="flex-1">
            <a href="https://www.linkedin.com/in/mlyck/" target="_blank" class="flex items-center justify-center rounded border-border border w-full py-3 text-xl bg-card hover:bg-white text-white hover:text-black">
              <LinkedinIcon class="mr-2 size-6" />
              LinkedIn
            </a>
          </li>
        </ul>
        <ShinyCard class="relative">
          <CardHeader class="pb-0 px-4 pt-4">
            <span class="text-2xl font-light text-secondary-foreground">Based in</span>
          </CardHeader>
          <CardContent class="pb-4 px-4">
            <h3 class="text-[28px]">Tennessee, USA</h3>
            <Globe2 class="text-secondary-foreground size-10 absolute right-8 top-1/2 -translate-y-1/2" />
          </CardContent>
        </ShinyCard>
      </div>
      <ShinyCard class="flex-1 flex items-center justify-center flex-col p-8">
        <Stars class="text-secondary-foreground h-10 w-10 mb-4" />
        <h3 class="text-[28px] mb-4 text-center">Let's work together!</h3>
        <EmailButton />
      </ShinyCard>
    </div>
    <Benchmark />
  </Section>
));

const AboutMe = component$(() => (
  <Section>
    <SectionHeader title="About me" subtitle="Who is this guy?">
      <UserIcon class="text-secondary-foreground" />
    </SectionHeader>
    <div class="grid grid-cols-1 @[45rem]:grid-cols-2 gap-8 row-auto">
      <div class="hover:-rotate-3 transition-all duration-300 ease-in-out">
        <ShinyCard class="w-80 p-2 self-start">
          <img
            class="mb-4 rounded bg-zinc-950 h-[302px]"
            width="302"
            height="302"
            loading="lazy"
            decoding="async"
            style={{ background: "radial-gradient(circle, rgba(50,50,50,1) 0%, rgba(15,15,15,1) 60%)" }}
            src="/memoji/laptop-memoji.webp"
            alt="Mark Lyck memoji"
          />
          <p class="text-zinc-500 text-center text-xl font-caveat pb-2">Make the web fast again!</p>
        </ShinyCard>
      </div>
      <div class="w-80 flex flex-col gap-4">
        <h4 class="font-bold text-2xl">
          Hi, I'm Mark <span class="inline-block animate-wave">👋</span>
        </h4>
        <p class="text-secondary-foreground text-xl font-extralight">
          A passionate and experienced web developer from Denmark, smarthome addict, and AI enthusiast based in USA. With over 14 years of expertise in full-stack development, I have dedicated myself to creating exceptional user experiences that blend functionality and aesthetics seamlessly.
        </p>
        <span class="text-secondary-foreground font-caveat text-xl">Mark Lyck</span>
      </div>
    </div>
  </Section>
));

const PortfolioItem = component$<{ title: string; description: string; url: string; imgSrc: string }>((props) => (
  <a href={props.url} target="_blank" class="w-full max-w-[600px]">
    <ShinyCard class="group cursor-pointer">
      <CardHeader class="pb-0 space-y-0 relative">
        <h4 class="text-2xl">{props.title}</h4>
        <p class="text-secondary-foreground font-light mt-0">{props.description}</p>
        <div class="absolute p-2 top-1/2 right-4 -translate-y-1/2 group-hover:bg-zinc-900 rounded transition-colors duration-200">
          <ArrowRightIcon class="text-secondary-foreground group-hover:text-white transition-colors duration-200" />
        </div>
      </CardHeader>
      <CardContent class="p-4">
        <img
          alt={props.title}
          src={props.imgSrc}
          width="566"
          height="416"
          loading="lazy"
          decoding="async"
          class="group-hover:rotate-1 portfolio-item-image w-full h-auto rounded transition-all duration-300"
        />
      </CardContent>
    </ShinyCard>
  </a>
));

const Portfolio = component$(() => (
  <Section>
    <SectionHeader title="Portfolio" subtitle="Latest projects I've worked on">
      <FolderIcon class="text-secondary-foreground" />
    </SectionHeader>
    <div class="grid grid-cols-1 @[45rem]:grid-cols-2 gap-8 w-full">
      <PortfolioItem title="Nebula" description="Creator video platform" url="https://nebula.tv" imgSrc="/screenshots/nebula.webp" />
      <PortfolioItem title="Formula Stocks" description="Value/Growth investment research platform" url="https://formulastocks.com/alt" imgSrc="/screenshots/formulastocks_alt.webp" />
      <PortfolioItem title="Colony Networks" description="Telenet analytics & management platform" url="https://colonynetworks.com" imgSrc="/screenshots/colony.webp" />
      <PortfolioItem title="Weekly Stocktip" description="AI Stockpick system" url="https://weeklystocktip.com" imgSrc="/screenshots/weekly_stocktip.webp" />
    </div>
  </Section>
));

const Testimonial = component$<{
  name: string;
  jobTitle: string;
  company: string;
  description: string;
  avatarSrc: string;
}>((props) => (
  <ShinyCard class="p-8">
    <p class="text-lg mb-4">{props.description}</p>
    <div class="flex gap-2 items-center">
      <img
        src={props.avatarSrc}
        alt={props.name}
        width="48"
        height="48"
        loading="lazy"
        decoding="async"
        class="h-12 w-12 mr-2"
      />
      <div>
        <p>{props.name}</p>
        <p class="text-secondary-foreground font-light">
          {props.jobTitle} • {props.company}
        </p>
      </div>
    </div>
  </ShinyCard>
));

const Testimonials = component$(() => (
  <Section>
    <SectionHeader title="Testimonials" subtitle="Voices of satisfaction">
      <StarIcon class="text-secondary-foreground" />
    </SectionHeader>
    <div class="mb-4">
      <Testimonial
        name="Amanda Oliver"
        avatarSrc="/memoji/amanda.webp"
        jobTitle="Lead product engineer"
        company="Sendible"
        description="Mark is my lead dev at William Hill on the Betslip team. I can say he's been the best lead I've ever had. He's a really good developer not only able to produce highly clean and performant code but also good in proposing clean and scalable architecture solutions. As a lead, he was aware of the needs and qualities of each team member, being able to keep us motivated and doing our best at every moment, even with huge pressure on our backs. On the soft skills end, he's a really nice and communicative person, easy to reach and to dialog with. To sum up, I'm very lucky to have had the chance of working with him!"
      />
    </div>
    <Card class="bg-transparent pt-8 w-full">
      <CardContent class="flex flex-col items-center justify-center">
        <LaptopIcon class="mb-8 h-16 w-16" />
        <h2 class="text-3xl font-light mb-6 text-center">Wanna work together?</h2>
        <EmailButton />
      </CardContent>
      <CardFooter class="pb-0 p-2 bg-card flex justify-center">
        <p class="text-xs text-secondary-foreground uppercase text-center">I'll get back to you within 24 hours</p>
      </CardFooter>
    </Card>
  </Section>
));

const Tool = component$<{ imgSrc: string; name: string; description: string }>((props) => (
  <div class="group relative overflow-hidden hover:overflow-visible">
    <Card class="p-3 sm:p-4 relative hover:bg-zinc-800 transition-colors duration-500">
      <img
        src={props.imgSrc}
        alt={props.name}
        width="64"
        height="64"
        loading="lazy"
        decoding="async"
        class="h-8 w-8 sm:h-16 sm:w-16 rounded"
      />
    </Card>
    <Card class="opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-48 overflow-hidden absolute z-10 left-1/2 -translate-x-1/2 -bottom-3 translate-y-full py-2 px-4 bg-zinc-950 w-44 transition-all duration-300 ease-in-out">
      <p class="text-lg font-bold text-center whitespace-nowrap">{props.name}</p>
      <p class="text-sm text-secondary-foreground font-light text-center">{props.description}</p>
    </Card>
  </div>
));

const tools = [
  ["TypeScript", "Programming Language", "/icons/typescript.svg"],
  ["Python", "Programming language", "icons/python.svg"],
  ["Bun", "JavaScript runtime", "/icons/bun.svg"],
  ["React", "Frontend Framework", "/icons/react.svg"],
  ["Svelte", "Frontend Framework", "/icons/svelte.svg"],
  ["Vue", "Frontend Framework", "/icons/vue.svg"],
  ["NextJS", "React Framework", "/icons/nextjs.svg"],
  ["Astro", "Frontend Framework", "icons/astro.svg"],
  ["Qwik", "Frontend Framework", "icons/qwik.svg"],
  ["Nuxt", "Vue Framework", "/icons/nuxt.svg"],
  ["ViteJS", "Frontend build tool", "/icons/vitejs.svg"],
  ["Tailwind CSS", "Utility first CSS framework", "icons/tailwind.svg"],
  ["Radix UI", "Headless accessible UI components", "icons/radix.png"],
  ["Storybook", "Frontend tool for building & testing UIs", "icons/storybook.svg"],
  ["Prettier", "Opinionated code formatter", "icons/prettier.svg"],
  ["EsLint", "Pluggable JavaScript linter", "icons/eslint.svg"],
  ["TurboRepo", "high performance build system for TypeScript", "icons/turborepo.svg"],
  ["trpc", "End-to-end typesafe API framework", "icons/trpc.svg"],
  ["GraphQL", "Query language for APIs", "icons/graphql.svg"],
  ["postgreSQL", "Database", "icons/postgres.svg"],
  ["Prisma", "ORM", "icons/prisma.svg"],
  ["Docker", "Virtualization containers", "icons/docker.svg"],
  ["Kubernetes", "Managing containerized applications", "icons/kubernetes.svg"],
  ["Linear", "Organization & Planning", "/icons/linear.svg"],
  ["Framer", "Design & animation tools", "/icons/framer.svg"],
  ["Figma", "Design tool", "/icons/figma.svg"],
] as const;

const Tools = component$(() => (
  <Section>
    <SectionHeader title="Tools" subtitle="Frameworks & Tools">
      <AtomIcon class="text-secondary-foreground" />
    </SectionHeader>
    <Card class="bg-transparent">
      <CardHeader class="bg-card p-2 text-center text-secondary-foreground text-sm">
        Favorite Languages, Frameworks & Tools I use
      </CardHeader>
      <CardContent class="p-4 flex gap-4 sm:gap-6 flex-wrap justify-center">
        {tools.map(([name, description, imgSrc]) => (
          <Tool key={name} name={name} description={description} imgSrc={imgSrc} />
        ))}
      </CardContent>
    </Card>
  </Section>
));

type CareerType = "career" | "award" | "education";

const CareerItem = component$<{ type: CareerType; title: string; subtitle: string; dates: string }>((props) => (
  <Card class="p-4 flex w-full mb-4 hover:bg-border transition-colors duration-200">
    {props.type === "education" ? (
      <BookOpenTextIcon class="mr-4 text-secondary-foreground" />
    ) : props.type === "award" ? (
      <TrophyIcon class="mr-4 text-secondary-foreground" />
    ) : (
      <BriefcaseIcon class="mr-4 text-secondary-foreground" />
    )}
    <div>
      <h4 class="mb-[2px]">{props.title}</h4>
      <p class="text-zinc-300 font-light mb-1 text-sm">{props.subtitle}</p>
      <p class="text-secondary-foreground font-bold text-xs">{props.dates}</p>
    </div>
  </Card>
));

const BackgroundTabs = component$(() => {
  const active = useSignal<"career" | "education" | "awards">("career");
  const setActive = $((value: "career" | "education" | "awards") => {
    active.value = value;
  });

  const triggerClass =
    "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm sm:w-[140px] h-10 rounded-full";

  return (
    <div class="flex flex-col justify-center items-center w-full">
      <div class="inline-flex items-center justify-center p-1 text-muted-foreground bg-card h-12 mb-2 rounded-full [&>[aria-selected=true]]:bg-indigo-600 [&>[aria-selected=true]>.tab-icon]:text-white">
        <button type="button" aria-selected={active.value === "career" ? "true" : "false"} data-state={active.value === "career" ? "active" : "inactive"} class={triggerClass} onClick$={() => setActive("career")}>
          <BriefcaseIcon class="tab-icon mr-2 text-secondary-foreground h-4 w-4" />
          Career
        </button>
        <button type="button" aria-selected={active.value === "education" ? "true" : "false"} data-state={active.value === "education" ? "active" : "inactive"} class={triggerClass} onClick$={() => setActive("education")}>
          <BookOpenTextIcon class="tab-icon mr-2 text-secondary-foreground h-4 w-4" />
          Education
        </button>
        <button type="button" aria-selected={active.value === "awards" ? "true" : "false"} data-state={active.value === "awards" ? "active" : "inactive"} class={triggerClass} onClick$={() => setActive("awards")}>
          <TrophyIcon class="tab-icon mr-2 text-secondary-foreground h-4 w-4" />
          Awards
        </button>
      </div>
      {active.value === "career" && (
        <div class="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full max-w-[420px]">
          <p class="text-center text-secondary-foreground mb-2 mt-2">+14 years of software engineering</p>
          <CareerItem type="career" title="Lead web developer" subtitle="Colony Networks (Remote)" dates="2019 - Present" />
          <CareerItem type="career" title="Freelance contract" subtitle="Sensefence • Prototype" dates="2020" />
          <CareerItem type="career" title="Lead Software Engineer" subtitle="William Hill" dates="2017 - 2019" />
          <CareerItem type="career" title="Fullstack Engineer" subtitle="Tether (Remote • startup)" dates="2016 - 2017" />
          <CareerItem type="career" title="IBM contract" subtitle="IBM" dates="2016" />
          <CareerItem type="career" title="Technical Co-founder" subtitle="Formula Stocks" dates="2014 - Present" />
          <CareerItem type="career" title="Founder" subtitle="Arithia" dates="2012 - 2014" />
        </div>
      )}
      {active.value === "awards" && (
        <div class="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full max-w-[420px]">
          <p class="text-center text-secondary-foreground mb-2 mt-2">Love developer conferences!</p>
          <CareerItem type="award" title="Extra-ordinary performance" subtitle="Colony Networks" dates="" />
          <CareerItem type="award" title="Winner of Mozilla / React Europe Hackathon" subtitle="Mozilla" dates="May 2018" />
          <CareerItem type="award" title="Winner of William Hill Hackathon" subtitle="William Hill" dates="November 2017" />
          <CareerItem type="award" title="Most helpful" subtitle="The Iron Yard" dates="September 2016" />
        </div>
      )}
      {active.value === "education" && (
        <div class="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full max-w-[420px]">
          <p class="text-center text-secondary-foreground mb-2 mt-2">First website at 12 years old, and been hooked ever since.</p>
          <CareerItem type="education" title="Computer Science" subtitle="Aarhus University, Denmark" dates="2014 - 2017" />
          <CareerItem type="education" title="HTML and CSS class" subtitle="Esbjerg Efterskole, Denmark" dates="2007" />
        </div>
      )}
    </div>
  );
});

const Background = component$(() => (
  <Section>
    <SectionHeader title="Background" subtitle="Career and Education">
      <UserIcon class="text-secondary-foreground" />
    </SectionHeader>
    <div class="flex flex-col items-center justify-center w-full max-w-[420px]">
      <BackgroundTabs />
    </div>
  </Section>
));

const Footer = component$(() => (
  <Section>
    <p class="text-center text-secondary-foreground text-sm mb-8">
      *No render blocking JavaScript bundles were shipped in the loading of this website.
    </p>
  </Section>
));

const ShinyCardsEffect = component$(() => {
  useVisibleTask$(({ cleanup }) => {
    const handleMouseMove = (ev: MouseEvent) => {
      document.querySelectorAll(".card").forEach((card) => {
        const blob = card.querySelector(".blob");
        const fakeBlob = card.querySelector(".fakeblob");

        if (!(blob instanceof HTMLElement) || !(fakeBlob instanceof HTMLElement)) return;

        const rec = fakeBlob.getBoundingClientRect();
        blob.animate(
          [
            {
              transform: `translate(${ev.clientX - rec.left - rec.width / 2}px,${ev.clientY - rec.top - rec.height / 2}px)`,
            },
          ],
          {
            duration: 300,
            fill: "forwards",
          },
        );
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    cleanup(() => window.removeEventListener("mousemove", handleMouseMove));
  });

  return null;
});

export default component$(() => {
  return (
    <>
      <ShinyCardsEffect />
      <Navbar />
      <main class="@container flex flex-col gap-4 max-w-[80rem] mx-auto">
        <Header />
        <AboutMe />
        <Portfolio />
        <Testimonials />
        <Tools />
        <Background />
        <Footer />
      </main>
    </>
  );
});

export const head: DocumentHead = {
  title: "Mark Lyck's Portfolio",
  meta: [
    {
      name: "description",
      content: "Mark Lyck's Portfolio",
    },
  ],
};
