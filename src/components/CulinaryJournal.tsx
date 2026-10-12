import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Sparkles, Flame, Clock } from 'lucide-react';

interface TechniqueGuide {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  fullContent: string[];
  keyRules: string[];
}

const GUIDES: TechniqueGuide[] = [
  {
    id: 'emulsion-mantecatura',
    title: 'The Art of the Mantecatura: Silk Without Cream',
    category: 'Pasta & Risotto Technique',
    readTime: '4 min read',
    summary: 'Why traditional Roman pastas and Northern Italian risottos rely on starchy emulsion science rather than heavy dairy creams.',
    keyRules: [
      'Take the skillet completely off the flame before adding yolks or cold butter.',
      'Always reserve 1/2 cup of cloudy, high-starch pasta water.',
      'Vigorous physical tossing creates mechanical emulsification between lipid and liquid.'
    ],
    fullContent: [
      'In authentic Italian culinary tradition, neither Carbonara nor Cacio e Pepe nor Risotto alla Milanese ever touches heavy cream. Instead, the velvety sheen is achieved through a physical emulsion of starch and fat.',
      'When pasta boils, starch granules gelatinize and leach into the water. By scooping this hot, cloudy starchy water into rendered pork fat or butter off the direct flame, the amylose polymers act as natural emulsifiers, bonding fat molecules and water into a glossy, clingy suspension.',
      'If the pan remains on direct burner heat above 68°C (155°F), egg yolks will coagulate into scrambled eggs. Removing the pan and beating rapidly preserves the yolks as a silky custard that evenly glazes every ribbon of pasta.'
    ]
  },
  {
    id: 'crust-lamination',
    title: 'Rough-Puff Lamination: Temperature & Butter Pockets',
    category: 'Artisan Baking',
    readTime: '3 min read',
    summary: 'The thermodynamic physics behind shatteringly flaky galettes and freeform fruit tarts.',
    keyRules: [
      'Keep European high-fat butter (82%+) at 4°C right until folding.',
      'Leave visible pea-to-nickel sized chunks of unblended butter in the flour.',
      'Chill the folded pastry 10 minutes immediately prior to baking at 200°C.'
    ],
    fullContent: [
      'The difference between a crumbly shortbread crust and a flaky, layered galette is how the fat is distributed. In pie doughs and rough-puff pastry, you must avoid overworking the butter into the flour.',
      'When cold pockets of butter hit a 200°C (400°F) oven, the water content trapped inside the butter rapidly converts to steam. This steam expands with force, pushing the delicate flour sheets apart before the fat melts to coat the dough.',
      'This explosive vaporization creates hundreds of microscopic hollow air chambers that collapse into delicate, crisp flakes when bitten.'
    ]
  },
  {
    id: 'umami-caramelization',
    title: 'Lacquered Fish: Controlling Sugars in Miso Glazes',
    category: 'Japanese Gastronomy',
    readTime: '3 min read',
    summary: 'How to achieve a glossy caramelized glaze on wild salmon without scorching delicate fermented proteins.',
    keyRules: [
      'Pre-boil sake and mirin for 45 seconds to vaporize harsh raw alcohol.',
      'Wipe excess marinade from the fish before searing the skin side.',
      'Apply fresh glaze strictly during the final 90 seconds under the broiler.'
    ],
    fullContent: [
      'Saikyo miso glaze is one of the pillars of Kyoto cuisine. Sweet white miso is packed with koji enzymes and natural sugars that caramelize rapidly at high temperatures.',
      'Because sugar burns quickly, roasting raw miso directly under high heat often creates a bitter scorched crust before the center of the salmon reaches the ideal 52°C (125°F) medium-rare flakiness.',
      'The master chef technique is two-phased: sear the dry skin-side in cast iron to achieve crispness, then spoon fresh lustrous glaze over the flesh and finish with a brief high-temperature broil for that glassy, bubbling caramel lacquer.'
    ]
  }
];

export const CulinaryJournal: React.FC = () => {
  const [expandedGuideId, setExpandedGuideId] = useState<string | null>(null);

  const toggleGuide = (id: string) => {
    setExpandedGuideId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="border-t border-[#E7E0D8] bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#F5EFEB]">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#9A3412]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>L’Atelier Gazette</span>
              <span aria-hidden="true">·</span>
              <span>Culinary Science & Technique</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
              Masterclass Technique Notes
            </h2>
            <p className="text-sm text-[#78716C]">
              Essential culinary principles that elevate home cooking into gastronomy.
            </p>
          </div>

          <div className="text-xs text-[#78716C] flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#9A3412]" />
            <span>3 Essential Essays</span>
          </div>
        </div>

        {/* Guides Accordion Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {GUIDES.map((guide) => {
            const isExpanded = expandedGuideId === guide.id;

            return (
              <article
                key={guide.id}
                className={`p-6 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                  isExpanded
                    ? 'bg-[#FAF7F2] border-[#C26D38] shadow-sm'
                    : 'bg-white border-[#E7E0D8] hover:border-[#D6D3D1] hover:shadow-2xs'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-[#9A3412]">
                    <span>{guide.category}</span>
                    <span className="text-[#A8A29E] font-normal flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {guide.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#1C1917] leading-snug">
                    {guide.title}
                  </h3>

                  <p className="text-xs text-[#57534E] leading-relaxed">
                    {guide.summary}
                  </p>

                  {/* Expanded Body */}
                  {isExpanded && (
                    <div className="pt-4 border-t border-[#E7E0D8] space-y-4 animate-in fade-in duration-300">
                      <div className="space-y-2 text-xs text-[#44403C] leading-relaxed">
                        {guide.fullContent.map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>

                      <div className="p-3.5 bg-white border border-[#E7E0D8] rounded-lg space-y-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#9A3412] flex items-center gap-1.5">
                          <Flame className="w-3.5 h-3.5" />
                          Key Kitchen Rules
                        </span>
                        <ul className="space-y-1.5 text-[11px] text-[#57534E]">
                          {guide.keyRules.map((rule, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#9A3412] font-bold">·</span>
                              <span>{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-[#F5EFEB]">
                  <button
                    onClick={() => toggleGuide(guide.id)}
                    className="w-full flex items-center justify-between text-xs font-semibold text-[#1C1917] hover:text-[#9A3412] transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? 'Collapse Technique' : 'Read Full Guide'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
