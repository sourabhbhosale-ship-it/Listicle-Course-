import React from 'react';
import { CourseSection } from './types';
import {
  HomeIcon,
  SearchIcon,
  PencilSquareIcon,
  TableCellsIcon,
  DocumentTextIcon,
  MicrophoneIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  TrophyIcon,
  CheckCircleIcon,
  XCircleIcon,
  LightBulbIcon,
  ExclamationCircleIcon,
} from './components/Icons';

const iconProps = {
  className: 'w-6 h-6',
};

// Reusable Components for consistent styling
const Highlight: React.FC<{ children?: React.ReactNode, className?: string }> = ({ children, className }) => <span className={`font-semibold text-cyan-400 ${className}`}>{children}</span>;
const Code: React.FC<{ children?: React.ReactNode }> = ({ children }) => <code className="bg-slate-800 text-slate-300 font-mono text-sm px-1.5 py-1 rounded-md">{children}</code>;
const SectionTitle: React.FC<{ children?: React.ReactNode }> = ({ children }) => <h2 className="text-4xl font-bold text-white mb-4 mt-8 pb-2 border-b-2 border-slate-700">{children}</h2>;
const SubSection: React.FC<{ title: string; children?: React.ReactNode, className?: string }> = ({ title, children, className }) => (
  <div className={`mt-8 ${className}`}>
    <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
    <div className="space-y-4 text-slate-300 text-lg leading-relaxed">{children}</div>
  </div>
);
const Tip: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <div className="my-6 p-4 border-l-4 border-cyan-500 bg-slate-800/50 rounded-r-lg flex items-start gap-4">
        <div className="flex-shrink-0 text-cyan-400 pt-1"><LightBulbIcon className="w-6 h-6" /></div>
        <div><p className="font-semibold text-white">Tip:</p><div className="text-slate-300">{children}</div></div>
    </div>
);
const ExampleList: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
    <ul className="space-y-3 my-4">
        {items.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
                <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <span>{item}</span>
            </li>
        ))}
    </ul>
);

const MistakeList: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
    <ul className="space-y-3 my-4">
        {items.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
                <XCircleIcon className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <span>{item}</span>
            </li>
        ))}
    </ul>
);

const InteractiveTable: React.FC<{ data: any[], headers: string[] }> = ({ data, headers }) => (
    <div className="my-6 overflow-x-auto">
        <div className="bg-slate-800/50 rounded-lg p-1 inline-block min-w-full">
            <table className="min-w-full text-sm text-left">
                <thead>
                    <tr className="border-b border-slate-700">
                        {headers.map(header => <th key={header} className="p-3 font-semibold text-white uppercase tracking-wider">{header}</th>)}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-slate-800 transition-colors">
                            {Object.entries(row).map(([key, cell], cellIndex) => (
                                <td key={cellIndex} className={`p-3 ${key === 'product' || key === 'userType' ? 'font-bold text-white' : ''}`}>
                                    {key === 'jump' ? (
                                        <button 
                                            onClick={() => alert("In a live listicle, this would be an anchor link (e.g., <a href=\"#product-review\">) that scrolls the user down to the detailed product review on this page.")}
                                            className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                                        >
                                            {cell as string}
                                        </button>
                                    ) : (
                                        cell as React.ReactNode
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const ContentFlow: React.FC<{ items: string[] }> = ({ items }) => (
    <div className="flex flex-wrap items-center gap-2 md:gap-4 my-4">
        {items.map((item, index) => (
            <React.Fragment key={item}>
                <div className="bg-slate-800 text-white font-semibold rounded-lg px-4 py-2 shadow-md">{item}</div>
                {index < items.length - 1 && <span className="text-cyan-400 font-bold text-2xl">→</span>}
            </React.Fragment>
        ))}
    </div>
);

const ToneConverter: React.FC<{ bad: string, good: string, badTitle?: string, goodTitle?: string }> = ({ bad, good, badTitle, goodTitle }) => (
    <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
            <div className="flex items-start gap-3">
                <XCircleIcon className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                    <p className="font-semibold text-red-400 mb-2">{badTitle || "Incorrect Tone"}</p>
                    <p className="text-slate-300 italic">“{bad}”</p>
                </div>
            </div>
        </div>
        <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
            <div className="flex items-start gap-3">
                <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                    <p className="font-semibold text-green-400 mb-2">{goodTitle || "Correct Tone"}</p>
                    <p className="text-slate-300 italic">“{good}”</p>
                </div>
            </div>
        </div>
    </div>
);

const TwoSentenceParagraph: React.FC<{ children?: React.ReactNode }> = ({ children }) => <div className="p-4 border border-slate-700 bg-slate-800/50 rounded-lg italic">{children}</div>;
const BulletList: React.FC<{items: React.ReactNode[]}> = ({items}) => <ul className="list-disc list-inside space-y-2">{items.map((item, i) => <li key={i}>{item}</li>)}</ul>

export const COURSE_SECTIONS: CourseSection[] = [
  {
    id: 'introduction',
    title: 'Welcome',
    icon: <HomeIcon {...iconProps} />,
    content: (
      <div>
        <SectionTitle>Next-Gen Listicle Writing Course</SectionTitle>
        <p className="text-xl text-slate-400 mb-8">
          Master the art of high-performance listicles with this interactive guide to Semantic SEO.
        </p>
        <div className="bg-slate-800/50 p-6 rounded-lg space-y-4 text-lg">
           <p>
            Welcome, SEO Enthusiast! This is your free launchpad for becoming a pro at writing content that both users and search engines love.
          </p>
          <p>
            The strategies and frameworks in this course were developed by <Highlight>Aditya</Highlight> and <Highlight>Sourabh Bhosale</Highlight>, distilling years of industry experience into actionable steps. Forget outdated tactics—here, you'll learn the science behind content that ranks and converts.
          </p>
          <p>
            Ready to elevate your skills? Let's begin.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'nlp-semantic-writing',
    title: 'NLP & Semantic Writing',
    icon: <LightBulbIcon {...iconProps} />,
    content: (
        <div>
            <SectionTitle>NLP-Friendly and Semantic Writing Approach</SectionTitle>
            <p>Modern SEO is not about tricking algorithms; it's about communicating clearly with them. A semantic writing approach focuses on creating content that is easily understood by both humans and search engine AI (like Google's Natural Language Processing algorithms).</p>
            
            <SubSection title="What is Semantic Writing?">
                <p>Semantic writing is about focusing on <Highlight>topics and entities</Highlight>, not just keywords. An entity is a specific person, place, thing, or concept (e.g., "Family1st GPS Tracker," "Geofencing," "Battery Life").</p>
                <p>Instead of repeating keywords, you build a web of related entities and concepts, creating rich context that helps Google understand your content's expertise and relevance.</p>
            </SubSection>

            <SubSection title="Core Principles for Listicles">
                <ExampleList items={[
                    "Focus on Entities, Not Just Keywords",
                    "Structure Content Logically with Headings",
                    "Use the 2-Sentence Paragraph Rule",
                    "Answer Questions Directly and Clearly"
                ]}/>

                <div className="mt-8 p-6 bg-slate-800/50 rounded-lg">
                    <h4 className="text-xl font-bold text-white mb-2">1. Focus on Entities, Not Keywords</h4>
                    <p>Enrich your content by discussing related concepts and attributes of your main topic. This demonstrates a deep understanding and provides more value than simple keyword repetition.</p>
                    <ToneConverter
                        badTitle="Keyword-Stuffed (Old SEO)"
                        goodTitle="Entity-Rich (Modern SEO)"
                        bad="This best GPS tracker for cars is a great car GPS tracker with top GPS tracker features."
                        good="The Family1st tracker excels in vehicle security by providing instant geofencing alerts and maintaining a long battery life, making it ideal for theft prevention."
                    />
                </div>

                <div className="mt-8 p-6 bg-slate-800/50 rounded-lg">
                    <h4 className="text-xl font-bold text-white mb-2">2. Structure Content Logically</h4>
                    <p>Use a clear hierarchy of headings (<Code>H2</Code>, <Code>H3</Code>, <Code>H4</Code>) to organize your content. Each heading should describe a clear sub-topic. This helps search engines create a structured understanding of your article, which can lead to rich snippets and better rankings.</p>
                </div>
                
                <div className="mt-8 p-6 bg-slate-800/50 rounded-lg">
                    <h4 className="text-xl font-bold text-white mb-2">3. Use the 2-Sentence Paragraph Rule</h4>
                    <p>Short, declarative sentences are easier for NLP models to parse and understand. Each two-sentence paragraph should contain one clear idea. This forces you to be concise and improves readability for users on mobile devices.</p>
                </div>

                <div className="mt-8 p-6 bg-slate-800/50 rounded-lg">
                    <h4 className="text-xl font-bold text-white mb-2">4. Answer Questions Directly</h4>
                    <p>Structure your content to directly answer common user questions. Use headings that are questions (e.g., "How long does the battery last?") and provide a clear, concise answer immediately after. This is key for ranking in "People Also Ask" boxes and for voice search.</p>
                </div>
            </SubSection>

            <Tip>
                Writing semantically means writing for clarity above all else. If a human reader can easily understand the purpose, function, and benefits described, a search engine can too.
            </Tip>
        </div>
    ),
  },
  {
    id: 'title-meta',
    title: 'Title & Meta Description',
    icon: <SearchIcon {...iconProps} />,
    content: (
      <div>
        <SectionTitle>Main Title & Meta Description for Listicles</SectionTitle>
        <SubSection title="Main Title">
          <p>For listicles, the title must always include a <Highlight>number</Highlight>. This helps readers instantly recognize it as a ranked or comparative post and improves click-through rates. The number also signals completeness—users know they'll get a defined list of options.</p>
          <BulletList items={[
            <>Use clear, descriptive, and keyword-rich phrasing.</>,
            <>The title should indicate what's being compared and the time frame (year) for freshness.</>,
            <>For SEO best practices, always capitalize major words and keep them under <Highlight>60 characters</Highlight>.</>,
          ]} />
          <p className="font-semibold text-white mt-6 mb-2">Examples:</p>
          <ExampleList items={[
            "8 Best GPS Trackers for 2025",
            "10 Best ELD Devices for Commercial Drivers in 2025",
            "7 Best Dash Cameras for Fleet Vehicles in 2025",
            "5 Best GPS Trackers for Elderly Safety in 2025"
          ]} />
          <Tip>
            <p>Use the year at the end to indicate updated content and improve ranking potential for time-based searches.</p>
          </Tip>
        </SubSection>
        <SubSection title="Meta Description">
          <p>The meta description for listicles should directly resolve the main query—specifically, identify which product is the best overall and briefly explain why.</p>
          <p>It should be concise, factual, and use natural, human-like phrasing. The goal is to help the reader (and Google) instantly understand the best product in the list and its top advantage.</p>
          <p className="font-semibold text-white mt-6 mb-2">Structure:</p>
           <BulletList items={[
                "Start by mentioning the best overall product or solution.",
                "Explain why it's the best—highlight its top 2–3 strengths.",
                "Conclude with a user-centric benefit such as affordability, reliability, or performance.",
           ]}/>
           <p className="font-semibold text-white mt-6 mb-2">Examples:</p>
            <ExampleList items={[
                <>The <Highlight>Family1st portable GPS tracker</Highlight> is the best overall option in 2025 because it delivers real-time tracking, strong geofencing, and long battery life at a reasonable price.</>,
                <>The <Highlight>Matrack fleet tracker</Highlight> tops our list with its precise tracking, rapid alerts, and affordable monthly subscription—ideal for small business fleets.</>,
                <>The <Highlight>LandAirSea 54</Highlight> ranks as the best magnetic GPS tracker in 2025, offering durable build quality and accurate live updates for dependable vehicle monitoring.</>,
            ]}/>
          <Tip>
            Keep meta descriptions between <Highlight>140 and 160 characters</Highlight> and focus on the best product only—this creates clarity for readers and improves SEO snippet performance.
          </Tip>
        </SubSection>
      </div>
    ),
  },
  {
    id: 'intro-writing',
    title: 'How to Write an Intro',
    icon: <PencilSquareIcon {...iconProps} />,
    content: (
        <div>
            <SectionTitle>How to Write an Introduction (Listicles Only)</SectionTitle>
             <SubSection title="Goal of the Intro">
                <ExampleList items={[
                    "Resolve the main query immediately and name the best overall pick in line 1 or 2.",
                    "Set context in plain English, then hand off to the list.",
                    "Keep it short: 2 sentences per paragraph.",
                ]}/>
            </SubSection>

            <SubSection title="Option A: Three-Paragraph Intro (Recommended)" className="mt-12">
                <div className="space-y-6">
                    <div>
                        <p className="font-bold text-xl text-white">P1 — Answer the query + name the winner</p>
                        <BulletList items={[
                            <>Sentence 1: state the best overall product.</>,
                            <>Sentence 2: give 2–3 concrete reasons (accuracy, alerts, battery, value).</>
                        ]}/>
                        <p className="font-semibold text-white mt-4">Template:</p>
                        <TwoSentenceParagraph>
                            <p>After testing multiple {'{product type}'}, we found {'{Winner}'} to be the best overall for {'{year}'}.</p>
                            <p>It stands out for {'{benefit 1}'}, {'{benefit 2}'}, and {'{benefit 3}'} that matter in daily use.</p>
                        </TwoSentenceParagraph>
                    </div>
                     <div>
                        <p className="font-bold text-xl text-white">P2 — What it is / why it solves the problem</p>
                        <BulletList items={[
                             <>Sentence 1: define the category in one line.</>,
                             <>Sentence 2: add a simple pain/benefit or stat if you have it.</>
                        ]}/>
                        <p className="font-semibold text-white mt-4">Template:</p>
                        <TwoSentenceParagraph>
                            <p>A {'{product type}'} helps {'{primary job in plain words}'}.</p>
                            <p>This makes it useful for {'{audience/use cases}'}, especially when {'{common pain}'} is a concern.</p>
                        </TwoSentenceParagraph>
                    </div>
                    <div>
                        <p className="font-bold text-xl text-white">P3 — Transition to the list</p>
                        <BulletList items={[
                             <>Sentence 1: mention your test scope and the list size.</>,
                             <>Sentence 2: promise what you compare (performance, features, price).</>
                        ]}/>
                        <p className="font-semibold text-white mt-4">Template:</p>
                        <TwoSentenceParagraph>
                            <p>To help you choose quickly, we reviewed the {'{number}'} best {'{product type}'} for {'{year}'}.</p>
                            <p>Below, we compare performance, standout features, and pricing so you can pick confidently.</p>
                        </TwoSentenceParagraph>
                    </div>
                    <div>
                        <p className="font-bold text-xl text-white mt-8">Full Example (GPS Trackers):</p>
                        <TwoSentenceParagraph>
                            <p>After testing multiple GPS trackers, we found Family1st GPS Tracker to be the best overall choice for hidden car GPS tracker due to its precise real-time tracking, instant alerts, and long battery life. These features make it highly reliable for theft prevention and vehicle monitoring, ensuring your car stays protected.</p>
                            <p className="mt-4">A hidden car GPS tracker helps keep your vehicle safe. It can prevent theft and let you track your car anytime for peace of mind.</p>
                            <p className="mt-4">Check out our blog for the 10 best hidden GPS trackers for your cars. We compare features, battery life, and price to help you pick the right one.</p>
                        </TwoSentenceParagraph>
                    </div>
                </div>
            </SubSection>

             <SubSection title="Option B: Key Takeaways Intro (Fast, Scannable)" className="mt-12">
                <p>Start with one short setup sentence, followed by 3–5 bullets.</p>
                <p className="font-semibold text-white mt-4">Template Opener (1 sentence):</p>
                <TwoSentenceParagraph><p>Short on time? Here are the top picks at a glance.</p></TwoSentenceParagraph>
                <p className="font-semibold text-white mt-4">Template Bullets:</p>
                <div className="p-4 border border-slate-700 bg-slate-800/50 rounded-lg">
                    <ul className="list-disc list-inside space-y-2">
                        <li><Highlight>{'{Winner}'}</Highlight> — Best Overall: <Highlight>{'{benefit 1 + benefit 2}'}</Highlight>.</li>
                        <li><Highlight>{'{Product 2}'}</Highlight> — Best for {'{use case}'}: <Highlight>{'{benefit}'}</Highlight>.</li>
                        <li><Highlight>{'{Product 3}'}</Highlight> — Best for {'{use case}'}: <Highlight>{'{benefit}'}</Highlight>.</li>
                    </ul>
                </div>
                <p className="font-semibold text-white mt-4">Example Bullets (GPS):</p>
                 <TwoSentenceParagraph>
                    <p className="font-semibold text-white">Key Takeaways:</p>
                    <ul className="list-disc list-inside space-y-2 mt-2">
                        <li>Family1st takes the top spot as Best Overall because its balance of accuracy, durability, and battery life makes it the most dependable everyday car tracker we tested.</li>
                        <li>LandAirSea 54 proves to be the strongest magnetic option, staying firmly attached under the car while still delivering precise updates on the move.</li>
                        <li>Trak-4 is the clear winner for battery longevity, lasting over a year per charge, which makes it perfect for cars and fleets that need low-maintenance tracking.</li>
                        <li>While most trackers come at a low upfront cost, subscriptions add up fast, so the smartest choice depends on how much real-time data you actually need.</li>
                    </ul>
                </TwoSentenceParagraph>
            </SubSection>
            
            <SubSection title="Style & Compliance Checklist" className="mt-12">
                <ExampleList items={[
                    "Best overall named in the first paragraph.",
                    "Plain language; no hype; 2 sentences per paragraph.",
                    "No specs or prices in the intro (save for table).",
                    "End with a smooth handoff to the list (“we compared … so you can …”).",
                    "Keep bullets one line each if using Key Takeaways.",
                    "Keep it short and mobile-friendly."
                ]}/>
            </SubSection>
        </div>
    ),
  },
  {
    id: 'categorizing-products',
    title: 'Categorizing Products',
    icon: <BookOpenIcon {...iconProps} />,
    content: (
      <div>
        <SectionTitle>Categorizing Products in a Listicle</SectionTitle>
        <SubSection title="Why Categorization Matters">
          <p>When creating a listicle such as “8 Best GPS Trackers in 2025,” remember—not all eight products will truly be “the best” in the same way.</p>
          <p>To make the content authentic, valuable, and SEO-friendly, we must identify one clear <Highlight>"Best Overall"</Highlight> product and then categorize the rest based on their specific strengths or use cases.</p>
          <p className="font-semibold text-white mt-6 mb-2">This approach ensures:</p>
           <BulletList items={[
              <><b>Semantic relevance</b>—each product aligns with a specific user intent (e.g., “Best GPS Tracker for Elderly” targets a unique keyword group).</>,
              <><b>Content diversity</b>—avoids repetition by covering multiple related subtopics under one main theme.</>,
              <><b>User trust</b>—readers feel the review is unbiased and tailored to different needs rather than promoting one brand across all categories.</>,
           ]}/>
        </SubSection>
        <SubSection title="How to Structure Product Categories">
          <BulletList items={[
              "Start by selecting one product as the “Best Overall\" option. This product should offer the most balanced combination of performance, value, and features.",
              "The remaining products should be organized into distinct categories (entities) that highlight their unique advantages or specialized uses.",
              "Each product title (H3) should clearly reflect its category and use case."
          ]}/>
           <p className="font-semibold text-white mt-6 mb-2">Example Breakdown for a Listicle:</p>
           <div className="p-4 border border-slate-700 bg-slate-800/50 rounded-lg">
                <ol className="list-decimal list-inside space-y-2">
                    <li>Family1st GPS Tracker – <Highlight>Best Overall GPS Tracker</Highlight></li>
                    <li>Tracki GPS – <Highlight>Best GPS Tracker for Cars</Highlight></li>
                    <li>LandAirSea 54 – <Highlight>Best Magnetic GPS Tracker</Highlight></li>
                    <li>Matrack Fleet Tracker – <Highlight>Best GPS Tracker for Businesses</Highlight></li>
                    <li>Invoxia Cellular GPS – <Highlight>Best GPS Tracker for Long Battery Life</Highlight></li>
                    <li>AngelSense Tracker – <Highlight>Best GPS Tracker for Elderly Safety</Highlight></li>
                    <li>Jiobit Smart Tag – <Highlight>Best GPS Tracker for Kids</Highlight></li>
                    <li>Amcrest GL300 – <Highlight>Best Hidden GPS Tracker for Vehicles</Highlight></li>
                </ol>
           </div>
           <Tip>
              Choose your categories based on real search queries and user intent (use “People Also Ask\" or related keyword tools). Each product should serve a distinct purpose that still connects back to the main entity—the “Best GPS Trackers in 2025.”
           </Tip>
        </SubSection>
      </div>
    ),
  },
   {
    id: 'comparison-table',
    title: 'Comparison Table',
    icon: <TableCellsIcon {...iconProps} />,
    content: (
      <div>
        <SectionTitle>How to Create a Comparison Table</SectionTitle>
        <p>The comparison table is one of the most important elements in a listicle. It gives readers a quick overview of all products featured and helps them compare essential details at a glance.</p>
        <SubSection title="1. Placement of the Table">
            <p>The comparison table should appear <Highlight>immediately after the introduction</Highlight>. It acts as a bridge between your introduction and the detailed product reviews.</p>
            <p className="font-semibold text-white mt-6 mb-2">Example Flow:</p>
            <ContentFlow items={["Intro", "Comparison Table", '"How We Tested" Section', "Product Descriptions"]} />
        </SubSection>
        <SubSection title="2. Table Structure and Columns">
            <p>Each comparison table must include specific columns that deliver maximum clarity without clutter. Use short, scannable text and maintain visual consistency across all listicles.</p>
             <p className="font-semibold text-white mt-6 mb-2">Mandatory Columns:</p>
             <div className="overflow-x-auto">
                 <table className="min-w-full text-sm border border-slate-700">
                    <thead className="bg-slate-800">
                        <tr>
                            <th className="p-3 border-r border-slate-700">Column</th>
                            <th className="p-3">Description</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        <tr><td className="p-3 border-r border-slate-700 font-semibold text-white">Product Name</td><td className="p-3">Exact name of the product (use bold formatting).</td></tr>
                        <tr><td className="p-3 border-r border-slate-700 font-semibold text-white">Best For</td><td className="p-3">Define what type of user or use-case it suits best.</td></tr>
                        <tr><td className="p-3 border-r border-slate-700 font-semibold text-white">Price</td><td className="p-3">Include the standard purchase price (if possible, with “Starting at”).</td></tr>
                        <tr><td className="p-3 border-r border-slate-700 font-semibold text-white">Monthly Subscription</td><td className="p-3">Mention ongoing monthly costs (if applicable).</td></tr>
                        <tr><td className="p-3 border-r border-slate-700 font-semibold text-white">Key Features</td><td className="p-3">Summarize 2-3 standout features.</td></tr>
                        <tr><td className="p-3 border-r border-slate-700 font-semibold text-white">Rating</td><td className="p-3">Use a 5-star or numerical format (e.g., ⭐ 4.7/5).</td></tr>
                        <tr><td className="p-3 border-r border-slate-700 font-semibold text-white">Buy Now / Learn More (optional)</td><td className="p-3">Include a CTA or link to the product page.</td></tr>
                    </tbody>
                 </table>
             </div>
        </SubSection>
         <SubSection title="3. Formatting Guidelines">
            <ExampleList items={[
                "Keep the table clean and symmetrical — avoid unnecessary rows or large text blocks.",
                "Each column header should be short and descriptive (1–3 words max).",
                "Product names should be bolded.",
                "Do not hyperlink text inside the table unless it's a CTA column (e.g., “Buy Now”).",
                "Align all text left or center for readability.",
                "Use the same color and style for headers across all listicles for brand consistency."
            ]}/>
        </SubSection>
        <SubSection title="4. Example of a Perfect Comparison Table">
            <InteractiveTable 
                headers={["Product", "Best For", "Price", "Monthly Sub", "Key Features", "Jump To Product"]}
                data={[
                    { product: 'Family1st GPS Tracker', bestFor: 'Best Overall', price: '$29.95', sub: '$21.95/mo', features: 'Real-time tracking, Geofencing, Long battery life', jump: 'View Product' },
                    { product: 'LandAirSea 54', bestFor: 'Best Magnetic Tracker', price: '$24.95', sub: '$19.95/mo', features: 'Compact size, Strong magnet, Accurate tracking', jump: 'View Product' },
                    { product: 'Trak-4 GPS', bestFor: 'Best Battery Life', price: '$48.80', sub: '$6.99/mo', features: '12-month battery, Simple setup, Reliable alerts', jump: 'View Product' },
                    { product: 'Matrack Fleet Tracker', bestFor: 'Best for Small Businesses', price: '$50.00', sub: '$14.95/mo', features: 'Fleet dashboard, Driver reports, Instant alerts', jump: 'View Product' },
                    { product: 'Amcrest GL300', bestFor: 'Best Hidden Tracker', price: '$39.99', sub: '$19.99/mo', features: 'Discreet design, Real-time tracking, Easy app', jump: 'View Product' },
                ]}
            />
        </SubSection>
        <SubSection title="5. Optional Short Summary Below the Table">
            <p>You can include a brief 2-sentence summary right below the table to highlight key insights or reinforce your top pick.</p>
            <p className="font-semibold text-white mt-4">Example:</p>
            <TwoSentenceParagraph>
                The Family1st GPS Tracker ranks as our top pick for 2025 due to its unmatched accuracy, fast alerts, and affordability. Trak-4 also stands out for those who prefer minimal maintenance with its one-year battery life.
            </TwoSentenceParagraph>
             <p className="font-semibold text-white mt-4">Example: Quick Summary List</p>
             <div className="p-4 border border-slate-700 bg-slate-800/50 rounded-lg">
                <p className="font-bold text-white mb-2">Best Car GPS Trackers</p>
                <ul className="list-disc list-inside space-y-2">
                    <li><Highlight>Best Overall:</Highlight> FamilyFirst</li>
                    <li><Highlight>Best Magnetic Car Tracker:</Highlight> LandAirSea 54</li>
                    <li><Highlight>Best No Monthly Fee & Affordable Car Tracker:</Highlight> GPSTracker247</li>
                    <li><Highlight>Best Hidden Vehicle Tracker:</Highlight> Amcrest GPS GL300</li>
                    <li><Highlight>Best Car Tracker With Long Battery Life:</Highlight> Trak-4</li>
                </ul>
            </div>
        </SubSection>
      </div>
    ),
  },
  {
    id: 'how-we-tested',
    title: 'How We Tested',
    icon: <ShieldCheckIcon {...iconProps} />,
    content: (
        <div>
            <SectionTitle>How We Tested the Products</SectionTitle>
            <p>The "How We Tested” section builds trust and authority. It helps readers understand that the product rankings are based on real testing and not just generic research. This section also signals to Google that your content demonstrates experience and expertise (E-E-A-T).</p>
            <SubSection title="1. Placement">
                <p>Place this section <Highlight>immediately after the comparison table</Highlight> and before the product descriptions. This creates a logical flow from the summarized data (table) to the detailed insights (reviews).</p>
                <p className="font-semibold text-white mt-6 mb-2">Ideal Flow:</p>
                <ContentFlow items={["Intro", "Comparison Table", "How We Tested", "Product Descriptions"]} />
            </SubSection>
            <SubSection title="2. Structure & Length">
                 <ExampleList items={[
                    "Keep this section short—around 3 paragraphs (6 sentences total).",
                    "Follow the 2-sentence paragraph rule.",
                    "Every paragraph should focus on a different aspect of testing—setup, performance, and real-world results."
                 ]} />
            </SubSection>
            <SubSection title="3. Writing Format">
                <div>
                    <p className="font-bold text-xl text-white">Paragraph 1 – Describe the Testing Setup</p>
                    <p>Explain <Highlight>how</Highlight> the products were tested and under what conditions. Mention the environment, devices used, or any specific parameters that made your comparison fair and consistent.</p>
                    <p className="font-semibold text-white mt-4">Example:</p>
                    <TwoSentenceParagraph>
                        <p>We installed each GPS tracker in a Toyota Camry to test how they performed under identical driving conditions.</p>
                        <p>Using the same vehicle allowed us to measure accuracy, signal strength, and update speed on an equal basis.</p>
                    </TwoSentenceParagraph>
                </div>
                 <div className="mt-6">
                    <p className="font-bold text-xl text-white">Paragraph 2 – Explain the Testing Process</p>
                    <p>Now describe <Highlight>what exactly you tested</Highlight>—such as performance, usability, app experience, and special features.</p>
                    <p className="font-semibold text-white mt-4">Example:</p>
                    <TwoSentenceParagraph>
                        <p>Once installed, we connected each tracker to its respective mobile app using an iPhone 16 Pro to check responsiveness and geofencing accuracy.</p>
                        <p>We recorded how quickly alerts were received, how smooth the app interface felt, and whether tracking updates stayed consistent during movement.</p>
                    </TwoSentenceParagraph>
                </div>
                <div className="mt-6">
                    <p className="font-bold text-xl text-white">Paragraph 3 – Highlight Real-World Insights</p>
                    <p>Conclude with the results or insights that came out of testing. This shows transparency and adds credibility.</p>
                    <p className="font-semibold text-white mt-4">Example:</p>
                    <TwoSentenceParagraph>
                        <p>We drove the car through highways and city streets and parked it overnight to test signal stability and power consumption.</p>
                        <p>This gave us a clear picture of each tracker's battery life, connectivity reliability, and overall tracking precision in real-world conditions.</p>
                    </TwoSentenceParagraph>
                </div>
            </SubSection>
             <SubSection title="4. Tone & Style">
                 <ExampleList items={[
                    "Keep the tone professional yet conversational—like a genuine reviewer explaining their process.",
                    "Avoid marketing words like “amazing,” “unbeatable,” or “best-in-class.”",
                    "Use practical, data-driven terms like “tested,” “measured,” “recorded,” and “observed.”"
                 ]} />
                 <p className="font-semibold text-white mt-4">Example Tone Conversion:</p>
                 <ToneConverter 
                    bad="We loved how amazing the device was."
                    good="We observed that the device delivered consistent results during continuous driving."
                 />
            </SubSection>
        </div>
    ),
  },
  {
    id: 'product-descriptions',
    title: 'Product Descriptions',
    icon: <DocumentTextIcon {...iconProps} />,
    content: (
        <div>
            <SectionTitle>Product Description Section (Main Product Review Area)</SectionTitle>
            <p>The Product Description Section is the core of every listicle. This is where readers find the actual reviews, comparisons, and unique strengths of each product — and where Google identifies entities, context, and topical authority. It must be unique, insightful, and written from a first-person, experience-driven perspective.</p>
            <SubSection title="1. Placement and Hierarchy">
                <p>The product section always starts after the “How We Tested\" part. Your structure should clearly reflect the hierarchy using proper heading levels.</p>
                 <p className="font-semibold text-white mt-4">Example Structure:</p>
                 <div className="p-4 border border-slate-700 bg-slate-800/50 rounded-lg space-y-2">
                    <p><Code>H2:</Code> Main question or section heading (e.g., "What Are the Best GPS Trackers in 2025?")</p>
                    <p><Code>H3:</Code> Product name with unique title (e.g., "Family1st Portable GPS Tracker – Best Overall GPS Tracker")</p>
                    <p><Code>H4s:</Code> Supporting sub-sections (e.g., "Key Features,” “Pros & Cons,” “Why You Should Choose It")</p>
                 </div>
            </SubSection>
            <SubSection title="2. Product Categorization and Differentiation">
                <p>Each product must serve a distinct purpose within the list. Avoid repeating the same focus for multiple products — instead, assign a unique “Best For" entity to every one of them. This demonstrates comprehensive research and helps users with different needs.</p>
                <p className="font-semibold text-white mt-4">Rule:</p>
                <MistakeList items={["Only one product should be labeled as “Best Overall\" per listicle."]} />
            </SubSection>
            <SubSection title="3. Writing Format for Each Product">
                <p>Each product review is built on a simple but powerful structure: three short paragraphs, each containing exactly two sentences. This NLP-friendly format makes the content easy for both users and search engines to understand.</p>
                <div className="mt-6">
                    <p className="font-bold text-xl text-white">Paragraph 1 – Highlight the Core Strength</p>
                    <p>Explain <Highlight>why</Highlight> the product earned its specific category title (e.g., "Best Overall," "Best for Battery"). Focus on the single most important feature or user benefit that makes it unique in this list.</p>
                    <p className="font-semibold text-white mt-4">Example:</p>
                    <TwoSentenceParagraph>
                        <p>The Family1st GPS Tracker stands out as the best overall tracker for 2025 due to its precise real-time tracking and fast alerts.</p>
                        <p>It delivers reliable performance for personal use, business fleets, or teen driver monitoring.</p>
                    </TwoSentenceParagraph>
                </div>
                 <div className="mt-6">
                    <p className="font-bold text-xl text-white">Paragraph 2 – Explain Real-World Performance</p>
                    <p>Describe how it performed during testing or what users can expect in daily use. Use sensory and specific language to demonstrate hands-on experience and build trust.</p>
                    <p className="font-semibold text-white mt-4">Example:</p>
                    <TwoSentenceParagraph>
                        <p>During testing, it provided instant location updates through the mobile app and maintained strong connectivity throughout long drives.</p>
                        <p>The geofencing feature worked flawlessly, sending accurate alerts whenever the vehicle exited the preset zone.</p>
                    </TwoSentenceParagraph>
                </div>
                 <div className="mt-6">
                    <p className="font-bold text-xl text-white">Paragraph 3 – End with Value or Limitation</p>
                    <p>Wrap up with an overall value statement, a minor limitation, or a final takeaway. Mentioning a small drawback makes the review sound balanced, genuine, and trustworthy.</p>
                    <p className="font-semibold text-white mt-4">Example:</p>
                    <TwoSentenceParagraph>
                        <p>The battery lasts up to two weeks per charge, making it low-maintenance and dependable.</p>
                        <p>While it requires a monthly plan, its consistent accuracy makes it a worthwhile investment for peace of mind.</p>
                    </TwoSentenceParagraph>
                </div>
            </SubSection>
             <SubSection title="4. Supporting Sub-Sections (H4s Under Each Product)">
                <p>Each product review must be supported by these key H4 sub-sections. This creates a consistent, skimmable structure that helps readers find information quickly and signals content depth to search engines.</p>
                
                <div className="mt-8 p-6 bg-slate-800/50 border border-slate-700 rounded-lg">
                    <h4 className="text-xl font-bold text-white mb-4">A. Pros & Cons</h4>
                    <p className="mb-4">Keep them short, factual, and symmetrical (3–4 points each). Pros should reinforce the core strength, while cons should be honest but not deal-breakers.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                           <p className="font-semibold text-green-400 mb-2 flex items-center gap-2"><CheckCircleIcon className="w-5 h-5"/> Pros</p>
                           <ul className="list-disc list-inside space-y-1">
                               <li>Real-time tracking with instant alerts</li>
                               <li>Easy-to-use mobile app</li>
                               <li>Long battery life (up to 14 days)</li>
                           </ul>
                        </div>
                        <div>
                           <p className="font-semibold text-amber-400 mb-2 flex items-center gap-2"><ExclamationCircleIcon className="w-5 h-5"/> Cons</p>
                            <ul className="list-disc list-inside space-y-1">
                               <li>Requires monthly subscription</li>
                               <li>Slightly bulkier than some models</li>
                               <li>No international coverage</li>
                           </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-8 p-6 bg-slate-800/50 border border-slate-700 rounded-lg">
                    <h4 className="text-xl font-bold text-white mb-4">B. Key Features & Alerts</h4>
                    <p className="mb-4">List 4–6 major features that define the product’s strengths. Focus on functions and capabilities, not marketing fluff. This is about *what it does*.</p>
                    <p className="font-semibold text-white mt-4">Example:</p>
                    <BulletList items={[
                        "4G LTE real-time tracking with live updates",
                        "Customizable geofencing alerts",
                        "Supports Android and iOS apps",
                        "SOS button and speed alerts",
                        "Two-week rechargeable battery life",
                        "No-contract monthly subscription plan"
                    ]} />
                </div>

                <div className="mt-8 p-6 bg-slate-800/50 border border-slate-700 rounded-lg">
                    <h4 className="text-xl font-bold text-white mb-4">C. Product Information Table</h4>
                    <p className="mb-4">Include a short, consistent table to summarize key specs. This makes technical details easy to compare across products.</p>
                    <p className="font-semibold text-white mt-4">Example:</p>
                    <div className="overflow-x-auto mt-2">
                         <table className="min-w-full text-sm border border-slate-700">
                            <tbody className="divide-y divide-slate-700">
                                <tr><td className="p-3 bg-slate-800 font-semibold text-white w-1/3">Specification</td><td className="p-3 bg-slate-800 font-semibold text-white">Details</td></tr>
                                <tr><td className="p-3">Size</td><td className="p-3">2.75 x 1.8 × 1.1 in</td></tr>
                                <tr><td className="p-3">Weight</td><td className="p-3">3.6 oz</td></tr>
                                <tr><td className="p-3">Battery</td><td className="p-3">2400 mAh Lithium-ion</td></tr>
                                <tr><td className="p-3">Battery Life</td><td className="p-3">Up to 14 days</td></tr>
                                <tr><td className="p-3">App Compatibility</td><td className="p-3">iOS & Android</td></tr>
                                <tr><td className="p-3">Subscription</td><td className="p-3">$21.95/month</td></tr>
                            </tbody>
                         </table>
                     </div>
                </div>

                <div className="mt-8 p-6 bg-slate-800/50 border border-slate-700 rounded-lg">
                    <h4 className="text-xl font-bold text-white mb-4">D. Why You Should Choose It</h4>
                    <p className="mb-4">End each product review with a brief 2-sentence note explaining the <Highlight>real-world benefit</Highlight>. This section connects the product's features to a user's emotional or functional needs, answering the "So what?" question.</p>
                     <p className="font-semibold text-white mt-4">Example:</p>
                     <TwoSentenceParagraph>
                        <p>The Family1st GPS Tracker instantly alerts you when your vehicle moves unexpectedly, offering real peace of mind against theft.</p>
                        <p>It's perfect for anyone who values security, convenience, and consistent performance without complex setup.</p>
                    </TwoSentenceParagraph>
                </div>

            </SubSection>
        </div>
    ),
  },
   {
    id: 'micro-content',
    title: 'Micro Content (Post-Review)',
    icon: <MicrophoneIcon {...iconProps} />,
    content: (
        <div>
            <SectionTitle>Micro Section (Supporting Content After Product Reviews)</SectionTitle>
            <p>The Micro Section appears after the product reviews to provide supporting information. It strengthens topical coverage, improves user dwell time, and builds trust with both readers and search engines by demonstrating comprehensive expertise.</p>
            
            <SubSection title="A. Buying Guide / Things to Consider">
                <p>This section helps users make informed decisions by explaining the important factors to evaluate before choosing a product. It shows you've thought beyond just the products themselves.</p>
                <p className="font-semibold text-white mt-4">Structure:</p>
                <BulletList items={[
                    <>Use an H2 heading like: <Highlight>“Buying Guide: Things to Consider Before Choosing a GPS Tracker”</Highlight></>,
                    "Include 4–6 short sub-points (H3s) explaining what to look for.",
                    "Each sub-point should have a 2-sentence explanation."
                ]}/>
                <h4 className="text-xl font-semibold text-white mt-6 mb-2">Example Buying Guide Points:</h4>
                <div className="space-y-4 p-4 border border-slate-700 bg-slate-800/50 rounded-lg">
                    <p><Highlight>1. Accuracy and Real-Time Updates:</Highlight> Look for a tracker that uses 4G LTE for fast, precise location data. The frequency of updates (e.g., every 30 seconds) is crucial for live monitoring.</p>
                    <p><Highlight>2. Battery Life:</Highlight> Consider the trade-off between battery size and device portability. A longer battery life means less frequent charging, which is vital for hidden or long-term placements.</p>
                    <p><Highlight>3. Geofencing and Alerts:</Highlight> A good tracker lets you set up virtual boundaries and sends instant alerts for events like speeding, entry/exit from a zone, or low battery.</p>
                    <p><Highlight>4. Subscription Costs:</Highlight> Most trackers require a monthly fee for cellular service. Compare plans to find one that offers the best value for your required update frequency and features.</p>
                </div>
            </SubSection>
            
            <SubSection title="B. Who Needs Which Tracker">
                 <p>This section connects different user personas to the right products from your list, demonstrating relevance and personalization.</p>
                <p className="font-semibold text-white mt-4">Structure:</p>
                <BulletList items={[
                    <>Use an H2 heading: <Highlight>“Who Needs Which GPS Tracker?”</Highlight></>,
                    "Create a simple table or bullet list mapping each product to a user group."
                ]}/>
                <h4 className="text-xl font-semibold text-white mt-6 mb-2">Example Table:</h4>
                <InteractiveTable 
                    headers={["User Type", "Recommended Product", "Key Reason"]}
                    data={[
                        { userType: 'Parents of Teen Drivers', product: 'Family1st GPS', reason: 'Provides speed alerts and geofencing for safety monitoring.' },
                        { userType: 'Fleet Managers', product: 'Matrack Fleet Tracker', reason: 'Offers a central dashboard for tracking multiple vehicles and driver behavior.' },
                        { userType: 'Vehicle Owners (Anti-Theft)', product: 'LandAirSea 54', reason: 'Its strong magnet and compact size make it perfect for discreet placement.' },
                    ]}
                />
            </SubSection>

            <SubSection title="C. FAQs">
                 <p>The FAQ section targets long-tail search queries and addresses common reader doubts. Each FAQ must directly answer the question in 2-3 sentences — no fluff.</p>
                <p className="font-semibold text-white mt-4">Structure:</p>
                <BulletList items={[
                    <>Use an H2 heading: <Highlight>“FAQs About GPS Trackers”</Highlight></>,
                    "Write 4–6 FAQs related to the main topic, using questions people actually search for."
                ]}/>
                <h4 className="text-xl font-semibold text-white mt-6 mb-2">Example FAQs:</h4>
                <div className="space-y-4 p-4 border border-slate-700 bg-slate-800/50 rounded-lg">
                    <div>
                        <p className="font-semibold text-white">Do all GPS trackers require a subscription?</p>
                        <p>Yes, nearly all real-time GPS trackers require a subscription to pay for the cellular data used to transmit location information. Some trackers offer plans with different update frequencies to control costs.</p>
                    </div>
                    <div>
                        <p className="font-semibold text-white">How accurate are GPS trackers for cars?</p>
                        <p>Modern 4G GPS trackers are highly accurate, typically locating a vehicle within 5 to 10 feet. Accuracy can be affected by signal obstructions like underground garages or dense urban areas.</p>
                    </div>
                     <div>
                        <p className="font-semibold text-white">Can I install a GPS tracker myself?</p>
                        <p>Absolutely. Most consumer GPS trackers are designed for easy installation, often plugging into the OBD-II port or attaching via a built-in magnet. No professional wiring is usually needed.</p>
                    </div>
                </div>
            </SubSection>

            <SubSection title="D. Why Trust Us">
                 <p>This section builds credibility and transparency, which is essential for Google's E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) standards.</p>
                <p className="font-semibold text-white mt-4">Structure:</p>
                <BulletList items={[
                    <>Use an H2 heading: <Highlight>“Why Trust Our Recommendations”</Highlight></>,
                    "Write 3 paragraphs (2 sentences each) explaining your testing process, expertise, and objectivity."
                ]}/>
                 <h4 className="text-xl font-semibold text-white mt-6 mb-2">Example "Why Trust Us" Section:</h4>
                 <TwoSentenceParagraph>
                    <p>Our team spent over 40 hours testing these GPS trackers in real-world driving scenarios, from city streets to highways. We evaluated each device on the same vehicle to ensure a fair comparison of signal strength and accuracy.</p>
                    <p className='mt-4'>We focused on the features that matter most to users: ease of setup, app responsiveness, alert speed, and battery endurance. Our rankings are based on performance data, not marketing claims.</p>
                    <p className='mt-4'>We are not sponsored by any of these brands, and our goal is to provide unbiased, hands-on insights. This helps you choose the right tracker for your specific needs and budget.</p>
                 </TwoSentenceParagraph>
            </SubSection>

            <SubSection title="E. Final Verdict">
                 <p>The final verdict provides a clear conclusion. It summarizes your findings, reinforces the top product choice, and leaves the reader with a confident takeaway.</p>
                 <p className="font-semibold text-white mt-4">Structure:</p>
                <BulletList items={[
                    <>Use an H2 heading: <Highlight>“Final Verdict”</Highlight></>,
                    "Keep it short — 2-3 sentences total.",
                    "Restate the top pick and the primary reason it won."
                ]}/>
                 <h4 className="text-xl font-semibold text-white mt-6 mb-2">Example "Final Verdict":</h4>
                 <TwoSentenceParagraph>
                    After extensive testing, the <Highlight>Family1st GPS Tracker</Highlight> remains our top recommendation for 2025 because it offers the best combination of real-time accuracy, reliable alerts, and long battery life. While other trackers excel in specific areas like battery or size, Family1st delivers the most consistent and well-rounded performance for everyday use.
                 </TwoSentenceParagraph>
            </SubSection>
        </div>
    ),
  },
  {
    id: 'quiz',
    title: 'Test Your Knowledge',
    icon: <TrophyIcon {...iconProps} />,
    content: (
        <div>
            <SectionTitle>Ready for the Test?</SectionTitle>
            <div className="bg-slate-800/50 p-6 rounded-lg text-center">
                <p className="text-lg text-slate-300">
                    This is the final step to complete your course. When you're ready, you'll be asked for your name and date of birth to generate your personalized certificate.
                </p>
            </div>
        </div>
    ),
  },
];