import type { ServiceContent, ServiceSlug } from "./index";

// English service copy. Taglines, introductions and sub-services are taken
// from the client's brief; card lines follow the client's services mock-up.
export const SERVICES_EN: Record<ServiceSlug, ServiceContent> = {
  "property-sales": {
    name: "Property Sales",
    short: "Find the right property in the right location, with expert guidance.",
    tagline: "The Right Property Begins with the Right Understanding.",
    intro:
      "We help clients discover and acquire properties that align with their personal needs, investment objectives, and long-term expectations. Through market knowledge, property evaluation, and professional guidance, we make the purchasing journey more informed and organized.",
    seoDescription:
      "Buy property in Istanbul with Voi Home: consultation, property selection, market evaluation, viewings, negotiation and handover, handled with care.",
    sections: [
      {
        title: "Property Consultation",
        items: [
          "Understand the client's requirements and objectives.",
          "Identify budget, preferred locations, and property types.",
          "Clarify whether the purchase is for personal use, investment, or another purpose.",
        ],
      },
      {
        title: "Property Selection",
        items: [
          "Residential property selection.",
          "Luxury property selection.",
          "Investment property selection.",
          "Ready and off-plan property options.",
          "Commercial property opportunities.",
        ],
      },
      {
        title: "Market & Property Evaluation",
        items: [
          "Assess location, accessibility, and surrounding amenities.",
          "Compare asking prices with relevant market alternatives.",
          "Review property specifications and available documentation.",
          "Identify potential advantages, limitations, and points requiring further verification.",
        ],
      },
      {
        title: "Property Viewings",
        items: [
          "Arrange property visits and viewing schedules.",
          "Coordinate with developers, owners, and relevant representatives.",
          "Provide property information and comparisons.",
        ],
      },
      {
        title: "Negotiation & Purchase Coordination",
        items: [
          "Coordinate price discussions and negotiations.",
          "Communicate with sellers and developers.",
          "Coordinate purchase procedures with the relevant professionals.",
          "Liaise with legal and administrative specialists where required.",
        ],
      },
      {
        title: "Property Handover",
        items: [
          "Coordinate the handover process.",
          "Arrange an initial property inspection where applicable.",
          "Help organize the next steps following purchase.",
        ],
      },
    ],
  },

  "property-rentals": {
    name: "Property Rentals",
    short: "Rental solutions for tenants and property owners across Istanbul.",
    tagline: "Finding the Right Place. Creating the Right Match.",
    intro:
      "We provide rental solutions for property owners and tenants, connecting suitable properties with appropriate occupants through an organized and transparent rental process.",
    seoDescription:
      "Rent or let property in Istanbul with Voi Home: tenant search, viewings, negotiation, lease coordination and handover for tenants and owners.",
    sections: [
      {
        title: "Services for Tenants",
        items: [
          "Rental consultation and needs assessment.",
          "Location and property selection.",
          "Residential and commercial rental options.",
          "Property viewing arrangements.",
          "Rental negotiations.",
          "Lease agreement coordination.",
          "Property handover assistance.",
        ],
      },
      {
        title: "Services for Property Owners",
        items: [
          "Rental market assessment and rental price guidance.",
          "Property preparation and presentation.",
          "Photography and marketing coordination.",
          "Tenant inquiries and screening coordination.",
          "Viewing arrangements and rental negotiations.",
          "Lease agreement and handover coordination.",
        ],
      },
    ],
  },

  "investment-advisory": {
    name: "Investment Advisory",
    short: "Make informed investment decisions with our market insight.",
    tagline: "See Beyond the Property. Understand the Opportunity.",
    intro:
      "We provide research-informed real estate guidance to help investors evaluate locations, compare opportunities, understand potential returns, and make informed decisions based on their objectives and risk considerations.",
    seoDescription:
      "Real estate investment advisory in Istanbul: market research, opportunity selection, financial and risk assessment, investment proposals and follow-up.",
    note:
      "Investment returns are never guaranteed. Any projection we share states its assumptions and relies on information that can be verified.",
    sections: [
      {
        title: "Investment Profile Assessment",
        items: [
          "Understand investment objectives and expectations.",
          "Assess available budget and capital allocation.",
          "Identify the investment horizon.",
          "Discuss risk tolerance and liquidity considerations.",
        ],
      },
      {
        title: "Market Research & Analysis",
        items: [
          "Istanbul real estate market analysis.",
          "District and neighborhood assessments.",
          "Supply and demand analysis.",
          "Infrastructure and urban development research.",
          "Market trends and relevant price comparisons.",
        ],
      },
      {
        title: "Investment Opportunity Selection",
        items: [
          "Residential investment opportunities.",
          "Rental income opportunities.",
          "Off-plan development projects.",
          "Potential capital appreciation opportunities.",
          "Commercial real estate opportunities.",
          "Portfolio diversification options.",
        ],
      },
      {
        title: "Financial Assessment",
        items: [
          "Property price evaluation.",
          "Acquisition cost estimation.",
          "Rental income analysis based on available evidence.",
          "Potential return calculations and scenario comparisons.",
          "Operating and ownership cost assessment.",
        ],
      },
      {
        title: "Risk Assessment",
        items: [
          "Market and location-related risk considerations.",
          "Project and developer assessment.",
          "Property documentation and eligibility coordination.",
          "Identification of investment limitations and assumptions.",
        ],
      },
      {
        title: "Investment Proposals",
        items: [
          "Individual investment reports.",
          "Property and project comparison reports.",
          "Location analysis.",
          "Financial projections based on available data.",
          "Evidence-based recommendations and key considerations.",
        ],
      },
      {
        title: "Investment Follow-up",
        items: [
          "Relevant market updates.",
          "Property performance monitoring where agreed.",
          "Ongoing advisory and portfolio reviews.",
        ],
      },
    ],
  },

  "property-management": {
    name: "Property Management",
    short: "Professional management for your property, long-term.",
    tagline: "Your Property, Professionally Managed.",
    intro:
      "We provide property management solutions designed to protect property value, simplify ownership, and support owners who require reliable ongoing supervision, particularly those living outside Türkiye.",
    seoDescription:
      "Property management in Istanbul for owners at home or abroad: administration, tenants, maintenance, owner reporting and performance monitoring.",
    sections: [
      {
        title: "Property Administration",
        items: [
          "Organize property records and documentation.",
          "Follow up on utility accounts and building or complex management fees.",
          "Coordinate with building and residential complex management.",
          "Maintain administrative records.",
        ],
      },
      {
        title: "Tenant Management",
        items: [
          "Coordinate tenant communication.",
          "Follow up on rental payments.",
          "Coordinate lease renewals.",
          "Support move-in and move-out arrangements.",
          "Receive and coordinate tenant requests.",
        ],
      },
      {
        title: "Maintenance & Operations",
        items: [
          "Coordinate routine maintenance.",
          "Arrange repair and technical services.",
          "Monitor property condition.",
          "Coordinate cleaning and property preparation.",
          "Liaise with service providers.",
        ],
      },
      {
        title: "Financial & Owner Reporting",
        items: [
          "Maintain income and expense records.",
          "Prepare maintenance expense summaries.",
          "Report rental payment status.",
          "Provide periodic property management reports.",
          "Keep owners informed of relevant matters.",
        ],
      },
      {
        title: "Property Performance",
        items: [
          "Monitor occupancy status.",
          "Review rental market conditions when requested.",
          "Recommend relevant property improvements.",
          "Monitor property readiness and presentation.",
        ],
      },
    ],
  },

  "after-sales-support": {
    name: "After-Sales Support",
    short: "Our commitment continues beyond the purchase.",
    tagline: "Our Relationship Doesn't End at the Purchase.",
    intro:
      "Our commitment continues beyond the property transaction. We assist owners with essential arrangements, administrative coordination, property preparation, and practical support during the initial ownership journey.",
    seoDescription:
      "After-sales support for property owners in Istanbul: handover, utility subscriptions, property preparation, settling in and ongoing assistance.",
    sections: [
      {
        title: "Property Handover Assistance",
        items: [
          "Coordinate handover appointments.",
          "Arrange or support property inspections.",
          "Record visible defects and outstanding items.",
          "Communicate with developers and responsible parties.",
          "Coordinate handover documentation.",
        ],
      },
      {
        title: "Utility & Administrative Assistance",
        items: [
          "Assist with electricity subscription procedures.",
          "Assist with water subscription procedures.",
          "Assist with natural gas subscription procedures.",
          "Coordinate relevant administrative appointments.",
          "Provide guidance on property-related registration procedures.",
        ],
      },
      {
        title: "Property Preparation",
        items: [
          "Coordinate cleaning services.",
          "Arrange furniture and furnishing support.",
          "Coordinate essential equipment and service arrangements.",
          "Prepare the property for occupancy.",
        ],
      },
      {
        title: "Relocation & Settlement Assistance",
        items: [
          "Coordinate relevant local services.",
          "Provide guidance on practical property-related arrangements.",
          "Support settlement requirements connected to the property.",
        ],
      },
      {
        title: "Ongoing Client Assistance",
        items: [
          "Receive property-related requests.",
          "Coordinate with relevant service providers.",
          "Follow up on outstanding matters.",
          "Refer clients to qualified specialists when required.",
        ],
      },
    ],
  },

  "citizenship-assistance": {
    name: "Citizenship Assistance",
    short: "Guidance and support for Turkish citizenship procedures.",
    tagline: "Guidance Through Every Step of Your Citizenship Journey.",
    intro:
      "We assist international clients exploring Turkish citizenship through real estate investment. Our role may include initial guidance, property eligibility coordination, document organization, and communication with qualified legal professionals.",
    seoDescription:
      "Turkish citizenship by real estate investment: eligibility guidance, property eligibility coordination, documents and follow-up with qualified lawyers.",
    note:
      "Citizenship eligibility and property qualification are verified under the rules in force at the time of application. Legal advice is provided by qualified lawyers, and no outcome can be promised or guaranteed.",
    sections: [
      {
        title: "Initial Eligibility Assessment",
        items: [
          "Understand the client's objectives and circumstances.",
          "Conduct a preliminary review of relevant eligibility considerations.",
          "Identify requirements that need professional verification.",
          "Coordinate consideration of family applications where relevant.",
        ],
      },
      {
        title: "Property Eligibility Coordination",
        items: [
          "Identify potentially eligible properties.",
          "Coordinate property documentation checks.",
          "Liaise with relevant legal and technical professionals.",
          "Support the property eligibility verification process.",
        ],
      },
      {
        title: "Documentation Assistance",
        items: [
          "Prepare document checklists.",
          "Coordinate document collection.",
          "Coordinate translation and notarization where required.",
          "Organize application files for review by the relevant professionals.",
        ],
      },
      {
        title: "Legal & Administrative Coordination",
        items: [
          "Coordinate with qualified lawyers.",
          "Communicate with relevant professionals.",
          "Coordinate appointments and administrative procedures.",
          "Follow up on outstanding requirements.",
        ],
      },
      {
        title: "Application Follow-up",
        items: [
          "Track application progress through the relevant contacts.",
          "Update clients on verified developments.",
          "Coordinate additional documentation where requested.",
          "Provide communication support throughout the process.",
        ],
      },
    ],
  },

  "interior-design": {
    name: "Interior Design & Furnishing",
    short: "Tailored design solutions for modern living.",
    tagline: "Spaces Designed Around the Way You Live.",
    intro:
      "We help transform properties into functional, comfortable, and visually refined spaces. Our interior design and furnishing solutions are tailored to each client's lifestyle, property type, intended use, and budget.",
    seoDescription:
      "Interior design and furnishing in Istanbul: concepts, visualization, furniture procurement, implementation and turnkey furnishing for homes and rentals.",
    styles: [
      {
        name: "Modern",
        description: "Clean lines, open layouts and a calm, neutral palette where every piece has a purpose.",
      },
      {
        name: "Contemporary",
        description: "Of the moment: current materials, sculptural forms and lighting that sets the mood.",
      },
      {
        name: "Minimalist",
        description: "Less, but better. Uncluttered rooms, hidden storage and light doing most of the work.",
      },
      {
        name: "Classic",
        description: "Timeless proportions, rich textiles and fine detailing that grow more beautiful with age.",
      },
      {
        name: "Neoclassical",
        description: "Classical elegance made lighter: mouldings, symmetry and soft tones in a modern home.",
      },
      {
        name: "Scandinavian",
        description: "Warm woods, soft textures and bright, practical rooms built for everyday comfort.",
      },
      {
        name: "Japandi",
        description: "Japanese restraint meets Scandinavian warmth: natural materials, low furniture, quiet calm.",
      },
      {
        name: "Mediterranean",
        description: "Sun-washed textures, natural stone and earthy colours suited to Bodrum and the coast.",
      },
    ],
    sections: [
      {
        title: "Design Consultation",
        items: [
          "Understand client preferences and lifestyle requirements.",
          "Assess the property and its characteristics.",
          "Define design objectives and intended use.",
          "Establish an initial budget and scope.",
        ],
      },
      {
        title: "Concept Development",
        items: [
          "Develop interior design concepts.",
          "Prepare mood boards and visual references.",
          "Select color palettes and materials.",
          "Develop furniture and lighting concepts.",
          "Plan the use of available space.",
        ],
      },
      {
        title: "Design & Visualization",
        items: [
          "Prepare interior layout concepts.",
          "Plan furniture placement.",
          "Specify materials and finishes.",
          "Coordinate 3D visualization and renderings where commissioned.",
        ],
      },
      {
        title: "Furniture & Procurement",
        items: [
          "Select furniture and accessories.",
          "Coordinate lighting and decorative elements.",
          "Source materials and products.",
          "Coordinate suppliers and purchasing.",
        ],
      },
      {
        title: "Implementation & Supervision",
        items: [
          "Coordinate contractors and implementation teams.",
          "Follow up on execution progress.",
          "Coordinate deliveries and installations.",
          "Monitor agreed quality and project milestones.",
        ],
      },
      {
        title: "Turnkey Furnishing Solutions",
        items: [
          "Provide complete furnishing coordination.",
          "Prepare rental properties for occupancy.",
          "Furnish investment properties.",
          "Coordinate final styling and readiness.",
        ],
      },
    ],
  },

  "project-sales-office-setup": {
    name: "Project & Sales Office Setup",
    short: "End-to-end support for your sales office and team.",
    tagline: "From Project Vision to Sales Performance.",
    intro:
      "We support real estate developers and project owners in establishing and organizing professional sales operations. From market assessment and sales strategy to team recruitment, office setup, and operational coordination, we help build structured sales environments around project objectives.",
    seoDescription:
      "Sales office setup for real estate developers in Istanbul: market assessment, sales strategy, team recruitment and training, CRM and sales operations.",
    sections: [
      {
        title: "Project & Market Assessment",
        items: [
          "Review the project and its positioning.",
          "Analyze the location and relevant competitors.",
          "Identify target audiences.",
          "Assess product positioning.",
          "Research market pricing and comparable projects.",
        ],
      },
      {
        title: "Sales Strategy Development",
        items: [
          "Develop a sales strategy and sales channels plan.",
          "Coordinate pricing strategy with the developer.",
          "Set sales targets and performance objectives.",
          "Define sales processes and reporting requirements.",
        ],
      },
      {
        title: "Sales Office Setup",
        items: [
          "Plan the sales office structure and operational requirements.",
          "Define the sales team structure.",
          "Support recruitment and team selection.",
          "Prepare job descriptions and responsibilities.",
          "Establish internal procedures and workflows.",
        ],
      },
      {
        title: "Team Training & Development",
        items: [
          "Coordinate sales team onboarding.",
          "Provide project and property knowledge training.",
          "Develop sales communication and negotiation skills.",
          "Establish customer relationship procedures.",
          "Support performance development.",
        ],
      },
      {
        title: "Sales Operations Management",
        items: [
          "Coordinate daily sales operations.",
          "Organize lead management processes.",
          "Coordinate CRM setup and workflows.",
          "Monitor sales activity and performance.",
          "Prepare operational and sales reports.",
          "Identify opportunities for process improvement.",
        ],
      },
      {
        title: "Customer & Handover Coordination",
        items: [
          "Establish customer communication procedures.",
          "Coordinate sales documentation workflows.",
          "Support coordination between sales and project teams.",
          "Coordinate the property handover process with responsible parties.",
        ],
      },
    ],
  },
};
