import type { Guide } from "../types";
import imgRooftops from "@/assets/photos/about-rooftops.webp";
import imgSkylineTower from "@/assets/photos/scroller-skyline-tower.webp";
import imgLiving from "@/assets/photos/process-living-room.webp";
import imgLounge from "@/assets/photos/tile-interior-lounge.webp";

export const taxesAndCosts: Guide = {
  id: "guide-property-taxes-and-costs-in-turkey",
  slug: "property-taxes-and-costs-in-turkey",
  category: "tips",
  region: "turkey",
  published_at: "2026-11-19T07:00:00Z",
  created_at: "2026-11-19T07:00:00Z",
  featured_image: imgRooftops,
  title: "Property Taxes and Costs in Turkey: Buying, Owning, Renting and Selling",
  title_ar: "ضرائب العقارات وتكاليفها في تركيا: عند الشراء والتملك والتأجير والبيع",
  excerpt:
    "The full picture of what property costs beyond the price: title deed fees and VAT when you buy, annual property tax while you own, tax on rental income, and tax when you sell.",
  excerpt_ar:
    "الصورة الكاملة لتكاليف العقار بعد السعر: رسوم الطابو وضريبة القيمة المضافة عند الشراء، وضريبة العقار السنوية أثناء التملك، وضريبة دخل الإيجار، والضريبة عند البيع.",
  tags: ["Taxes", "Costs", "Title deed fees"],
  tags_ar: ["الضرائب", "التكاليف", "رسوم الطابو"],
  content: `
<p>The price of a property is only part of what you pay. Taxes and fees apply when you buy, every year while you own, if you rent the property out and, in some cases, when you sell. Knowing them in advance avoids surprises and lets you calculate real returns.</p>
<p>Rates and thresholds in Turkey change regularly, often every year, so treat the figures below as a guide and confirm the current position with an accountant before you commit.</p>

<h2>Costs when you buy</h2>
<ul>
  <li><strong>Title deed fee (tapu harcı):</strong> 4% of the declared sale value. By law it is split 2% each between buyer and seller, but in practice the buyer often pays all of it by agreement. The declared value cannot be below the official minimum.</li>
  <li><strong>VAT (KDV):</strong> may apply to the first sale of a new-build property by a developer. The rate depends on the property and project. Exemptions exist for some foreign buyers who meet specific conditions, so ask before you sign.</li>
  <li><strong>Valuation report:</strong> mandatory for foreign buyers, prepared by a licensed valuer.</li>
  <li><strong>Compulsory earthquake insurance (DASK):</strong> required before the title deed transfer.</li>
  <li><strong>Land Registry service fee</strong> (döner sermaye), a small fixed fee.</li>
  <li><strong>Translation and notary fees</strong> for passport translations and any power of attorney.</li>
  <li><strong>Legal fees</strong> if you use a lawyer, which we recommend.</li>
  <li><strong>Agency commission,</strong> where applicable, as agreed in writing.</li>
</ul>
<p>As a rough rule, budget an extra several percent of the price for purchase costs, more if VAT applies.</p>

<h2>Costs while you own</h2>
<ul>
  <li><strong>Annual real estate tax (emlak vergisi):</strong> owners pay a yearly tax based on the property's official tax value and classification. Rates for homes in metropolitan areas such as Istanbul are low in percentage terms, and the tax is paid in two instalments during the year.</li>
  <li><strong>Aidat:</strong> monthly building or compound fees for shared services. See our <a href="/blog/renting-out-your-property-in-turkey">guide to renting out and managing your property</a>.</li>
  <li><strong>Insurance:</strong> DASK renewal each year, plus optional home insurance.</li>
  <li><strong>Utilities and maintenance.</strong></li>
</ul>

<h2>Tax on rental income</h2>
<p>Rental income from property in Turkey is generally subject to Turkish income tax, including for foreign owners who live abroad. Residential rental income may benefit from an annual exemption amount and from deductions for expenses, and the tax is declared in an annual return. Whether and how much you pay depends on the amount of income, your other income in Turkey, the deduction method and applicable tax treaties. An accountant can set this up correctly from the first year.</p>

<h2>Tax when you sell</h2>
<p>When you sell, a <strong>capital gains tax</strong> may apply depending on how long you have owned the property and your circumstances. Gains on property sold by an individual after a holding period set by law (currently five years) are generally exempt; gains on earlier sales may be taxable, with adjustments for inflation in some cases. The seller's share of the title deed fee also applies.</p>

<h2>Plan the numbers before you buy</h2>
<p>Include all of these costs when calculating your return. Our guide to <a href="/blog/how-to-calculate-rental-yield">calculating rental yield</a> shows how to work out gross and net returns, and <a href="/services/investment-advisory">Voi Home's investment advisory</a> can build a full cost picture for a specific property.</p>

<p><em>This guide is general information, not tax advice. Tax rates, exemptions and thresholds change, and your position depends on your circumstances and any tax treaty. Consult a qualified accountant.</em></p>
`,
  content_ar: `
<p>سعر العقار ليس كل ما تدفعه. فهناك ضرائب ورسوم عند الشراء، وكل عام أثناء التملك، وعند التأجير، وفي بعض الحالات عند البيع. معرفتها مسبقاً تجنبك المفاجآت وتساعدك على حساب العائد الحقيقي.</p>
<p>تتغير النسب والحدود في تركيا بانتظام، وغالباً كل عام، لذا تعامل مع ما يلي كدليل عام وتأكد من الوضع الحالي مع محاسب قبل أن تلتزم.</p>

<h2>تكاليف الشراء</h2>
<ul>
  <li><strong>رسوم الطابو (Tapu Harcı):</strong> 4% من قيمة البيع المصرح بها. ينص القانون على تقسيمها 2% لكل من البائع والمشتري، لكن عملياً كثيراً ما يدفعها المشتري كاملة بالاتفاق. ولا يجوز أن تقل القيمة المصرح بها عن الحد الرسمي.</li>
  <li><strong>ضريبة القيمة المضافة (KDV):</strong> قد تُفرض على البيع الأول للعقار الجديد من المطور، وتختلف النسبة حسب العقار والمشروع. وتوجد إعفاءات لبعض المشترين الأجانب الذين يستوفون شروطاً محددة، فاسأل عنها قبل التوقيع.</li>
  <li><strong>تقرير التقييم:</strong> إلزامي للمشترين الأجانب ويعده مقيّم مرخص.</li>
  <li><strong>تأمين الزلازل الإلزامي (داسك):</strong> مطلوب قبل نقل الطابو.</li>
  <li><strong>رسوم خدمة الطابو</strong> (دونر سرمايه) وهي رسوم ثابتة صغيرة.</li>
  <li><strong>رسوم الترجمة وكاتب العدل</strong> لترجمة جواز السفر وأي وكالة.</li>
  <li><strong>أتعاب المحامي</strong> إذا استعنت بمحامٍ، وهو ما ننصح به.</li>
  <li><strong>عمولة الوساطة</strong> عند وجودها وحسب الاتفاق المكتوب.</li>
</ul>
<p>وكقاعدة تقريبية خصص بضعة بالمئة إضافية من السعر لتكاليف الشراء، وأكثر إذا طُبقت ضريبة القيمة المضافة.</p>

<h2>تكاليف التملك</h2>
<ul>
  <li><strong>ضريبة العقار السنوية (Emlak Vergisi):</strong> يدفع المالكون ضريبة سنوية تعتمد على القيمة الضريبية الرسمية للعقار وتصنيفه. نسبها للمساكن في المدن الكبرى مثل إسطنبول منخفضة، وتُدفع على قسطين خلال العام.</li>
  <li><strong>العائدات (Aidat):</strong> رسوم شهرية للمبنى أو المجمع مقابل الخدمات المشتركة. اقرأ <a href="/blog/renting-out-your-property-in-turkey">دليل تأجير العقار وإدارته</a>.</li>
  <li><strong>التأمين:</strong> تجديد تأمين داسك سنوياً، إضافة إلى تأمين المنزل الاختياري.</li>
  <li><strong>الفواتير والصيانة.</strong></li>
</ul>

<h2>ضريبة دخل الإيجار</h2>
<p>يخضع دخل الإيجار من العقارات في تركيا عموماً لضريبة الدخل التركية، بما في ذلك للمالكين الأجانب المقيمين في الخارج. وقد يستفيد دخل إيجار المساكن من حد إعفاء سنوي ومن خصم المصاريف، وتُقدَّم الضريبة في إقرار سنوي. ويعتمد ما إذا كنت ستدفع ومقداره على حجم الدخل ودخلك الآخر في تركيا وطريقة الخصم واتفاقيات الازدواج الضريبي. ويمكن للمحاسب ترتيب ذلك بشكل صحيح من السنة الأولى.</p>

<h2>الضريبة عند البيع</h2>
<p>عند البيع قد تُفرض <strong>ضريبة على الأرباح الرأسمالية</strong> حسب مدة تملكك للعقار وظروفك. والأرباح من بيع الفرد لعقار بعد فترة يحددها القانون (خمس سنوات حالياً) معفاة عموماً، أما البيع قبل ذلك فقد يخضع للضريبة، مع تعديلات للتضخم في بعض الحالات. كما تنطبق حصة البائع من رسوم الطابو.</p>

<h2>احسب الأرقام قبل الشراء</h2>
<p>أدخل كل هذه التكاليف عند حساب عائدك. يشرح دليلنا عن <a href="/blog/how-to-calculate-rental-yield">حساب العائد الإيجاري</a> كيفية حساب العائد الإجمالي والصافي، ويمكن لخدمة <a href="/services/investment-advisory">الاستشارات الاستثمارية في Voi Home</a> إعداد صورة كاملة للتكاليف لعقار محدد.</p>

<p><em>هذا الدليل معلومات عامة وليس استشارة ضريبية. النسب والإعفاءات والحدود تتغير، ويعتمد وضعك على ظروفك وأي اتفاقية ضريبية. استشر محاسباً مؤهلاً.</em></p>
`,
};

export const investingInIstanbul: Guide = {
  id: "guide-investing-in-istanbul-real-estate",
  slug: "investing-in-istanbul-real-estate",
  category: "investment",
  region: "turkey",
  published_at: "2026-11-18T07:00:00Z",
  created_at: "2026-11-18T07:00:00Z",
  featured_image: imgSkylineTower,
  title: "Investing in Istanbul Real Estate: Areas, Prices and Resale Potential",
  title_ar: "الاستثمار العقاري في إسطنبول: المناطق والأسعار وإمكانية إعادة البيع",
  excerpt:
    "Is Istanbul still a good place to invest? What moves prices, how to think about areas, residential versus commercial, and how to choose a property that will sell well later.",
  excerpt_ar:
    "هل ما زالت إسطنبول مكاناً جيداً للاستثمار؟ ما الذي يحرك الأسعار، وكيف تفكر في المناطق، والسكني مقابل التجاري، وكيف تختار عقاراً يسهل بيعه لاحقاً.",
  tags: ["Investment", "Istanbul", "Resale"],
  tags_ar: ["استثمار", "إسطنبول", "إعادة البيع"],
  content: `
<p>Istanbul is Turkey's largest city and economic centre, and it has been one of the most active property markets for foreign buyers for more than a decade. But "Istanbul" is not one market. Returns depend on the district, the street, the building and the price you pay. This guide explains how to think about an investment here.</p>

<h2>Is Istanbul still a good city to invest in?</h2>
<p>Istanbul remains an important property market because of its population, economic activity and international position. Demand comes from a large and growing local population, internal migration, international residents and investors. At the same time, the market has gone through fast price changes and currency movements, so no opportunity should be taken on trust. Each investment should be assessed individually against your goals, timeline and currency.</p>

<h2>What moves property prices in Istanbul</h2>
<ul>
  <li><strong>Location:</strong> proximity to the Bosphorus, the sea, business districts and established neighbourhoods.</li>
  <li><strong>Transport:</strong> being near metro, Marmaray or ferry stations is one of the strongest drivers of demand.</li>
  <li><strong>Infrastructure:</strong> new metro lines, roads, hospitals and urban regeneration projects can lift whole districts.</li>
  <li><strong>Construction quality and age:</strong> earthquake-resilient, newer buildings attract a premium.</li>
  <li><strong>Amenities:</strong> security, parking, pools and gyms, especially in compounds.</li>
  <li><strong>Supply and demand:</strong> large numbers of similar new units in one area can hold prices back.</li>
</ul>

<h2>Which areas offer good opportunities?</h2>
<p>Opportunities vary across the city. Broadly there are two approaches:</p>
<ul>
  <li><strong>Established central districts</strong> such as Beşiktaş, Şişli, Kadıköy and Üsküdar. Higher prices, but strong and steady demand from tenants and buyers, and good liquidity when you sell.</li>
  <li><strong>Developing areas with infrastructure improvements</strong>, where new transport links or regeneration are arriving. Lower entry prices and more growth potential, but more risk if the plans are delayed or supply grows quickly.</li>
</ul>
<p>Our comparison of the <a href="/blog/european-vs-asian-side-istanbul">European and Asian sides</a> gives a feel for the main districts.</p>

<h2>Residential or commercial?</h2>
<p>Residential property usually attracts a wider pool of tenants and buyers and is easier for foreign investors to manage. Commercial property, such as shops and offices, can offer different rental terms and sometimes higher yields, but with different risks: longer vacancies, more dependence on the local economy, and different tax treatment. The right choice depends on your investment objectives and how hands-on you want to be.</p>

<h2>How to choose a property with good resale potential</h2>
<ol>
  <li><strong>Buy what the next buyer will want:</strong> sensible layouts, good light, practical sizes for the area.</li>
  <li><strong>Prioritise location and access</strong> over finishes, which you can always change.</li>
  <li><strong>Check building quality</strong> and the occupancy permit.</li>
  <li><strong>Watch the running costs:</strong> very high aidat can put buyers and tenants off.</li>
  <li><strong>Compare with the competition:</strong> how many similar units are for sale nearby, and at what price?</li>
  <li><strong>Avoid overpaying at launch</strong> in areas with a lot of new supply.</li>
</ol>

<h2>Off-plan or ready?</h2>
<p>Off-plan can offer better prices and payment plans; ready property gives immediate rent and fewer unknowns. Read <a href="/blog/buying-off-plan-property-in-istanbul">buying off-plan in Istanbul</a> for what to check, and <a href="/blog/how-to-calculate-rental-yield">how to calculate rental yield</a> to compare returns.</p>

<h2>How Voi Home helps</h2>
<p>Our <a href="/services/investment-advisory">investment advisory</a> service compares areas and properties against your objectives, with realistic numbers. <a href="/contact">Speak with us</a> about your plans.</p>

<p><em>This guide is general information. Property values can go down as well as up, and returns are not guaranteed.</em></p>
`,
  content_ar: `
<p>إسطنبول أكبر مدن تركيا ومركزها الاقتصادي، وهي من أنشط أسواق العقارات للمشترين الأجانب منذ أكثر من عقد. لكن "إسطنبول" ليست سوقاً واحدة، فالعائد يعتمد على المنطقة والشارع والمبنى والسعر الذي تدفعه. يشرح هذا الدليل كيف تفكر في الاستثمار هنا.</p>

<h2>هل ما زالت إسطنبول مدينة جيدة للاستثمار؟</h2>
<p>تبقى إسطنبول سوقاً عقارية مهمة بفضل عدد سكانها ونشاطها الاقتصادي ومكانتها الدولية. ويأتي الطلب من عدد كبير ومتزايد من السكان المحليين والهجرة الداخلية والمقيمين الدوليين والمستثمرين. وفي الوقت نفسه شهدت السوق تغيرات سريعة في الأسعار والعملة، لذا لا ينبغي قبول أي فرصة دون تدقيق. يجب تقييم كل استثمار بشكل فردي وفق أهدافك ومدتك الزمنية وعملتك.</p>

<h2>ما الذي يحرك أسعار العقارات في إسطنبول؟</h2>
<ul>
  <li><strong>الموقع:</strong> القرب من البوسفور والبحر ومناطق الأعمال والأحياء الراسخة.</li>
  <li><strong>المواصلات:</strong> القرب من محطات المترو أو مرمراي أو العبارات من أقوى محركات الطلب.</li>
  <li><strong>البنية التحتية:</strong> خطوط المترو الجديدة والطرق والمستشفيات ومشاريع التحول العمراني قد ترفع مناطق كاملة.</li>
  <li><strong>جودة البناء وعمره:</strong> المباني الأحدث المقاومة للزلازل تحظى بسعر أعلى.</li>
  <li><strong>المرافق:</strong> الحراسة والمواقف والمسابح والصالات الرياضية، خاصة في المجمعات.</li>
  <li><strong>العرض والطلب:</strong> وجود عدد كبير من الوحدات الجديدة المتشابهة في منطقة واحدة قد يحد من الأسعار.</li>
</ul>

<h2>ما المناطق التي تقدم فرصاً جيدة؟</h2>
<p>تختلف الفرص في أنحاء المدينة. وبشكل عام هناك نهجان:</p>
<ul>
  <li><strong>المناطق المركزية الراسخة</strong> مثل بشيكتاش وشيشلي وقاضي كوي وأوسكودار. أسعار أعلى لكن طلب قوي ومستقر من المستأجرين والمشترين وسيولة جيدة عند البيع.</li>
  <li><strong>المناطق النامية التي تشهد تحسينات في البنية التحتية</strong> حيث تصل خطوط مواصلات جديدة أو مشاريع تحول عمراني. أسعار دخول أقل وإمكانية نمو أكبر، لكن مخاطر أعلى إذا تأخرت الخطط أو زاد العرض بسرعة.</li>
</ul>
<p>تعطيك مقارنتنا بين <a href="/blog/european-vs-asian-side-istanbul">الجانبين الأوروبي والآسيوي</a> فكرة عن المناطق الرئيسية.</p>

<h2>سكني أم تجاري؟</h2>
<p>يجذب العقار السكني عادة شريحة أوسع من المستأجرين والمشترين ويسهل على المستثمر الأجنبي إدارته. أما العقار التجاري كالمحلات والمكاتب فقد يقدم شروط إيجار مختلفة وأحياناً عائداً أعلى، لكن بمخاطر مختلفة: فترات شغور أطول، واعتماد أكبر على الاقتصاد المحلي، ومعاملة ضريبية مختلفة. والاختيار الصحيح يعتمد على أهدافك الاستثمارية ومدى رغبتك في المتابعة بنفسك.</p>

<h2>كيف تختار عقاراً يسهل بيعه لاحقاً؟</h2>
<ol>
  <li><strong>اشترِ ما سيريده المشتري التالي:</strong> تصميم عملي وإضاءة جيدة ومساحات مناسبة للمنطقة.</li>
  <li><strong>قدّم الموقع وسهولة الوصول</strong> على التشطيبات التي يمكنك تغييرها دائماً.</li>
  <li><strong>تحقق من جودة البناء</strong> وإذن السكن.</li>
  <li><strong>راقب تكاليف التشغيل:</strong> العائدات المرتفعة جداً قد تنفّر المشترين والمستأجرين.</li>
  <li><strong>قارن بالمنافسة:</strong> كم وحدة مشابهة معروضة للبيع قريباً وبأي سعر؟</li>
  <li><strong>تجنب الدفع المبالغ فيه عند الإطلاق</strong> في مناطق فيها عرض جديد كبير.</li>
</ol>

<h2>على المخطط أم جاهز؟</h2>
<p>قد يقدم العقار على المخطط أسعاراً وخطط دفع أفضل، بينما يمنحك العقار الجاهز إيجاراً فورياً ومجهولات أقل. اقرأ <a href="/blog/buying-off-plan-property-in-istanbul">الشراء على المخطط في إسطنبول</a> لمعرفة ما يجب فحصه، و<a href="/blog/how-to-calculate-rental-yield">كيفية حساب العائد الإيجاري</a> لمقارنة العوائد.</p>

<h2>كيف تساعدك Voi Home</h2>
<p>تقارن خدمة <a href="/services/investment-advisory">الاستشارات الاستثمارية</a> لدينا بين المناطق والعقارات وفق أهدافك وبأرقام واقعية. <a href="/contact">تحدث معنا</a> عن خططك.</p>

<p><em>هذا الدليل معلومات عامة. قيم العقارات قد تنخفض كما قد ترتفع، والعوائد غير مضمونة.</em></p>
`,
};

export const rentalYield: Guide = {
  id: "guide-how-to-calculate-rental-yield",
  slug: "how-to-calculate-rental-yield",
  category: "investment",
  region: "turkey",
  published_at: "2026-11-17T07:00:00Z",
  created_at: "2026-11-17T07:00:00Z",
  featured_image: imgLiving,
  title: "How to Calculate Rental Yield on a Property in Turkey",
  title_ar: "كيف تحسب العائد الإيجاري لعقار في تركيا",
  excerpt:
    "The simple formula, the difference between gross and net yield, a worked example, and the costs that turn an attractive headline number into a realistic one.",
  excerpt_ar:
    "المعادلة البسيطة، والفرق بين العائد الإجمالي والصافي، ومثال عملي، والتكاليف التي تحوّل الرقم الجذاب إلى رقم واقعي.",
  tags: ["Rental yield", "Investment", "Returns"],
  tags_ar: ["العائد الإيجاري", "استثمار", "العوائد"],
  content: `
<p>Rental yield is the simplest way to compare income from different properties. It tells you how much rent a property earns each year as a percentage of what you paid for it. Here is how to calculate it properly.</p>

<h2>The basic formula: gross yield</h2>
<p><strong>Gross rental yield = (annual rent ÷ purchase price) × 100</strong></p>
<p>For example, if you buy an apartment for 300,000 and it rents for 1,500 a month:</p>
<ul>
  <li>Annual rent: 1,500 × 12 = 18,000</li>
  <li>Gross yield: 18,000 ÷ 300,000 × 100 = <strong>6%</strong></li>
</ul>
<p>Gross yield is useful for quick comparisons, but it ignores every cost of owning and renting the property.</p>

<h2>The more useful number: net yield</h2>
<p><strong>Net rental yield = ((annual rent − annual costs) ÷ total investment) × 100</strong></p>
<p>Annual costs typically include:</p>
<ul>
  <li>Aidat (building fees), if the landlord pays them</li>
  <li>Annual property tax and insurance</li>
  <li>Maintenance and repairs</li>
  <li>Property management fees</li>
  <li>Empty months between tenants</li>
  <li>Income tax on the rent</li>
</ul>
<p>Total investment should include purchase costs such as title deed fees, VAT if any, furniture and legal fees, not just the price.</p>
<p>Using the same example, with 3,000 of annual costs and 15,000 of purchase costs:</p>
<ul>
  <li>Net income: 18,000 − 3,000 = 15,000</li>
  <li>Total investment: 300,000 + 15,000 = 315,000</li>
  <li>Net yield: 15,000 ÷ 315,000 × 100 = <strong>4.8%</strong></li>
</ul>

<h2>Things that distort yield in Turkey</h2>
<ul>
  <li><strong>Currency:</strong> rent is usually paid in Turkish lira, while many foreign investors think in dollars or euros. Exchange rate movements can change your real yield significantly.</li>
  <li><strong>Rent rules:</strong> increases for existing residential tenants are limited by law, so rent may lag behind the market until a new tenancy starts.</li>
  <li><strong>Furnished versus unfurnished:</strong> furnished homes can command higher rent but cost more to set up and maintain.</li>
  <li><strong>Optimistic listings:</strong> advertised "guaranteed" or headline yields are often based on gross figures or short-term rentals at full occupancy.</li>
</ul>
<p>For a deeper look at whether a yield will last, read <a href="/blog/sustainable-rental-yield-signs">5 signs a rental yield is actually sustainable</a>.</p>

<h2>Yield is not the whole return</h2>
<p>Your total return combines rental income with any change in the property's value. A lower-yielding home in a prime district can outperform a higher-yielding one elsewhere if it grows more in value and is easier to sell. See our <a href="/blog/investing-in-istanbul-real-estate">investment guide</a> and our breakdown of <a href="/blog/property-taxes-and-costs-in-turkey">property taxes and costs</a>.</p>

<h2>How Voi Home helps</h2>
<p>We provide realistic rental estimates based on current lettings in the building and area. Our <a href="/services/investment-advisory">investment advisory</a> and <a href="/services/property-rentals">rentals</a> teams can model the numbers for a property you are considering.</p>

<p><em>The figures above are illustrative only. Returns are not guaranteed and depend on the property, market conditions, taxes and currency movements.</em></p>
`,
  content_ar: `
<p>العائد الإيجاري هو أبسط طريقة لمقارنة دخل العقارات المختلفة. فهو يخبرك بمقدار الإيجار الذي يحققه العقار سنوياً كنسبة مئوية مما دفعته. إليك كيف تحسبه بشكل صحيح.</p>

<h2>المعادلة الأساسية: العائد الإجمالي</h2>
<p><strong>العائد الإيجاري الإجمالي = (الإيجار السنوي ÷ سعر الشراء) × 100</strong></p>
<p>مثلاً، إذا اشتريت شقة بـ 300,000 وأجّرتها بـ 1,500 شهرياً:</p>
<ul>
  <li>الإيجار السنوي: 1,500 × 12 = 18,000</li>
  <li>العائد الإجمالي: 18,000 ÷ 300,000 × 100 = <strong>6%</strong></li>
</ul>
<p>العائد الإجمالي مفيد للمقارنات السريعة، لكنه يتجاهل كل تكاليف تملك العقار وتأجيره.</p>

<h2>الرقم الأهم: العائد الصافي</h2>
<p><strong>العائد الإيجاري الصافي = ((الإيجار السنوي − التكاليف السنوية) ÷ إجمالي الاستثمار) × 100</strong></p>
<p>تشمل التكاليف السنوية عادة:</p>
<ul>
  <li>العائدات (رسوم المبنى) إذا كان المالك يدفعها</li>
  <li>ضريبة العقار السنوية والتأمين</li>
  <li>الصيانة والإصلاحات</li>
  <li>رسوم إدارة العقار</li>
  <li>الأشهر الشاغرة بين المستأجرين</li>
  <li>ضريبة الدخل على الإيجار</li>
</ul>
<p>ويجب أن يشمل إجمالي الاستثمار تكاليف الشراء مثل رسوم الطابو وضريبة القيمة المضافة إن وجدت والأثاث وأتعاب المحامي، لا السعر وحده.</p>
<p>وبالمثال نفسه، مع تكاليف سنوية قدرها 3,000 وتكاليف شراء قدرها 15,000:</p>
<ul>
  <li>صافي الدخل: 18,000 − 3,000 = 15,000</li>
  <li>إجمالي الاستثمار: 300,000 + 15,000 = 315,000</li>
  <li>العائد الصافي: 15,000 ÷ 315,000 × 100 = <strong>4.8%</strong></li>
</ul>

<h2>ما الذي يشوّه العائد في تركيا؟</h2>
<ul>
  <li><strong>العملة:</strong> يُدفع الإيجار عادة بالليرة التركية، بينما يفكر كثير من المستثمرين الأجانب بالدولار أو اليورو. وقد تغير تقلبات سعر الصرف عائدك الحقيقي بشكل كبير.</li>
  <li><strong>قواعد الإيجار:</strong> الزيادات على المستأجرين الحاليين في المساكن محدودة بالقانون، لذا قد يتأخر الإيجار عن السوق حتى يبدأ عقد جديد.</li>
  <li><strong>مفروش أم غير مفروش:</strong> المنازل المفروشة قد تحقق إيجاراً أعلى لكن تجهيزها وصيانتها أكثر تكلفة.</li>
  <li><strong>الإعلانات المتفائلة:</strong> العوائد "المضمونة" أو المعلنة كثيراً ما تعتمد على أرقام إجمالية أو إيجارات قصيرة بإشغال كامل.</li>
</ul>
<p>ولنظرة أعمق في مدى استدامة العائد اقرأ <a href="/blog/sustainable-rental-yield-signs">5 علامات على أن العائد الإيجاري مستدام فعلاً</a>.</p>

<h2>العائد الإيجاري ليس كل العائد</h2>
<p>يجمع عائدك الكلي بين دخل الإيجار وأي تغير في قيمة العقار. وقد يتفوق منزل بعائد إيجاري أقل في منطقة مميزة على منزل بعائد أعلى في مكان آخر، إذا ارتفعت قيمته أكثر وكان بيعه أسهل. راجع <a href="/blog/investing-in-istanbul-real-estate">دليل الاستثمار</a> وتفصيلنا لـ<a href="/blog/property-taxes-and-costs-in-turkey">ضرائب العقارات وتكاليفها</a>.</p>

<h2>كيف تساعدك Voi Home</h2>
<p>نقدم تقديرات إيجار واقعية مبنية على الإيجارات الحالية في المبنى والمنطقة. ويمكن لفريقي <a href="/services/investment-advisory">الاستشارات الاستثمارية</a> و<a href="/services/property-rentals">التأجير</a> حساب الأرقام لعقار تفكر فيه.</p>

<p><em>الأرقام أعلاه للتوضيح فقط. العوائد غير مضمونة وتعتمد على العقار وظروف السوق والضرائب وتقلبات العملة.</em></p>
`,
};

export const rentingOut: Guide = {
  id: "guide-renting-out-your-property-in-turkey",
  slug: "renting-out-your-property-in-turkey",
  category: "tips",
  region: "turkey",
  published_at: "2026-11-16T07:00:00Z",
  created_at: "2026-11-16T07:00:00Z",
  featured_image: imgLounge,
  title: "Renting Out and Managing Your Property in Turkey from Abroad",
  title_ar: "تأجير عقارك في تركيا وإدارته من الخارج",
  excerpt:
    "Can foreigners rent out their homes, furnished or unfurnished, what aidat is, who pays for repairs, managing remotely, and selling a property that has a tenant.",
  excerpt_ar:
    "هل يمكن للأجانب تأجير منازلهم، ومفروش أم غير مفروش، وما هي العائدات، ومن يدفع الإصلاحات، والإدارة عن بُعد، وبيع عقار فيه مستأجر.",
  tags: ["Renting", "Property management", "Aidat", "Landlords"],
  tags_ar: ["التأجير", "إدارة العقار", "العائدات", "المالكون"],
  content: `
<p>Many foreign owners rent out their Istanbul property, either long-term or while they are away. It is perfectly possible to do this from another country, as long as you understand the rules and have reliable people on the ground.</p>

<h2>Can foreigners rent out their property?</h2>
<p>Yes. Foreign owners can generally rent out their properties in Turkey on the same basis as Turkish owners, subject to rental law and tax rules. Rental income must be declared for tax; see our guide to <a href="/blog/property-taxes-and-costs-in-turkey">property taxes and costs</a>.</p>
<p>Short-term holiday lets are a separate case. Renting a home for short stays generally requires a permit from the tourism authorities, and in apartment buildings the consent of other owners may be required. Check the current rules before planning short-term rentals.</p>

<h2>Furnished or unfurnished?</h2>
<p>There is no single right answer; it depends on the location and target tenants.</p>
<ul>
  <li><strong>Furnished</strong> homes suit professionals, international residents and people on shorter contracts. They can command higher rent, but cost more to set up and wear faster.</li>
  <li><strong>Unfurnished</strong> homes appeal to families and longer-term residents who bring their own furniture. Tenancies are often longer and more stable.</li>
</ul>

<h2>What is aidat?</h2>
<p>Aidat is the monthly management fee in Turkish residential buildings and compounds. It pays for shared facilities and services: cleaning and maintenance of common areas, lifts, security, gardening, pools and gyms, and the building manager. Aidat varies widely, from modest amounts in simple buildings to significant sums in luxury compounds. Check it before you buy, since it affects both your costs and how attractive the home is to tenants. The rental contract should state whether the tenant or landlord pays it; usually the tenant pays the regular aidat.</p>

<h2>Who pays for maintenance and repairs?</h2>
<p>It depends on the rental agreement and Turkish law. As a general rule:</p>
<ul>
  <li>The <strong>landlord</strong> is responsible for keeping the property fit for use, including major structural repairs and the main systems such as boilers and plumbing.</li>
  <li>The <strong>tenant</strong> is responsible for ordinary use and care, and minor repairs caused by everyday use.</li>
</ul>
<p>A clear, written contract with an inventory and photos at the start avoids most disputes.</p>

<h2>Rent increases</h2>
<p>For residential leases, annual rent increases for existing tenants are limited by law, usually linked to inflation. Rent can be reset to market level when a new tenancy begins or, in some cases, after several years through agreement or the courts. Plan your returns with this in mind.</p>

<h2>Managing your property from abroad</h2>
<p>Yes, you can manage remotely. A property management service can coordinate:</p>
<ul>
  <li>Marketing the property and screening tenants</li>
  <li>Contracts, deposits and move-in inspections</li>
  <li>Rent collection and payment of aidat and bills</li>
  <li>Maintenance, repairs and emergencies</li>
  <li>Regular reports and photos</li>
</ul>

<h2>Can I sell a property that is rented?</h2>
<p>Yes. A rented property can generally be sold. The existing tenancy usually continues with the new owner, who steps into the landlord's position. A new owner can only end the lease in limited circumstances set out by law, with strict notice periods. If you are selling, tell buyers about the tenancy and its terms; if you are buying a tenanted property, review the lease carefully.</p>

<h2>How Voi Home helps</h2>
<p>Voi Home's <a href="/services/property-management">property management</a> and <a href="/services/property-rentals">rentals</a> services look after your home and tenants while you are abroad, with clear reporting. <a href="/contact">Speak with us</a> about your property.</p>

<p><em>This guide is general information, not legal advice. Rental law, rent caps and short-term rental rules change; check the current position for your property.</em></p>
`,
  content_ar: `
<p>يؤجر كثير من المالكين الأجانب عقاراتهم في إسطنبول، إما لفترات طويلة أو خلال غيابهم. ويمكن تماماً القيام بذلك من بلد آخر، ما دمت تفهم القواعد ولديك أشخاص موثوقون على أرض الواقع.</p>

<h2>هل يمكن للأجانب تأجير عقاراتهم؟</h2>
<p>نعم. يمكن للمالكين الأجانب عموماً تأجير عقاراتهم في تركيا على الأساس نفسه الذي يؤجر به المالكون الأتراك، وفق قانون الإيجار والقواعد الضريبية. ويجب التصريح بدخل الإيجار للضرائب، راجع دليلنا عن <a href="/blog/property-taxes-and-costs-in-turkey">ضرائب العقارات وتكاليفها</a>.</p>
<p>أما الإيجارات السياحية القصيرة فحالة مختلفة. فتأجير المنزل لإقامات قصيرة يتطلب عموماً ترخيصاً من الجهات السياحية، وقد تُشترط موافقة المالكين الآخرين في المباني السكنية. تحقق من القواعد الحالية قبل التخطيط للإيجار القصير.</p>

<h2>مفروش أم غير مفروش؟</h2>
<p>لا توجد إجابة واحدة صحيحة، فالأمر يعتمد على الموقع والمستأجرين المستهدفين.</p>
<ul>
  <li><strong>المنازل المفروشة</strong> تناسب المهنيين والمقيمين الدوليين وأصحاب العقود الأقصر. قد تحقق إيجاراً أعلى، لكن تجهيزها أكثر تكلفة وتستهلك بشكل أسرع.</li>
  <li><strong>المنازل غير المفروشة</strong> تجذب العائلات والمقيمين لفترات طويلة الذين يحضرون أثاثهم. وعقودها غالباً أطول وأكثر استقراراً.</li>
</ul>

<h2>ما هي العائدات (Aidat)؟</h2>
<p>العائدات هي رسوم الإدارة الشهرية في المباني والمجمعات السكنية التركية، وتغطي المرافق والخدمات المشتركة: تنظيف المناطق المشتركة وصيانتها، والمصاعد، والحراسة، والحدائق، والمسابح والصالات الرياضية، ومدير المبنى. وتختلف العائدات كثيراً، من مبالغ متواضعة في المباني البسيطة إلى مبالغ كبيرة في المجمعات الفاخرة. تحقق منها قبل الشراء لأنها تؤثر في تكاليفك وفي جاذبية المنزل للمستأجرين. ويجب أن يحدد عقد الإيجار من يدفعها، وعادة يدفع المستأجر العائدات الدورية.</p>

<h2>من يتحمل الصيانة والإصلاحات؟</h2>
<p>يعتمد ذلك على عقد الإيجار والقانون التركي. وكقاعدة عامة:</p>
<ul>
  <li><strong>المالك</strong> مسؤول عن إبقاء العقار صالحاً للاستخدام، بما في ذلك الإصلاحات الإنشائية الكبرى والأنظمة الرئيسية كالمراجل والسباكة.</li>
  <li><strong>المستأجر</strong> مسؤول عن الاستخدام والعناية العاديين والإصلاحات البسيطة الناتجة عن الاستعمال اليومي.</li>
</ul>
<p>والعقد المكتوب الواضح مع جرد وصور عند البداية يجنب معظم الخلافات.</p>

<h2>زيادة الإيجار</h2>
<p>في عقود الإيجار السكنية تكون الزيادات السنوية على المستأجرين الحاليين محدودة بالقانون، وترتبط عادة بالتضخم. ويمكن إعادة الإيجار إلى مستوى السوق عند بدء عقد جديد، أو في بعض الحالات بعد عدة سنوات بالاتفاق أو عن طريق المحكمة. خطط لعوائدك مع أخذ ذلك في الحسبان.</p>

<h2>إدارة عقارك من الخارج</h2>
<p>نعم، يمكنك الإدارة عن بُعد. ويمكن لخدمة إدارة العقارات تنسيق:</p>
<ul>
  <li>تسويق العقار وفحص المستأجرين</li>
  <li>العقود والتأمينات وفحص الدخول</li>
  <li>تحصيل الإيجار ودفع العائدات والفواتير</li>
  <li>الصيانة والإصلاحات والطوارئ</li>
  <li>تقارير وصور دورية</li>
</ul>

<h2>هل يمكنني بيع عقار مؤجر؟</h2>
<p>نعم. يمكن عموماً بيع العقار المؤجر. ويستمر عقد الإيجار القائم عادة مع المالك الجديد الذي يحل محل المؤجر. ولا يستطيع المالك الجديد إنهاء العقد إلا في حالات محدودة ينص عليها القانون وبمهل صارمة. إذا كنت تبيع فأخبر المشترين بالإيجار وشروطه، وإذا كنت تشتري عقاراً مؤجراً فراجع العقد بعناية.</p>

<h2>كيف تساعدك Voi Home</h2>
<p>تعتني خدمتا <a href="/services/property-management">إدارة العقارات</a> و<a href="/services/property-rentals">التأجير</a> في Voi Home بمنزلك ومستأجريك وأنت في الخارج، مع تقارير واضحة. <a href="/contact">تحدث معنا</a> عن عقارك.</p>

<p><em>هذا الدليل معلومات عامة وليس استشارة قانونية. قانون الإيجار وحدود الزيادة وقواعد الإيجار القصير تتغير، فتحقق من الوضع الحالي لعقارك.</em></p>
`,
};
