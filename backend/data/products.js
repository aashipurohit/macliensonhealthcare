

const products = [
  {
    name: "Macnurish",
    description:
      "Macnurish Sachet is a sugar-free prenatal supplement that supports fetal development and maternal health with key nutrients like L-Arginine, Lycopene, L-Methyl Folate, and Zinc.This premium pharmaceutical product is formulated with the highest quality ingredients to ensure maximum efficacy and safety. Each batch undergoes rigorous quality testing to meet industry standards.Recommended for: Daily nutritional support.Storage: Keep in a cool, dry place away from direct sunlight.",


    createdAt: new Date("2025-06-10"),
    price: 69,
    countInStock: 100,
    sku: "MACNURISH-001",
    category: ["Women"],
    subcategory: "Nutritional Supplement",
    brand: "Macliensonhealthcare",
    collections: "Prenatal",
    // subcategory: "Nutritional Supplement",
     prescriptionRequired:"false",
     bestseller: true,
    images: [
      {
        url: "https://res.cloudinary.com/dtk66nmp1/image/upload/w_300,q_60,f_auto/v1747383647/macnurish_p_nv0j9l.png",
        altText: "Macnurish Sachet Product",
      },
    ],
    isFeatured: true,
    isPublished: true,
    rating: 4.8,
    numReviews: 20,
    tags: ["prenatal", "sugar-free", "nutritional"],
    date: "2025-06-10",
    bestseller: true,
    quantity:"/Sachet",
    user: "6914cc85668bb5d8634cfbe3"
  },
  {
    name: "Nurturmac",
    description:
      "Nurturmac is a prenatal softgel capsule enriched with L-Methylfolate, Vitamin B6, B12, Biotin, and DHA to support maternal health and fetal development.",
    price: 240,
    createdAt: new Date("2025-06-10"),
    countInStock: 80,
    sku: "NURTURMAC-002",
    category: ["Women"],
    subcategory: "Nutritional Supplement",
    brand: "Macliensonhealthcare",
    collections: "Prenatal",
    images: [
      {
        url: "https://res.cloudinary.com/dtk66nmp1/image/upload/w_300,q_60,f_auto/v1747383672/nurturmac_sqkwt0.png",
        altText: "Nurturmac Softgel Capsules",
      },
    ],
    isFeatured: true,
    isPublished: true,
    rating: 4.7,
    numReviews: 18,
    tags: ["prenatal", "capsule", "dha"],
    date: "2025-07-10",
    bestseller: true,
    quantity:"/Strip",
    prescriptionRequired: "false",
    user: "6914cc85668bb5d8634cfbe3"
    
  },
  {
    name: "SYNDROVA-MET SR Tablets",
    description:
      "Manage your health with Syndrova-Met SR, a sustained-release tablet containing Myo Inositol and Metformin Hydrochloride.",
    price: 276,
    createdAt: new Date("2025-06-10"),
    countInStock: 120,
    sku: "SYN-MET-003",
    category: ["Women"],
    subcategory: "Nutritional Supplement",
    brand: "Macliensonhealthcare",
    collections: "Diabetic Care",
    images: [
      {
        url: "https://res.cloudinary.com/dtk66nmp1/image/upload/w_300,q_60,f_auto/v1747383699/syndrova_met_sr_t_a5zoba.png",
        altText: "Syndrova-Met SR Tablets",
      },
    ],
    isFeatured: true,
    isPublished: true,
    rating: 4.5,
    numReviews: 15,
    tags: ["metformin", "inositol", "sr"],
    date: "2025-07-15",
    bestseller: true,
    quantity:"/Strip",
    prescriptionRequired:"false",
    user: "6914cc85668bb5d8634cfbe3"
  },
  {
    name: "Flavona Forte Syrup",
    description:
      "Flavona Forte Syrup is an advanced Ayurvedic formula crafted for women's wellness, helping to correct hormonal imbalance, boost vitality, and enhance overall well-being.",
    price: 369,
    createdAt: new Date("2025-06-10"),
    countInStock: 75,
    sku: "FLAV-FORTE-004",
    category: ["Women"],
    subcategory: "Herbal Supplement",
    brand: "Macliensonhealthcare",
    collections: "Ayurvedic Care",
    images: [
      {
        url: "https://res.cloudinary.com/dtk66nmp1/image/upload/w_300,q_60,f_auto/v1747390918/macliensonhealthcare/vt1iqrtnjuj9azkmp8zx.png",
        altText: "Flavona Forte Syrup",
      },
    ],
    isFeatured: true,
    isPublished: true,
    rating: 4.6,
    numReviews: 10,
    tags: ["ayurvedic", "hormonal", "wellness"],
    date: "2025-09-10",
    bestseller: true,
    quantity:"250 ml",
    prescriptionRequired:"false",
    user: "6914cc85668bb5d8634cfbe3"
  },
  {
    name: "URIblend",
    description: `URIblend Syrup is a nutraceutical for urinary tract health and kidney stone prevention. 
Cranberry Extract, D-Mannose & Potassium Magnesium Citrate Syrup. 
Sugar-free, Cranberry flavour. 
Suggested use: 2 teaspoonful in a glass of water, twice or thrice a day, or as prescribed by physician. 
Not for medicinal use. Limited shelf life. Mfg. Lic No: 1222BB0000374, Batch No: G0HL-4842, Mfg. Date: OCT-2025, Exp. Date: MAR-2027. 
Marketed by Maclienson Healthcare Pvt. Ltd., Ratlam, MP.`,
    price: 180,
    countInStock: 100,
    sku: "URIBLEND-005",
    category: ["Health"],
    subcategory: "Nutraceutical",
    brand: "Macliensonhealthcare",
    collections: "Ayurvedic Care",
    images: [
      {
        url: "https://res.cloudinary.com/dtk66nmp1/image/upload/v1762970352/uriblend_pzhd5d.jpg",
        altText: "URIblend Syrup",
      },
    ],
    isFeatured: true,
    isPublished: true,
    rating: 4.6,
    numReviews: 10,
    tags: ["urinary", "kidney", "sugar-free", "cranberry"],
    quantity: "200ml",
    prescriptionRequired: false,
    bestseller: true,
    user: "6914cc85668bb5d8634cfbe3"
    
  },
  {
    name: "Newtriment",
    description: `Newtriment Syrup is a multivitamin, multimineral & L-Lysine syrup designed to support growth, appetite, and overall well-being. 
Contains L-Lysine (promotes healthy growth & calcium absorption), multivitamins (boost energy & immunity), and multiminerals (support bones, nerves & muscles). 
Indications: Supports growth & appetite in children, helps recovery during illness or weakness, corrects vitamin & mineral deficiencies, boosts immunity. Sugar-free, fruit flavour. 150ml.`,
    price: 250, // you can adjust
    countInStock: 80,
    sku: "NEWTRIMENT-006",
    category: ["Health"],
    subcategory: "Nutritional Supplement",
    brand: "Macliensonhealthcare",
    collections: "Ayurvedic Care",
    images: [
      {
        url: "https://res.cloudinary.com/dtk66nmp1/image/upload/v1762970352/newtriment_gzmses.jpg",
        altText: "Newtriment Syrup",
      },
    ],
    isFeatured: true,
    isPublished: true,
    rating: 4.7,
    numReviews: 8,
    tags: ["multivitamin", "lysine", "growth", "immunity", "children"],
    quantity: "150ml",
    prescriptionRequired: false,
    bestseller: true,
    user: "6914cc85668bb5d8634cfbe3"
    
  },
  // Repeating tabletsrx with unique SKUs and Cloudinary URL
  ...Array.from({ length: 4 }, (_, i) => ({
    name: "Tabletsrx",
    description:
      "Tabletsrx is effective for treating fever and mild to moderate pain.",
    price: 20,
    createdAt: new Date("2025-05-10"),
    countInStock: 150,
    sku: `TABRX-${i + 5}`,
    category: ["Women"],
    subcategory: "Analgesic",
    brand: "Macliens",
    collections: "Pain Relief",
    images: [
      {
        url: "https://res.cloudinary.com/dtk66nmp1/image/upload/w_300,q_60,f_auto/v1747383715/tabletsrx_twy7cu.png",
        altText: "Tabletsrx Analgesic Tablets",
      },
    ],
    isFeatured: false,
    isPublished: true,
    rating: 4.4,
    numReviews: 8,
    tags: ["analgesic", "pain", "fever"],
    date: "2025-02-10",
    bestseller: true,
    quantity:"/Strip",
    prescriptionRequired:"false",
    user: "6914cc85668bb5d8634cfbe3"
  })),
];

module.exports = products;

