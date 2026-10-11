import Image from "next/image";
import { Header } from "@/components/header";
import { Logo } from "@/components/logo";
import { MobileReportBar } from "@/components/mobile-report-bar";
import { ReportForm } from "@/components/report-form";
import {
  ArrowIcon,
  CheckIcon,
  ClockIcon,
  EyeIcon,
  HandsIcon,
  InstagramIcon,
  PhoneCallIcon,
  PhoneIcon,
  PinIcon,
  ShieldIcon,
} from "@/components/icons";
import { CREW, REELS, SITE } from "@/lib/site";

const WRAP = "mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12";

const STEPS = [
  {
    icon: EyeIcon,
    title: "Spot",
    body: "You notice someone who could use help — on your street, at a station, near a signal.",
  },
  {
    icon: PhoneIcon,
    title: "Report",
    body: "Share where they are and what they need. It takes about two minutes, no sign-up.",
  },
  {
    icon: PinIcon,
    title: "Verify",
    body: "A trained volunteer nearby visits in person to understand the situation first-hand.",
  },
  {
    icon: HandsIcon,
    title: "Assist",
    body: "We connect them with food, care, shelter or partner NGOs — and follow up after.",
  },
];

// Grid placement is tuned for the 4-column desktop bento; see WhoWeHelp.
const NEEDS = [
  {
    title: "Food",
    body: "Hot meals and ration kits for people and families going hungry.",
    image: "/images/food.webp",
    alt: "A volunteer serving a meal on banana leaves to children seated in a row",
    span: "sm:col-span-2 lg:row-span-2",
    big: true,
  },
  {
    title: "Shelter",
    body: "Linking people sleeping outdoors to safe night shelters and homes.",
    image: "/images/shelter.webp",
    alt: "A mother holding her child at the doorway of a blue home",
    span: "lg:row-span-2",
  },
  {
    title: "Medical care",
    body: "First aid, health camps and help reaching hospitals.",
    image: "/images/medical.webp",
    alt: "A doctor checking an elderly man's blood pressure",
    span: "",
  },
  {
    title: "Clothing",
    body: "Blankets, warm wear and essentials, season by season.",
    image: "/images/clothing.webp",
    alt: "A girl wrapped in a pink shawl holding a baby in a knitted cap",
    span: "",
  },
  {
    title: "Elderly support",
    body: "Care, company and dignity for seniors who are alone or abandoned.",
    image: "/images/elderly.webp",
    alt: "An elderly man with folded hands",
    span: "lg:row-span-2",
  },
  {
    title: "Child welfare",
    body: "Connecting vulnerable children with schooling and protection.",
    image: "/images/child.webp",
    alt: "A smiling schoolboy on a bicycle",
    span: "",
  },
  {
    title: "Livelihood",
    body: "Small steps back to work — documents, skills, referrals.",
    image: "/images/livelihood.webp",
    alt: "A woman working at a sewing machine",
    span: "lg:col-span-2",
  },
];

const PROMISES = [
  { icon: ClockIcon, title: "2-minute report", body: "No account, no app download." },
  { icon: PinIcon, title: "On-ground check", body: "Every report is seen in person." },
  { icon: ShieldIcon, title: "Dignity first", body: "Details stay with verified volunteers." },
  { icon: CheckIcon, title: "Always free", body: "For reporters and for those we help." },
];

const FAQS = [
  {
    q: "What happens after I submit a report?",
    a: "Your report goes into our intake queue. A volunteer close to the location picks it up, visits in person, and decides together with the person what help is right. If you left a number, we may call you for directions.",
  },
  {
    q: "Do I need to stay with the person or get involved further?",
    a: "No. Reporting is enough. If you'd like to stay involved, you can join as a volunteer — but there's never any obligation.",
  },
  {
    q: "Will the person's information be made public?",
    a: "Never. Reports are visible only to verified volunteers working on that case. We don't post photos or stories of anyone without their consent.",
  },
  {
    q: "Can I report someone outside my city?",
    a: "Yes. Report anywhere — we route each case to the nearest volunteer group or a trusted partner organisation.",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main id="top" className="flex-1">
        <Hero />
        <Promises />
        <HowItWorks />
        <WhoWeHelp />
        <ReportSection />
        <OurWork />
        {/* Crew hidden until real names and photos are in — see CREW in lib/site.ts. */}
        {/* <Crew /> */}
        <GetInvolved />
        <Faq />
      </main>
      <Footer />
      <MobileReportBar />
    </>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={`text-sm font-medium tracking-[0.14em] uppercase ${light ? "text-sun" : "text-leaf"}`}
    >
      {children}
    </p>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
  center = false,
  light = false,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2
        className={`mt-3 text-[1.75rem] leading-tight font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl ${light ? "text-cream" : "text-pine"}`}
      >
        {title}
      </h2>
      {body && (
        <p className={`mt-3 text-base text-pretty sm:mt-4 sm:text-lg ${light ? "text-cream/75" : "text-muted"}`}>
          {body}
        </p>
      )}
    </div>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative isolate flex min-h-[calc(88svh-4.5rem)] items-end sm:min-h-[calc(100svh-4.5rem)] overflow-hidden bg-pine lg:items-center">
      <Image
        src="/images/hero-children.jpg"
        alt="Children sitting together on the floor, smiling and listening"
        fill
        preload
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      {/* Flat colour wash for legible text: no shadows, just a gradient tint. */}
      <div
        className="absolute inset-0 -z-10 bg-linear-to-t from-pine via-pine/70 to-pine/20 lg:bg-linear-to-r lg:from-pine/95 lg:via-pine/65 lg:to-pine/5"
        aria-hidden="true"
      />

      <div className={`${WRAP} py-12 sm:py-16 lg:py-24`}>
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-cream/15 px-3.5 py-1.5 text-sm text-cream backdrop-blur-sm">
            <span className="size-2 rounded-full bg-sun" />
            Community-driven, volunteer-led
          </span>
          <h1 className="mt-6 text-4xl leading-[1.08] font-semibold tracking-tight text-cream text-balance sm:text-6xl lg:text-7xl">
            Saw someone in need? <span className="text-sun">Tell us.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-cream/85 text-pretty sm:mt-6 sm:text-xl">
            We&apos;ll be there.
            <span className="sm:hidden"> Share a quick report and a volunteer will check in person.</span>
            <span className="hidden sm:inline">
              {" "}
              {SITE.name} turns everyday moments of noticing into real help — share a quick report,
              and our volunteers evaluate the situation on the ground and connect the person with
              the right support.
            </span>
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
            <a
              href="#report"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-sun px-7 py-4 text-base font-medium whitespace-nowrap text-pine transition-colors hover:bg-cream"
            >
              Report someone in need <ArrowIcon className="size-5" />
            </a>
          </div>
          <p className="mt-5 text-center text-sm text-cream/70 sm:mt-6 sm:text-left">
            Takes about 2 minutes · No sign-up needed · Free, always
          </p>
        </div>
      </div>
    </section>
  );
}

function Promises() {
  return (
    <section aria-label="Our promise" className="border-b border-line bg-mint">
      <ul className={`${WRAP} grid grid-cols-2 gap-2.5 py-5 sm:gap-x-6 sm:gap-y-8 sm:py-10 lg:grid-cols-4`}>
        {PROMISES.map(({ icon: Icon, title, body }) => (
          <li
            key={title}
            className="rounded-2xl bg-cream p-3 sm:flex sm:gap-3.5 sm:rounded-none sm:bg-transparent sm:p-0"
          >
            <div className="flex items-center gap-1.5 sm:contents">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-mint text-forest sm:size-11 sm:rounded-xl sm:bg-cream">
                <Icon className="size-4 sm:size-5" />
              </span>
              <p className="text-[13px] leading-tight font-medium whitespace-nowrap text-pine sm:hidden">{title}</p>
            </div>
            <div>
              <p className="hidden font-medium text-pine sm:block">{title}</p>
              <p className="mt-1.5 text-[13px] leading-snug text-muted sm:mt-0.5 sm:text-sm">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className={`${WRAP} py-14 sm:py-20 lg:py-28`}>
      <SectionHeading
        center
        eyebrow="How it works"
        title="From a moment of noticing to real help, in four steps"
        body="You don't need to know what to do. You just need to tell us — we take it from there."
      />
      <ol className="mt-10 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {STEPS.map(({ icon: Icon, title, body }, i) => (
          <li
            key={title}
            className="group flex gap-4 rounded-2xl border border-line bg-white p-5 transition-colors hover:border-forest sm:flex-col sm:gap-0 sm:rounded-3xl sm:p-8"
          >
            <div className="flex items-start justify-between sm:items-center">
              <span className="flex size-11 items-center justify-center rounded-xl bg-mint text-forest transition-colors group-hover:bg-forest group-hover:text-cream sm:size-12 sm:rounded-2xl">
                <Icon className="size-5.5 sm:size-6" />
              </span>
              <span className="hidden text-sm font-medium text-muted/70 sm:inline">0{i + 1}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-pine sm:mt-6 sm:text-xl">
                <span className="mr-2 text-sm font-medium text-muted/70 sm:hidden">0{i + 1}</span>
                {title}
              </h3>
              <p className="mt-1 text-[15px] text-muted text-pretty sm:mt-2">{body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function WhoWeHelp() {
  return (
    <section id="who-we-help" className="bg-pine">
      <div className={`${WRAP} py-14 sm:py-20 lg:py-28`}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            light
            eyebrow="Who we help"
            title="Whatever the need, it starts with someone noticing"
          />
          <div className="max-w-md">
            <p className="text-lg text-cream/75 text-pretty">
              Our volunteers assess each person&apos;s situation on the ground and work with local
              partners to get them the help that actually fits.
            </p>
            <a
              href="#report"
              className="mt-6 hidden items-center gap-2 rounded-full bg-sun px-6 py-3.5 font-medium text-pine transition-colors hover:bg-cream sm:inline-flex"
            >
              Report a need <ArrowIcon className="size-5" />
            </a>
          </div>
        </div>

        <p className="mt-8 flex items-center gap-2 text-sm text-cream/60 sm:hidden" aria-hidden="true">
          Swipe to see more <ArrowIcon className="size-4" />
        </p>

        <ul className="-mx-5 mt-4 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:mt-14 sm:grid sm:auto-rows-[20rem] sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:auto-rows-[17rem] lg:grid-cols-4">
          {NEEDS.map((n, i) => (
            <li
              key={n.title}
              className={`group relative isolate aspect-[4/5] w-[80%] shrink-0 snap-start overflow-hidden rounded-3xl sm:aspect-auto sm:w-auto ${n.span}`}
            >
              <Image
                src={n.image}
                alt={n.alt}
                fill
                sizes={n.big ? "(min-width: 1024px) 50vw, (min-width: 640px) 100vw, 80vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 80vw"}
                className="-z-20 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                className="absolute inset-0 -z-10 bg-linear-to-t from-pine via-pine/45 to-transparent"
                aria-hidden="true"
              />
              <div className="flex h-full flex-col justify-between p-6 sm:p-7">
                <span className="self-start rounded-full bg-cream/15 px-3 py-1 text-xs font-medium text-cream backdrop-blur-sm">
                  0{i + 1}
                </span>
                <div>
                  <h3
                    className={`text-2xl font-semibold tracking-tight text-cream ${n.big ? "sm:text-4xl" : ""}`}
                  >
                    {n.title}
                  </h3>
                  <p
                    className={`mt-2 text-[15px] text-cream/85 text-pretty ${n.big ? "max-w-md sm:text-lg" : ""}`}
                  >
                    {n.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
          <li className="flex aspect-[4/5] w-[80%] shrink-0 snap-start flex-col justify-between rounded-3xl bg-forest p-7 sm:col-span-2 sm:aspect-auto sm:w-auto lg:col-span-3">
            <p className="max-w-xl text-2xl font-semibold tracking-tight text-cream text-balance sm:text-3xl">
              Not sure it fits? <span className="text-sun">Report anyway</span> — we&apos;ll
              figure it out together.
            </p>
            <a
              href="#report"
              className="mt-6 inline-flex items-center gap-2 self-start font-medium text-sun"
            >
              Start a report <ArrowIcon className="size-5" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

function ReportSection() {
  return (
    <section id="report" className="bg-mint">
      <div
        className={`${WRAP} grid gap-8 py-14 sm:gap-12 sm:py-20 lg:grid-cols-[1fr_1.5fr] lg:gap-16 lg:py-28`}
      >
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Report a need"
            title="Tell us who needs help"
            body="Share what you can. Even a location and a line about what you saw is enough to get a volunteer moving."
          />
          <ul className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
            {[
              "A volunteer near the location reviews every report.",
              "Your contact details are optional and never shared publicly.",
            ].map((t) => (
              <li key={t} className="flex gap-3 text-[15px] text-ink">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-forest text-cream">
                  <CheckIcon className="size-3" />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <figure className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-3xl lg:block">
            <Image
              src="/images/work-street.webp"
              alt="An elderly man waving on a busy city street"
              fill
              sizes="(min-width: 1024px) 35vw, 0px"
              className="object-cover"
            />
            <figcaption className="absolute inset-x-4 bottom-4 rounded-2xl bg-cream px-4 py-3 text-sm text-ink">
              Every report is a person waiting to be seen.
            </figcaption>
          </figure>
        </div>
        <ReportForm />
      </div>
    </section>
  );
}

function OurWork() {
  return (
    <section id="our-work" className="py-14 sm:py-20 lg:py-28">
      <div className={`${WRAP} flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between`}>
        <SectionHeading
          eyebrow="Our work"
          title="See the kindness happen"
          body="Field visits, food drives and the people behind every report — straight from our Instagram."
        />
        <a
          href={SITE.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2.5 self-start rounded-full bg-pine px-6 py-3.5 font-medium text-cream transition-colors hover:bg-forest sm:self-auto"
        >
          <InstagramIcon className="size-5" />
          {SITE.instagramHandle}
        </a>
      </div>

      <ul className={`${WRAP} mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-4`}>
        {REELS.map((code, i) => (
          <li key={code}>
            <a
              href={`https://www.instagram.com/reel/${code}/`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Watch reel ${i + 1} on Instagram`}
              className="group relative isolate block aspect-[9/16] overflow-hidden rounded-3xl bg-pine"
            >
              <Image
                src={`/reels/${code}.webp`}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="-z-20 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                className="absolute inset-0 -z-10 bg-pine/20"
                aria-hidden="true"
              />
              <span className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-cream/20 text-cream backdrop-blur-sm">
                <InstagramIcon className="size-4.5" />
              </span>
              <span className="absolute inset-0 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="ml-2 size-16 text-white transition-transform duration-300 group-hover:scale-110"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z" />
                </svg>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- re-enable in Home once crew details exist
function Crew() {
  return (
    <section id="crew" className="bg-pine">
      <div className={`${WRAP} py-14 sm:py-20 lg:py-28`}>
        <SectionHeading
          light
          center
          eyebrow="The crew"
          title="The people who show up"
          body="Neighbours, students and professionals who give their time to make sure no one is left unseen."
        />
        <ul className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {CREW.map((m, i) => (
            <li key={`${m.role}-${i}`} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-forest">
                {m.photo ? (
                  <Image
                    src={m.photo}
                    alt={m.name}
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <svg
                    viewBox="0 0 100 125"
                    className="absolute inset-0 size-full"
                    aria-hidden="true"
                  >
                    <circle cx="50" cy="48" r="18" fill="var(--leaf)" />
                    <path d="M14 125c0-24 16-40 36-40s36 16 36 40Z" fill="var(--leaf)" />
                  </svg>
                )}
              </div>
              <p className="mt-4 font-medium text-cream">{m.name}</p>
              <p className="text-sm text-cream/65">{m.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function GetInvolved() {
  const ways = [
    {
      title: "Volunteer on the ground",
      body: "Visit reported cases near you, assess needs and deliver help. A few hours a month makes a difference.",
      cta: "Message us to volunteer",
      image: "/images/work-volunteers.webp",
      alt: "Volunteers in gloves packing food parcels together",
    },
    {
      title: "Support a case",
      body: "Contribute food, clothing, medicines or skills when a verified case needs exactly what you have.",
      cta: "Get in touch",
      image: "/images/work-kitchen.webp",
      alt: "A volunteer stirring a large pot in a community kitchen",
    },
    {
      title: "Spread the word",
      body: "The more people know they can report, the fewer people are left unseen. Share us with your circle.",
      cta: "Follow on Instagram",
      image: "/images/work-hand.webp",
      alt: "A hand reaching out to a young girl",
    },
  ];

  return (
    <section id="get-involved" className={`${WRAP} py-14 sm:py-20 lg:py-28`}>
      <SectionHeading
        center
        eyebrow="Get involved"
        title="Lend a hand"
        body="Kindness scales when we do it together. Pick the way that fits your time."
      />
      <div className="-mx-5 mt-8 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:mt-14 sm:grid sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 md:grid-cols-3">
        {ways.map(({ title, body, cta, image, alt }) => (
          <a
            key={title}
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-[82%] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-line bg-white transition-colors hover:border-forest sm:w-auto"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={image}
                alt={alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-pine">{title}</h3>
              <p className="mt-2 flex-1 text-[15px] text-muted">{body}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-forest sm:mt-8">
                {cta}
                <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="border-t border-line">
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading center eyebrow="FAQ" title="Questions people ask us" />
        <div className="mt-12 divide-y divide-line border-y border-line">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-lg font-medium text-pine [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line text-forest transition-transform group-open:rotate-45">
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 pr-14 text-muted text-pretty">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-pine text-cream">
      <div className={`${WRAP} grid grid-cols-2 gap-x-6 gap-y-10 py-12 sm:py-14 md:grid-cols-[1.5fr_1fr_1fr]`}>
        <div className="col-span-2 md:col-span-1">
          <Logo light />
          <p className="mt-4 max-w-sm text-sm text-cream/70">{SITE.description}</p>
        </div>
        <nav aria-label="Footer">
          <p className="text-sm font-medium text-sun">Explore</p>
          <ul className="mt-4 space-y-2.5 text-sm text-cream/80">
            <li><a className="hover:text-cream" href="#how-it-works">How it works</a></li>
            <li><a className="hover:text-cream" href="#who-we-help">Who we help</a></li>
            <li><a className="hover:text-cream" href="#report">Report a need</a></li>
            <li><a className="hover:text-cream" href="#our-work">Our work</a></li>
            <li><a className="hover:text-cream" href="#faq">FAQ</a></li>
          </ul>
        </nav>
        <div>
          <p className="text-sm font-medium text-sun">Connect</p>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-cream/80 hover:text-cream"
          >
            <InstagramIcon className="size-5" /> {SITE.instagramHandle}
          </a>
          <a
            href={SITE.phoneHref}
            className="mt-3 flex items-center gap-2 text-sm text-cream/80 hover:text-cream"
          >
            <PhoneCallIcon className="size-5" /> {SITE.phone}
          </a>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className={`${WRAP} flex flex-col gap-2 py-6 text-xs text-cream/50 sm:flex-row sm:justify-between`}>
          <p>
            © <CopyrightYear /> {SITE.name}. Made with care by the community.
          </p>
          <a href="/credits" className="hover:text-cream">
            Photo credits
          </a>
        </div>
      </div>
    </footer>
  );
}

async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}
