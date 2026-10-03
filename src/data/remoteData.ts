import heroWorkspaceImg from '../assets/images/hero_remote_workspace_1790932100076.jpg';
import asyncCultureImg from '../assets/images/article_async_culture_1790932113338.jpg';
import deepWorkImg from '../assets/images/article_deep_work_1790932125470.jpg';

export const ASSETS = {
  heroWorkspace: heroWorkspaceImg,
  asyncCulture: asyncCultureImg,
  deepWork: deepWorkImg,
};

export interface JobListing {
  id: string;
  title: string;
  company: string;
  companyHq: string;
  category: 'Engineering' | 'Product & Design' | 'Operations & People' | 'Growth & Editorial';
  timezone: 'Global Async' | 'Americas (UTC-8 to UTC-3)' | 'EMEA (UTC-1 to UTC+3)' | 'APAC (UTC+5 to UTC+10)';
  salaryRange: string;
  asyncCommitment: string;
  postedAt: string;
  isPremium: boolean;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  stipendDetails: string;
  hiringManagerNote?: string;
  directContactEmail?: string;
  benchmarkPercentile?: string;
}

export interface DistributedTool {
  id: string;
  name: string;
  category: 'Async Video & Docs' | 'Issue Tracking' | 'Audio & Pairing' | 'Global HR & Payroll';
  rating: string;
  reviewsCount: number;
  pricingSummary: string;
  bestFor: string;
  description: string;
  asyncWorkflowTip: string;
  adoptionStat: string;
  websiteUrl: string;
}

export interface ProductivityResource {
  id: string;
  indexNumber: string;
  title: string;
  category: 'Deep Work Architecture' | 'Async Rituals' | 'Workspace Ergonomics' | 'Leadership Templates';
  readTime: string;
  publishedDate: string;
  isPremium: boolean;
  excerpt: string;
  keyTakeaways: string[];
  fullContent: string[];
  templateSnippet?: string;
  imageUrl?: string;
}

export interface ForumReply {
  id: string;
  author: string;
  authorRole: string;
  authorLocation: string;
  timestamp: string;
  content: string;
  upvotes: number;
}

export interface ForumThread {
  id: string;
  title: string;
  category: 'Async Workflows' | 'Home Studio Setup' | 'Compensation & Legal' | 'Hiring & Career';
  author: string;
  authorRole: string;
  authorLocation: string;
  timestamp: string;
  upvotes: number;
  views: number;
  body: string;
  replies: ForumReply[];
}

export const INITIAL_JOBS: JobListing[] = [
  {
    id: 'job-1',
    title: 'Staff Distributed Systems Engineer',
    company: 'Chronicle Labs',
    companyHq: 'Distributed · Zero-Office',
    category: 'Engineering',
    timezone: 'Global Async',
    salaryRange: '$185,000 – $220,000 USD',
    asyncCommitment: '90% Async · Max 2h sync/week',
    postedAt: '2d ago',
    isPremium: true,
    summary: 'Architect high-throughput local-first sync engines for 140,000+ distributed product teams worldwide with zero mandatory daily standups.',
    responsibilities: [
      'Design CRDT-backed state synchronization protocols across edge workers and browser clients.',
      'Author comprehensive RFC documents before implementation so engineers across 9 timezones can review asynchronously.',
      'Lead quarterly architecture reviews via recorded walkthroughs and structured written Q&A.',
    ],
    requirements: [
      '6+ years shipping production Rust, Go, or TypeScript distributed systems.',
      'Proven track record of autonomous execution and clear technical writing in remote-first organizations.',
      'Comfort with written-first decision making without relying on real-time Slack threads.',
    ],
    stipendDetails: '$4,500 initial home studio buildout + $300/mo coworking & fiber allowance',
    hiringManagerNote: 'We skip live LeetCode whiteboard screens. Candidates complete a paid ($600) 4-hour asynchronous RFC design review on their own schedule.',
    directContactEmail: 'elena.rostova@chroniclelabs.example.com',
    benchmarkPercentile: '94th percentile global location-agnostic pay',
  },
  {
    id: 'job-2',
    title: 'Principal Product Designer, Design Systems',
    company: 'Vespera',
    companyHq: 'San Francisco / Remote Worldwide',
    category: 'Product & Design',
    timezone: 'Americas (UTC-8 to UTC-3)',
    salaryRange: '$165,000 – $192,000 USD',
    asyncCommitment: '85% Async · 3h core overlap',
    postedAt: '3d ago',
    isPremium: false,
    summary: 'Own the multi-platform typographic and component architecture for an editorial-grade financial clarity workspace.',
    responsibilities: [
      'Maintain and evolve our token-driven Figma and React accessibility primitives.',
      'Record 5-minute Loom design critiques instead of scheduling multi-person review calls.',
      'Partner directly with frontend engineers to audit micro-interactions and layout precision.',
    ],
    requirements: [
      '5+ years crafting high-density web applications with strict typographic and grid systems.',
      'Fluency in CSS grid, React component APIs, and WCAG AA accessibility standards.',
      'Portfolio demonstrating restraint, clarity, and systems thinking.',
    ],
    stipendDetails: '$3,500 Apple Pro Display / Herman Miller equipment stipend + 6 weeks paid sabbaticals',
  },
  {
    id: 'job-3',
    title: 'Head of Async Operations & People Experience',
    company: 'Kinetix Protocol',
    companyHq: 'Zurich / Remote Global',
    category: 'Operations & People',
    timezone: 'EMEA (UTC-1 to UTC+3)',
    salaryRange: '$150,000 – $178,000 USD',
    asyncCommitment: '95% Async · Written Culture',
    postedAt: '4d ago',
    isPremium: true,
    summary: 'Codify our public company handbook, global compensation bands, and asynchronous onboarding rituals across 28 countries.',
    responsibilities: [
      'Audit and reduce company-wide synchronous meeting hours by maintaining strict calendar hygiene policies.',
      'Manage global EOR compliance, equity grants, and location-independent compensation reviews.',
      'Design twice-yearly retreat logistics for 65 team members in coastal Europe and Japan.',
    ],
    requirements: [
      '4+ years leading People Ops or Chief of Staff functions at a 100% distributed organization.',
      'Deep familiarity with Deel/Remote.com legal frameworks and async handbook governance.',
      'Exceptional editorial precision when writing internal policy documentation.',
    ],
    stipendDetails: '$3,000 annual wellness & studio budget + unlimited book & learning reimbursement',
    hiringManagerNote: 'Mention "Workwide Member Priority" in your subject line to route directly to our COO for a 48-hour response SLA.',
    directContactEmail: 'marcus.vance@kinetix.example.com',
    benchmarkPercentile: '91st percentile global People Ops benchmark',
  },
  {
    id: 'job-4',
    title: 'Senior Full-Stack Product Engineer (React / Node)',
    company: 'Linearity Studio',
    companyHq: 'Berlin / Remote EMEA & Americas',
    category: 'Engineering',
    timezone: 'EMEA (UTC-1 to UTC+3)',
    salaryRange: '$145,000 – $170,000 USD',
    asyncCommitment: '80% Async · 4h overlap',
    postedAt: '5d ago',
    isPremium: false,
    summary: 'Build keyboard-first collaborative canvas tools for industrial designers and hardware architects.',
    responsibilities: [
      'Ship sub-50ms optimistic UI interactions using TypeScript, React, and WebGL/Canvas APIs.',
      'Participate in 6-week calm product cycles followed by 2-week cooldown and refactoring sprints.',
      'Write clear release notes and customer-facing changelogs.',
    ],
    requirements: [
      '4+ years full-stack product engineering experience with deep care for UI craft.',
      'Experience profiling browser rendering performance and memory usage.',
    ],
    stipendDetails: '$2,500 workstation setup + annual retreat in Lisbon',
  },
  {
    id: 'job-5',
    title: 'Founding Technical Editor & Content Strategist',
    company: 'Substrata Cloud',
    companyHq: 'Distributed · Anywhere',
    category: 'Growth & Editorial',
    timezone: 'Global Async',
    salaryRange: '$130,000 – $155,000 USD',
    asyncCommitment: '100% Async · Zero Recurring Calls',
    postedAt: '1w ago',
    isPremium: true,
    summary: 'Lead long-form technical monographs, architecture benchmarks, and developer documentation for an edge database platform.',
    responsibilities: [
      'Interview staff engineers asynchronously via structured written prompts to produce deep-dive essays.',
      'Own the editorial calendar, benchmark reproducibility reports, and monthly newsletter for 90,000 readers.',
    ],
    requirements: [
      'Demonstrated portfolio of clear, hype-free technical writing or engineering journalism.',
      'Ability to read SQL query plans and understand distributed storage fundamentals.',
    ],
    stipendDetails: '$2,000 studio stipend + 4-day workweek (Fridays off globally)',
    hiringManagerNote: 'Include two unedited writing samples. We value depth and technical accuracy over SEO keyword volume.',
    directContactEmail: 'editorial-hiring@substrata.example.com',
    benchmarkPercentile: '96th percentile technical editorial compensation',
  },
  {
    id: 'job-6',
    title: 'Staff Product Manager, Developer Experience',
    company: 'Arcadia Runtime',
    companyHq: 'Remote · APAC & Americas',
    category: 'Product & Design',
    timezone: 'APAC (UTC+5 to UTC+10)',
    salaryRange: '$160,000 – $188,000 USD',
    asyncCommitment: '85% Async · Written PRDs',
    postedAt: '1w ago',
    isPremium: false,
    summary: 'Define the CLI, SDK, and observability roadmap for a globally distributed serverless compute platform.',
    responsibilities: [
      'Synthesize user research into crisp, 2-page six-week pitch documents.',
      'Collaborate asynchronously with engineering squads in Tokyo, Sydney, and Vancouver.',
    ],
    requirements: [
      '5+ years in technical product management for developer tools or cloud infrastructure.',
      'Strong SQL and data analysis skills for self-serve cohort evaluation.',
    ],
    stipendDetails: '$3,000 home office grant + full private healthcare coverage',
  },
];

export const DISTRIBUTED_TOOLS: DistributedTool[] = [
  {
    id: 'tool-1',
    name: 'Linear',
    category: 'Issue Tracking',
    rating: '4.9',
    reviewsCount: 1420,
    pricingSummary: 'Free up to 250 issues · $8/user/mo Standard',
    bestFor: 'High-velocity async product cycles & automated project updates',
    description: 'Purpose-built issue tracking and project planning with keyboard-first navigation, automated Git branch workflows, and written Project Updates that eliminate status meetings.',
    asyncWorkflowTip: 'Configure automated Friday Project Health prompts so every squad lead posts a 3-bullet written status update instead of hosting a Monday all-hands.',
    adoptionStat: 'Used by 78% of surveyed remote engineering teams',
    websiteUrl: 'https://linear.app',
  },
  {
    id: 'tool-2',
    name: 'Loom',
    category: 'Async Video & Docs',
    rating: '4.8',
    reviewsCount: 1185,
    pricingSummary: 'Free starter · $12.50/creator/mo Business',
    bestFor: '5-minute design critiques, PR walkthroughs & async onboarding',
    description: 'Instant screen and camera messaging with automatic chapters, transcripts, and time-stamped comments that let teammates review complex visual work on their own timezone.',
    asyncWorkflowTip: 'Cap all internal Loom recordings at 4 minutes and paste a 3-line summary above the link so viewers know whether they need to watch at 1.5x or simply approve.',
    adoptionStat: 'Saves an average of 4.2 synchronous meeting hours/week per user',
    websiteUrl: 'https://loom.com',
  },
  {
    id: 'tool-3',
    name: 'Notion',
    category: 'Async Video & Docs',
    rating: '4.8',
    reviewsCount: 2310,
    pricingSummary: 'Free personal · $10/user/mo Plus',
    bestFor: 'Single-source-of-truth company handbooks & RFC decision logs',
    description: 'Connected workspace for living company handbooks, structured RFC databases, and transparent meeting notes accessible across every department.',
    asyncWorkflowTip: 'Assign a single "DRI (Directly Responsible Individual)" and "Last Verified Date" property to every handbook page to prevent documentation rot.',
    adoptionStat: '84% retention across distributed teams over 50+ headcount',
    websiteUrl: 'https://notion.so',
  },
  {
    id: 'tool-4',
    name: 'Tuple',
    category: 'Audio & Pairing',
    rating: '4.9',
    reviewsCount: 640,
    pricingSummary: '$25/user/mo Team · Free 14-day trial',
    bestFor: 'Ultra-low latency remote pair programming & crisp 5K screen sharing',
    description: 'Engineered specifically for remote developers with dual-cursor control, low CPU overhead, and one-click drawing on your collaborator’s screen.',
    asyncWorkflowTip: 'Use Tuple for high-bandwidth debugging sessions when an async thread exceeds 4 back-and-forth replies—resolve in 15 minutes and document the outcome.',
    adoptionStat: 'Sub-40ms input latency across trans-Atlantic pairing sessions',
    websiteUrl: 'https://tuple.app',
  },
  {
    id: 'tool-5',
    name: 'Deel',
    category: 'Global HR & Payroll',
    rating: '4.7',
    reviewsCount: 950,
    pricingSummary: '$49/mo Contractors · $599/mo EOR full-time',
    bestFor: 'Compliant hiring, localized contracts & multi-currency payroll in 150+ countries',
    description: 'End-to-end global Employer of Record (EOR), localized tax compliance, automated equipment provisioning, and multi-currency payouts.',
    asyncWorkflowTip: 'Standardize self-serve employment verification letters and localized benefits enrollment inside Deel to eliminate HR ticket backlogs.',
    adoptionStat: 'Enables borderless hiring across 150+ legal jurisdictions',
    websiteUrl: 'https://deel.com',
  },
  {
    id: 'tool-6',
    name: 'Twist',
    category: 'Async Video & Docs',
    rating: '4.7',
    reviewsCount: 512,
    pricingSummary: 'Free up to 1 month history · $6/user/mo Unlimited',
    bestFor: 'Structured, topic-threaded team communication without real-time presence anxiety',
    description: 'Designed by Doist as a calm alternative to chat rooms—every conversation is organized into persistent, searchable threads with zero online presence dots.',
    asyncWorkflowTip: 'Replace ephemeral "#general" chat streams with dedicated topic threads that close once a decision is recorded.',
    adoptionStat: 'Reduces context-switching interruptions by 63% vs real-time chat',
    websiteUrl: 'https://twist.com',
  },
];

export const PRODUCTIVITY_RESOURCES: ProductivityResource[] = [
  {
    id: 'res-1',
    indexNumber: '01',
    title: 'The Four-Hour Deep Work Block: Designing a Zero-Interruption Calendar',
    category: 'Deep Work Architecture',
    readTime: '7 min read',
    publishedDate: 'September 2026',
    isPremium: false,
    imageUrl: ASSETS.deepWork,
    excerpt: 'Why splitting your day into 30-minute swiss-cheese calendar slots destroys cognitive throughput—and how to negotiate makers-schedule blocks across timezones.',
    keyTakeaways: [
      'Consolidate all synchronous touchpoints into a single 90-minute "Sync Window" twice a week.',
      'Turn off notification badges between 08:00 and 12:30 local time using automated OS focus profiles.',
      'Replace status check-ins with a 3-line daily ship log posted at the end of your workday.',
    ],
    fullContent: [
      'In co-located offices, visibility is often mistaken for output. When teams transition to remote work without redesigning their communication rituals, they replicate office interruptions digitally—trading desk tap-ons for constant chat pings and fragmented 30-minute video calls.',
      'Our benchmark study across 42 distributed engineering and design organizations revealed that makers require a minimum of 110 uninterrupted minutes to reach peak cognitive state on complex architecture or editorial problems.',
      'To protect deep work without blocking teammates in other timezones, establish an explicit Synchronous Window (for example, 14:00–15:30 UTC on Tuesdays and Thursdays) while treating all other hours as default-asynchronous.',
    ],
    templateSnippet: `# Weekly Maker Schedule Protocol
- 08:30 – 12:30 Local: Deep Work Block (Slack paused, notifications silenced)
- 12:30 – 13:30 Local: Midday Walk & Rest
- 13:30 – 15:00 Local: Async Code Reviews, RFC Feedback & Overlap Syncs
- 15:00 – 17:00 Local: Secondary Execution & End-of-Day Written Handoff`,
  },
  {
    id: 'res-2',
    indexNumber: '02',
    title: 'The Written RFC Playbook: Making High-Stakes Decisions Across 10 Timezones',
    category: 'Async Rituals',
    readTime: '11 min read',
    publishedDate: 'October 2026',
    isPremium: true,
    imageUrl: ASSETS.asyncCulture,
    excerpt: 'Complete Notion and Markdown blueprint for proposing, debating, and committing to architectural and product decisions without scheduling a 12-person meeting.',
    keyTakeaways: [
      'Separate context-gathering from decision commitment using a 48-hour structured comment window.',
      'Explicitly list "Non-Goals" and "Rejected Alternatives" in the top third of every proposal.',
      'Designate one Directly Responsible Individual (DRI) with final tie-breaking authority.',
    ],
    fullContent: [
      'Synchronous decision meetings favor the loudest voice in the most convenient timezone. Engineers in APAC or EMEA often wake up to find critical product decisions made during an impromptu afternoon call in San Francisco.',
      'A disciplined Request for Comments (RFC) culture levels the playing field. By requiring proposals to be written in crisp prose before any debate begins, authors uncover edge cases during the drafting phase itself.',
      'Members can copy the complete RFC Decision Matrix below directly into Notion, Linear, or GitHub Discussions to standardize asynchronous governance.',
    ],
    templateSnippet: `# RFC-[Number]: [Decision Title]
- **Author / DRI**: @handle
- **Status**: Draft | In Review (Closes YYYY-MM-DD) | Committed
- **Reviewers Required**: @eng-lead, @design-lead

## 1. Problem Statement & Quantitative Context
[2-3 sentences defining the user pain and current baseline metric]

## 2. Proposed Architecture / Solution
[Concrete mechanism and trade-offs]

## 3. Explicit Non-Goals
[What we are intentionally NOT solving in this cycle]

## 4. Rejected Alternatives
- Alternative A: Rejected because [reason]`,
  },
  {
    id: 'res-3',
    indexNumber: '03',
    title: 'Location-Agnostic Compensation & Negotiation Dossier (2026 Edition)',
    category: 'Leadership Templates',
    readTime: '14 min read',
    publishedDate: 'October 2026',
    isPremium: true,
    excerpt: 'Verified compensation percentiles, equity refresh scripts, and home-studio stipend negotiation templates for senior remote IC and leadership roles.',
    keyTakeaways: [
      'How to counter geographic pay bands when interviewing with SF/NYC-headquartered distributed startups.',
      'Structuring contractor vs. EOR full-time total rewards packages to optimize tax efficiency.',
      'Word-for-word email scripts that secured +$22,000 average base increases for Workwide members.',
    ],
    fullContent: [
      'While some legacy enterprises still index remote salaries to local cost-of-living tiers, top-tier distributed companies increasingly adopt global or regional ceiling bands to attract top 5% talent regardless of zip code.',
      'When negotiating with a distributed employer, anchor the conversation around value creation, timezone bridge coverage, and written communication autonomy.',
      'Use the script template below when responding to an initial offer that applies a geographic discount factor.',
    ],
    templateSnippet: `Subject: Re: Offer Details — [Your Name]

Thank you for putting together the comprehensive offer package. I'm deeply aligned with the team's mission and async engineering culture.

Regarding base compensation: because the scope and impact of this Staff role are identical regardless of physical zip code—and given my track record leading distributed delivery across Americas and EMEA—I am targeting the tier-1 band at $[Target Amount].`,
  },
  {
    id: 'res-4',
    indexNumber: '04',
    title: 'Acoustic & Lighting Calibration for Architectural Home Studios',
    category: 'Workspace Ergonomics',
    readTime: '6 min read',
    publishedDate: 'August 2026',
    isPremium: false,
    excerpt: 'How to achieve broadcast-grade vocal clarity and eye-safe circadian lighting in a minimalist 8m² room without unsightly foam wedges.',
    keyTakeaways: [
      'Position your desk perpendicular to natural windows to eliminate harsh backlighting and screen glare.',
      'Use timber slat wool acoustic panels and heavy linen curtains to lower room RT60 reverb under 0.4s.',
      'Pair a 4000K high-CRI bias light behind your primary display to eliminate evening eye strain.',
    ],
    fullContent: [
      'Your home studio is both your primary creative instrument and the frame through which colleagues experience your presence. Poor audio reverb causes subconscious listener fatigue during recorded Loom updates and 1:1 calls.',
      'Instead of covering walls in dark studio foam, introduce natural sound-absorbing materials: a high-pile wool rug underfoot, timber-slat acoustic felt behind the monitor, and a dynamic XLR microphone mounted on a low-profile boom arm below eye level.',
    ],
  },
];

export const INITIAL_FORUM_THREADS: ForumThread[] = [
  {
    id: 'thread-1',
    title: 'How do you prevent "async drift" when a project spans UTC-7 to UTC+9?',
    category: 'Async Workflows',
    author: 'Soren Lindqvist',
    authorRole: 'VP of Engineering at NordCloud',
    authorLocation: 'Stockholm, Sweden (UTC+1)',
    timestamp: '3h ago',
    upvotes: 64,
    views: 412,
    body: 'We recently expanded our core infrastructure squad to include two senior engineers in Tokyo alongside our existing members in Stockholm and Seattle. While everyone writes thorough PR descriptions, we noticed that complex architectural questions sometimes lose momentum over a 48-hour feedback cycle. What specific handoff rituals have worked for your team?',
    replies: [
      {
        id: 'rep-101',
        author: 'Maya Lin',
        authorRole: 'Staff Systems Architect',
        authorLocation: 'Vancouver, Canada (UTC-7)',
        timestamp: '2h ago',
        upvotes: 29,
        content: 'The biggest unlock for us was adopting "Two-Way Door Default Approval." Unless a PR touches irreversible schema migrations or public billing APIs, reviewers leave non-blocking suggestions and the author can merge immediately without waiting 24 hours for a second thumbs-up.',
      },
      {
        id: 'rep-102',
        author: 'Kenji Takahashi',
        authorRole: 'Principal Product Engineer',
        authorLocation: 'Kyoto, Japan (UTC+9)',
        timestamp: '1h ago',
        upvotes: 18,
        content: 'End-of-day Loom handoffs with explicit "Blocking vs. Non-Blocking" questions in the first line of the message changed everything for our Tokyo-Europe bridge. If I state the exact fallback action I will take tomorrow morning if nobody objects, zero days are lost.',
      },
    ],
  },
  {
    id: 'thread-2',
    title: 'Minimalist single-cable desk setups: CalDigit TS4 vs. Dell 40" 5K2K Thunderbolt hub?',
    category: 'Home Studio Setup',
    author: 'Clara Vance',
    authorRole: 'Design Systems Lead',
    authorLocation: 'Lisbon, Portugal (UTC+0)',
    timestamp: '9h ago',
    upvotes: 47,
    views: 318,
    body: 'I am rebuilding my home studio around a solid oak desk and want zero visible cable clutter. For those running a 16-inch MacBook Pro with an external XLR audio interface and studio key light, is a dedicated Thunderbolt 4 dock under the desk still more reliable than a monitor’s built-in USB-C hub?',
    replies: [
      {
        id: 'rep-201',
        author: 'David Miller',
        authorRole: 'Founding Designer',
        authorLocation: 'Austin, USA (UTC-6)',
        timestamp: '6h ago',
        upvotes: 15,
        content: 'Mount a CalDigit TS4 underneath the desk surface using 3M Dual Lock strips and run a single braided 1.5m Thunderbolt 4 cable up through a grommet. Monitor hubs frequently drop USB audio interfaces when waking from deep sleep.',
      },
    ],
  },
  {
    id: 'thread-3',
    title: 'Spain Digital Nomad Visa vs. Portugal D8 in 2026: Real processing timelines & tax lessons',
    category: 'Compensation & Legal',
    author: 'Lucas Meyer',
    authorRole: 'Senior Backend Engineer',
    authorLocation: 'Valencia, Spain (UTC+1)',
    timestamp: '1d ago',
    upvotes: 89,
    views: 740,
    body: 'Having completed the Spanish Digital Nomad Visa application directly from Madrid last month as a US W-2 converted to Deel contractor, I wanted to share the exact apostille checklist and Beckhams Law tax ruling updates for 2026. Happy to answer questions for anyone planning a move this autumn.',
    replies: [
      {
        id: 'rep-301',
        author: 'Hannah Abbott',
        authorRole: 'Product Operations Manager',
        authorLocation: 'London, UK (UTC+0)',
        timestamp: '18h ago',
        upvotes: 22,
        content: 'Thank you for sharing this! Did the UGE require a wet-ink letter from your company authorizing work in Spain, or was the standard Deel contractor agreement addendum sufficient?',
      },
    ],
  },
  {
    id: 'thread-4',
    title: 'Replacing the live coding interview with a paid $500 async PR review: 6-month retrospective',
    category: 'Hiring & Career',
    author: 'Elena Rostova',
    authorRole: 'Engineering Director at Chronicle Labs',
    authorLocation: 'Tallinn, Estonia (UTC+2)',
    timestamp: '2d ago',
    upvotes: 112,
    views: 890,
    body: 'Six months ago we eliminated live 45-minute algorithmic screen shares. Instead, finalists receive a real-world architectural PR with subtle concurrency and state-sync bugs and have 48 hours to record a 5-minute walkthrough and written review. Our offer-acceptance rate jumped from 58% to 91%.',
    replies: [
      {
        id: 'rep-401',
        author: 'Marcus Thorne',
        authorRole: 'Staff Frontend Engineer',
        authorLocation: 'Toronto, Canada (UTC-5)',
        timestamp: '1d ago',
        upvotes: 34,
        content: 'This tests the exact skill that matters in a remote team: asynchronous code comprehension and respectful, clear written communication.',
      },
    ],
  },
];
