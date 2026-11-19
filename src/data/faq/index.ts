// Generated from the client's VOI_FAQ_60_Questions_English_Arabic.docx.
// Keep section order and question numbers as in the brief.

export type FaqLinkKind = "guide" | "service" | "contact";

export interface FaqItem {
  n: number;
  q: { en: string; ar: string };
  a: { en: string; ar: string };
  link: { kind: FaqLinkKind; href: string };
}

export interface FaqSection {
  id: string;
  title: { en: string; ar: string };
  items: FaqItem[];
}

export const FAQ_SECTIONS: FaqSection[] = [
  {
    id: "living",
    title: { en: "Living in Istanbul", ar: "الحياة في إسطنبول" },
    items: [
      {
        n: 1,
        q: { en: "Why do foreigners choose Istanbul as a place to live?", ar: "لماذا يختار الأجانب إسطنبول للعيش؟" },
        a: { en: "Istanbul offers a unique combination of history, modern living, international connections, diverse neighborhoods and a wide range of lifestyle options.", ar: "تجمع إسطنبول بين التاريخ والحياة العصرية والاتصال الدولي وتنوع المناطق والخيارات المعيشية." },
        link: { kind: "guide", href: "/blog/living-in-istanbul-as-a-foreigner" },
      },
      {
        n: 2,
        q: { en: "Is Istanbul suitable for long-term living?", ar: "هل إسطنبول مناسبة للاستقرار طويل الأمد؟" },
        a: { en: "Yes. The city offers established residential communities, healthcare, education, shopping and transportation options for different lifestyles and budgets.", ar: "نعم، فهي توفر أحياء سكنية ومرافق صحية وتعليمية وتجارية وشبكات مواصلات تناسب أنماط حياة وميزانيات مختلفة." },
        link: { kind: "guide", href: "/blog/living-in-istanbul-as-a-foreigner" },
      },
      {
        n: 3,
        q: { en: "Which side of Istanbul is better for living, European or Asian?", ar: "أيهما أفضل للسكن: الجانب الأوروبي أم الآسيوي؟" },
        a: { en: "Both sides offer distinct advantages. The European side has major business and commercial centers, while the Asian side is known for its residential atmosphere and coastal neighborhoods.", ar: "لكل جانب ميزاته؛ فالجانب الأوروبي يضم مراكز أعمال وتجارية مهمة، بينما يشتهر الجانب الآسيوي بأجوائه السكنية وأحيائه الساحلية." },
        link: { kind: "guide", href: "/blog/european-vs-asian-side-istanbul" },
      },
      {
        n: 4,
        q: { en: "What are the best areas for families in Istanbul?", ar: "ما أفضل المناطق العائلية في إسطنبول؟" },
        a: { en: "Areas such as Üsküdar, Ataşehir, Başakşehir, Beylikdüzü and certain parts of Sarıyer offer different family-friendly housing options.", ar: "توفر مناطق مثل أوسكودار وأتاشهير وباشاك شهير وبيليك دوزو وبعض أجزاء ساريير خيارات سكنية متنوعة للعائلات." },
        link: { kind: "guide", href: "/blog/best-areas-in-istanbul-for-families" },
      },
      {
        n: 5,
        q: { en: "Can foreigners live comfortably in Istanbul without speaking Turkish?", ar: "هل يستطيع الأجنبي العيش في إسطنبول دون التحدث بالتركية؟" },
        a: { en: "Yes. English and Arabic are spoken in many international communities and businesses, although learning Turkish makes everyday life much easier.", ar: "نعم، فالإنجليزية والعربية مستخدمتان في كثير من الأماكن والأوساط الدولية، لكن تعلم التركية يجعل الحياة اليومية أسهل." },
        link: { kind: "guide", href: "/blog/living-in-istanbul-as-a-foreigner" },
      },
      {
        n: 6,
        q: { en: "What is the average monthly cost of living in Istanbul?", ar: "ما متوسط تكاليف المعيشة الشهرية في إسطنبول؟" },
        a: { en: "Living costs depend on the neighborhood, accommodation, family size and lifestyle. Housing, transportation, food and education are usually the main expenses.", ar: "تختلف التكاليف حسب المنطقة والسكن وعدد أفراد الأسرة ونمط الحياة. ويُعد السكن والمواصلات والطعام والتعليم من أبرز المصاريف." },
        link: { kind: "guide", href: "/blog/living-in-istanbul-as-a-foreigner" },
      },
    ],
  },
  {
    id: "residence",
    title: { en: "Residence and Legal Matters", ar: "الإقامة والشؤون القانونية" },
    items: [
      {
        n: 7,
        q: { en: "Can foreigners obtain a residence permit in Turkey?", ar: "هل يمكن للأجانب الحصول على إقامة في تركيا؟" },
        a: { en: "Yes. Foreigners can apply for different types of residence permits depending on their purpose of stay and eligibility.", ar: "نعم، يمكن للأجانب التقدم لأنواع مختلفة من الإقامات بحسب سبب الإقامة ومدى استيفاء الشروط." },
        link: { kind: "guide", href: "/blog/turkish-residence-permit-through-property" },
      },
      {
        n: 8,
        q: { en: "Does buying a property in Turkey guarantee a residence permit?", ar: "هل شراء عقار في تركيا يضمن الحصول على إقامة؟" },
        a: { en: "No. Property ownership may provide a basis for applying for a residence permit, provided that the property and applicant meet the current legal requirements.", ar: "لا. قد يشكل تملك العقار أساساً للتقدم بطلب إقامة، بشرط استيفاء العقار والمتقدم للمتطلبات القانونية السارية." },
        link: { kind: "guide", href: "/blog/turkish-residence-permit-through-property" },
      },
      {
        n: 9,
        q: { en: "Can I obtain a residence permit by purchasing a second-hand property?", ar: "هل يمكن الحصول على إقامة عند شراء عقار مستعمل؟" },
        a: { en: "Yes, subject to the applicable property value, residential use and other legal requirements.", ar: "قد يكون ذلك ممكناً، وفق قيمة العقار وطبيعة استخدامه وبقية الشروط القانونية المعمول بها." },
        link: { kind: "guide", href: "/blog/turkish-residence-permit-through-property" },
      },
      {
        n: 10,
        q: { en: "Can my family obtain residence permits through my property ownership?", ar: "هل يمكن لأفراد عائلتي الحصول على إقامة من خلال تملكي للعقار؟" },
        a: { en: "Eligible family members may apply under the relevant residence permit provisions, subject to the required documentation and conditions.", ar: "يمكن لأفراد الأسرة المستوفين للشروط التقدم وفق أحكام الإقامة ذات الصلة، مع تقديم الوثائق المطلوبة." },
        link: { kind: "guide", href: "/blog/turkish-residence-permit-through-property" },
      },
      {
        n: 11,
        q: { en: "What is the difference between a residence permit and Turkish citizenship?", ar: "ما الفرق بين الإقامة والجنسية التركية؟" },
        a: { en: "A residence permit allows a foreigner to stay in Turkey for a specified period, while citizenship provides permanent legal membership and Turkish nationality.", ar: "تسمح الإقامة للأجنبي بالبقاء في تركيا لمدة محددة، بينما تمنح الجنسية صفة المواطن التركي وحقوقها والتزاماتها." },
        link: { kind: "guide", href: "/blog/turkish-residence-permit-through-property" },
      },
      {
        n: 12,
        q: { en: "Does a residence permit allow me to work in Turkey?", ar: "هل تسمح الإقامة بالعمل في تركيا؟" },
        a: { en: "No. A residence permit alone does not grant the right to work. A separate work permit is generally required.", ar: "الإقامة وحدها لا تمنح حق العمل؛ إذ يلزم عادةً الحصول على تصريح عمل مستقل." },
        link: { kind: "guide", href: "/blog/turkish-residence-permit-through-property" },
      },
      {
        n: 13,
        q: { en: "Can I purchase property in Turkey without having a residence permit?", ar: "هل يمكنني شراء عقار في تركيا دون امتلاك إقامة؟" },
        a: { en: "Yes. Foreign nationals do not need a residence permit as a precondition for purchasing property in Turkey.", ar: "نعم، لا يُشترط امتلاك إقامة تركية مسبقاً لشراء العقار من قبل الأجانب المؤهلين للتملك." },
        link: { kind: "guide", href: "/blog/turkish-residence-permit-through-property" },
      },
    ],
  },
  {
    id: "buying",
    title: { en: "Buying Property in Turkey", ar: "شراء العقارات في تركيا" },
    items: [
      {
        n: 14,
        q: { en: "Can foreigners legally own property in Turkey?", ar: "هل يحق للأجانب تملك العقارات في تركيا؟" },
        a: { en: "Yes. Foreign nationals from eligible countries can purchase property, subject to ownership restrictions and applicable regulations.", ar: "نعم، يمكن لمواطني الدول المؤهلة شراء العقارات، مع مراعاة قيود التملك والأنظمة المعمول بها." },
        link: { kind: "guide", href: "/blog/how-to-buy-property-in-turkey-as-a-foreigner" },
      },
      {
        n: 15,
        q: { en: "What documents are required to purchase property in Turkey?", ar: "ما الوثائق المطلوبة لشراء عقار في تركيا؟" },
        a: { en: "Generally, buyers need a valid passport, tax identification number and other transaction documents. Additional requirements may apply depending on the property and buyer.", ar: "يحتاج المشتري عادةً إلى جواز سفر ساري ورقم ضريبي ووثائق المعاملة، وقد تُطلب مستندات إضافية بحسب العقار والمشتري." },
        link: { kind: "guide", href: "/blog/how-to-buy-property-in-turkey-as-a-foreigner" },
      },
      {
        n: 16,
        q: { en: "What is a Tapu, and why is it important?", ar: "ما هو الطابو، ولماذا يُعد مهماً؟" },
        a: { en: "Tapu is the official title deed proving property ownership. Legal ownership is transferred through registration at the Land Registry Directorate.", ar: "الطابو هو سند الملكية الرسمي الذي يثبت ملكية العقار، وتُنقل الملكية قانونياً عبر التسجيل في دائرة السجل العقاري." },
        link: { kind: "guide", href: "/blog/tapu-title-deed-turkey-explained" },
      },
      {
        n: 17,
        q: { en: "How long does the property purchasing process take?", ar: "كم تستغرق عملية شراء العقار؟" },
        a: { en: "The process can take a few days or longer, depending on document preparation, payment procedures and Land Registry requirements.", ar: "قد تستغرق العملية بضعة أيام أو أكثر، بحسب تجهيز الوثائق وإجراءات الدفع ومتطلبات دائرة السجل العقاري." },
        link: { kind: "guide", href: "/blog/how-to-buy-property-in-turkey-as-a-foreigner" },
      },
      {
        n: 18,
        q: { en: "Can I purchase a property in Turkey remotely?", ar: "هل يمكنني شراء عقار في تركيا عن بُعد؟" },
        a: { en: "Yes. A purchase can be completed through an authorized representative holding a valid power of attorney, subject to the required procedures.", ar: "نعم، يمكن إتمام الشراء بواسطة وكيل مفوض بموجب وكالة قانونية سارية، وفق الإجراءات المطلوبة." },
        link: { kind: "guide", href: "/blog/how-to-buy-property-in-turkey-as-a-foreigner" },
      },
      {
        n: 19,
        q: { en: "Can foreigners purchase properties under construction?", ar: "هل يمكن للأجانب شراء عقارات قيد الإنشاء؟" },
        a: { en: "Yes. Buyers can purchase off-plan properties, but should carefully review the developer's background, project approvals, contract terms and delivery schedule.", ar: "نعم، لكن ينبغي التحقق من سجل المطور وموافقات المشروع وشروط العقد والجدول المتوقع للتسليم." },
        link: { kind: "guide", href: "/blog/buying-off-plan-property-in-istanbul" },
      },
      {
        n: 20,
        q: { en: "What additional costs should I consider when buying a property?", ar: "ما التكاليف الإضافية التي يجب احتسابها عند شراء عقار؟" },
        a: { en: "Additional costs may include title deed fees, taxes, legal services, valuation and other transaction expenses. The exact amount depends on the purchase.", ar: "قد تشمل رسوم الطابو والضرائب والخدمات القانونية والتقييم ومصاريف المعاملة الأخرى، وتختلف قيمتها بحسب عملية الشراء." },
        link: { kind: "guide", href: "/blog/property-taxes-and-costs-in-turkey" },
      },
      {
        n: 21,
        q: { en: "How can I verify that a property has no legal problems?", ar: "كيف أتأكد من خلو العقار من المشكلات القانونية؟" },
        a: { en: "A proper legal and title deed review can identify mortgages, liens, restrictions and other potential issues before completing the purchase.", ar: "تساعد مراجعة الطابو والوثائق القانونية على كشف الرهون والحجوزات والقيود وأي مشكلات محتملة قبل إتمام الشراء." },
        link: { kind: "guide", href: "/blog/tapu-title-deed-turkey-explained" },
      },
    ],
  },
  {
    id: "citizenship",
    title: { en: "Turkish Citizenship by Investment", ar: "الجنسية التركية عن طريق الاستثمار" },
    items: [
      {
        n: 22,
        q: { en: "Can I obtain Turkish citizenship through property investment?", ar: "هل يمكن الحصول على الجنسية التركية عن طريق الاستثمار العقاري؟" },
        a: { en: "Yes. Foreign investors may qualify for Turkish citizenship by purchasing eligible real estate and fulfilling the applicable investment and legal requirements.", ar: "نعم، قد يتأهل المستثمر الأجنبي للجنسية عبر شراء عقار مستوفٍ للشروط والالتزام بالمتطلبات الاستثمارية والقانونية." },
        link: { kind: "guide", href: "/blog/turkish-citizenship-by-investment-2026" },
      },
      {
        n: 23,
        q: { en: "What is the minimum property investment required for Turkish citizenship?", ar: "ما الحد الأدنى للاستثمار العقاري للحصول على الجنسية التركية؟" },
        a: { en: "The current minimum investment threshold is USD 400,000, subject to official valuation, eligibility and other legal conditions.", ar: "الحد الأدنى المعمول به حالياً هو 400 ألف دولار أمريكي، مع مراعاة التقييم الرسمي وشروط الأهلية والمتطلبات القانونية الأخرى." },
        link: { kind: "guide", href: "/blog/turkish-citizenship-by-investment-2026" },
      },
      {
        n: 24,
        q: { en: "Can I combine multiple properties to meet the citizenship investment requirement?", ar: "هل يمكن جمع قيمة عدة عقارات لاستيفاء شرط الجنسية؟" },
        a: { en: "Yes. Multiple eligible properties may be combined, provided that all legal and valuation requirements are fulfilled.", ar: "نعم، يمكن احتساب عدة عقارات مؤهلة معاً، شريطة استيفاء جميع متطلبات التقييم والإجراءات القانونية." },
        link: { kind: "guide", href: "/blog/turkish-citizenship-by-investment-2026" },
      },
      {
        n: 25,
        q: { en: "Can my spouse and children obtain citizenship with me?", ar: "هل يمكن أن تشمل معاملة الجنسية الزوجة والأطفال؟" },
        a: { en: "Eligible applicants may include their spouse and children under 18 in the citizenship application.", ar: "يمكن أن تشمل المعاملة الزوج أو الزوجة والأطفال دون سن 18 عاماً، وفق شروط الأهلية." },
        link: { kind: "guide", href: "/blog/turkish-citizenship-by-investment-2026" },
      },
      {
        n: 26,
        q: { en: "How long must I keep the property after purchasing it for citizenship?", ar: "كم يجب الاحتفاظ بالعقار بعد شرائه بغرض الحصول على الجنسية؟" },
        a: { en: "The property must generally be held for at least three years, with the required restriction registered on the title deed.", ar: "يجب عادةً الاحتفاظ بالعقار لمدة لا تقل عن ثلاث سنوات، مع تسجيل القيد المطلوب على سند الملكية." },
        link: { kind: "guide", href: "/blog/turkish-citizenship-by-investment-2026" },
      },
      {
        n: 27,
        q: { en: "Do I need to live in Turkey to obtain citizenship through investment?", ar: "هل يجب أن أقيم في تركيا للحصول على الجنسية عن طريق الاستثمار؟" },
        a: { en: "No. Physical residence in Turkey is not generally required under the real estate investment route, provided all other conditions are met.", ar: "لا يُشترط عادةً الإقامة الفعلية في تركيا ضمن مسار الاستثمار العقاري، ما دامت بقية الشروط مستوفاة." },
        link: { kind: "guide", href: "/blog/turkish-citizenship-by-investment-2026" },
      },
      {
        n: 28,
        q: { en: "How long does the citizenship application process take?", ar: "كم تستغرق معاملة الحصول على الجنسية؟" },
        a: { en: "Processing times vary depending on the application, document verification and government procedures. No fixed completion date can be guaranteed.", ar: "تختلف المدة بحسب ملف الطلب والتحقق من الوثائق والإجراءات الحكومية، ولا يمكن ضمان موعد إنجاز ثابت." },
        link: { kind: "guide", href: "/blog/turkish-citizenship-by-investment-2026" },
      },
    ],
  },
  {
    id: "investment",
    title: { en: "Real Estate Investment", ar: "الاستثمار العقاري" },
    items: [
      {
        n: 29,
        q: { en: "Is Istanbul still a good city for real estate investment?", ar: "هل ما زالت إسطنبول مدينة مناسبة للاستثمار العقاري؟" },
        a: { en: "Istanbul remains an important property market due to its population, economic activity and international position. However, investment opportunities should be assessed individually.", ar: "ما زالت إسطنبول سوقاً عقارية مهمة بفضل حجمها السكاني ونشاطها الاقتصادي ومكانتها الدولية، لكن يجب تقييم كل فرصة على حدة." },
        link: { kind: "guide", href: "/blog/investing-in-istanbul-real-estate" },
      },
      {
        n: 30,
        q: { en: "Which areas in Istanbul offer good investment opportunities?", ar: "ما المناطق التي توفر فرصاً استثمارية جيدة في إسطنبول؟" },
        a: { en: "Opportunities vary across the city. Established central districts and developing areas with infrastructure improvements may offer different investment advantages.", ar: "تختلف الفرص بين مناطق المدينة؛ فقد تتميز الأحياء المركزية الراسخة بخصائص معينة، بينما تقدم المناطق النامية فرصاً مرتبطة بتطور البنية التحتية." },
        link: { kind: "guide", href: "/blog/investing-in-istanbul-real-estate" },
      },
      {
        n: 31,
        q: { en: "Is buying an off-plan property a good investment?", ar: "هل شراء عقار قيد الإنشاء خيار استثماري جيد؟" },
        a: { en: "It can offer attractive opportunities, but buyers should consider the developer's reliability, construction progress, payment plan and expected delivery date.", ar: "قد يوفر فرصاً مناسبة، لكن ينبغي دراسة موثوقية المطور وتقدم البناء وخطة الدفع وموعد التسليم المتوقع." },
        link: { kind: "guide", href: "/blog/buying-off-plan-property-in-istanbul" },
      },
      {
        n: 32,
        q: { en: "How can I calculate the rental return on a property?", ar: "كيف يمكن حساب العائد الإيجاري للعقار؟" },
        a: { en: "Rental yield is generally calculated by dividing the annual rental income by the property's purchase price and multiplying by 100.", ar: "يُحسب العائد الإيجاري عادةً بقسمة دخل الإيجار السنوي على سعر شراء العقار ثم ضرب الناتج في 100." },
        link: { kind: "guide", href: "/blog/how-to-calculate-rental-yield" },
      },
      {
        n: 33,
        q: { en: "What factors influence property prices in Istanbul?", ar: "ما العوامل التي تؤثر في أسعار العقارات في إسطنبول؟" },
        a: { en: "Location, transportation, infrastructure, construction quality, amenities, supply and demand all influence property values.", ar: "تؤثر في قيمة العقار عوامل مثل الموقع والمواصلات والبنية التحتية وجودة البناء والخدمات وحركة العرض والطلب." },
        link: { kind: "guide", href: "/blog/investing-in-istanbul-real-estate" },
      },
      {
        n: 34,
        q: { en: "Is it better to invest in residential or commercial property?", ar: "أيهما أفضل للاستثمار: العقارات السكنية أم التجارية؟" },
        a: { en: "Residential properties often attract a wider range of tenants, while commercial properties may offer different rental opportunities and risks. The right choice depends on your investment objectives.", ar: "قد تجذب العقارات السكنية شريحة أوسع من المستأجرين، بينما تقدم العقارات التجارية فرصاً ومخاطر مختلفة. ويتوقف الاختيار على أهداف الاستثمار." },
        link: { kind: "guide", href: "/blog/investing-in-istanbul-real-estate" },
      },
      {
        n: 35,
        q: { en: "How can I choose a property with good resale potential?", ar: "كيف أختار عقاراً يتمتع بفرص جيدة لإعادة البيع؟" },
        a: { en: "Consider location, demand, building quality, accessibility, maintenance costs and the property's competitiveness in the local market.", ar: "ادرس الموقع والطلب وجودة البناء وسهولة الوصول وتكاليف الصيانة ومدى تنافسية العقار في السوق المحلي." },
        link: { kind: "guide", href: "/blog/investing-in-istanbul-real-estate" },
      },
    ],
  },
  {
    id: "renting",
    title: { en: "Renting and Property Management", ar: "التأجير وإدارة العقارات" },
    items: [
      {
        n: 36,
        q: { en: "Can foreigners rent out their properties in Turkey?", ar: "هل يمكن للأجانب تأجير عقاراتهم في تركيا؟" },
        a: { en: "Yes. Foreign property owners can generally rent out their properties, subject to applicable rental and tax regulations.", ar: "نعم، يمكن لمالكي العقارات الأجانب تأجير ممتلكاتهم عموماً، مع الالتزام بأنظمة الإيجار والضرائب ذات الصلة." },
        link: { kind: "guide", href: "/blog/renting-out-your-property-in-turkey" },
      },
      {
        n: 37,
        q: { en: "Can I manage my property remotely from another country?", ar: "هل يمكنني إدارة عقاري عن بُعد من دولة أخرى؟" },
        a: { en: "Yes. Property management services can help coordinate tenants, rent collection, maintenance and other property-related matters.", ar: "نعم، يمكن لخدمات إدارة العقارات متابعة المستأجرين وتحصيل الإيجارات والصيانة وغيرها من الأمور المتعلقة بالعقار." },
        link: { kind: "guide", href: "/blog/renting-out-your-property-in-turkey" },
      },
      {
        n: 38,
        q: { en: "Is furnished or unfurnished rental more profitable?", ar: "أيهما أكثر جدوى: تأجير العقار مفروشاً أم غير مفروش؟" },
        a: { en: "It depends on the location and target tenants. Furnished properties may attract different rental demand, while unfurnished properties often appeal to longer-term residents.", ar: "يعتمد ذلك على الموقع ونوعية المستأجرين المستهدفين. فالمفروش يناسب شرائح معينة، بينما يجذب غير المفروش غالباً الباحثين عن إقامة أطول." },
        link: { kind: "guide", href: "/blog/renting-out-your-property-in-turkey" },
      },
      {
        n: 39,
        q: { en: "What is Aidat in Turkish residential complexes?", ar: "ما المقصود برسوم الـ Aidat في المجمعات السكنية؟" },
        a: { en: "Aidat refers to monthly management fees covering shared facilities, maintenance, security and common-area services.", ar: "هي رسوم الإدارة الشهرية التي تغطي الخدمات المشتركة والصيانة والأمن والعناية بالمناطق والمرافق العامة." },
        link: { kind: "guide", href: "/blog/renting-out-your-property-in-turkey" },
      },
      {
        n: 40,
        q: { en: "Who is responsible for property maintenance and repairs?", ar: "من المسؤول عن صيانة العقار وإصلاح الأعطال؟" },
        a: { en: "Responsibilities depend on the rental agreement and applicable regulations. Generally, landlords handle major structural repairs, while tenants are responsible for ordinary use and care.", ar: "يتحدد ذلك وفق عقد الإيجار والأنظمة المعمول بها. ويتولى المالك عادةً الإصلاحات الأساسية، بينما يتحمل المستأجر مسؤولية الاستخدام والعناية المعتادة." },
        link: { kind: "guide", href: "/blog/renting-out-your-property-in-turkey" },
      },
      {
        n: 41,
        q: { en: "Can I sell my property while it is rented?", ar: "هل يمكنني بيع العقار وهو مؤجر؟" },
        a: { en: "Yes. A rented property can generally be sold, although the existing tenancy agreement and the tenant's legal rights must be considered.", ar: "نعم، يمكن بيع العقار المؤجر عموماً، مع مراعاة عقد الإيجار القائم والحقوق القانونية للمستأجر." },
        link: { kind: "guide", href: "/blog/renting-out-your-property-in-turkey" },
      },
    ],
  },
  {
    id: "taxes",
    title: { en: "Taxes and Financial Matters", ar: "الضرائب والشؤون المالية" },
    items: [
      {
        n: 42,
        q: { en: "Are there additional taxes when purchasing property in Turkey?", ar: "هل توجد ضرائب ورسوم إضافية عند شراء عقار في تركيا؟" },
        a: { en: "Yes. Property purchases involve title deed fees and potentially other taxes or administrative charges, depending on the transaction.", ar: "نعم، تشمل عملية الشراء رسوم الطابو، وقد تترتب عليها ضرائب أو رسوم إدارية أخرى بحسب طبيعة المعاملة." },
        link: { kind: "guide", href: "/blog/property-taxes-and-costs-in-turkey" },
      },
      {
        n: 43,
        q: { en: "Do foreign property owners pay annual property taxes?", ar: "هل يدفع مالك العقار الأجنبي ضريبة عقارية سنوية؟" },
        a: { en: "Yes. Property owners are generally subject to annual real estate tax, with the amount depending on the property's classification and declared value.", ar: "نعم، يخضع مالكو العقارات عموماً لضريبة عقارية سنوية، وتتحدد قيمتها وفق تصنيف العقار وقيمته المعتمدة." },
        link: { kind: "guide", href: "/blog/property-taxes-and-costs-in-turkey" },
      },
      {
        n: 44,
        q: { en: "Is rental income taxable in Turkey?", ar: "هل يخضع دخل الإيجار للضريبة في تركيا؟" },
        a: { en: "Yes. Rental income may be subject to income tax, depending on applicable exemptions, deductions and tax regulations.", ar: "نعم، قد يخضع دخل الإيجار لضريبة الدخل وفق الإعفاءات والتنزيلات والأنظمة الضريبية السارية." },
        link: { kind: "guide", href: "/blog/property-taxes-and-costs-in-turkey" },
      },
      {
        n: 45,
        q: { en: "Is there a tax when selling a property in Turkey?", ar: "هل توجد ضريبة عند بيع العقار في تركيا؟" },
        a: { en: "A sale may result in capital gains tax depending on the ownership period, transaction circumstances and applicable exemptions.", ar: "قد تترتب ضريبة على الأرباح الناتجة عن البيع بحسب مدة التملك وظروف المعاملة والإعفاءات القانونية المتاحة." },
        link: { kind: "guide", href: "/blog/property-taxes-and-costs-in-turkey" },
      },
      {
        n: 46,
        q: { en: "Can foreigners open a bank account in Turkey?", ar: "هل يمكن للأجانب فتح حساب بنكي في تركيا؟" },
        a: { en: "Yes. Foreign nationals can open bank accounts subject to the bank's identity verification and documentation requirements.", ar: "نعم، يمكن للأجانب فتح حسابات مصرفية بعد استيفاء متطلبات التحقق من الهوية وتقديم الوثائق التي يطلبها البنك." },
        link: { kind: "guide", href: "/blog/how-to-buy-property-in-turkey-as-a-foreigner" },
      },
      {
        n: 47,
        q: { en: "Can I transfer money from abroad to purchase property in Turkey?", ar: "هل يمكنني تحويل الأموال من الخارج لشراء عقار في تركيا؟" },
        a: { en: "Yes. International bank transfers can be used for property purchases, provided that the required banking and foreign currency documentation procedures are followed.", ar: "نعم، يمكن استخدام التحويلات المصرفية الدولية، مع الالتزام بالإجراءات المصرفية ووثائق تحويل العملات المطلوبة." },
        link: { kind: "guide", href: "/blog/how-to-buy-property-in-turkey-as-a-foreigner" },
      },
    ],
  },
  {
    id: "daily-life",
    title: { en: "Daily Life and Essential Services", ar: "الحياة اليومية والخدمات الأساسية" },
    items: [
      {
        n: 48,
        q: { en: "Is public transportation convenient in Istanbul?", ar: "هل المواصلات العامة مريحة في إسطنبول؟" },
        a: { en: "Istanbul has an extensive transportation network, including metro lines, buses, trams, ferries and other public transport options.", ar: "تمتلك إسطنبول شبكة مواصلات واسعة تشمل المترو والحافلات والترام والعبّارات ووسائل نقل عامة أخرى." },
        link: { kind: "guide", href: "/blog/daily-life-in-istanbul" },
      },
      {
        n: 49,
        q: { en: "Do I need a car to live in Istanbul?", ar: "هل أحتاج إلى سيارة للعيش في إسطنبول؟" },
        a: { en: "Not necessarily. Many neighborhoods are well connected by public transportation, although having a car can be useful depending on your location and lifestyle.", ar: "ليس بالضرورة؛ فالكثير من المناطق متصلة جيداً بالمواصلات العامة، لكن السيارة قد تكون مفيدة بحسب مكان السكن ونمط الحياة." },
        link: { kind: "guide", href: "/blog/daily-life-in-istanbul" },
      },
      {
        n: 50,
        q: { en: "Is healthcare easily accessible to foreigners in Istanbul?", ar: "هل تتوفر خدمات الرعاية الصحية للأجانب في إسطنبول؟" },
        a: { en: "Yes. Istanbul has public and private healthcare facilities, including hospitals and clinics offering services to international residents.", ar: "نعم، تضم إسطنبول مستشفيات ومراكز صحية حكومية وخاصة تقدم خدمات للمقيمين الأجانب." },
        link: { kind: "guide", href: "/blog/daily-life-in-istanbul" },
      },
      {
        n: 51,
        q: { en: "Are there international schools in Istanbul?", ar: "هل توجد مدارس دولية في إسطنبول؟" },
        a: { en: "Yes. Istanbul offers several international schools with different curricula and languages of instruction.", ar: "نعم، تضم إسطنبول مدارس دولية متعددة تعتمد مناهج ولغات تدريس مختلفة." },
        link: { kind: "guide", href: "/blog/best-areas-in-istanbul-for-families" },
      },
      {
        n: 52,
        q: { en: "Can foreigners establish a company in Turkey?", ar: "هل يمكن للأجنبي تأسيس شركة في تركيا؟" },
        a: { en: "Yes. Foreign nationals can establish companies in Turkey, subject to company registration, legal and regulatory requirements.", ar: "نعم، يمكن للأجانب تأسيس شركات في تركيا، وفق متطلبات التسجيل والإجراءات القانونية والتنظيمية." },
        link: { kind: "guide", href: "/blog/daily-life-in-istanbul" },
      },
      {
        n: 53,
        q: { en: "Is Istanbul a suitable city for families with children?", ar: "هل إسطنبول مناسبة للعائلات التي لديها أطفال؟" },
        a: { en: "Yes. The city offers various residential communities, educational institutions, recreational facilities and family-oriented activities.", ar: "نعم، توفر المدينة أحياء سكنية ومؤسسات تعليمية ومرافق ترفيهية وأنشطة متنوعة تناسب العائلات." },
        link: { kind: "guide", href: "/blog/best-areas-in-istanbul-for-families" },
      },
      {
        n: 54,
        q: { en: "Can I obtain a Turkish driving licence as a foreign resident?", ar: "هل يمكن للمقيم الأجنبي الحصول على رخصة قيادة تركية؟" },
        a: { en: "Foreigners may use certain valid foreign driving licences for limited periods or apply for a Turkish driving licence, depending on their circumstances and applicable regulations.", ar: "يمكن للأجانب استخدام بعض رخص القيادة الأجنبية السارية لفترات محددة أو التقدم للحصول على رخصة تركية، بحسب حالتهم والأنظمة المعمول بها." },
        link: { kind: "guide", href: "/blog/daily-life-in-istanbul" },
      },
    ],
  },
  {
    id: "voi-services",
    title: { en: "Voi Services and Property Support", ar: "خدمات Voi ودعم العملاء والعقارات" },
    items: [
      {
        n: 55,
        q: { en: "Can Voi help me find the right property before I travel to Istanbul?", ar: "هل تساعدني Voi في العثور على العقار المناسب قبل وصولي إلى إسطنبول؟" },
        a: { en: "Yes. Voi can understand your requirements, present suitable property options and help you explore opportunities before your arrival.", ar: "نعم، يمكن لفريق Voi فهم احتياجاتك وعرض خيارات عقارية مناسبة ومساعدتك على استكشاف الفرص قبل وصولك." },
        link: { kind: "service", href: "/services/property-sales" },
      },
      {
        n: 56,
        q: { en: "Does Voi arrange property viewing appointments?", ar: "هل تنظم Voi مواعيد لمعاينة العقارات؟" },
        a: { en: "Yes. We can coordinate property visits and arrange viewing schedules based on your preferences and availability.", ar: "نعم، يمكننا تنسيق الزيارات وترتيب مواعيد المعاينة وفق تفضيلاتك والوقت المتاح لديك." },
        link: { kind: "service", href: "/services/property-sales" },
      },
      {
        n: 57,
        q: { en: "Can Voi assist with the property purchasing process?", ar: "هل تقدم Voi المساعدة خلال إجراءات شراء العقار؟" },
        a: { en: "Yes. We guide clients through the purchasing journey, coordinate the necessary steps and help them connect with relevant professionals.", ar: "نعم، نرافق عملاءنا خلال رحلة الشراء، ونتابع تنسيق الخطوات اللازمة ونساعدهم في التواصل مع المختصين المعنيين." },
        link: { kind: "service", href: "/services/property-sales" },
      },
      {
        n: 58,
        q: { en: "Does Voi provide support after the property purchase?", ar: "هل تقدم Voi خدمات ما بعد شراء العقار؟" },
        a: { en: "Yes. Our services can extend beyond the purchase, including property management, rentals and after-sales assistance.", ar: "نعم، يمكن أن تستمر خدماتنا بعد الشراء لتشمل إدارة العقار وتأجيره وخدمات المتابعة وما بعد البيع." },
        link: { kind: "service", href: "/services/after-sales-support" },
      },
      {
        n: 59,
        q: { en: "Can Voi help me manage my property while I am abroad?", ar: "هل تستطيع Voi متابعة عقاري أثناء وجودي خارج تركيا؟" },
        a: { en: "Yes. We can assist with property supervision, tenant coordination, maintenance and other agreed management services.", ar: "نعم، يمكننا المساعدة في الإشراف على العقار ومتابعة المستأجرين والصيانة وغيرها من خدمات الإدارة المتفق عليها." },
        link: { kind: "service", href: "/services/property-management" },
      },
      {
        n: 60,
        q: { en: "How can I get personalized real estate advice from Voi?", ar: "كيف يمكنني الحصول على استشارة عقارية تناسب احتياجاتي من Voi؟" },
        a: { en: "You can contact our team through our website to discuss your requirements, investment goals and preferred locations. We will help you explore the options that best match your needs.", ar: "يمكنك التواصل مع فريقنا عبر الموقع لمناقشة احتياجاتك وأهدافك الاستثمارية والمناطق التي تفضلها، وسنساعدك على استكشاف الخيارات الأنسب لك." },
        link: { kind: "contact", href: "/contact" },
      },
    ],
  },
];

export const FAQ_DISCLAIMER = { en: "The information provided in this FAQ is intended as a general guide. Turkish laws, regulations, taxes and administrative procedures may change. Individual circumstances may require additional documentation or professional legal and financial advice.", ar: "المعلومات الواردة في هذه الأسئلة والأجوبة دليل عام، وقد تتغير القوانين والضرائب والإجراءات الإدارية في تركيا. قد تتطلب بعض الحالات وثائق إضافية أو استشارة قانونية ومالية متخصصة." };

/** The questions shown in the short FAQ block on the Services page. */
export const FAQ_TEASER_NUMBERS = [14, 22, 37, 57];
