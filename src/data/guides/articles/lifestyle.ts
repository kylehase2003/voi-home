import type { Guide } from "../types";
import imgSkyline from "@/assets/photos/hero-skyline.webp";
import imgBridge from "@/assets/photos/scroller-bosphorus-bridge.webp";
import imgGarden from "@/assets/photos/tile-villa-garden.webp";
import imgFerry from "@/assets/photos/scroller-bosphorus-ferry.webp";

export const livingInIstanbul: Guide = {
  id: "guide-living-in-istanbul-as-a-foreigner",
  slug: "living-in-istanbul-as-a-foreigner",
  category: "lifestyle",
  region: "turkey",
  published_at: "2026-11-19T09:00:00Z",
  created_at: "2026-11-19T09:00:00Z",
  featured_image: imgSkyline,
  title: "Living in Istanbul as a Foreigner: A Practical Guide",
  title_ar: "العيش في إسطنبول كأجنبي: دليل عملي",
  excerpt:
    "Why so many international residents choose Istanbul, whether it works for the long term, how far English and Arabic get you, and what really drives the monthly budget.",
  excerpt_ar:
    "لماذا يختار عدد كبير من المقيمين الأجانب إسطنبول، وهل تناسب الاستقرار الطويل، وإلى أي حد تكفي الإنجليزية والعربية، وما الذي يحدد الميزانية الشهرية فعلاً.",
  tags: ["Istanbul", "Living", "Relocation"],
  tags_ar: ["إسطنبول", "الحياة", "الانتقال"],
  content: `
<p>Istanbul is one of very few cities that sits on two continents, and that position shapes everything about life here: the history, the food, the business links and the mix of people you meet. For foreigners thinking about a move, the questions are usually practical. Will it work for a family? Can I manage without Turkish? What will it cost? This guide answers those questions.</p>

<h2>Why foreigners choose Istanbul</h2>
<p>People come for different reasons, but the same few come up again and again:</p>
<ul>
  <li><strong>A real city, not a resort.</strong> Istanbul has over 15 million residents, a deep job and business market, and every service you would expect from a global city.</li>
  <li><strong>Connections.</strong> Istanbul Airport and Sabiha Gökçen connect the city to Europe, the Gulf, Central Asia and Africa, often with direct flights of a few hours.</li>
  <li><strong>Range of lifestyles.</strong> You can live in a quiet Bosphorus village, a high-rise in a business district, a historic apartment in Beyoğlu or a gated family compound, all in the same city.</li>
  <li><strong>History and culture.</strong> Few places let you walk past Byzantine walls and Ottoman mosques on the way to a modern shopping centre.</li>
</ul>

<h2>Is Istanbul suitable for long-term living?</h2>
<p>Yes. Many foreigners have lived in Istanbul for decades. The city has established residential communities, a large private healthcare sector, international and private schools, and a public transport network that keeps growing. The things that make long-term life comfortable are mostly about choosing the right neighbourhood for your routine: being close to your work or your children's school matters more here than in smaller cities, because traffic can be heavy at peak times.</p>
<p>If you plan to stay long-term, you will also need the right legal status. Most residents hold a residence permit; some investors go further and obtain Turkish citizenship. Our guide to <a href="/blog/turkish-residence-permit-through-property">residence permits through property</a> explains the difference.</p>

<h2>Can you live comfortably without speaking Turkish?</h2>
<p>For the most part, yes. In central districts, international communities, hospitals that serve foreign patients, and most real estate and legal offices, English is common and Arabic is widely spoken in several neighbourhoods. Delivery apps, banks and many government services have English options.</p>
<p>That said, a little Turkish goes a long way. Neighbours, building managers, taxi drivers and small shops will often only speak Turkish, and official documents are always in Turkish. Most long-term residents learn the basics in their first year and say it changes their experience of the city.</p>

<h2>What does it cost to live in Istanbul?</h2>
<p>There is no single number, because costs depend on four things far more than anything else:</p>
<ol>
  <li><strong>Housing.</strong> Rent or the cost of ownership is the largest expense. A Bosphorus-view apartment in Beşiktaş and a new flat in Beylikdüzü are completely different budgets.</li>
  <li><strong>Neighbourhood.</strong> Groceries, restaurants and services in central, sought-after districts cost noticeably more than in residential outer districts.</li>
  <li><strong>Family size and schooling.</strong> International school fees can be the second-largest cost for families.</li>
  <li><strong>Lifestyle.</strong> Owning a car, eating out often and private health insurance all add up.</li>
</ol>
<p>Prices in Turkey have changed quickly in recent years, so any figure quoted online can be out of date within months. The best approach is to decide on two or three neighbourhoods and price a typical month there: rent or aidat (building fees), utilities, transport, food and schooling.</p>

<h2>Where to start</h2>
<p>Start with the area, not the apartment. Read our comparison of the <a href="/blog/european-vs-asian-side-istanbul">European and Asian sides</a> and our guide to <a href="/blog/best-areas-in-istanbul-for-families">family-friendly areas</a>, then speak to someone who knows the streets. Voi Home can shortlist neighbourhoods and homes that fit your routine before you travel. <a href="/contact">Get in touch</a> to start.</p>

<p><em>This guide is general information. Laws, fees and procedures in Turkey change, so check the current position for your own situation.</em></p>
`,
  content_ar: `
<p>إسطنبول من المدن القليلة في العالم التي تمتد على قارتين، وهذا الموقع ينعكس على كل تفاصيل الحياة فيها: التاريخ والطعام والعلاقات التجارية وتنوع الناس. ومن يفكر في الانتقال إليها يسأل عادة أسئلة عملية: هل تناسب العائلة؟ هل أستطيع العيش دون التركية؟ وكم ستكلفني؟ يجيب هذا الدليل عن هذه الأسئلة.</p>

<h2>لماذا يختار الأجانب إسطنبول؟</h2>
<p>تختلف الأسباب، لكن بعضها يتكرر دائماً:</p>
<ul>
  <li><strong>مدينة حقيقية لا منتجع سياحي.</strong> يسكنها أكثر من 15 مليون نسمة، وفيها سوق عمل وأعمال واسع وكل الخدمات المتوقعة من مدينة عالمية.</li>
  <li><strong>الاتصال بالعالم.</strong> يربط مطار إسطنبول ومطار صبيحة كوكجن المدينة بأوروبا والخليج وآسيا الوسطى وأفريقيا برحلات مباشرة قصيرة في الغالب.</li>
  <li><strong>تنوع أنماط الحياة.</strong> يمكنك أن تسكن في قرية هادئة على البوسفور، أو برج في حي الأعمال، أو شقة تاريخية في بيوغلو، أو مجمع سكني عائلي، وكل ذلك في المدينة نفسها.</li>
  <li><strong>التاريخ والثقافة.</strong> قلّما تجد مدينة تمر فيها بأسوار بيزنطية ومساجد عثمانية في طريقك إلى مركز تسوق حديث.</li>
</ul>

<h2>هل إسطنبول مناسبة للاستقرار الطويل؟</h2>
<p>نعم. كثير من الأجانب يعيشون في إسطنبول منذ عقود. ففيها أحياء سكنية راسخة وقطاع صحي خاص كبير ومدارس دولية وخاصة وشبكة مواصلات عامة تتوسع باستمرار. وأهم ما يجعل الإقامة الطويلة مريحة هو اختيار الحي المناسب لروتينك اليومي، فالقرب من العمل أو مدرسة الأطفال أهم هنا من المدن الصغيرة بسبب الازدحام في أوقات الذروة.</p>
<p>وإذا كنت تخطط للبقاء طويلاً فستحتاج إلى وضع قانوني مناسب. معظم المقيمين يحملون إقامة، وبعض المستثمرين يحصلون على الجنسية التركية. يشرح دليلنا عن <a href="/blog/turkish-residence-permit-through-property">الإقامة عن طريق العقار</a> الفرق بينهما.</p>

<h2>هل يمكن العيش براحة دون التحدث بالتركية؟</h2>
<p>في الغالب نعم. في الأحياء المركزية والمجتمعات الدولية والمستشفيات التي تستقبل المرضى الأجانب ومعظم المكاتب العقارية والقانونية، الإنجليزية منتشرة، والعربية مسموعة على نطاق واسع في عدة أحياء. كما أن تطبيقات التوصيل والبنوك وكثيراً من الخدمات الحكومية تتوفر بالإنجليزية.</p>
<p>ومع ذلك فإن القليل من التركية يصنع فرقاً كبيراً. فالجيران ومديرو المباني وسائقو الأجرة والمحلات الصغيرة يتحدثون التركية فقط في كثير من الأحيان، والوثائق الرسمية دائماً بالتركية. ومعظم المقيمين يتعلمون الأساسيات في سنتهم الأولى ويقولون إنها غيّرت تجربتهم في المدينة.</p>

<h2>كم تكلف المعيشة في إسطنبول؟</h2>
<p>لا يوجد رقم واحد، لأن التكلفة تعتمد على أربعة عوامل أكثر من أي شيء آخر:</p>
<ol>
  <li><strong>السكن.</strong> الإيجار أو تكلفة التملك هو البند الأكبر. شقة مطلة على البوسفور في بشيكتاش تختلف تماماً عن شقة جديدة في بيليك دوزو.</li>
  <li><strong>الحي.</strong> البقالة والمطاعم والخدمات في الأحياء المركزية المطلوبة أغلى بشكل واضح من الأحياء السكنية الطرفية.</li>
  <li><strong>حجم العائلة والتعليم.</strong> قد تكون رسوم المدارس الدولية ثاني أكبر بند في ميزانية العائلات.</li>
  <li><strong>نمط الحياة.</strong> امتلاك سيارة وتناول الطعام خارج المنزل والتأمين الصحي الخاص كلها تضيف إلى التكلفة.</li>
</ol>
<p>تغيرت الأسعار في تركيا بسرعة خلال السنوات الأخيرة، لذا قد يصبح أي رقم منشور على الإنترنت قديماً خلال أشهر. الأفضل أن تختار حيين أو ثلاثة وتحسب شهراً نموذجياً فيها: الإيجار أو العائدات (رسوم المبنى)، والفواتير، والمواصلات، والطعام، والمدارس.</p>

<h2>من أين تبدأ؟</h2>
<p>ابدأ بالمنطقة لا بالشقة. اقرأ مقارنتنا بين <a href="/blog/european-vs-asian-side-istanbul">الجانبين الأوروبي والآسيوي</a> ودليلنا عن <a href="/blog/best-areas-in-istanbul-for-families">المناطق المناسبة للعائلات</a>، ثم تحدث مع من يعرف الشوارع جيداً. يمكن لفريق Voi Home أن يقترح عليك الأحياء والمنازل المناسبة لروتينك قبل أن تسافر. <a href="/contact">تواصل معنا</a> للبدء.</p>

<p><em>هذا الدليل معلومات عامة. القوانين والرسوم والإجراءات في تركيا قد تتغير، لذا تحقق من الوضع الحالي بما يناسب حالتك.</em></p>
`,
};

export const europeanVsAsianSide: Guide = {
  id: "guide-european-vs-asian-side-istanbul",
  slug: "european-vs-asian-side-istanbul",
  category: "lifestyle",
  region: "turkey",
  published_at: "2026-11-18T09:00:00Z",
  created_at: "2026-11-18T09:00:00Z",
  featured_image: imgBridge,
  title: "European Side or Asian Side: Where Should You Live in Istanbul?",
  title_ar: "الجانب الأوروبي أم الآسيوي: أين تسكن في إسطنبول؟",
  excerpt:
    "The Bosphorus splits Istanbul into two very different cities. Here is how they compare on work, atmosphere, commuting and homes, and how to decide.",
  excerpt_ar:
    "يقسم البوسفور إسطنبول إلى مدينتين مختلفتين. إليك مقارنة بينهما في العمل والأجواء والتنقل والسكن، وكيف تختار.",
  tags: ["Istanbul", "Neighbourhoods", "European side", "Asian side"],
  tags_ar: ["إسطنبول", "الأحياء", "الجانب الأوروبي", "الجانب الآسيوي"],
  content: `
<p>Ask anyone in Istanbul which side is better and you will get a passionate answer. The truth is that both sides offer distinct advantages, and the right choice depends on where you work, how you like to live and how often you are willing to cross the water.</p>

<h2>The European side</h2>
<p>The European side is home to the city's main business and commercial centres: Levent, Maslak and Şişli for offices, Beyoğlu and Karaköy for culture and nightlife, and the historic peninsula around Sultanahmet. It is denser, busier and generally more expensive.</p>
<ul>
  <li><strong>Best for:</strong> people who work in the central business districts, who want to be close to culture, restaurants and nightlife, or who want the classic Bosphorus waterfront in Beşiktaş, Ortaköy, Bebek or Sarıyer.</li>
  <li><strong>Homes:</strong> everything from historic apartments to new towers and branded residences. Western districts like Başakşehir and Beylikdüzü offer newer compounds at lower prices.</li>
  <li><strong>Watch out for:</strong> traffic on the main arteries at peak times, and higher prices in the most central areas.</li>
</ul>

<h2>The Asian side</h2>
<p>The Asian side is known for its residential atmosphere and coastal neighbourhoods. Kadıköy and Moda are lively and creative; Üsküdar is historic and family-oriented; Bağdat Avenue is one of the city's best-known shopping streets; Ataşehir has become a business and residential hub in its own right.</p>
<ul>
  <li><strong>Best for:</strong> families, people who work on the Asian side or from home, and anyone who wants a calmer, greener pace of life.</li>
  <li><strong>Homes:</strong> seaside apartments along the Marmara coast, modern compounds in Ataşehir and Çekmeköy, and Bosphorus villas in Beykoz and Kandilli.</li>
  <li><strong>Watch out for:</strong> the daily commute if your work is on the European side. Bridges are often congested at rush hour.</li>
</ul>

<h2>Crossing between the two</h2>
<p>Commuting is easier than it used to be. The Marmaray rail tunnel runs under the Bosphorus, the Eurasia Tunnel carries cars, and ferries link both shores many times an hour. Many residents choose a home within walking distance of a ferry or Marmaray station, which turns the crossing into a pleasant 20-minute trip.</p>

<h2>How to decide</h2>
<ol>
  <li><strong>Map your weekly routine.</strong> Work, school, family and friends. Live on the side where you spend most weekdays.</li>
  <li><strong>Check the commute at rush hour,</strong> not on a quiet Sunday.</li>
  <li><strong>Think about resale and rental demand</strong> if you are buying. Both sides have strong districts; demand depends more on transport links and the building than on the side itself. Our <a href="/blog/investing-in-istanbul-real-estate">investment guide</a> covers this.</li>
  <li><strong>Visit both.</strong> An afternoon in Kadıköy and an evening in Beşiktaş will tell you more than any article.</li>
</ol>
<p>Voi Home works on both sides of the city. <a href="/contact">Tell us about your routine</a> and we will suggest the districts that fit.</p>

<p><em>This guide is general information and does not replace a personal assessment of your needs.</em></p>
`,
  content_ar: `
<p>اسأل أي شخص في إسطنبول أي الجانبين أفضل وستسمع جواباً متحمساً. والحقيقة أن لكل جانب ميزاته، والاختيار الصحيح يعتمد على مكان عملك وطريقة حياتك وعدد المرات التي تريد فيها عبور البحر.</p>

<h2>الجانب الأوروبي</h2>
<p>يضم الجانب الأوروبي أهم مراكز الأعمال والتجارة في المدينة: ليفنت ومسلك وشيشلي للمكاتب، وبيوغلو وكاراكوي للثقافة والحياة الليلية، وشبه الجزيرة التاريخية حول السلطان أحمد. وهو أكثر كثافة وحركة وأعلى سعراً بشكل عام.</p>
<ul>
  <li><strong>الأنسب لـ:</strong> من يعمل في مناطق الأعمال المركزية، ومن يريد القرب من الثقافة والمطاعم، أو من يريد واجهة البوسفور الكلاسيكية في بشيكتاش وأورتاكوي وبيبك وساريير.</li>
  <li><strong>المساكن:</strong> من الشقق التاريخية إلى الأبراج الجديدة والمساكن ذات العلامات التجارية. وتوفر المناطق الغربية مثل باشاك شهير وبيليك دوزو مجمعات أحدث بأسعار أقل.</li>
  <li><strong>انتبه إلى:</strong> الازدحام على الطرق الرئيسية في أوقات الذروة، وارتفاع الأسعار في المناطق الأكثر مركزية.</li>
</ul>

<h2>الجانب الآسيوي</h2>
<p>يشتهر الجانب الآسيوي بأجوائه السكنية وأحيائه الساحلية. قاضي كوي ومودا حيويتان ومبدعتان، وأوسكودار تاريخية وعائلية، وشارع بغداد من أشهر شوارع التسوق في المدينة، وأصبحت أتاشهير مركزاً للأعمال والسكن بحد ذاتها.</p>
<ul>
  <li><strong>الأنسب لـ:</strong> العائلات، ومن يعمل في الجانب الآسيوي أو من المنزل، وكل من يريد إيقاع حياة أهدأ وأكثر خضرة.</li>
  <li><strong>المساكن:</strong> شقق مطلة على بحر مرمرة، ومجمعات حديثة في أتاشهير وتشكمكوي، وفلل على البوسفور في بيكوز وكانديلي.</li>
  <li><strong>انتبه إلى:</strong> التنقل اليومي إذا كان عملك في الجانب الأوروبي، فالجسور تزدحم غالباً في ساعات الذروة.</li>
</ul>

<h2>التنقل بين الجانبين</h2>
<p>أصبح التنقل أسهل من قبل. يمر نفق مرمراي للقطارات تحت البوسفور، وينقل نفق أوراسيا السيارات، وتربط العبارات الضفتين مرات كثيرة في الساعة. ويختار كثير من السكان منزلاً قريباً من محطة عبارة أو مرمراي، فيصبح العبور رحلة ممتعة مدتها نحو 20 دقيقة.</p>

<h2>كيف تختار؟</h2>
<ol>
  <li><strong>ارسم روتينك الأسبوعي.</strong> العمل والمدرسة والعائلة والأصدقاء. اسكن في الجانب الذي تقضي فيه معظم أيام الأسبوع.</li>
  <li><strong>جرّب الطريق في ساعة الذروة،</strong> لا في يوم أحد هادئ.</li>
  <li><strong>فكّر في إعادة البيع والطلب على الإيجار</strong> إذا كنت تشتري. في الجانبين مناطق قوية، والطلب يعتمد على المواصلات والمبنى أكثر من الجانب نفسه. يتناول <a href="/blog/investing-in-istanbul-real-estate">دليل الاستثمار</a> هذا الموضوع.</li>
  <li><strong>زر الجانبين.</strong> فترة بعد الظهر في قاضي كوي ومساء في بشيكتاش سيخبرانك أكثر من أي مقال.</li>
</ol>
<p>يعمل فريق Voi Home في جانبي المدينة. <a href="/contact">أخبرنا عن روتينك</a> وسنقترح عليك المناطق المناسبة.</p>

<p><em>هذا الدليل معلومات عامة ولا يغني عن تقييم شخصي لاحتياجاتك.</em></p>
`,
};

export const familyAreas: Guide = {
  id: "guide-best-areas-in-istanbul-for-families",
  slug: "best-areas-in-istanbul-for-families",
  category: "lifestyle",
  region: "turkey",
  published_at: "2026-11-17T09:00:00Z",
  created_at: "2026-11-17T09:00:00Z",
  featured_image: imgGarden,
  title: "The Best Areas in Istanbul for Families",
  title_ar: "أفضل المناطق للعائلات في إسطنبول",
  excerpt:
    "Üsküdar, Ataşehir, Başakşehir, Beylikdüzü and Sarıyer each suit families in a different way. A look at schools, space, green areas and what each district is like to live in.",
  excerpt_ar:
    "أوسكودار وأتاشهير وباشاك شهير وبيليك دوزو وساريير، لكل منها ما يناسب العائلات بطريقة مختلفة. نظرة على المدارس والمساحة والمناطق الخضراء وطبيعة الحياة في كل منطقة.",
  tags: ["Istanbul", "Families", "Neighbourhoods", "Schools"],
  tags_ar: ["إسطنبول", "العائلات", "الأحياء", "المدارس"],
  content: `
<p>Istanbul is a very good city for families. It has a large number of residential communities, parks, international and private schools, children's activities and family-friendly public spaces. But because the city is so big, the district you choose shapes your daily life: the school run, weekend plans and how much space you get for your budget.</p>

<h2>What families usually look for</h2>
<ul>
  <li><strong>Schools nearby.</strong> Daily journeys to school are the biggest quality-of-life factor. Shortlist schools first, then look for homes around them.</li>
  <li><strong>Space and security.</strong> Many families prefer gated compounds (site) with playgrounds, pools, security and parking.</li>
  <li><strong>Green areas.</strong> Parks, forests and the seafront make a big difference in a dense city.</li>
  <li><strong>Healthcare.</strong> A good private hospital within easy reach.</li>
</ul>

<h2>Five districts families often choose</h2>

<h3>Üsküdar (Asian side)</h3>
<p>Historic, calm and well connected by ferry and Marmaray. Üsküdar has a strong neighbourhood feel, waterfront walks and a mix of older apartments and new projects. Popular with families who want a traditional atmosphere close to the centre.</p>

<h3>Ataşehir (Asian side)</h3>
<p>A modern district of residential towers and compounds, with large shopping centres, private schools and a growing financial district. Good for families who want new buildings with full facilities.</p>

<h3>Başakşehir (European side)</h3>
<p>One of the city's most planned districts, with wide roads, large parks, the Başakşehir Pine and Sakura City Hospital and many compounds built for families. Further from the centre, but with good value for space.</p>

<h3>Beylikdüzü (European side)</h3>
<p>A coastal district in the west with newer housing, beaches, parks and generally lower prices per square metre. Families who work nearby or work from home often find they get much more space here.</p>

<h3>Sarıyer (European side)</h3>
<p>Parts of Sarıyer, such as Tarabya, Zekeriyaköy and İstinye, offer a greener, quieter lifestyle with villas and low-rise compounds near the Bosphorus and the Belgrade Forest. Several well-known international schools are in or near this area. Prices are at the higher end.</p>

<h2>International schools</h2>
<p>Istanbul has several international schools offering British, American, International Baccalaureate, French, German and other curricula. Places can be limited and admission timelines vary, so contact schools early, ideally before you choose a home.</p>

<h2>Choosing the right area for your family</h2>
<ol>
  <li>Decide on school options and your work location first.</li>
  <li>Choose two or three districts that are a reasonable commute from both.</li>
  <li>Visit compounds on a weekday afternoon to see the school run and traffic.</li>
  <li>Check the monthly <a href="/blog/renting-out-your-property-in-turkey">aidat</a> (building fees), which can be significant in compounds with pools and security.</li>
</ol>
<p>Voi Home can arrange a viewing day across several districts so you can compare them side by side. <a href="/services/property-sales">See how we help buyers</a> or <a href="/contact">contact us</a>.</p>

<p><em>This guide is general information. School availability, fees and property prices change, so check the latest details.</em></p>
`,
  content_ar: `
<p>إسطنبول مدينة جيدة جداً للعائلات. ففيها عدد كبير من المجتمعات السكنية والحدائق والمدارس الدولية والخاصة والأنشطة المخصصة للأطفال والأماكن العامة المناسبة للعائلات. لكن لأن المدينة كبيرة جداً، فإن المنطقة التي تختارها تحدد حياتك اليومية: مشوار المدرسة وخطط نهاية الأسبوع والمساحة التي تحصل عليها مقابل ميزانيتك.</p>

<h2>ما الذي تبحث عنه العائلات عادة؟</h2>
<ul>
  <li><strong>مدارس قريبة.</strong> رحلة المدرسة اليومية هي أهم عامل في جودة الحياة. اختر المدارس أولاً ثم ابحث عن منازل حولها.</li>
  <li><strong>المساحة والأمان.</strong> تفضل عائلات كثيرة المجمعات المغلقة (السيت) التي تضم ملاعب ومسابح وحراسة ومواقف.</li>
  <li><strong>المساحات الخضراء.</strong> الحدائق والغابات والواجهة البحرية تصنع فرقاً كبيراً في مدينة مزدحمة.</li>
  <li><strong>الرعاية الصحية.</strong> مستشفى خاص جيد يسهل الوصول إليه.</li>
</ul>

<h2>خمس مناطق تختارها العائلات كثيراً</h2>

<h3>أوسكودار (الجانب الآسيوي)</h3>
<p>تاريخية وهادئة ومتصلة جيداً بالعبارات ومرمراي. تتميز بروح الحي القوية والممشى البحري ومزيج من الشقق القديمة والمشاريع الجديدة. تحبها العائلات التي تريد أجواء تقليدية قريبة من المركز.</p>

<h3>أتاشهير (الجانب الآسيوي)</h3>
<p>منطقة حديثة من الأبراج والمجمعات السكنية، فيها مراكز تسوق كبيرة ومدارس خاصة ومركز مالي متنامٍ. مناسبة للعائلات التي تريد مباني جديدة بخدمات متكاملة.</p>

<h3>باشاك شهير (الجانب الأوروبي)</h3>
<p>من أكثر مناطق المدينة تخطيطاً، بطرق واسعة وحدائق كبيرة ومستشفى مدينة باشاك شهير وكثير من المجمعات المبنية للعائلات. أبعد عن المركز لكنها تقدم مساحة جيدة مقابل السعر.</p>

<h3>بيليك دوزو (الجانب الأوروبي)</h3>
<p>منطقة ساحلية في الغرب فيها مساكن أحدث وشواطئ وحدائق وأسعار أقل للمتر المربع بشكل عام. العائلات التي تعمل في المنطقة أو من المنزل تحصل هنا على مساحة أكبر بكثير.</p>

<h3>ساريير (الجانب الأوروبي)</h3>
<p>تقدم أجزاء من ساريير مثل ترابيا وزكريا كوي وإستينيه نمط حياة أكثر هدوءاً وخضرة، بفلل ومجمعات منخفضة قرب البوسفور وغابة بلغراد. وتقع عدة مدارس دولية معروفة فيها أو بالقرب منها. الأسعار هنا في الفئة الأعلى.</p>

<h2>المدارس الدولية</h2>
<p>في إسطنبول عدة مدارس دولية تقدم مناهج بريطانية وأمريكية والبكالوريا الدولية والفرنسية والألمانية وغيرها. المقاعد قد تكون محدودة ومواعيد القبول تختلف، لذا تواصل مع المدارس مبكراً، ويفضل قبل اختيار المنزل.</p>

<h2>كيف تختار المنطقة المناسبة لعائلتك؟</h2>
<ol>
  <li>حدد خيارات المدارس ومكان العمل أولاً.</li>
  <li>اختر منطقتين أو ثلاثاً يسهل الوصول منها إلى الاثنين.</li>
  <li>زر المجمعات بعد ظهر يوم عمل لترى حركة المدارس والازدحام.</li>
  <li>تحقق من <a href="/blog/renting-out-your-property-in-turkey">العائدات</a> الشهرية (رسوم المبنى)، فقد تكون مرتفعة في المجمعات التي فيها مسابح وحراسة.</li>
</ol>
<p>يمكن لفريق Voi Home ترتيب يوم معاينات في عدة مناطق لتقارن بينها. <a href="/services/property-sales">تعرّف على كيفية مساعدتنا للمشترين</a> أو <a href="/contact">تواصل معنا</a>.</p>

<p><em>هذا الدليل معلومات عامة. توفر المقاعد الدراسية والرسوم وأسعار العقارات تتغير، لذا تحقق من أحدث التفاصيل.</em></p>
`,
};

export const dailyLife: Guide = {
  id: "guide-daily-life-in-istanbul",
  slug: "daily-life-in-istanbul",
  category: "lifestyle",
  region: "turkey",
  published_at: "2026-11-16T09:00:00Z",
  created_at: "2026-11-16T09:00:00Z",
  featured_image: imgFerry,
  title: "Daily Life in Istanbul: Transport, Healthcare, Driving and Business",
  title_ar: "الحياة اليومية في إسطنبول: المواصلات والصحة والقيادة والأعمال",
  excerpt:
    "How public transport works, whether you need a car, how foreigners access healthcare, using your driving licence, and setting up a company in Turkey.",
  excerpt_ar:
    "كيف تعمل المواصلات العامة، وهل تحتاج إلى سيارة، وكيف يحصل الأجانب على الرعاية الصحية، واستخدام رخصة القيادة، وتأسيس شركة في تركيا.",
  tags: ["Istanbul", "Transport", "Healthcare", "Daily life"],
  tags_ar: ["إسطنبول", "المواصلات", "الرعاية الصحية", "الحياة اليومية"],
  content: `
<p>Once you have chosen where to live, the questions become everyday ones. How do I get around? Where do I see a doctor? Can I drive? This guide covers the essentials for foreign residents.</p>

<h2>Public transport</h2>
<p>Istanbul has an extensive and growing public transport network: metro lines, the Marmaray rail line under the Bosphorus, trams, the Metrobus (a dedicated bus lane across the city), regular buses, funiculars and ferries. One card, the <strong>Istanbulkart</strong>, works on almost all of them and can be topped up at stations or through the app.</p>
<p>Ferries are one of the best things about living here: they are cheap, frequent and often faster than driving between the European and Asian sides.</p>

<h2>Do you need a car?</h2>
<p>Not necessarily. If you live and work near a metro, Marmaray or ferry line, you can manage comfortably without one, and taxis and ride apps are widely available. A car becomes useful if you live in outer districts or compounds, have children at a school without a bus service, or travel outside the city often. Keep in mind traffic at peak times and the cost of parking in central areas.</p>

<h2>Healthcare</h2>
<p>Istanbul has both public and private healthcare. Many private hospitals have international patient departments with English- and Arabic-speaking staff, and the standard of care in the leading hospitals is high. Most foreign residents use private health insurance, which is also usually required when applying for a residence permit. Pharmacies are everywhere and a duty pharmacy (nöbetçi eczane) is open at night in every area.</p>

<h2>Driving in Turkey with a foreign licence</h2>
<p>Visitors can generally drive with a valid foreign licence for a limited period. Once you become a resident, rules on how long your foreign licence remains valid and whether you can exchange it for a Turkish licence depend on the country that issued it and your circumstances. Check the current rules with the authorities or a local adviser before you rely on your foreign licence long-term.</p>

<h2>Banking</h2>
<p>Foreign nationals can open bank accounts in Turkey. Banks will ask for your passport, a Turkish tax number and proof of address, and may ask for more depending on their own checks. Many foreigners open an account during their property purchase, since it makes paying for the property and later bills much easier. See our <a href="/blog/how-to-buy-property-in-turkey-as-a-foreigner">buying guide</a> for how money transfers for property work.</p>

<h2>Setting up a company</h2>
<p>Foreign nationals can establish companies in Turkey, most commonly a limited company (Ltd. Şti.) or a joint-stock company (A.Ş.). The process involves registering with the trade registry, opening a capital account, appointing an accountant and meeting tax registration requirements. Running a business is separate from residence: if you plan to work in your own company, you will also need the right work permit. Speak to a lawyer and an accountant before you start.</p>

<h2>Settling in</h2>
<p>Most practical problems get easier once you have a local network: a building manager you trust, a reliable handyman, a good accountant. If you buy through Voi Home, our <a href="/services/after-sales-support">after-sales support</a> helps with utility connections, residence permit paperwork and the first months in your new home.</p>

<p><em>This guide is general information. Transport, healthcare, licensing and company rules change, so check the current requirements for your situation.</em></p>
`,
  content_ar: `
<p>بعد أن تختار مكان سكنك تصبح الأسئلة يومية: كيف أتنقل؟ أين أراجع الطبيب؟ هل أستطيع القيادة؟ يغطي هذا الدليل الأساسيات للمقيمين الأجانب.</p>

<h2>المواصلات العامة</h2>
<p>تمتلك إسطنبول شبكة مواصلات عامة واسعة ومتنامية: خطوط مترو، وقطار مرمراي تحت البوسفور، والترام، والمتروبوس (خط حافلات مخصص يعبر المدينة)، والحافلات العادية، والقطارات المعلقة، والعبارات. وتعمل بطاقة واحدة هي <strong>إسطنبول كارت</strong> على معظمها تقريباً، ويمكن شحنها في المحطات أو عبر التطبيق.</p>
<p>العبارات من أجمل ما في الحياة هنا: رخيصة ومتكررة وغالباً أسرع من السيارة في التنقل بين الجانبين الأوروبي والآسيوي.</p>

<h2>هل تحتاج إلى سيارة؟</h2>
<p>ليس بالضرورة. إذا كنت تسكن وتعمل قرب خط مترو أو مرمراي أو عبارة فيمكنك الاستغناء عنها براحة، وسيارات الأجرة وتطبيقات النقل متوفرة بكثرة. وتصبح السيارة مفيدة إذا كنت تسكن في مناطق طرفية أو مجمعات، أو لديك أطفال في مدرسة بلا حافلة، أو تسافر خارج المدينة كثيراً. ضع في حسابك الازدحام في أوقات الذروة وتكلفة المواقف في المناطق المركزية.</p>

<h2>الرعاية الصحية</h2>
<p>في إسطنبول رعاية صحية عامة وخاصة. كثير من المستشفيات الخاصة فيها أقسام للمرضى الدوليين وموظفون يتحدثون الإنجليزية والعربية، ومستوى الرعاية في المستشفيات الكبرى مرتفع. معظم المقيمين الأجانب يستخدمون تأميناً صحياً خاصاً، وهو مطلوب عادة عند التقدم للإقامة. والصيدليات منتشرة في كل مكان، وفي كل منطقة صيدلية مناوبة (نوبتشي إجزانه) تعمل ليلاً.</p>

<h2>القيادة في تركيا برخصة أجنبية</h2>
<p>يمكن للزوار عموماً القيادة برخصة أجنبية سارية لفترة محدودة. وبعد أن تصبح مقيماً، تعتمد مدة صلاحية رخصتك الأجنبية وإمكانية تبديلها برخصة تركية على البلد الذي أصدرها وعلى ظروفك. تحقق من القواعد الحالية لدى الجهات الرسمية أو مستشار محلي قبل أن تعتمد على رخصتك الأجنبية لفترة طويلة.</p>

<h2>البنوك</h2>
<p>يمكن للأجانب فتح حسابات بنكية في تركيا. ستطلب البنوك جواز السفر والرقم الضريبي التركي وإثبات العنوان، وقد تطلب أكثر حسب إجراءاتها. يفتح كثير من الأجانب حساباً أثناء شراء العقار لأنه يسهل دفع ثمنه والفواتير لاحقاً. راجع <a href="/blog/how-to-buy-property-in-turkey-as-a-foreigner">دليل الشراء</a> لمعرفة كيف تتم التحويلات المالية لشراء العقار.</p>

<h2>تأسيس شركة</h2>
<p>يمكن للأجانب تأسيس شركات في تركيا، وأكثرها شيوعاً الشركة ذات المسؤولية المحدودة (Ltd. Şti.) والشركة المساهمة (A.Ş.). وتشمل الإجراءات التسجيل في السجل التجاري وفتح حساب لرأس المال وتعيين محاسب واستيفاء متطلبات التسجيل الضريبي. وإدارة شركة أمر منفصل عن الإقامة، فإذا كنت ستعمل في شركتك فستحتاج أيضاً إلى إذن العمل المناسب. استشر محامياً ومحاسباً قبل أن تبدأ.</p>

<h2>الاستقرار</h2>
<p>تصبح معظم المشكلات العملية أسهل عندما تكوّن شبكة محلية: مدير مبنى تثق به، وفني صيانة موثوق، ومحاسب جيد. وإذا اشتريت عن طريق Voi Home فإن <a href="/services/after-sales-support">خدمة ما بعد البيع</a> لدينا تساعدك في توصيل الخدمات وأوراق الإقامة والأشهر الأولى في منزلك الجديد.</p>

<p><em>هذا الدليل معلومات عامة. قواعد المواصلات والصحة والرخص والشركات قد تتغير، لذا تحقق من المتطلبات الحالية لحالتك.</em></p>
`,
};
