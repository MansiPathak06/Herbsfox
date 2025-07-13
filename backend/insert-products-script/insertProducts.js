const mysql = require("mysql2/promise");

const dbConfig = {
  host: "sql7.freesqldatabase.com",
  user: "sql7788747",
  password: "M9svtMzXbw",
  database: "sql7788747",
};

const products = [
  {
    name: "Ashok Chaal",
    slug: "ashok-chaal",
    main_image: "/images/ashok-chaal-2.webp",
    sub_image1: "/images/ashok-chaal-1.webp",
    sub_image2: "/images/ashok-chaal-3.webp",
    sub_image3: "/images/ashok-chaal-4.webp",
    price_range: "Rs.202.00-Rs.255.00",
    technical_name: "Saraca indica",
    about: "Ashok chaal is used in Ayurvedic medicines...",
    sku: "ASHOK-001",
    category: "herbs",
    description: "Used for female health and uterine wellness...",
    weight_price_map: {
      "100g": 202,
      "250g": 255,
    },
  },
  {
    name: "Ashwagandha",
    slug: "ashwagandha",
    main_image: "/images/ashwagandha-2.webp",
    sub_image1: "/images/ashwagandha-1.webp",
    sub_image2: "/images/ashwagandha-3.webp",
    sub_image3: "/images/ashwagandha-4.webp",
    price_range: "Rs.264.00-Rs.767.00",
    technical_name: "Withania somnifera",
    about: "Ashwagandha is a powerful adaptogen...",
    sku: "ASHWA-002",
    category: "herbs",
    description: "Boosts immunity and reduces stress...",
    weight_price_map: {
      "100g": 202,
      "250g": 255,
    },
  },
  // 🧠 Add all 43 products here in same format
];

async function run() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log("📦 Inserting products...");

    for (const product of products) {
      await connection.execute(
        `INSERT INTO products 
  (name, slug, main_image, sub_image1, sub_image2, sub_image3,
  price_range, technical_name, about, sku, category, description, weight_price_map)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          product.name,
          product.slug,
          product.main_image,
          product.sub_image1,
          product.sub_image2,
          product.sub_image3,
          product.price_range,
          product.technical_name,
          product.about,
          product.sku,
          product.category,
          product.description,
          JSON.stringify(product.weight_price_map), // 🟡 Insert as JSON string
        ]
      );
    }

    console.log("✅ Products inserted successfully!");
    await connection.end();
  } catch (err) {
    console.error("❌ Error inserting products:", err);
  }
}

run();
