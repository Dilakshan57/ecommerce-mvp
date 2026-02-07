const products = [
    // ELECTRONICS (1-10)
    {
        name: 'AirPods Pro (2nd Gen)',
        image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Active Noise Cancellation and Transparency mode.',
        brand: 'Apple',
        category: 'Electronics',
        price: 249.00,
        countInStock: 15,
        rating: 4.8,
        numReviews: 45
    },
    {
        name: 'iPhone 15 Pro Max',
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Titanium design with 5x Telephoto camera.',
        brand: 'Apple',
        category: 'Electronics',
        price: 1199.00,
        countInStock: 8,
        rating: 4.9,
        numReviews: 22
    },
    {
        name: 'Sony WH-1000XM5',
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Industry-leading noise cancellation.',
        brand: 'Sony',
        category: 'Electronics',
        price: 399.99,
        countInStock: 20,
        rating: 4.7,
        numReviews: 38
    },
    {
        name: 'PlayStation 5 Console',
        image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Ultra-high speed SSD and ray tracing support.',
        brand: 'Sony',
        category: 'Electronics',
        price: 499.00,
        countInStock: 12,
        rating: 4.9,
        numReviews: 120
    },
    {
        name: 'Nintendo Switch OLED',
        image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Vibrant 7-inch OLED screen.',
        brand: 'Nintendo',
        category: 'Electronics',
        price: 349.99,
        countInStock: 10,
        rating: 4.8,
        numReviews: 55
    },
    {
        name: 'Samsung 27" Odyssey G7',
        image: 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?q=80&w=400&h=400&auto=format&fit=crop',
        description: '1000R curved gaming monitor.',
        brand: 'Samsung',
        category: 'Electronics',
        price: 699.00,
        countInStock: 6,
        rating: 4.5,
        numReviews: 14
    },
    {
        name: 'Logitech MX Master 3S',
        image: 'https://images.unsplash.com/photo-1629429464245-12d8a39d841e?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Precise wireless mouse for creators.',
        brand: 'Logitech',
        category: 'Electronics',
        price: 99.00,
        countInStock: 30,
        rating: 4.9,
        numReviews: 89
    },
    {
        name: 'Dell XPS 13 9315',
        image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Lightweight ultrabook with InfinityEdge display.',
        brand: 'Dell',
        category: 'Electronics',
        price: 999.00,
        countInStock: 4,
        rating: 4.6,
        numReviews: 19
    },
    {
        name: 'Canon EOS R5',
        image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Professional-grade mirrorless camera.',
        brand: 'Canon',
        category: 'Electronics',
        price: 3499.00,
        countInStock: 2,
        rating: 4.9,
        numReviews: 12
    },
    {
        name: 'DJI Mini 3 Pro',
        image: 'https://images.unsplash.com/photo-1508614589041-39d1bcc7b0ef?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Ultralight drone with 4K HDR camera.',
        brand: 'DJI',
        category: 'Electronics',
        price: 759.00,
        countInStock: 5,
        rating: 4.8,
        numReviews: 31
    },

    // ACCESSORIES (11-20)
    {
        name: 'Kindle Paperwhite',
        image: 'https://images.unsplash.com/photo-1592492159418-39f319320569?q=80&w=400&h=400&auto=format&fit=crop',
        description: '6.8” display and adjustable warm light.',
        brand: 'Amazon',
        category: 'Accessories',
        price: 139.99,
        countInStock: 25,
        rating: 4.7,
        numReviews: 210
    },
    {
        name: 'Mechanical Keyboard Blue',
        image: 'https://images.unsplash.com/photo-1541140134513-85a161dc4a00?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Tactile blue switches with RGB.',
        brand: 'Keychron',
        category: 'Accessories',
        price: 85.00,
        countInStock: 14,
        rating: 4.4,
        numReviews: 18
    },
    {
        name: 'Hydro Flask 32oz',
        image: 'https://images.unsplash.com/photo-1605342129063-e316d20367cb?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Insulated stainless steel water bottle.',
        brand: 'Hydro Flask',
        category: 'Accessories',
        price: 44.95,
        countInStock: 50,
        rating: 4.9,
        numReviews: 340
    },
    {
        name: 'Bellroy Classic Backpack',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb94c6a62?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Sleek design for urban commute.',
        brand: 'Bellroy',
        category: 'Accessories',
        price: 149.00,
        countInStock: 10,
        rating: 4.6,
        numReviews: 24
    },
    {
        name: 'Apple Watch Ultra 2',
        image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'For endurance and exploration.',
        brand: 'Apple',
        category: 'Accessories',
        price: 799.00,
        countInStock: 5,
        rating: 4.8,
        numReviews: 16
    },
    {
        name: 'Blue Yeti Microphone',
        image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Superior USB mic for podcasting.',
        brand: 'Blue',
        category: 'Accessories',
        price: 129.00,
        countInStock: 12,
        rating: 4.5,
        numReviews: 88
    },
    {
        name: 'SteelSeries Arctis Nova 7',
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Multi-platform wireless headset.',
        brand: 'SteelSeries',
        category: 'Accessories',
        price: 179.99,
        countInStock: 9,
        rating: 4.7,
        numReviews: 42
    },
    {
        name: 'Anker 737 Power Bank',
        image: 'https://images.unsplash.com/photo-1618414465744-2a621743048b?q=80&w=400&h=400&auto=format&fit=crop',
        description: '140W fast charge 24,000mAh bank.',
        brand: 'Anker',
        category: 'Accessories',
        price: 149.99,
        countInStock: 40,
        rating: 4.9,
        numReviews: 110
    },
    {
        name: 'Samsung T7 Shield 2TB',
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Rugged portable SSD with fast speeds.',
        brand: 'Samsung',
        category: 'Accessories',
        price: 189.00,
        countInStock: 18,
        rating: 4.8,
        numReviews: 65
    },
    {
        name: 'Matte Grey Desktop Mat',
        image: 'https://images.unsplash.com/photo-1616627741699-2715d0bf0a99?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Full-size minimalist felt desk mat.',
        brand: 'Generic',
        category: 'Accessories',
        price: 25.00,
        countInStock: 100,
        rating: 4.3,
        numReviews: 50
    },

    // APPLIANCES & HOME (21-30)
    {
        name: 'Dyson V15 Detect',
        image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Powerful cordless vacuum with lasers.',
        brand: 'Dyson',
        category: 'Home',
        price: 749.00,
        countInStock: 7,
        rating: 4.8,
        numReviews: 45
    },
    {
        name: 'Philips Hue Starter Kit',
        image: 'https://images.unsplash.com/photo-1550985543-f47f38aee65e?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Smart lighting system with Hue bridge.',
        brand: 'Philips',
        category: 'Home',
        price: 199.00,
        countInStock: 15,
        rating: 4.6,
        numReviews: 76
    },
    {
        name: 'Nespresso Vertuo Pop',
        image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Compact espresso machine.',
        brand: 'Nespresso',
        category: 'Home',
        price: 129.00,
        countInStock: 10,
        rating: 4.4,
        numReviews: 32
    },
    {
        name: 'Levoit Core 300 Air Purifier',
        image: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'H13 True HEPA Filter for smoke.',
        brand: 'Levoit',
        category: 'Home',
        price: 99.99,
        countInStock: 22,
        rating: 4.8,
        numReviews: 140
    },
    {
        name: 'KitchenAid Artisan Mixer',
        image: 'https://images.unsplash.com/photo-1594385208974-2e75f9d8ad48?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Iconic 5-quart tilt-head stand mixer.',
        brand: 'KitchenAid',
        category: 'Home',
        price: 449.00,
        countInStock: 5,
        rating: 4.9,
        numReviews: 230
    },
    {
        name: 'Herman Miller Aeron',
        image: 'https://images.unsplash.com/photo-1592074522311-8c074f5f02bc?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'The benchmark for ergonomic office chairs.',
        brand: 'Herman Miller',
        category: 'Office',
        price: 1695.00,
        countInStock: 3,
        rating: 4.9,
        numReviews: 88
    },
    {
        name: 'BenQ ScreenBar Halo',
        image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Eye-care monitor light with wireless controller.',
        brand: 'BenQ',
        category: 'Office',
        price: 179.00,
        countInStock: 8,
        rating: 4.7,
        numReviews: 29
    },
    {
        name: 'Timbuk2 Command Messenger',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'TSA-friendly laptop messenger bag.',
        brand: 'Timbuk2',
        category: 'Accessories',
        price: 159.00,
        countInStock: 12,
        rating: 4.5,
        numReviews: 14
    },
    {
        name: 'Sonos One (Gen 2)',
        image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'The smart speaker for music lovers.',
        brand: 'Sonos',
        category: 'Electronics',
        price: 219.00,
        countInStock: 9,
        rating: 4.7,
        numReviews: 56
    },
    {
        name: 'Yeti Rambler 20oz',
        image: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Insulated tumbler with MagSlider lid.',
        brand: 'Yeti',
        category: 'Accessories',
        price: 35.00,
        countInStock: 45,
        rating: 4.9,
        numReviews: 180
    },

    // FASHION & LIFESTYLE (31-40)
    {
        name: 'Ray-Ban Wayfarer Classic',
        image: 'https://images.unsplash.com/photo-1511499767390-a75c20389748?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Timeless style and superior optics.',
        brand: 'Ray-Ban',
        category: 'Fashion',
        price: 163.00,
        countInStock: 20,
        rating: 4.6,
        numReviews: 32
    },
    {
        name: 'Nike Air Force 1 "07',
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Triple white classic basketball shoes.',
        brand: 'Nike',
        category: 'Fashion',
        price: 110.00,
        countInStock: 15,
        rating: 4.8,
        numReviews: 450
    },
    {
        name: 'Fjällräven Kånken Backpack',
        image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Durable vinyl backpack with simple design.',
        brand: 'Fjällräven',
        category: 'Fashion',
        price: 80.00,
        countInStock: 25,
        rating: 4.5,
        numReviews: 98
    },
    {
        name: 'Herschel Supply Co. Little America',
        image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'The Mountaineering-Inspired silhouette.',
        brand: 'Herschel',
        category: 'Fashion',
        price: 110.00,
        countInStock: 10,
        rating: 4.4,
        numReviews: 26
    },
    {
        name: 'Patagonia Nano Puff Jacket',
        image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Warm, windproof, water-resistant.',
        brand: 'Patagonia',
        category: 'Fashion',
        price: 229.00,
        countInStock: 6,
        rating: 4.9,
        numReviews: 44
    },
    {
        name: 'Standard Issue Gym Bag',
        image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Durable canvas bag for the gym.',
        brand: 'Generic',
        category: 'Fitness',
        price: 45.00,
        countInStock: 20,
        rating: 4.2,
        numReviews: 12
    },
    {
        name: 'Birkenstock Arizona SFB',
        image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Soft footbed with suede leather.',
        brand: 'Birkenstock',
        category: 'Fashion',
        price: 140.00,
        countInStock: 12,
        rating: 4.8,
        numReviews: 56
    },
    {
        name: 'Carhartt Acrylic Watch Hat',
        image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Classic ribbed knit beanie.',
        brand: 'Carhartt',
        category: 'Fashion',
        price: 19.99,
        countInStock: 60,
        rating: 4.7,
        numReviews: 140
    },
    {
        name: 'Levi\'s 511 Slim Jeans',
        image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Classic slim fit denim in dark indigo.',
        brand: 'Levi\'s',
        category: 'Fashion',
        price: 69.50,
        countInStock: 18,
        rating: 4.5,
        numReviews: 82
    },
    {
        name: 'Vans Old Skool Casual',
        image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Iconic side stripe skate shoe.',
        brand: 'Vans',
        category: 'Fashion',
        price: 65.00,
        countInStock: 20,
        rating: 4.6,
        numReviews: 120
    },

    // MORE ELECTRONICS & GADGETS (41-50)
    {
        name: 'Razer DeathAdder V3 Pro',
        image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Ultralight wireless gaming mouse.',
        brand: 'Razer',
        category: 'Electronics',
        price: 149.99,
        countInStock: 14,
        rating: 4.8,
        numReviews: 19
    },
    {
        name: 'Asus ROG Swift PG279QM',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&h=400&auto=format&fit=crop',
        description: '240Hz QHD gaming monitor.',
        brand: 'Asus',
        category: 'Electronics',
        price: 799.00,
        countInStock: 4,
        rating: 4.7,
        numReviews: 11
    },
    {
        name: 'Bose Smart Soundbar 900',
        image: 'https://images.unsplash.com/photo-1545455213-102a9524fd0c?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Dolby Atmos cinematic sound.',
        brand: 'Bose',
        category: 'Electronics',
        price: 899.00,
        countInStock: 6,
        rating: 4.8,
        numReviews: 24
    },
    {
        name: 'Insta360 X3 Action Camera',
        image: 'https://images.unsplash.com/photo-1520390138845-fd2d229dd553?q=80&w=400&h=400&auto=format&fit=crop',
        description: '5.7K 360-degree creative camera.',
        brand: 'Insta360',
        category: 'Electronics',
        price: 449.99,
        countInStock: 10,
        rating: 4.7,
        numReviews: 16
    },
    {
        name: 'Seagate IronWolf 8TB HDD',
        image: 'https://images.unsplash.com/photo-1531492746076-1a1bd9b29fc0?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Network Attached Storage (NAS) hard drive.',
        brand: 'Seagate',
        category: 'Electronics',
        price: 199.99,
        countInStock: 12,
        rating: 4.6,
        numReviews: 29
    },
    {
        name: 'Google Pixel 8 Pro',
        image: 'https://images.unsplash.com/photo-1621330396173-e41b1812863b?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'The best Google camera in a phone yet.',
        brand: 'Google',
        category: 'Electronics',
        price: 999.00,
        countInStock: 8,
        rating: 4.7,
        numReviews: 31
    },
    {
        name: 'Microsoft Surface Pro 9',
        image: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Versatile 2-in-1 laptop and tablet.',
        brand: 'Microsoft',
        category: 'Electronics',
        price: 1099.00,
        countInStock: 5,
        rating: 4.5,
        numReviews: 14
    },
    {
        name: 'Lacie Rugged Mini 4TB',
        image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Shock, rain, and pressure resistant.',
        brand: 'Lacie',
        category: 'Accessories',
        price: 139.00,
        countInStock: 15,
        rating: 4.6,
        numReviews: 42
    },
    {
        name: 'Marshall Stanmore III',
        image: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Iconic home Bluetooth speaker.',
        brand: 'Marshall',
        category: 'Electronics',
        price: 379.00,
        countInStock: 5,
        rating: 4.8,
        numReviews: 18
    },
    {
        name: 'Samsung Galaxy Tab S9',
        image: 'https://images.unsplash.com/photo-1544244015-0cd4b3fe6520?q=80&w=400&h=400&auto=format&fit=crop',
        description: 'Premium tablet with S Pen included.',
        brand: 'Samsung',
        category: 'Electronics',
        price: 799.00,
        countInStock: 10,
        rating: 4.8,
        numReviews: 22
    }
];

module.exports = products;
