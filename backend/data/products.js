// // const products = [
// //   {
// //     name: "Prenatal Wellness Capsules",
// //     description:
// //       "Comprehensive prenatal supplement with L-Methylfolate, Vitamin B6, B12, Biotin and DHA to support maternal health and fetal development.",
// //     price: 39.99,
// //     discountPrice: 34.99,
// //     countInStock: 50,
// //     sku: "PN-WL-001",
// //     category: "Women's Health",
// //     brand: "Maclienson",
// //     collections: "Prenatal Care",
// //     material: "Herbal Extracts",
// //     "images": [
// //       {
// //           "url": "https://example.com/images/product1.jpg",
// //           "altText": "Product image 1"
// //       },
// //       {
// //           "url": "https://example.com/images/product1-alt.jpg",
// //           "altText": "Product alternate image"
// //       }
// //   ],
// //     isFeatured: true,
// //     isPublished: true,
// //     weight: "60 capsules",
// //   },
// //   {
// //     name: "Ayurvedic Women's Syrup",
// //     description:
// //       "Traditional Ayurvedic formula to support hormonal balance and women's wellness with natural herbs and extracts.",
// //     price: 29.99,
// //     discountPrice: 24.99,
// //     countInStock: 35,
// //     sku: "AY-WS-002",
// //     category: "Women's Health",
// //     brand: "Maclienson",
// //     collections: "Herbal Supplements",
// //     material: "Herbal Extracts",
// //     images: [
// //       {
// //         url: "https://example.com/images/product1-alt.jpg",
// //         altText: "Ayurvedic Women's Syrup bottle",
// //       },
// //       {
// //         "url": "https://example.com/images/product1-alt.jpg",
// //         "altText": "Product alternate image"
// //     }
// //     ],
// //     isFeatured: true,
// //     isPublished: true,
// //     weight: "200ml",
// //   },
// //   {
// //     name: "Sugar-Free Prenatal Sachets",
// //     description:
// //       "Sugar-free prenatal nutritional supplement in convenient sachets containing L-Arginine, Lycopene, L-Methyl Folate and Zinc.",
// //     price: 49.99,
// //     discountPrice: 44.99,
// //     countInStock: 25,
// //     sku: "PN-SF-003",
// //     category: "Women's Health",
// //     brand: "Maclienson",
// //     collections: "Prenatal Care",
// //     material: "Vitamins & Minerals",
// //     images: [
// //       {
// //         url: "https://example.com/images/prenatal-sachets.jpg",
// //         altText: "Sugar-Free Prenatal Sachets",
// //       },
// //       {
// //         "url": "https://example.com/images/product1-alt.jpg",
// //         "altText": "Product alternate image"
// //     }
// //     ],
// //     isFeatured: true,
// //     isPublished: true,
// //     weight: "30 sachets",
// //   },
// //   {
// //     name: "Metabolic Support Tablets",
// //     description:
// //       "Sustained-release tablets containing Myo Inositol and Metformin Hydrochloride for metabolic support.",
// //     price: 35.99,
// //     discountPrice: 29.99,
// //     countInStock: 40,
// //     sku: "MET-SR-004",
// //     category: "General Wellness",
// //     brand: "Maclienson",
// //     collections: "Metabolic Health",
// //     material: "Pharmaceutical Compounds",
// //     images: [
// //       {
// //         url: "https://example.com/images/metabolic-tablets.jpg",
// //         altText: "Metabolic Support Tablets",
// //       },
// //       {
// //         "url": "https://example.com/images/product1-alt.jpg",
// //         "altText": "Product alternate image"
// //     }
// //     ],
// //     isFeatured: false,
// //     isPublished: true,
// //     weight: "60 tablets",
// //   },
// //   {
// //     name: "Pain Relief Tablets",
// //     description:
// //       "Effective analgesic tablets for temporary relief of mild to moderate pain and fever reduction.",
// //     price: 19.99,
// //     discountPrice: 15.99,
// //     countInStock: 100,
// //     sku: "PR-TB-005",
// //     category: "General Wellness",
// //     brand: "Maclienson",
// //     collections: "Pain Relief",
// //     material: "Pharmaceutical Compounds",
// //     images: [
// //       {
// //         url: "https://example.com/images/pain-tablets.jpg",
// //         altText: "Pain Relief Tablets",
// //       },
// //       {
// //         "url": "https://example.com/images/product1-alt.jpg",
// //         "altText": "Product alternate image"
// //     }
// //     ],
// //     isFeatured: false,
// //     isPublished: true,
// //     weight: "30 tablets",
// //   },
// //   {
// //     name: "Hand Sanitizer Gel",
// //     description:
// //       "Alcohol-based hand sanitizer gel for effective disinfection and hygiene maintenance.",
// //     price: 9.99,
// //     discountPrice: 7.99,
// //     countInStock: 80,
// //     sku: "HS-GL-006",
// //     category: "Health Essentials",
// //     brand: "Maclienson",
// //     collections: "Infection Prevention",
// //     material: "Alcohol Solution",
// //     images: [
// //       {
// //         url: "https://example.com/images/sanitizer.jpg",
// //         altText: "Hand Sanitizer Gel",
// //       },
// //       {
// //         "url": "https://example.com/images/product1-alt.jpg",
// //         "altText": "Product alternate image"
// //     }
// //     ],
// //     isFeatured: true,
// //     isPublished: true,
// //     weight: "250ml",
// //   },
// //   {
// //     name: "Digestive Enzyme Capsules",
// //     description:
// //       "Digestive support capsules with a blend of enzymes to aid digestion and nutrient absorption.",
// //     price: 29.99,
// //     discountPrice: 24.99,
// //     countInStock: 45,
// //     sku: "DE-CP-007",
// //     category: "Digestive Health",
// //     brand: "Maclienson",
// //     collections: "Digestive Support",
// //     material: "Enzyme Blend",
// //     images: [
// //       {
// //         url: "https://example.com/images/digestive-capsules.jpg",
// //         altText: "Digestive Enzyme Capsules",
// //       },
// //       {
// //         "url": "https://example.com/images/product1-alt.jpg",
// //         "altText": "Product alternate image"
// //     }
// //     ],
// //    isFeatured: false,
// //     isPublished: true,
// //     weight: "60 capsules",
// //   },
// //   {
// //     name: "Multivitamin Complex",
// //     description:
// //       "Comprehensive multivitamin formula with essential vitamins and minerals for daily nutritional support.",
// //     price: 24.99,
// //     discountPrice: 19.99,
// //     countInStock: 60,
// //     sku: "MV-CP-008",
// //     category: "General Wellness",
// //     brand: "Maclienson",
// //     collections: "Daily Supplements",
// //     material: "Vitamins & Minerals",
// //     images: [
// //       {
// //         url: "https://example.com/images/multivitamin.jpg",
// //         altText: "Multivitamin Complex",
// //       },
// //       {
// //         "url": "https://example.com/images/product1-alt.jpg",
// //         "altText": "Product alternate image"
// //     }
// //     ],
// //     isFeatured: true,
// //     isPublished: true,
// //     weight: "90 tablets",
// //   },
// // ];

// // module.exports = products;

// const products = [
//   {
//     name: "Classic Oxford Button-Down Shirt",
//     description:
//       "This classic Oxford shirt is tailored for a polished yet casual look. Crafted from high-quality cotton, it features a button-down collar and a comfortable, slightly relaxed fit. Perfect for both formal and casual occasions, it comes with long sleeves, a button placket, and a yoke at the back. The shirt is finished with a gently rounded hem and adjustable button cuffs.",
//     price: 39.99,
//     discountPrice: 34.99,
//     countInStock: 20,
//     sku: "OX-SH-001",
//     category: "Top Wear",
//     brand: "Urban Threads",
//     collections: "Business Casual",
//     material: "Cotton",
//     isPublished: true,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=39",
//         altText: "Classic Oxford Button-Down Shirt Front View",
//       },
//       {
//         url: "https://picsum.photos/500/500?random=40",
//         altText: "Classic Oxford Button-Down Shirt Back View",
//       },
//     ],
//     rating: 4.5,
//     numReviews: 12,
//   },
//   {
//     name: "Slim-Fit Stretch Shirt",
//     description:
//       "A versatile slim-fit shirt perfect for business or evening events. Designed with a fitted silhouette, the added stretch provides maximum comfort throughout the day. Features a crisp turn-down collar, button placket, and adjustable cuffs.",
//     price: 29.99,
//     discountPrice: 24.99,
//     countInStock: 35,
//     sku: "SLIM-SH-002",
//     category: "Top Wear",
//     brand: "Modern Fit",
//     collections: "Formal Wear",
//     material: "Cotton Blend",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=41",
//         altText: "Slim-Fit Stretch Shirt Front View",
//       },
//       {
//         url: "https://picsum.photos/500/500?random=42",
//         altText: "Slim-Fit Stretch Shirt Back View",
//       },
//     ],
//     rating: 4.8,
//     numReviews: 15,
//   },
//   {
//     name: "Casual Denim Shirt",
//     description:
//       "This casual denim shirt is made from lightweight cotton denim. It features a regular fit, snap buttons, and a straight hem. With Western-inspired details, this shirt is perfect for layering or wearing solo.",
//     price: 49.99,
//     discountPrice: 44.99,
//     countInStock: 15,
//     sku: "CAS-DEN-003",
//     category: "Top Wear",
//     brand: "Street Style",
//     collections: "Casual Wear",
//     material: "Denim",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=43",
//         altText: "Casual Denim Shirt Front View",
//       },
//       {
//         url: "https://picsum.photos/500/500?random=44",
//         altText: "Casual Denim Shirt Back View",
//       },
//     ],
//     rating: 4.6,
//     numReviews: 8,
//   },
//   {
//     name: "Printed Resort Shirt",
//     description:
//       "Designed for summer, this printed resort shirt is perfect for vacation or weekend getaways. It features a relaxed fit, short sleeves, and a camp collar. The all-over tropical print adds a playful vibe.",
//     price: 29.99,
//     discountPrice: 22.99,
//     countInStock: 25,
//     sku: "PRNT-RES-004",
//     category: "Top Wear",
//     brand: "Beach Breeze",
//     collections: "Vacation Wear",
//     material: "Viscose",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=45",
//         altText: "Printed Resort Shirt Front View",
//       },
//       {
//         url: "https://picsum.photos/500/500?random=1",
//         altText: "Printed Resort Shirt Back View",
//       },
//     ],
//     rating: 4.4,
//     numReviews: 10,
//   },
//   {
//     name: "Slim-Fit Easy-Iron Shirt",
//     description:
//       "A slim-fit, easy-iron shirt in woven cotton fabric with a fitted silhouette. Features a turn-down collar, classic button placket, and a yoke at the back. Long sleeves and adjustable button cuffs with a rounded hem.",
//     price: 34.99,
//     discountPrice: 29.99,
//     countInStock: 30,
//     sku: "SLIM-EIR-005",
//     category: "Top Wear",
//     brand: "Urban Chic",
//     collections: "Business Wear",
//     material: "Cotton",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=47",
//         altText: "Slim-Fit Easy-Iron Shirt Front View",
//       },
//       {
//         url: "https://picsum.photos/500/500?random=2",
//         altText: "Slim-Fit Easy-Iron Shirt Front View",
//       },
//     ],
//     rating: 5,
//     numReviews: 14,
//   },
//   {
//     name: "Polo T-Shirt with Ribbed Collar",
//     description:
//       "A wardrobe classic, this polo t-shirt features a ribbed collar and cuffs. Made from 100% cotton, it offers breathability and comfort throughout the day. Tailored in a slim fit with a button placket at the neckline.",
//     price: 24.99,
//     discountPrice: 19.99,
//     countInStock: 50,
//     sku: "POLO-TSH-006",
//     category: "Top Wear",
//     brand: "Polo Classics",
//     collections: "Casual Wear",
//     material: "Cotton",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=3",
//         altText: "Polo T-Shirt Front View",
//       },
//       {
//         url: "https://picsum.photos/500/500?random=4",
//         altText: "Polo T-Shirt Back View",
//       },
//     ],
//     rating: 4.3,
//     numReviews: 22,
//   },
//   {
//     name: "Oversized Graphic T-Shirt",
//     description:
//       "An oversized graphic t-shirt that combines comfort with street style. Featuring bold prints across the chest, this relaxed fit tee offers a modern vibe, perfect for pairing with jeans or joggers.",
//     price: 19.99,
//     discountPrice: 15.99,
//     countInStock: 40,
//     sku: "OVS-GRF-007",
//     category: "Top Wear",
//     brand: "Street Vibes",
//     collections: "Streetwear",
//     material: "Cotton",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=5",
//         altText: "Oversized Graphic T-Shirt Front View",
//       },
//     ],
//     rating: 4.6,
//     numReviews: 30,
//   },
//   {
//     name: "Regular-Fit Henley Shirt",
//     description:
//       "A modern take on the classic Henley shirt, this regular-fit style features a buttoned placket and ribbed cuffs. Made from a soft cotton blend with a touch of elastane for stretch.",
//     price: 22.99,
//     discountPrice: 18.99,
//     countInStock: 35,
//     sku: "REG-HEN-008",
//     category: "Top Wear",
//     brand: "Heritage Wear",
//     collections: "Casual Wear",
//     material: "Cotton Blend",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=6",
//         altText: "Regular-Fit Henley Shirt Front View",
//       },
//     ],
//     rating: 4.5,
//     numReviews: 25,
//   },
//   {
//     name: "Long-Sleeve Thermal Tee",
//     description:
//       "Stay warm with this long-sleeve thermal tee, made from soft cotton with a waffle-knit texture. Ideal for layering in cooler months, the slim-fit design ensures a snug yet comfortable fit.",
//     price: 27.99,
//     discountPrice: 22.99,
//     countInStock: 20,
//     sku: "LST-THR-009",
//     category: "Top Wear",
//     brand: "Winter Basics",
//     collections: "Winter Essentials",
//     material: "Cotton",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=7",
//         altText: "Long-Sleeve Thermal Tee Front View",
//       },
//     ],
//     rating: 4.4,
//     numReviews: 18,
//   },
//   {
//     name: "V-Neck Classic T-Shirt",
//     description:
//       "A classic V-neck t-shirt for everyday wear. This regular-fit tee is made from breathable cotton and features a clean, simple design with a flattering V-neckline. Lightweight fabric and soft texture make it perfect for casual looks.",
//     price: 14.99,
//     discountPrice: 11.99,
//     countInStock: 60,
//     sku: "VNECK-CLS-010",
//     category: "Top Wear",
//     brand: "Everyday Comfort",
//     collections: "Basics",
//     material: "Cotton",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=8",
//         altText: "V-Neck Classic T-Shirt Front View",
//       },
//     ],
//     rating: 4.7,
//     numReviews: 28,
//   },
//   {
//     name: "Slim Fit Joggers",
//     description:
//       "Slim-fit joggers with an elasticated drawstring waist. Features ribbed hems and side pockets. Ideal for casual outings or workouts.",
//     price: 40,
//     discountPrice: 35,
//     countInStock: 20,
//     sku: "BW-001",
//     category: "Bottom Wear",
//     brand: "ActiveWear",
//     collections: "Casual Collection",
//     material: "Cotton Blend",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=9",
//         altText: "Slim Fit Joggers Front View",
//       },
//     ],
//     rating: 4.5,
//     numReviews: 12,
//   },
//   {
//     name: "Cargo Joggers",
//     description:
//       "Relaxed-fit cargo joggers featuring multiple pockets for functionality. Drawstring waist and cuffed hems for a modern look.",
//     price: 45,
//     discountPrice: 40,
//     countInStock: 15,
//     sku: "BW-002",
//     category: "Bottom Wear",
//     brand: "UrbanStyle",
//     collections: "Urban Collection",
//     material: "Cotton",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=10",
//         altText: "Cargo Joggers Front View",
//       },
//     ],
//     rating: 4.7,
//     numReviews: 20,
//   },
//   {
//     name: "Tapered Sweatpants",
//     description:
//       "Tapered sweatpants designed for comfort. Elastic waistband with adjustable drawstring, perfect for lounging or athletic activities.",
//     price: 35,
//     discountPrice: 30,
//     countInStock: 25,
//     sku: "BW-003",
//     category: "Bottom Wear",
//     brand: "ChillZone",
//     collections: "Lounge Collection",
//     material: "Fleece",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=11",
//         altText: "Tapered Sweatpants Front View",
//       },
//     ],
//     rating: 4.3,
//     numReviews: 18,
//   },
//   {
//     name: "Denim Jeans",
//     description:
//       "Classic slim-fit denim jeans with a slight stretch for comfort. Features a zip fly and five-pocket styling for a timeless look.",
//     price: 60,
//     discountPrice: 50,
//     countInStock: 30,
//     sku: "BW-004",
//     category: "Bottom Wear",
//     brand: "DenimCo",
//     collections: "Denim Collection",
//     material: "Denim",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=12",
//         altText: "Denim Jeans Front View",
//       },
//     ],
//     rating: 4.6,
//     numReviews: 22,
//   },
//   {
//     name: "Chino Pants",
//     description:
//       "Slim-fit chino pants made from stretch cotton twill. Features a button closure and front and back pockets. Ideal for both casual and semi-formal wear.",
//     price: 55,
//     discountPrice: 48,
//     countInStock: 40,
//     sku: "BW-005",
//     category: "Bottom Wear",
//     brand: "CasualLook",
//     collections: "Smart Casual Collection",
//     material: "Cotton",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=13",
//         altText: "Chino Pants Front View",
//       },
//     ],
//     rating: 4.8,
//     numReviews: 15,
//   },
//   {
//     name: "Track Pants",
//     description:
//       "Comfortable track pants with an elasticated waistband and tapered leg. Features side stripes for a sporty look. Ideal for athletic and casual wear.",
//     price: 40,
//     discountPrice: 35,
//     countInStock: 20,
//     sku: "BW-006",
//     category: "Bottom Wear",
//     brand: "SportX",
//     collections: "Activewear Collection",
//     material: "Polyester",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=14",
//         altText: "Track Pants Front View",
//       },
//     ],
//     rating: 4.2,
//     numReviews: 17,
//   },
//   {
//     name: "Slim Fit Trousers",
//     description:
//       "Tailored slim-fit trousers with belt loops and a hook-and-eye closure. Suitable for formal occasions or smart-casual wear.",
//     price: 65,
//     discountPrice: 55,
//     countInStock: 15,
//     sku: "BW-007",
//     category: "Bottom Wear",
//     brand: "ExecutiveStyle",
//     collections: "Office Wear",
//     material: "Polyester",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=15",
//         altText: "Slim Fit Trousers Front View",
//       },
//     ],
//     rating: 4.7,
//     numReviews: 10,
//   },
//   {
//     name: "Cargo Pants",
//     description:
//       "Loose-fit cargo pants with multiple utility pockets. Features adjustable ankle cuffs and a drawstring waist for versatility and comfort.",
//     price: 50,
//     discountPrice: 45,
//     countInStock: 25,
//     sku: "BW-008",
//     category: "Bottom Wear",
//     brand: "StreetWear",
//     collections: "Street Style Collection",
//     material: "Cotton",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=16",
//         altText: "Cargo Pants Front View",
//       },
//     ],
//     rating: 4.5,
//     numReviews: 13,
//   },
//   {
//     name: "Relaxed Fit Sweatpants",
//     description:
//       "Relaxed-fit sweatpants made from soft fleece fabric. Features an elastic waist and adjustable drawstring for a custom fit.",
//     price: 35,
//     discountPrice: 30,
//     countInStock: 35,
//     sku: "BW-009",
//     category: "Bottom Wear",
//     brand: "LoungeWear",
//     collections: "Lounge Collection",
//     material: "Fleece",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=17",
//         altText: "Relaxed Fit Sweatpants Front View",
//       },
//     ],
//     rating: 4.3,
//     numReviews: 14,
//   },
//   {
//     name: "Formal Dress Pants",
//     description:
//       "Classic formal dress pants with a slim fit. Made from lightweight, wrinkle-resistant fabric for a polished look at the office or formal events.",
//     price: 70,
//     discountPrice: 60,
//     countInStock: 20,
//     sku: "BW-010",
//     category: "Bottom Wear",
//     brand: "ElegantStyle",
//     collections: "Formal Collection",
//     material: "Polyester",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=18",
//         altText: "Formal Dress Pants Front View",
//       },
//     ],
//     rating: 4.9,
//     numReviews: 8,
//   },
//   {
//     name: "High-Waist Skinny Jeans",
//     description:
//       "High-waist skinny jeans in stretch denim with a button and zip fly. Features a flattering fit that hugs your curves and enhances your silhouette.",
//     price: 50,
//     discountPrice: 45,
//     countInStock: 30,
//     sku: "BW-W-001",
//     category: "Bottom Wear",
//     brand: "DenimStyle",
//     collections: "Denim Collection",
//     material: "Denim",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=19",
//         altText: "High-Waist Skinny Jeans",
//       },
//     ],
//     rating: 4.8,
//     numReviews: 20,
//   },
//   {
//     name: "Wide-Leg Trousers",
//     description:
//       "Flowy, wide-leg trousers with a high waist and side pockets. Perfect for an elegant look that combines comfort and style.",
//     price: 60,
//     discountPrice: 55,
//     countInStock: 25,
//     sku: "BW-W-002",
//     category: "Bottom Wear",
//     brand: "ElegantWear",
//     collections: "Formal Collection",
//     material: "Polyester",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=20",
//         altText: "Wide-Leg Trousers Front View",
//       },
//     ],
//     rating: 4.7,
//     numReviews: 15,
//   },
//   {
//     name: "Stretch Leggings",
//     description:
//       "Soft, stretch leggings in a high-rise style. Perfect for lounging, working out, or casual wear, with a smooth fit that flatters your body.",
//     price: 25,
//     discountPrice: 20,
//     countInStock: 40,
//     sku: "BW-W-003",
//     category: "Bottom Wear",
//     brand: "ComfyFit",
//     collections: "Activewear Collection",
//     material: "Cotton Blend",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=21",
//         altText: "Stretch Leggings Front View",
//       },
//     ],
//     rating: 4.5,
//     numReviews: 30,
//   },
//   {
//     name: "Pleated Midi Skirt",
//     description:
//       "Elegant pleated midi skirt with a high waistband and soft fabric that drapes beautifully. Ideal for both formal and casual occasions.",
//     price: 55,
//     discountPrice: 50,
//     countInStock: 20,
//     sku: "BW-W-004",
//     category: "Bottom Wear",
//     brand: "ChicStyle",
//     collections: "Spring Collection",
//     material: "Polyester",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=22",
//         altText: "Pleated Midi Skirt Front View",
//       },
//     ],
//     rating: 4.6,
//     numReviews: 18,
//   },
//   {
//     name: "Flared Palazzo Pants",
//     description:
//       "High-waist palazzo pants with a loose, flowing fit. Comfortable and stylish, making them perfect for casual outings or beach days.",
//     price: 45,
//     discountPrice: 40,
//     countInStock: 35,
//     sku: "BW-W-005",
//     category: "Bottom Wear",
//     brand: "BreezyVibes",
//     collections: "Summer Collection",
//     material: "Linen Blend",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=23",
//         altText: "Flared Palazzo Pants Front View",
//       },
//     ],
//     rating: 4.4,
//     numReviews: 22,
//   },
//   {
//     name: "High-Rise Joggers",
//     description:
//       "Comfortable high-rise joggers with an elastic waistband and drawstring for a perfect fit. Great for lounging or working out.",
//     price: 40,
//     discountPrice: 35,
//     countInStock: 30,
//     sku: "BW-W-006",
//     category: "Bottom Wear",
//     brand: "ActiveWear",
//     collections: "Loungewear Collection",
//     material: "Cotton Blend",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=24",
//         altText: "High-Rise Joggers Front View",
//       },
//     ],
//     rating: 4.3,
//     numReviews: 25,
//   },
//   {
//     name: "Paperbag Waist Shorts",
//     description:
//       "Stylish paperbag waist shorts with a belted waist and wide legs. Perfect for summer outings and keeping cool in style.",
//     price: 35,
//     discountPrice: 30,
//     countInStock: 20,
//     sku: "BW-W-007",
//     category: "Bottom Wear",
//     brand: "SunnyStyle",
//     collections: "Summer Collection",
//     material: "Cotton",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=25",
//         altText: "Paperbag Waist Shorts Front View",
//       },
//     ],
//     rating: 4.5,
//     numReviews: 19,
//   },
//   {
//     name: "Stretch Denim Shorts",
//     description:
//       "Comfortable stretch denim shorts with a high-waisted fit and raw hem. Perfect for pairing with your favorite tops during warmer months.",
//     price: 40,
//     discountPrice: 35,
//     countInStock: 25,
//     sku: "BW-W-008",
//     category: "Bottom Wear",
//     brand: "DenimStyle",
//     collections: "Denim Collection",
//     material: "Denim",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=26",
//         altText: "Stretch Denim Shorts Front View",
//       },
//     ],
//     rating: 4.7,
//     numReviews: 15,
//   },
//   {
//     name: "Culottes",
//     description:
//       "Wide-leg culottes with a flattering high waist and cropped length. The perfect blend of comfort and style for any casual occasion.",
//     price: 50,
//     discountPrice: 45,
//     countInStock: 30,
//     sku: "BW-W-009",
//     category: "Bottom Wear",
//     brand: "ChicStyle",
//     collections: "Casual Collection",
//     material: "Polyester",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=27",
//         altText: "Culottes Front View",
//       },
//     ],
//     rating: 4.6,
//     numReviews: 23,
//   },
//   {
//     name: "Classic Pleated Trousers",
//     description:
//       "Timeless pleated trousers with a tailored fit. A wardrobe essential for workwear or formal occasions.",
//     price: 70,
//     discountPrice: 65,
//     countInStock: 25,
//     sku: "BW-W-010",
//     category: "Bottom Wear",
//     brand: "ElegantWear",
//     collections: "Formal Collection",
//     material: "Wool Blend",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=28",
//         altText: "Classic Pleated Trousers Front View",
//       },
//     ],
//     rating: 4.8,
//     numReviews: 20,
//   },
//   {
//     name: "Knitted Cropped Top",
//     description:
//       "A stylish knitted cropped top with a flattering fitted silhouette. Perfect for pairing with high-waisted jeans or skirts for a casual look.",
//     price: 40,
//     discountPrice: 35,
//     countInStock: 25,
//     sku: "TW-W-001",
//     category: "Top Wear",
//     brand: "ChicKnit",
//     collections: "Knits Collection",
//     material: "Cotton Blend",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=29",
//         altText: "Knitted Cropped Top",
//       },
//     ],
//     rating: 4.6,
//     numReviews: 15,
//   },
//   {
//     name: "Boho Floral Blouse",
//     description:
//       "Flowy boho blouse with floral patterns, featuring a relaxed fit and balloon sleeves. Ideal for casual summer days.",
//     price: 50,
//     discountPrice: 45,
//     countInStock: 30,
//     sku: "TW-W-002",
//     category: "Top Wear",
//     brand: "BohoVibes",
//     collections: "Summer Collection",
//     material: "Viscose",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=30",
//         altText: "Boho Floral Blouse",
//       },
//     ],
//     rating: 4.7,
//     numReviews: 20,
//   },
//   {
//     name: "Casual T-Shirt",
//     description:
//       "A soft, breathable casual t-shirt with a classic fit. Features a round neckline and short sleeves, perfect for everyday wear.",
//     price: 25,
//     discountPrice: 20,
//     countInStock: 50,
//     sku: "TW-W-003",
//     category: "Top Wear",
//     brand: "ComfyTees",
//     collections: "Essentials",
//     material: "Cotton",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=31",
//         altText: "Casual T-Shirt",
//       },
//     ],
//     rating: 4.5,
//     numReviews: 25,
//   },
//   {
//     name: "Off-Shoulder Top",
//     description:
//       "An elegant off-shoulder top with ruffled sleeves and a flattering fit. Ideal for adding a touch of femininity to your outfit.",
//     price: 45,
//     discountPrice: 40,
//     countInStock: 35,
//     sku: "TW-W-004",
//     category: "Top Wear",
//     brand: "Elegance",
//     collections: "Evening Collection",
//     material: "Polyester",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=32",
//         altText: "Off-Shoulder Top",
//       },
//     ],
//     rating: 4.7,
//     numReviews: 18,
//   },
//   {
//     name: "Lace-Trimmed Cami Top",
//     description:
//       "A delicate cami top with lace trim and adjustable straps. The lightweight fabric makes it perfect for layering or wearing alone during warmer weather.",
//     price: 35,
//     discountPrice: 30,
//     countInStock: 40,
//     sku: "TW-W-005",
//     category: "Top Wear",
//     brand: "DelicateWear",
//     collections: "Lingerie-Inspired",
//     material: "Silk Blend",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=33",
//         altText: "Lace-Trimmed Cami Top",
//       },
//     ],
//     rating: 4.8,
//     numReviews: 22,
//   },
//   {
//     name: "Graphic Print Tee",
//     description:
//       "A trendy graphic print tee with a relaxed fit. Pair it with jeans or skirts for a cool and casual look.",
//     price: 30,
//     discountPrice: 25,
//     countInStock: 45,
//     sku: "TW-W-006",
//     category: "Top Wear",
//     brand: "StreetStyle",
//     collections: "Urban Collection",
//     material: "Cotton",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=34",
//         altText: "Graphic Print Tee",
//       },
//     ],
//     rating: 4.6,
//     numReviews: 30,
//   },
//   {
//     name: "Ribbed Long-Sleeve Top",
//     description:
//       "A cozy ribbed long-sleeve top that offers comfort and style. Perfect for layering during cooler months.",
//     price: 55,
//     discountPrice: 50,
//     countInStock: 30,
//     sku: "TW-W-007",
//     category: "Top Wear",
//     brand: "ComfortFit",
//     collections: "Fall Collection",
//     material: "Cotton Blend",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=35",
//         altText: "Ribbed Long-Sleeve Top",
//       },
//     ],
//     rating: 4.7,
//     numReviews: 26,
//   },
//   {
//     name: "Ruffle-Sleeve Blouse",
//     description:
//       "A lightweight ruffle-sleeve blouse with a flattering fit. Perfect for a feminine touch to any outfit.",
//     price: 45,
//     discountPrice: 40,
//     countInStock: 20,
//     sku: "TW-W-008",
//     category: "Top Wear",
//     brand: "FeminineWear",
//     collections: "Summer Collection",
//     material: "Viscose",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=36",
//         altText: "Ruffle-Sleeve Blouse",
//       },
//     ],
//     rating: 4.5,
//     numReviews: 19,
//   },
//   {
//     name: "Classic Button-Up Shirt",
//     description:
//       "A versatile button-up shirt that can be dressed up or down. Made from soft fabric with a tailored fit, it's perfect for both casual and formal occasions.",
//     price: 60,
//     discountPrice: 55,
//     countInStock: 25,
//     sku: "TW-W-009",
//     category: "Top Wear",
//     brand: "ClassicStyle",
//     collections: "Office Collection",
//     material: "Cotton",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=37",
//         altText: "Classic Button-Up Shirt",
//       },
//     ],
//     rating: 4.8,
//     numReviews: 25,
//   },
//   {
//     name: "V-Neck Wrap Top",
//     description:
//       "A chic v-neck wrap top with a tie waist. Its elegant style makes it perfect for both casual and semi-formal occasions.",
//     price: 50,
//     discountPrice: 45,
//     countInStock: 30,
//     sku: "TW-W-010",
//     category: "Top Wear",
//     brand: "ChicWrap",
//     collections: "Evening Collection",
//     material: "Polyester",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=38",
//         altText: "V-Neck Wrap Top",
//       },
//     ],
//     rating: 4.7,
//     numReviews: 22,
//   },
// ];

// module.exports = products;


// backend/data/product.js

const products = [
  {
    name: "Macnurish",
    description:
      "Macnurish Sachet is a sugar-free prenatal supplement that supports fetal development and maternal health with key nutrients like L-Arginine, Lycopene, L-Methyl Folate, and Zinc.",
    price: 10,
    countInStock: 100,
    sku: "MACNURISH-001",
    category: "Women",
    subcategory: "Nutritional Supplement",
    brand: "Macliens",
    collections: "Prenatal",
    images: [
      {
        url: "https://res.cloudinary.com/dtk66nmp1/image/upload/v1747383647/macnurish_p_nv0j9l.png",
        altText: "Macnurish Sachet Product",
      },
    ],
    isFeatured: true,
    isPublished: true,
    rating: 4.8,
    numReviews: 20,
    tags: ["prenatal", "sugar-free", "nutritional"],
    date: "2025-04-10",
    bestseller: true,
  },
  {
    name: "Nurturmac",
    description:
      "Nurturmac is a prenatal softgel capsule enriched with L-Methylfolate, Vitamin B6, B12, Biotin, and DHA to support maternal health and fetal development.",
    price: 10,
    countInStock: 80,
    sku: "NURTURMAC-002",
    category: "Women",
    subcategory: "Nutritional Supplement",
    brand: "Macliens",
    collections: "Prenatal",
    images: [
      {
        url: "https://res.cloudinary.com/dtk66nmp1/image/upload/v1747383672/nurturmac_sqkwt0.png",
        altText: "Nurturmac Softgel Capsules",
      },
    ],
    isFeatured: true,
    isPublished: true,
    rating: 4.7,
    numReviews: 18,
    tags: ["prenatal", "capsule", "dha"],
    date: "2025-04-10",
    bestseller: true,
  },
  {
    name: "SYNDROVA-MET SR Tablets",
    description:
      "Manage your health with Syndrova-Met SR, a sustained-release tablet containing Myo Inositol and Metformin Hydrochloride.",
    price: 10,
    countInStock: 120,
    sku: "SYN-MET-003",
    category: "Women",
    subcategory: "Nutritional Supplement",
    brand: "Macliens",
    collections: "Diabetic Care",
    images: [
      {
        url: "https://res.cloudinary.com/dtk66nmp1/image/upload/v1747383699/syndrova_met_sr_t_a5zoba.png",
        altText: "Syndrova-Met SR Tablets",
      },
    ],
    isFeatured: false,
    isPublished: true,
    rating: 4.5,
    numReviews: 15,
    tags: ["metformin", "inositol", "sr"],
    date: "2025-04-10",
    bestseller: true,
  },
  {
    name: "Flavona Forte Syrup",
    description:
      "Flavona Forte Syrup is an advanced Ayurvedic formula crafted for women's wellness, helping to correct hormonal imbalance, boost vitality, and enhance overall well-being.",
    price: 50,
    countInStock: 75,
    sku: "FLAV-FORTE-004",
    category: "Women",
    subcategory: "Herbal Supplement",
    brand: "Macliens",
    collections: "Ayurvedic Care",
    images: [
      {
        url: "https://res.cloudinary.com/dtk66nmp1/image/upload/v1747390918/macliensonhealthcare/vt1iqrtnjuj9azkmp8zx.png",
        altText: "Flavona Forte Syrup",
      },
    ],
    isFeatured: false,
    isPublished: true,
    rating: 4.6,
    numReviews: 10,
    tags: ["ayurvedic", "hormonal", "wellness"],
    date: "2025-04-10",
    bestseller: true,
  },
  // Repeating tabletsrx with unique SKUs and Cloudinary URL
  ...Array.from({ length: 13 }, (_, i) => ({
    name: "Tabletsrx",
    description:
      "Tabletsrx is effective for treating fever and mild to moderate pain.",
    price: 50,
    countInStock: 150,
    sku: `TABRX-${i + 5}`,
    category: "Women",
    subcategory: "Analgesic",
    brand: "Macliens",
    collections: "Pain Relief",
    images: [
      {
        url: "https://res.cloudinary.com/dtk66nmp1/image/upload/v1747383715/tabletsrx_twy7cu.png",
        altText: "Tabletsrx Analgesic Tablets",
      },
    ],
    isFeatured: false,
    isPublished: true,
    rating: 4.4,
    numReviews: 8,
    tags: ["analgesic", "pain", "fever"],
    date: "2025-04-10",
    bestseller: true,
  })),
];

module.exports = products;

