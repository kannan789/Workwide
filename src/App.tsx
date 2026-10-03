/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Search,
  Check,
  Lock,
  Unlock,
  ThumbsUp,
  Copy,
  Calendar,
  Plus,
  X,
  Menu,
  Mail,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import {
  ASSETS,
  INITIAL_JOBS,
  DISTRIBUTED_TOOLS,
  PRODUCTIVITY_RESOURCES,
  INITIAL_FORUM_THREADS,
  JobListing,
  DistributedTool,
  ProductivityResource,
  ForumThread,
} from './data/remoteData';

type ActiveTab = 'home' | 'jobs' | 'tips' | 'community' | 'pricing';
type PlanTier = 'free' | 'monthly' | 'yearly';

export default function App() {
  // Simple, clean top-level view navigation
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Modern Professional Sans-Serif Font Family state
  const [selectedFont, setSelectedFont] = useState<'plus-jakarta' | 'inter' | 'outfit' | 'dm-sans'>('plus-jakarta');

  // Freemium Membership State ($0 Free, $9/mo Monthly, $99/yr Yearly + 1:1 Call)
  const [currentPlan, setCurrentPlan] = useState<PlanTier>('free');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutTargetPlan, setCheckoutTargetPlan] = useState<'monthly' | 'yearly'>('yearly');
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutError, setCheckoutError] = useState('');

  // 1:1 Consulting Call State (Included with $99/yr plan)
  const [consultingModalOpen, setConsultingModalOpen] = useState(false);
  const [consultingTopic, setConsultingTopic] = useState('Remote Career & Salary Strategy');
  const [consultingDate, setConsultingDate] = useState('2026-10-15');
  const [consultingTime, setConsultingTime] = useState('15:00 UTC');
  const [bookedCall, setBookedCall] = useState<{
    topic: string;
    date: string;
    time: string;
  } | null>(null);

  // Free Newsletter State on Home Page
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'error' | 'subscribed'>('idle');

  // Job Board State
  const [jobs, setJobs] = useState<JobListing[]>(INITIAL_JOBS);
  const [jobCategory, setJobCategory] = useState<string>('All');
  const [jobSearch, setJobSearch] = useState('');
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [postJobOpen, setPostJobOpen] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobCompany, setNewJobCompany] = useState('');
  const [newJobSalary, setNewJobSalary] = useState('$150,000 – $175,000 USD');
  const [newJobCategory, setNewJobCategory] = useState<JobListing['category']>('Engineering');

  // Top-Rated Distributed Tools State
  const [toolCategory, setToolCategory] = useState<string>('All');
  const [savedTools, setSavedTools] = useState<string[]>(['tool-1']);
  const [selectedTool, setSelectedTool] = useState<DistributedTool | null>(null);

  // Productivity Tips State
  const [selectedResource, setSelectedResource] = useState<ProductivityResource | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Community Forum State
  const [threads, setThreads] = useState<ForumThread[]>(INITIAL_FORUM_THREADS);
  const [forumCategory, setForumCategory] = useState<string>('All');
  const [selectedThread, setSelectedThread] = useState<ForumThread | null>(null);
  const [upvotedIds, setUpvotedIds] = useState<string[]>([]);
  const [replyText, setReplyText] = useState('');
  const [newThreadOpen, setNewThreadOpen] = useState(false);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadBody, setNewThreadBody] = useState('');
  const [newThreadAuthor, setNewThreadAuthor] = useState('');

  // Image fallback tracker
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const isMember = currentPlan === 'monthly' || currentPlan === 'yearly';

  const navigateTo = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Newsletter Submission
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail.trim())) {
      setNewsletterStatus('error');
      return;
    }
    setNewsletterStatus('subscribed');
  };

  // Start 7-Day Free Trial Modal
  const openTrialModal = (plan: 'monthly' | 'yearly') => {
    setCheckoutTargetPlan(plan);
    setCheckoutError('');
    setCheckoutModalOpen(true);
  };

  const handleActivateTrial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutName.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(checkoutEmail.trim())) {
      setCheckoutError('Please enter your name and a valid email address.');
      return;
    }
    setCurrentPlan(checkoutTargetPlan);
    setCheckoutModalOpen(false);
    if (checkoutTargetPlan === 'yearly' && !bookedCall) {
      setConsultingModalOpen(true);
    }
  };

  const handleBookCall = (e: React.FormEvent) => {
    e.preventDefault();
    setBookedCall({
      topic: consultingTopic,
      date: consultingDate,
      time: consultingTime,
    });
    setConsultingModalOpen(false);
  };

  // Filtered Lists
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchCat = jobCategory === 'All' || job.category === jobCategory;
      const q = jobSearch.trim().toLowerCase();
      const matchQuery =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.timezone.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [jobs, jobCategory, jobSearch]);

  const filteredTools = useMemo(() => {
    if (toolCategory === 'All') return DISTRIBUTED_TOOLS;
    return DISTRIBUTED_TOOLS.filter((t) => t.category === toolCategory);
  }, [toolCategory]);

  const filteredThreads = useMemo(() => {
    if (forumCategory === 'All') return threads;
    return threads.filter((t) => t.category === forumCategory);
  }, [threads, forumCategory]);

  // Post a Job
  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobTitle.trim() || !newJobCompany.trim()) return;
    const created: JobListing = {
      id: `job-${Date.now()}`,
      title: newJobTitle.trim(),
      company: newJobCompany.trim(),
      companyHq: 'Remote Worldwide',
      category: newJobCategory,
      timezone: 'Global Async',
      salaryRange: newJobSalary.trim() || '$145,000 – $170,000 USD',
      asyncCommitment: '90% Async · Flexible Hours',
      postedAt: 'Just now',
      isPremium: false,
      summary: 'Lead high-impact remote product initiatives with an async-first distributed team.',
      responsibilities: [
        'Collaborate across timezones with clear written documentation.',
        'Ship reliable features on calm 6-week product cycles.',
      ],
      requirements: [
        'Strong track record working autonomously in remote teams.',
        'Clear written and asynchronous communication skills.',
      ],
      stipendDetails: '$3,000 Home Office Stipend + Co-working Pass',
    };
    setJobs([created, ...jobs]);
    setNewJobTitle('');
    setNewJobCompany('');
    setPostJobOpen(false);
  };

  // Forum Upvote
  const toggleUpvote = (id: string) => {
    const hasVoted = upvotedIds.includes(id);
    setUpvotedIds((prev) => (hasVoted ? prev.filter((x) => x !== id) : [...prev, id]));
    setThreads((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, upvotes: hasVoted ? t.upvotes - 1 : t.upvotes + 1 } : t
      )
    );
    if (selectedThread && selectedThread.id === id) {
      setSelectedThread({
        ...selectedThread,
        upvotes: hasVoted ? selectedThread.upvotes - 1 : selectedThread.upvotes + 1,
      });
    }
  };

  // Forum Reply
  const handleAddReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedThread) return;
    const newReply = {
      id: `rep-${Date.now()}`,
      author: checkoutName.trim() || 'Alex Morgan',
      authorRole: isMember ? 'Pro Member' : 'Community Member',
      authorLocation: 'Remote',
      timestamp: 'Just now',
      content: replyText.trim(),
      upvotes: 1,
    };
    const updatedThread = {
      ...selectedThread,
      replies: [...selectedThread.replies, newReply],
    };
    setSelectedThread(updatedThread);
    setThreads((prev) => prev.map((t) => (t.id === selectedThread.id ? updatedThread : t)));
    setReplyText('');
  };

  // Forum New Thread
  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThreadTitle.trim() || !newThreadBody.trim()) return;
    const created: ForumThread = {
      id: `thread-${Date.now()}`,
      title: newThreadTitle.trim(),
      category: 'Async Workflows',
      author: newThreadAuthor.trim() || 'Taylor Reed',
      authorRole: isMember ? 'Pro Member' : 'Remote Builder',
      authorLocation: 'Remote',
      timestamp: 'Just now',
      upvotes: 1,
      views: 1,
      body: newThreadBody.trim(),
      replies: [],
    };
    setThreads([created, ...threads]);
    setNewThreadTitle('');
    setNewThreadBody('');
    setNewThreadOpen(false);
    setSelectedThread(created);
  };

  return (
    <div data-font={selectedFont} className="min-h-screen flex flex-col bg-[#F8FAFF] text-slate-900 transition-colors duration-150">
      {/* TOP BAR CONTRACT: 1 Row, 3 Zones (Brand Wordmark — 5 Clean Nav Links — 1 Primary Action) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-indigo-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('home');
            }}
            className="font-display text-2xl font-bold tracking-tight text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            Workwide
          </a>

          {/* Zone 2: 5 Simple Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {(
              [
                { id: 'home', label: 'Home' },
                { id: 'jobs', label: 'Job Board' },
                { id: 'tips', label: 'Productivity Tips' },
                { id: 'community', label: 'Community' },
                { id: 'pricing', label: 'Pricing' },
              ] as const
            ).map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(item.id);
                }}
                className={`py-1 transition-colors whitespace-nowrap border-b-2 ${
                  activeTab === item.id
                    ? 'border-indigo-600 text-indigo-600 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Modern Sans Font Switcher */}
          <div className="flex items-center gap-2.5">
            {/* Modern Sans-Serif Font Selector */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100/90 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200">
              <span className="text-[11px] font-medium text-slate-500">Font:</span>
              <select
                value={selectedFont}
                onChange={(e) =>
                  setSelectedFont(e.target.value as 'plus-jakarta' | 'inter' | 'outfit' | 'dm-sans')
                }
                className="bg-transparent text-slate-800 font-semibold focus:outline-none cursor-pointer"
                aria-label="Select Modern Sans-Serif Font"
              >
                <option value="plus-jakarta">Plus Jakarta Sans</option>
                <option value="inter">Inter (Executive)</option>
                <option value="outfit">Outfit (Geometric)</option>
                <option value="dm-sans">DM Sans (Clean)</option>
              </select>
            </div>

            {isMember ? (
              <button
                onClick={() =>
                  currentPlan === 'yearly' ? setConsultingModalOpen(true) : navigateTo('pricing')
                }
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                {currentPlan === 'yearly'
                  ? bookedCall
                    ? `1:1 Call: ${bookedCall.date}`
                    : 'Book Included 1:1 Call'
                  : 'Pro Trial Active'}
              </button>
            ) : (
              <button
                onClick={() => openTrialModal('yearly')}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors whitespace-nowrap cursor-pointer"
              >
                Start 7-Day Free Trial
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Simple Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-indigo-100 px-6 py-4 flex flex-col gap-3 text-sm font-medium">
            <button onClick={() => navigateTo('home')} className="text-left py-1.5 text-slate-700">
              Home & Tools
            </button>
            <button onClick={() => navigateTo('jobs')} className="text-left py-1.5 text-slate-700">
              Job Board
            </button>
            <button onClick={() => navigateTo('tips')} className="text-left py-1.5 text-slate-700">
              Productivity Tips
            </button>
            <button
              onClick={() => navigateTo('community')}
              className="text-left py-1.5 text-slate-700"
            >
              Community Forum
            </button>
            <button
              onClick={() => navigateTo('pricing')}
              className="text-left py-1.5 text-indigo-600 font-semibold"
            >
              Pricing & 7-Day Free Trial
            </button>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <span className="font-medium text-slate-500">Sans-Serif Font:</span>
              <select
                value={selectedFont}
                onChange={(e) =>
                  setSelectedFont(e.target.value as 'plus-jakarta' | 'inter' | 'outfit' | 'dm-sans')
                }
                className="bg-slate-100 px-2 py-1 rounded-lg text-slate-800 font-semibold"
                aria-label="Select Modern Sans-Serif Font for Mobile"
              >
                <option value="plus-jakarta">Plus Jakarta Sans</option>
                <option value="inter">Inter</option>
                <option value="outfit">Outfit</option>
                <option value="dm-sans">DM Sans</option>
              </select>
            </div>
          </div>
        )}
      </header>

      {/* MAIN VIEW AREA */}
      <main className="flex-1">
        {/* ==================== TAB 1: HOME ==================== */}
        {activeTab === 'home' && (
          <div>
            {/* Vibrant Hero with Free Newsletter Subscription */}
            <section className="bg-gradient-to-br from-indigo-950 via-indigo-900 to-blue-900 text-white py-16 md:py-24">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="text-xs font-medium text-amber-300 tracking-wide">
                    Remote Work Life · Weekly Dispatch · 64,000+ Subscribers
                  </div>

                  <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-bold leading-[1.1] tracking-tight text-white">
                    Thrive in remote work with vetted jobs, async tools, and community.
                  </h1>

                  <p className="text-base sm:text-lg text-indigo-100 leading-relaxed max-w-xl">
                    Join our free weekly newsletter for actionable remote productivity tips,
                    distributed team tool reviews, and newly verified work-from-anywhere roles.
                  </p>

                  {/* Simple, Vibrant Free Newsletter Form */}
                  <div className="pt-2 max-w-lg">
                    {newsletterStatus === 'subscribed' ? (
                      <div className="p-4 bg-emerald-500/20 border border-emerald-400/40 rounded-xl flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2.5 text-sm font-medium text-emerald-200">
                          <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                          <span>
                            You’re subscribed! Check <strong>{newsletterEmail}</strong> for your
                            welcome guide.
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setNewsletterEmail('');
                            setNewsletterStatus('idle');
                          }}
                          className="text-xs font-semibold text-white underline shrink-0 cursor-pointer"
                        >
                          Change
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleNewsletterSubmit} className="space-y-2" noValidate>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <div className="relative flex-1">
                            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type="email"
                              value={newsletterEmail}
                              onChange={(e) => {
                                setNewsletterEmail(e.target.value);
                                if (newsletterStatus === 'error') setNewsletterStatus('idle');
                              }}
                              placeholder="Enter your email for the free newsletter..."
                              aria-label="Email address"
                              className="w-full pl-10 pr-4 py-3.5 text-sm bg-white text-slate-900 rounded-xl placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                          </div>
                          <button
                            type="submit"
                            className="px-6 py-3.5 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            Subscribe Free
                          </button>
                        </div>
                        {newsletterStatus === 'error' ? (
                          <p className="text-xs text-amber-300 font-medium">
                            Please enter a valid email address to subscribe.
                          </p>
                        ) : (
                          <p className="text-xs text-indigo-200">
                            Free weekly issue every Tuesday · Zero spam · Unsubscribe anytime
                          </p>
                        )}
                      </form>
                    )}
                  </div>

                  {/* Quick Navigation Links */}
                  <div className="pt-4 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-indigo-200">
                    <button
                      onClick={() => navigateTo('jobs')}
                      className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-amber-300 transition-colors cursor-pointer"
                    >
                      <span>Browse Remote Jobs</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigateTo('tips')}
                      className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-amber-300 transition-colors cursor-pointer"
                    >
                      <span>Read Productivity Tips</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigateTo('community')}
                      className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-amber-300 transition-colors cursor-pointer"
                    >
                      <span>Join Community Forum</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right Column: High-Impact Workspace Photography */}
                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden border border-indigo-400/30 shadow-2xl aspect-16/10 lg:aspect-4/3 bg-indigo-950">
                    {!failedImages['hero'] ? (
                      <img
                        src={ASSETS.heroWorkspace}
                        alt="Bright modern remote work studio overlooking nature"
                        referrerPolicy="no-referrer"
                        onError={() => setFailedImages((prev) => ({ ...prev, hero: true }))}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-6 text-indigo-200 text-sm">
                        Remote Workspace Studio
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6">
                      <div className="text-xs text-amber-300 font-medium">
                        Featured Workspace Setup
                      </div>
                      <p className="text-sm font-medium text-white mt-1">
                        Designed for deep focus, async collaboration, and zero daily commute.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* HOME SECTION 2: TOP-RATED TOOLS FOR DISTRIBUTED TEAMS */}
            <section className="py-16 md:py-20 max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-indigo-600">
                    Curated Software Stack
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
                    Top-Rated Tools for Distributed Teams
                  </h2>
                  <p className="text-sm text-slate-600 max-w-xl">
                    The highest-rated software used by remote-first companies for async video,
                    documentation, issue tracking, and global payroll.
                  </p>
                </div>

                {/* Simple Category Filter */}
                <div className="flex items-center gap-1 p-1 bg-indigo-50 rounded-xl overflow-x-auto">
                  {(
                    [
                      'All',
                      'Async Video & Docs',
                      'Issue Tracking',
                      'Audio & Pairing',
                      'Global HR & Payroll',
                    ] as const
                  ).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setToolCategory(cat)}
                      className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        toolCategory === cat
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-indigo-600'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Simple, Clean 3-Column Tool Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool) => {
                  const isSaved = savedTools.includes(tool.id);
                  return (
                    <div
                      key={tool.id}
                      className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between space-y-5 hover:border-indigo-300 transition-colors shadow-2xs"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span className="font-medium text-indigo-600">{tool.category}</span>
                          <span className="font-mono-tabular font-semibold text-amber-600">
                            ★ {tool.rating} ({tool.reviewsCount})
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900">{tool.name}</h3>

                        <p className="text-sm text-slate-600 leading-relaxed">{tool.description}</p>

                        <div className="pt-2 text-xs text-slate-500 font-mono-tabular">
                          {tool.pricingSummary}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                        <button
                          onClick={() => setSelectedTool(tool)}
                          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>View Async Setup Tip</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() =>
                            setSavedTools((prev) =>
                              prev.includes(tool.id)
                                ? prev.filter((id) => id !== tool.id)
                                : [...prev, tool.id]
                            )
                          }
                          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                            isSaved
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {isSaved ? '✓ Saved' : '+ Save Tool'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* HOME SECTION 3: QUICK EXPLORE CARDS (JOBS, TIPS, COMMUNITY, PRICING) */}
            <section className="py-14 bg-white border-t border-slate-200/80">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold text-indigo-600">
                      Everything for Remote Life
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                      Explore the Platform
                    </h2>
                  </div>
                  <button
                    onClick={() => navigateTo('pricing')}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Compare Free vs. Pro Membership ($9/mo or $99/yr)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1: Job Board */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 flex flex-col justify-between space-y-5">
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-indigo-600">
                        {jobs.length} Verified Roles Open
                      </div>
                      <h3 className="font-display text-xl font-bold text-slate-900">
                        Remote Job Board
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Browse vetted remote roles with transparent salaries and async commitments.
                        Unlock Member Priority listings with a 7-day free trial.
                      </p>
                    </div>
                    <button
                      onClick={() => navigateTo('jobs')}
                      className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors cursor-pointer"
                    >
                      Explore Remote Jobs
                    </button>
                  </div>

                  {/* Card 2: Productivity Tips */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/70 flex flex-col justify-between space-y-5">
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-amber-800">
                        Playbooks & Copyable Templates
                      </div>
                      <h3 className="font-display text-xl font-bold text-slate-900">
                        Productivity Tips & Guides
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Learn how to structure 4-hour deep work blocks, run async RFCs, and
                        negotiate location-agnostic compensation.
                      </p>
                    </div>
                    <button
                      onClick={() => navigateTo('tips')}
                      className="w-full py-2.5 px-4 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer"
                    >
                      Read Productivity Tips
                    </button>
                  </div>

                  {/* Card 3: Community Forum */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/70 flex flex-col justify-between space-y-5">
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-emerald-800">
                        Active Peer Discussions
                      </div>
                      <h3 className="font-display text-xl font-bold text-slate-900">
                        Community Discussion Forum
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Ask questions and swap advice on home studio ergonomics, digital nomad
                        visas, and async team rituals.
                      </p>
                    </div>
                    <button
                      onClick={() => navigateTo('community')}
                      className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors cursor-pointer"
                    >
                      Join the Discussion
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ==================== TAB 2: JOB BOARD ==================== */}
        {activeTab === 'jobs' && (
          <section className="py-12 md:py-16 max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
            {/* Vibrant Header Banner */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="text-xs font-medium text-indigo-100">
                  100% Remote · Transparent Salaries · Async-Friendly
                </div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold">
                  Remote Job Board
                </h1>
                <p className="text-sm text-indigo-100 max-w-xl">
                  Explore open remote listings or unlock Member Priority roles (featuring direct
                  hiring manager contacts) with a 7-day free trial.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  onClick={() => setPostJobOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-indigo-950 bg-white hover:bg-indigo-50 rounded-xl transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post a Job</span>
                </button>
                {!isMember && (
                  <button
                    onClick={() => openTrialModal('yearly')}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>Unlock Premium Jobs (7-Day Trial)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Simple Filter Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-1 p-1 bg-indigo-50 rounded-xl overflow-x-auto">
                {(
                  [
                    'All',
                    'Engineering',
                    'Product & Design',
                    'Operations & People',
                    'Growth & Editorial',
                  ] as const
                ).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setJobCategory(cat)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      jobCategory === cat
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-indigo-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[250px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={jobSearch}
                  onChange={(e) => setJobSearch(e.target.value)}
                  placeholder="Search role, company, or timezone..."
                  className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>

            {/* Simple, Spacious Job Cards */}
            <div className="space-y-4">
              {filteredJobs.map((job) => {
                const locked = job.isPremium && !isMember;
                const applied = appliedJobs.includes(job.id);
                return (
                  <div
                    key={job.id}
                    className="bg-white border border-slate-200/90 rounded-2xl p-6 hover:border-indigo-300 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs"
                  >
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span className="font-semibold text-indigo-600">{job.company}</span>
                        <span aria-hidden="true">·</span>
                        <span>{job.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{job.timezone}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-tabular">{job.postedAt}</span>
                        {job.isPremium && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="font-semibold text-amber-600 inline-flex items-center gap-1">
                              {locked ? (
                                <Lock className="w-3 h-3" />
                              ) : (
                                <Unlock className="w-3 h-3" />
                              )}
                              <span>Premium Listing</span>
                            </span>
                          </>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>

                      <p className="text-sm text-slate-600 leading-relaxed">{job.summary}</p>
                    </div>

                    <div className="flex sm:flex-row md:flex-col items-start sm:items-center md:items-end justify-between gap-3 shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
                      <div className="text-left md:text-right">
                        <div className="font-mono-tabular text-sm font-bold text-slate-900">
                          {job.salaryRange}
                        </div>
                        <div className="text-xs text-slate-500">{job.asyncCommitment}</div>
                      </div>

                      {locked ? (
                        <button
                          onClick={() => openTrialModal('yearly')}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors whitespace-nowrap cursor-pointer"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          <span>Unlock with 7-Day Trial</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setSelectedJob(job)}
                          className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors whitespace-nowrap cursor-pointer"
                        >
                          <span>{applied ? '✓ Applied' : 'View & Apply'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ==================== TAB 3: PRODUCTIVITY TIPS ==================== */}
        {activeTab === 'tips' && (
          <section className="py-12 md:py-16 max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="text-xs font-semibold text-amber-100">
                  Remote Work Playbooks & Templates
                </div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold">
                  Productivity Tips & Exclusive Resources
                </h1>
                <p className="text-sm text-amber-50 max-w-xl">
                  Practical guides for deep focus, asynchronous decision making, and home studio
                  ergonomics.
                </p>
              </div>
              {!isMember && (
                <button
                  onClick={() => openTrialModal('yearly')}
                  className="px-5 py-2.5 text-xs font-semibold text-amber-950 bg-white hover:bg-amber-50 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Unlock All Exclusive Templates (7-Day Trial)
                </button>
              )}
            </div>

            {/* Clean 2-Column Resource Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PRODUCTIVITY_RESOURCES.map((res) => {
                const locked = res.isPremium && !isMember;
                return (
                  <div
                    key={res.id}
                    className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden flex flex-col justify-between shadow-2xs hover:border-indigo-300 transition-colors"
                  >
                    <div>
                      {res.imageUrl && (
                        <div className="aspect-16/9 bg-slate-900 overflow-hidden">
                          {!failedImages[res.id] ? (
                            <img
                              src={res.imageUrl}
                              alt={res.title}
                              referrerPolicy="no-referrer"
                              onError={() =>
                                setFailedImages((prev) => ({ ...prev, [res.id]: true }))
                              }
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                              {res.category}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="p-6 space-y-3">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span className="font-semibold text-indigo-600">
                            {res.indexNumber}. {res.category}
                          </span>
                          <span className="font-mono-tabular">
                            {res.readTime} · {res.isPremium ? 'Pro Exclusive' : 'Free Guide'}
                          </span>
                        </div>

                        <h3 className="font-display text-xl font-bold text-slate-900 leading-snug">
                          {res.title}
                        </h3>

                        <p className="text-sm text-slate-600 leading-relaxed">{res.excerpt}</p>

                        <div className="pt-2 space-y-1.5">
                          {res.keyTakeaways.slice(0, 2).map((item, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500">Published {res.publishedDate}</span>
                      {locked ? (
                        <button
                          onClick={() => openTrialModal('yearly')}
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          <span>Unlock with Free Trial</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setSelectedResource(res)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors cursor-pointer"
                        >
                          <span>Read Full Guide & Template</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ==================== TAB 4: COMMUNITY FORUM ==================== */}
        {activeTab === 'community' && (
          <section className="py-12 md:py-16 max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="text-xs font-semibold text-emerald-100">
                  Global Remote Practitioner Forum
                </div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold">
                  Community Discussions
                </h1>
                <p className="text-sm text-emerald-50 max-w-xl">
                  Connect with distributed engineers, designers, and founders to share workflows,
                  desk setups, and global visa advice.
                </p>
              </div>
              <button
                onClick={() => setNewThreadOpen(true)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-emerald-950 bg-white hover:bg-emerald-50 rounded-xl transition-colors shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>New Discussion</span>
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1 p-1 bg-emerald-50 rounded-xl overflow-x-auto w-fit">
              {(
                [
                  'All',
                  'Async Workflows',
                  'Home Studio Setup',
                  'Compensation & Legal',
                  'Hiring & Career',
                ] as const
              ).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setForumCategory(cat)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    forumCategory === cat
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-emerald-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Simple, Scannable Thread List */}
            <div className="space-y-4">
              {filteredThreads.map((thread) => {
                const upvoted = upvotedIds.includes(thread.id);
                return (
                  <div
                    key={thread.id}
                    className="bg-white border border-slate-200/90 rounded-2xl p-6 hover:border-emerald-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs"
                  >
                    <div className="space-y-2 max-w-3xl">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span className="font-semibold text-emerald-700">{thread.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{thread.author}</span>
                        <span aria-hidden="true">·</span>
                        <span>{thread.authorLocation}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-tabular">{thread.timestamp}</span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900">
                        <button
                          onClick={() => setSelectedThread(thread)}
                          className="text-left hover:text-emerald-700 transition-colors cursor-pointer"
                        >
                          {thread.title}
                        </button>
                      </h3>

                      <p className="text-sm text-slate-600 line-clamp-2">{thread.body}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={() => toggleUpvote(thread.id)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono-tabular font-semibold rounded-xl border transition-colors cursor-pointer ${
                          upvoted
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{thread.upvotes}</span>
                      </button>

                      <button
                        onClick={() => setSelectedThread(thread)}
                        className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors whitespace-nowrap cursor-pointer"
                      >
                        Replies ({thread.replies.length})
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ==================== TAB 5: FREEMIUM PRICING & 1:1 CALL ==================== */}
        {activeTab === 'pricing' && (
          <section className="py-12 md:py-16 max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="text-xs font-semibold text-indigo-600">
                Simple Freemium Membership · 7-Day Free Trial
              </div>
              <h1 className="font-display text-3xl sm:text-5xl font-bold text-slate-900">
                Unlock Premium Remote Jobs & 1:1 Career Advisory
              </h1>
              <p className="text-sm sm:text-base text-slate-600">
                Start with a 7-day free trial on either plan. Upgrade to Yearly for a private 1:1
                consulting call on remote career transition, salary negotiation, or async workflows.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {/* Plan 1: Free */}
              <div className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col justify-between space-y-8">
                <div className="space-y-4">
                  <div className="text-xs font-semibold text-slate-500">Free Tier</div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono-tabular text-4xl font-bold text-slate-900">$0</span>
                    <span className="text-xs text-slate-500">/ forever</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    Great for staying informed with our weekly newsletter and browsing standard job
                    listings.
                  </p>
                  <ul className="pt-4 border-t border-slate-100 space-y-3 text-sm text-slate-700">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Free Weekly Remote Work Newsletter</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Standard Open Job Listings</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Distributed Tools Directory</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Community Discussion Forum</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => navigateTo('home')}
                  className="w-full py-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  {currentPlan === 'free' ? 'Current Plan' : 'Included in Pro'}
                </button>
              </div>

              {/* Plan 2: Monthly ($9/month with 7-day free trial) */}
              <div className="bg-white border-2 border-indigo-200 rounded-2xl p-8 flex flex-col justify-between space-y-8 shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-indigo-600">Monthly Pro</span>
                    <span className="font-mono-tabular font-semibold text-emerald-700">
                      7-Day Free Trial
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono-tabular text-4xl font-bold text-slate-900">$9</span>
                    <span className="text-xs text-slate-500">/ month after 7-day trial</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    Full month-to-month access to premium job listings and exclusive remote work
                    templates.
                  </p>
                  <ul className="pt-4 border-t border-slate-100 space-y-3 text-sm text-slate-700">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>
                        <strong>7-day free trial</strong> ($0 today, cancel anytime)
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>
                        <strong>All Premium Job Listings</strong> + Direct Hiring Manager Emails
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>
                        <strong>Exclusive Remote Work Resources</strong> & Notion Templates
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>Global Salary Negotiation Scripts</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => openTrialModal('monthly')}
                  className="w-full py-3 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors cursor-pointer"
                >
                  {currentPlan === 'monthly'
                    ? 'Active Plan (Monthly Trial)'
                    : 'Start 7-Day Free Trial ($9/mo)'}
                </button>
              </div>

              {/* Plan 3: Yearly ($99/year with 7-day free trial + 1:1 Consulting Call) */}
              <div className="bg-gradient-to-b from-indigo-950 to-slate-900 text-white rounded-2xl p-8 flex flex-col justify-between space-y-8 shadow-xl border border-indigo-500/40">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-amber-300">Yearly Pro + 1:1 Call</span>
                    <span className="font-mono-tabular text-indigo-200">
                      7-Day Free Trial · Best Value
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-mono-tabular text-4xl font-bold text-white">$99</span>
                    <span className="text-xs text-indigo-200">/ year after 7-day trial</span>
                  </div>
                  <p className="text-sm text-indigo-100">
                    Everything in Monthly Pro plus a private 1:1 consulting call with a remote
                    career and async operations advisor.
                  </p>
                  <ul className="pt-4 border-t border-indigo-800/80 space-y-3 text-sm text-indigo-50">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>
                        <strong>Includes 1:1 Consulting Call</strong> (45-min strategy session)
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>
                        <strong>7-day free trial</strong> included before annual billing
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>All Premium Job Listings & Direct Hiring Contacts</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>All Exclusive Playbooks, RFC Kits & Resume Review</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={() => openTrialModal('yearly')}
                    className="w-full py-3.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer"
                  >
                    {currentPlan === 'yearly'
                      ? 'Yearly Trial Active'
                      : 'Start 7-Day Free Trial ($99/yr + 1:1 Call)'}
                  </button>
                  {currentPlan === 'yearly' && (
                    <button
                      onClick={() => setConsultingModalOpen(true)}
                      className="w-full py-2.5 text-xs font-semibold text-white border border-indigo-400/50 hover:bg-indigo-900 rounded-xl transition-colors cursor-pointer"
                    >
                      {bookedCall
                        ? `1:1 Call Scheduled: ${bookedCall.date} (${bookedCall.time})`
                        : 'Schedule Your 1:1 Consulting Call'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* SIMPLE CLEAN FOOTER */}
      <footer className="bg-white border-t border-slate-200/80 py-10 mt-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-lg font-bold text-indigo-600">Workwide</span>
            <span className="text-xs text-slate-500">
              Remote Work Life · Jobs, Productivity & Community
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-600">
            <button onClick={() => navigateTo('home')} className="hover:text-indigo-600 cursor-pointer">
              Home
            </button>
            <button onClick={() => navigateTo('jobs')} className="hover:text-indigo-600 cursor-pointer">
              Jobs
            </button>
            <button onClick={() => navigateTo('tips')} className="hover:text-indigo-600 cursor-pointer">
              Productivity
            </button>
            <button onClick={() => navigateTo('community')} className="hover:text-indigo-600 cursor-pointer">
              Community
            </button>
            <button onClick={() => navigateTo('pricing')} className="hover:text-indigo-600 cursor-pointer">
              Pricing ($9/mo · $99/yr)
            </button>
          </div>
        </div>
      </footer>

      {/* ==================== MODALS ==================== */}

      {/* 1. 7-Day Free Trial Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-semibold text-indigo-600">7-Day Free Trial</div>
                <h3 className="font-display text-2xl font-bold text-slate-900 mt-0.5">
                  Unlock Workwide Pro
                </h3>
              </div>
              <button
                onClick={() => setCheckoutModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setCheckoutTargetPlan('monthly')}
                className={`p-3 text-left rounded-lg transition-colors cursor-pointer ${
                  checkoutTargetPlan === 'monthly'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600'
                }`}
              >
                <div className="text-xs font-semibold">Monthly</div>
                <div className="font-mono-tabular text-base font-bold">$9/mo</div>
                <div className="text-[11px] text-slate-500">7-day free trial</div>
              </button>

              <button
                type="button"
                onClick={() => setCheckoutTargetPlan('yearly')}
                className={`p-3 text-left rounded-lg transition-colors cursor-pointer ${
                  checkoutTargetPlan === 'yearly'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600'
                }`}
              >
                <div className="text-xs font-semibold">Yearly + 1:1 Call</div>
                <div className="font-mono-tabular text-base font-bold">$99/yr</div>
                <div
                  className={`text-[11px] ${
                    checkoutTargetPlan === 'yearly' ? 'text-indigo-100' : 'text-slate-500'
                  }`}
                >
                  7-day trial + 1:1 call
                </div>
              </button>
            </div>

            <form onSubmit={handleActivateTrial} className="space-y-4" noValidate>
              <div>
                <label className="text-xs font-semibold text-slate-700">Your Name</label>
                <input
                  type="text"
                  value={checkoutName}
                  onChange={(e) => setCheckoutName(e.target.value)}
                  placeholder="Jordan Lee"
                  className="w-full mt-1 px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700">Email Address</label>
                <input
                  type="email"
                  value={checkoutEmail}
                  onChange={(e) => setCheckoutEmail(e.target.value)}
                  placeholder="jordan@example.com"
                  className="w-full mt-1 px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs space-y-1">
                <div className="flex justify-between font-semibold text-slate-900">
                  <span>Due today (7-day free trial)</span>
                  <span className="font-mono-tabular">$0.00</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>After 7 days</span>
                  <span className="font-mono-tabular">
                    {checkoutTargetPlan === 'yearly'
                      ? '$99/year (includes 1:1 call)'
                      : '$9/month'}
                  </span>
                </div>
              </div>

              {checkoutError && (
                <p className="text-xs text-red-600 font-medium">{checkoutError}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors cursor-pointer"
              >
                Start My 7-Day Free Trial
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. 1:1 Consulting Call Booking Modal ($99/yr Benefit) */}
      {consultingModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-semibold text-emerald-600">
                  Included with Yearly Plan ($99/yr)
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-900 mt-0.5">
                  Book Your 1:1 Consulting Call
                </h3>
              </div>
              <button
                onClick={() => setConsultingModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBookCall} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">Session Topic</label>
                <select
                  value={consultingTopic}
                  onChange={(e) => setConsultingTopic(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl"
                >
                  <option value="Remote Career & Salary Strategy">
                    Remote Career & Salary Strategy
                  </option>
                  <option value="Async Team Workflows & Tooling">
                    Async Team Workflows & Tooling
                  </option>
                  <option value="Resume & Portfolio Review">Resume & Portfolio Review</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700">Date</label>
                  <input
                    type="date"
                    value={consultingDate}
                    onChange={(e) => setConsultingDate(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-xs font-mono-tabular border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Time (UTC)</label>
                  <select
                    value={consultingTime}
                    onChange={(e) => setConsultingTime(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-xs font-mono-tabular border border-slate-300 rounded-xl"
                  >
                    <option value="10:00 UTC">10:00 UTC</option>
                    <option value="15:00 UTC">15:00 UTC</option>
                    <option value="18:00 UTC">18:00 UTC</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors cursor-pointer"
              >
                Confirm 1:1 Consulting Call
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. Job Details & Apply Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-indigo-600">
                  {selectedJob.company} · {selectedJob.timezone}
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-900 mt-0.5">
                  {selectedJob.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
              <span className="font-mono-tabular font-bold text-slate-900">
                {selectedJob.salaryRange}
              </span>
              <span className="text-slate-600">{selectedJob.stipendDetails}</span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">{selectedJob.summary}</p>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-900">Key Responsibilities</div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {selectedJob.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {selectedJob.directContactEmail && isMember && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900">
                <strong>Direct Hiring Manager Contact:</strong> {selectedJob.directContactEmail}
              </div>
            )}

            <button
              onClick={() => {
                if (!appliedJobs.includes(selectedJob.id)) {
                  setAppliedJobs([...appliedJobs, selectedJob.id]);
                }
              }}
              className="w-full py-3 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors cursor-pointer"
            >
              {appliedJobs.includes(selectedJob.id)
                ? '✓ Application Submitted'
                : 'Submit Application'}
            </button>
          </div>
        </div>
      )}

      {/* 4. Tool Setup Tip Modal */}
      {selectedTool && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-semibold text-indigo-600">{selectedTool.category}</div>
                <h3 className="font-display text-2xl font-bold text-slate-900 mt-0.5">
                  {selectedTool.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTool(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">{selectedTool.description}</p>

            <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-xl space-y-1 text-xs">
              <div className="font-semibold text-indigo-950">Recommended Async Team Ritual</div>
              <p className="text-slate-700 leading-relaxed">{selectedTool.asyncWorkflowTip}</p>
            </div>

            <button
              onClick={() => setSelectedTool(null)}
              className="w-full py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* 5. Productivity Guide Reader Modal */}
      {selectedResource && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[88vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-indigo-600">
                  {selectedResource.category} · {selectedResource.readTime}
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-900 mt-1">
                  {selectedResource.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedResource(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
              {selectedResource.fullContent.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {selectedResource.templateSnippet && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-900">Copyable Template</span>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(selectedResource.templateSnippet!);
                      setCopiedId(selectedResource.id);
                      setTimeout(() => setCopiedId(null), 2000);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-lg cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedId === selectedResource.id ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono-tabular overflow-x-auto">
                  {selectedResource.templateSnippet}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. Community Thread Discussion Modal */}
      {selectedThread && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[88vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-emerald-700">
                  {selectedThread.category} · Posted by {selectedThread.author}
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  {selectedThread.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedThread(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">{selectedThread.body}</p>

            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="text-xs font-semibold text-slate-500">
                Replies ({selectedThread.replies.length})
              </div>
              {selectedThread.replies.map((rep) => (
                <div key={rep.id} className="p-3.5 bg-slate-50 rounded-xl space-y-1">
                  <div className="text-xs font-semibold text-slate-900">
                    {rep.author}{' '}
                    <span className="font-normal text-slate-500">· {rep.timestamp}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700">{rep.content}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddReply} className="space-y-3 pt-2">
              <textarea
                rows={2}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a helpful reply..."
                className="w-full p-3 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600"
              />
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl cursor-pointer"
              >
                Post Reply
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 7. Post a Job Modal */}
      {postJobOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-bold text-slate-900">Post a Remote Job</h3>
              <button onClick={() => setPostJobOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handlePostJob} className="space-y-3">
              <input
                type="text"
                required
                value={newJobTitle}
                onChange={(e) => setNewJobTitle(e.target.value)}
                placeholder="Job Title (e.g. Senior Frontend Engineer)"
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl"
              />
              <input
                type="text"
                required
                value={newJobCompany}
                onChange={(e) => setNewJobCompany(e.target.value)}
                placeholder="Company Name"
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl"
              />
              <input
                type="text"
                value={newJobSalary}
                onChange={(e) => setNewJobSalary(e.target.value)}
                placeholder="Salary Range"
                className="w-full px-3.5 py-2.5 text-sm font-mono-tabular border border-slate-300 rounded-xl"
              />
              <select
                value={newJobCategory}
                onChange={(e) => setNewJobCategory(e.target.value as JobListing['category'])}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl"
              >
                <option value="Engineering">Engineering</option>
                <option value="Product & Design">Product & Design</option>
                <option value="Operations & People">Operations & People</option>
                <option value="Growth & Editorial">Growth & Editorial</option>
              </select>
              <button
                type="submit"
                className="w-full py-3 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl cursor-pointer"
              >
                Publish Job Listing
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 8. New Community Thread Modal */}
      {newThreadOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-bold text-slate-900">
                Start a New Discussion
              </h3>
              <button onClick={() => setNewThreadOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateThread} className="space-y-3">
              <input
                type="text"
                value={newThreadAuthor}
                onChange={(e) => setNewThreadAuthor(e.target.value)}
                placeholder="Your Name"
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl"
              />
              <input
                type="text"
                required
                value={newThreadTitle}
                onChange={(e) => setNewThreadTitle(e.target.value)}
                placeholder="Discussion Topic / Question"
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl"
              />
              <textarea
                rows={3}
                required
                value={newThreadBody}
                onChange={(e) => setNewThreadBody(e.target.value)}
                placeholder="Share details or ask the community..."
                className="w-full p-3 text-sm border border-slate-300 rounded-xl"
              />
              <button
                type="submit"
                className="w-full py-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl cursor-pointer"
              >
                Post Discussion
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
