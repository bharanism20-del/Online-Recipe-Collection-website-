import { Recipe } from '../types/recipe';

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'tartine-heirloom-ricotta',
    title: 'Heirloom Tomato & Whipped Ricotta Tartine',
    subtitle: 'On char-grilled sourdough with basil and cold-pressed olive oil',
    description: 'An homage to summer peak produce. Whipped whole milk ricotta infused with lemon zest spread across thick, wood-fired country sourdough, layered with multicolored heirloom tomatoes and finished with flaky Maldon sea salt.',
    heroImage: '/src/assets/images/recipe_hero_tartine_1791785113064.jpg',
    prepTimeMinutes: 15,
    cookTimeMinutes: 5,
    servings: 2,
    difficulty: 'Beginner',
    cuisine: 'Provencal & Mediterranean',
    category: 'Breads & Tartines',
    dietary: ['Vegetarian', 'Quick (< 30m)'],
    rating: 4.9,
    reviewCount: 128,
    isFeatured: true,
    nutrition: {
      calories: 340,
      protein: 14,
      carbs: 32,
      fat: 18,
      fiber: 4,
    },
    winePairing: 'Domaine Tempier Bandol Rosé or crisp Vermentino di Sardegna',
    chefNotes: 'Always season the sliced tomatoes on a separate cutting board and allow them to weep for 5 minutes before placing on the ricotta. This intensifies sweetness and keeps the sourdough crunchy.',
    ingredients: [
      {
        id: 'ing-1',
        name: 'Country Sourdough Bread (thick slices)',
        amount: 2,
        unit: 'slices',
        category: 'Bakery',
        metricAmount: 2,
        metricUnit: 'slices'
      },
      {
        id: 'ing-2',
        name: 'Whole Milk Ricotta',
        amount: 1,
        unit: 'cup',
        category: 'Dairy & Eggs',
        metricAmount: 240,
        metricUnit: 'g'
      },
      {
        id: 'ing-3',
        name: 'Heirloom Tomatoes (assorted colors)',
        amount: 3,
        unit: 'medium',
        category: 'Produce',
        metricAmount: 400,
        metricUnit: 'g'
      },
      {
        id: 'ing-4',
        name: 'Extra Virgin Olive Oil (first cold press)',
        amount: 2,
        unit: 'tbsp',
        category: 'Pantry & Oils',
        metricAmount: 30,
        metricUnit: 'ml'
      },
      {
        id: 'ing-5',
        name: 'Fresh Genovese Basil Leaves',
        amount: 0.25,
        unit: 'cup',
        category: 'Spices & Herbs',
        metricAmount: 10,
        metricUnit: 'g'
      },
      {
        id: 'ing-6',
        name: 'Lemon Zest',
        amount: 1,
        unit: 'tsp',
        category: 'Produce',
        metricAmount: 2,
        metricUnit: 'g'
      },
      {
        id: 'ing-7',
        name: 'Flaky Maldon Sea Salt & Cracked Black Pepper',
        amount: 1,
        unit: 'pinch',
        category: 'Spices & Herbs',
        metricAmount: 2,
        metricUnit: 'g'
      }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Whip the Ricotta Foundation',
        text: 'In a food processor or with a balloon whisk, beat the whole milk ricotta with 1 tablespoon of extra virgin olive oil, freshly grated lemon zest, and a pinch of fine salt until silky, airy, and cloud-like.',
        timerMinutes: 2,
        tip: 'Ensure ricotta is at cool room temperature for the smoothest emulsion.'
      },
      {
        stepNumber: 2,
        title: 'Prepare the Heirlooms',
        text: 'Slice heirloom tomatoes into 1/4-inch thick rounds. Lay them across a clean tea towel or board, season with a pinch of flaky salt, and let rest to concentrate their natural juices.',
        timerMinutes: 5,
        tip: 'Do not refrigerate tomatoes beforehand; room temperature unlocks aromatic esters.'
      },
      {
        stepNumber: 3,
        title: 'Grill the Sourdough',
        text: 'Brush sourdough slices lightly with olive oil. Place on a preheated heavy cast-iron skillet or grill pan over medium-high heat until deeply charred and crisp on the edges with a tender interior.',
        timerMinutes: 4,
        tip: 'Rub a halved garlic clove gently across the warm toasted crust for subtle perfume.'
      },
      {
        stepNumber: 4,
        title: 'Assemble & Garnish',
        text: 'Spoon a generous pillow of whipped ricotta across each warm toast. Shingle the sliced tomatoes gracefully over top. Scatter fresh basil leaves, drizzle cold-pressed olive oil, and finish with flaky sea salt and cracked pepper.',
        tip: 'Serve immediately while the toast retains its warm crunch against the cool cream.'
      }
    ]
  },
  {
    id: 'pasta-carbonara-guanciale',
    title: 'Authentic Tagliatelle alla Carbonara',
    subtitle: 'Crispy cured guanciale, pasture egg yolks, and aged Pecorino Romano',
    description: 'The definitive Roman classic executed with purist precision. Silky emulsion of farm-fresh egg yolks, sharp Pecorino Romano, and toasted Tellicherry black pepper coating handmade ribbon pasta, crested with golden, crispy guanciale cubes.',
    heroImage: '/src/assets/images/recipe_pasta_carbonara_1791785131041.jpg',
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    servings: 4,
    difficulty: 'Intermediate',
    cuisine: 'Italian (Roman)',
    category: 'Pasta',
    dietary: ['High Protein'],
    rating: 5.0,
    reviewCount: 214,
    isFeatured: true,
    nutrition: {
      calories: 680,
      protein: 28,
      carbs: 64,
      fat: 34,
      fiber: 3,
    },
    winePairing: 'Frascati Superiore or an earthy Chianti Classico Riserva',
    chefNotes: 'Never use cream, garlic, or peas. The silkiness comes entirely from temperature control: emulsifying hot pasta water starch with raw yolks off the heat so they never scramble.',
    ingredients: [
      {
        id: 'carb-1',
        name: 'Handmade Tagliatelle or Bronze-Die Spaghetti',
        amount: 14,
        unit: 'oz',
        category: 'Pantry & Oils',
        metricAmount: 400,
        metricUnit: 'g'
      },
      {
        id: 'carb-2',
        name: 'Guanciale (cured pork jowl, cubed)',
        amount: 7,
        unit: 'oz',
        category: 'Meat & Seafood',
        metricAmount: 200,
        metricUnit: 'g'
      },
      {
        id: 'carb-3',
        name: 'Pasture-Raised Egg Yolks',
        amount: 6,
        unit: 'large',
        category: 'Dairy & Eggs',
        metricAmount: 6,
        metricUnit: 'items'
      },
      {
        id: 'carb-4',
        name: 'Pecorino Romano DOP (finely microplaned)',
        amount: 1.25,
        unit: 'cups',
        category: 'Dairy & Eggs',
        metricAmount: 100,
        metricUnit: 'g'
      },
      {
        id: 'carb-5',
        name: 'Coarsely Toasted Tellicherry Black Peppercorns',
        amount: 1.5,
        unit: 'tbsp',
        category: 'Spices & Herbs',
        metricAmount: 8,
        metricUnit: 'g'
      }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Render the Guanciale',
        text: 'Cut guanciale into 1/4-inch lardons. Place into a cold, heavy stainless steel pan over medium-low heat. Slowly render the golden fat until the exterior is shatteringly crisp while maintaining chew in the center. Transfer meat to a warm plate, reserving the fragrant rendered liquid fat in the pan.',
        timerMinutes: 10,
        tip: 'Do not rush the rendering; gentle heat extracts deep savory depth.'
      },
      {
        stepNumber: 2,
        title: 'Toast Pepper & Whisk The Carbocrema',
        text: 'In a heatproof bowl, whisk the 6 egg yolks with the finely grated Pecorino Romano and 2 tablespoons of rendered warm pork fat until a thick, golden paste forms (the carbocrema). Toast crushed black peppercorns dry in a skillet for 60 seconds until fragrant and fold half into the mixture.',
        timerMinutes: 3,
        tip: 'The paste will feel stiff at first—the reserved starchy water will relax it later.'
      },
      {
        stepNumber: 3,
        title: 'Boil Pasta Al Dente',
        text: 'Bring a pot of water to a rolling boil. Add moderate salt (less than usual, as Pecorino and guanciale are salty). Drop pasta and cook until 1 minute before al dente. Preserve 1 cup of cloudy pasta cooking water before draining.',
        timerMinutes: 8,
        tip: 'High starch concentration in the boiling water creates the glossy emulsified sauce.'
      },
      {
        stepNumber: 4,
        title: 'Emulsify Off The Flame',
        text: 'Transfer pasta directly into the pan with warm rendered guanciale fat. Swirl over low heat for 30 seconds. Remove pan COMPLETELY from the heat stove. Wait 30 seconds for pan temperature to drop to ~65°C. Pour in the egg-cheese paste along with 3-4 tablespoons of hot pasta water, tossing and swirling vigorously until a glossy, velvety custard forms.',
        timerMinutes: 2,
        tip: 'Off-heat motion is critical to avoid curdling or scrambling.'
      },
      {
        stepNumber: 5,
        title: 'Plate with Crispy Lardons',
        text: 'Twirl generous portions into warm bowls. Crown with the warm crispy guanciale lardons, extra pecorino snowfall, and remaining cracked toasted black pepper.',
        tip: 'Serve in pre-warmed bowls immediately.'
      }
    ]
  },
  {
    id: 'miso-glazed-wild-salmon',
    title: 'Caramelized White Miso Wild Salmon',
    subtitle: 'With charred baby bok choy, toasted sesame, and scallion curls',
    description: 'Flaky wild king salmon brushed with a sweet, umami-rich saikyo miso and mirin marinade, seared until lacquered with a caramelized crust. Served over tender charred baby bok choy and aromatic ginger glaze.',
    heroImage: '/src/assets/images/recipe_miso_salmon_1791785144089.jpg',
    prepTimeMinutes: 20,
    cookTimeMinutes: 12,
    servings: 2,
    difficulty: 'Intermediate',
    cuisine: 'Japanese Modern',
    category: 'Seafood',
    dietary: ['Gluten-Free', 'High Protein', 'Dairy-Free'],
    rating: 4.9,
    reviewCount: 96,
    isFeatured: true,
    nutrition: {
      calories: 520,
      protein: 42,
      carbs: 18,
      fat: 26,
      fiber: 4,
    },
    winePairing: 'Dry Junmai Ginjo Sake or a mineral-driven Alsatian Riesling',
    chefNotes: 'Wipe off excess marinade right before searing or broiling to prevent scorching, then baste with fresh glaze during the final 90 seconds under the broiler for that signature glassy caramelization.',
    ingredients: [
      {
        id: 'sal-1',
        name: 'Wild King Salmon Fillets (skin-on)',
        amount: 2,
        unit: 'fillets (6 oz each)',
        category: 'Meat & Seafood',
        metricAmount: 360,
        metricUnit: 'g'
      },
      {
        id: 'sal-2',
        name: 'Sweet White Shiro Miso Paste',
        amount: 3,
        unit: 'tbsp',
        category: 'Pantry & Oils',
        metricAmount: 50,
        metricUnit: 'g'
      },
      {
        id: 'sal-3',
        name: 'Hon-Mirin (sweet cooking rice wine)',
        amount: 2,
        unit: 'tbsp',
        category: 'Pantry & Oils',
        metricAmount: 30,
        metricUnit: 'ml'
      },
      {
        id: 'sal-4',
        name: 'Pure Sake',
        amount: 1,
        unit: 'tbsp',
        category: 'Pantry & Oils',
        metricAmount: 15,
        metricUnit: 'ml'
      },
      {
        id: 'sal-5',
        name: 'Organic Cane Sugar or Pure Maple',
        amount: 1,
        unit: 'tbsp',
        category: 'Pantry & Oils',
        metricAmount: 12,
        metricUnit: 'g'
      },
      {
        id: 'sal-6',
        name: 'Baby Bok Choy (halved lengthwise)',
        amount: 4,
        unit: 'heads',
        category: 'Produce',
        metricAmount: 300,
        metricUnit: 'g'
      },
      {
        id: 'sal-7',
        name: 'Toasted Sesame Oil & Toasted White/Black Seeds',
        amount: 1,
        unit: 'tbsp',
        category: 'Pantry & Oils',
        metricAmount: 15,
        metricUnit: 'g'
      }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Whisk the Saikyo Miso Glaze',
        text: 'In a small saucepan, bring the sake and mirin to a brief boil for 45 seconds to burn off raw alcohol. Reduce heat to low, whisk in white miso paste and sugar until completely dissolved and lustrous. Allow to cool.',
        timerMinutes: 2,
        tip: 'Cool the glaze completely before coating raw fish.'
      },
      {
        stepNumber: 2,
        title: 'Marinate the Salmon',
        text: 'Pat wild salmon fillets thoroughly dry with paper towels. Coat all sides evenly with two-thirds of the miso mixture. Let marinate for at least 20 minutes at room temperature (or up to 12 hours covered in the refrigerator).',
        timerMinutes: 20,
        tip: 'Dry skin ensures a crisp seal when pan-searing.'
      },
      {
        stepNumber: 3,
        title: 'Char the Baby Bok Choy',
        text: 'Heat 1 teaspoon of toasted sesame oil in a cast-iron skillet over high heat. Place halved baby bok choy cut-side down. Sear undisturbed for 2-3 minutes until charred edges form. Add 2 tablespoons water, cover immediately with a lid to steam for 90 seconds, then set aside.',
        timerMinutes: 4,
        tip: 'The contrast of smoky char and tender greens balances the rich fish.'
      },
      {
        stepNumber: 4,
        title: 'Sear and Broil the Salmon',
        text: 'Preheat oven broiler to high. Wipe excess glaze from salmon. Heat a cast-iron skillet with a touch of neutral oil over medium heat. Sear skin-side down for 3 minutes until crisp. Flip, brush with remaining fresh glaze, and transfer pan under oven broiler for 3-4 minutes until bubbling and caramelized.',
        timerMinutes: 7,
        tip: 'Watch closely under broiler; sugars caramelize quickly.'
      },
      {
        stepNumber: 5,
        title: 'Plating',
        text: 'Arrange charred bok choy on a dark stoneware slate. Rest the glazed salmon beside them. Garnish with toasted white and black sesame seeds and finely curled scallion ribbons.',
        tip: 'Drizzle a few drops of sesame oil around the perimeter before serving.'
      }
    ]
  },
  {
    id: 'rustic-blackberry-thyme-galette',
    title: 'Wild Blackberry & Lemon-Thyme Artisan Galette',
    subtitle: 'Buttery flaky rough-puff pastry, wild berries, and blossom honey',
    description: 'An effortlessly elegant rustic tart. French rough-puff crust folded organically over juicy wild blackberries tossed with fresh garden thyme, lemon zest, and unrefined cane sugar. Baked until deep golden brown and served warm with cold creme fraiche.',
    heroImage: '/src/assets/images/recipe_berry_galette_1791785155928.jpg',
    prepTimeMinutes: 25,
    cookTimeMinutes: 35,
    servings: 6,
    difficulty: 'Intermediate',
    cuisine: 'French Baking',
    category: 'Desserts',
    dietary: ['Vegetarian'],
    rating: 4.8,
    reviewCount: 74,
    isFeatured: true,
    nutrition: {
      calories: 380,
      protein: 5,
      carbs: 48,
      fat: 20,
      fiber: 6,
    },
    winePairing: 'Late Harvest Sauternes or Moscato d’Asti',
    chefNotes: 'Keep the butter icy cold throughout pastry preparation. The visible marble pockets of cold butter create steam during baking, giving this freeform crust its shatteringly tender layers.',
    ingredients: [
      {
        id: 'gal-1',
        name: 'All-Purpose Flour (unbleached)',
        amount: 1.5,
        unit: 'cups',
        category: 'Pantry & Oils',
        metricAmount: 190,
        metricUnit: 'g'
      },
      {
        id: 'gal-2',
        name: 'European Style Unsalted Butter (cubed, icy cold)',
        amount: 0.5,
        unit: 'cup (1 stick)',
        category: 'Dairy & Eggs',
        metricAmount: 115,
        metricUnit: 'g'
      },
      {
        id: 'gal-3',
        name: 'Ice Water (with splash of apple cider vinegar)',
        amount: 0.25,
        unit: 'cup',
        category: 'Pantry & Oils',
        metricAmount: 60,
        metricUnit: 'ml'
      },
      {
        id: 'gal-4',
        name: 'Wild Blackberries (fresh or frozen thawed)',
        amount: 3.5,
        unit: 'cups',
        category: 'Produce',
        metricAmount: 450,
        metricUnit: 'g'
      },
      {
        id: 'gal-5',
        name: 'Organic Cane Sugar',
        amount: 0.33,
        unit: 'cup',
        category: 'Pantry & Oils',
        metricAmount: 65,
        metricUnit: 'g'
      },
      {
        id: 'gal-6',
        name: 'Tapioca Starch or Cornstarch',
        amount: 1.5,
        unit: 'tbsp',
        category: 'Pantry & Oils',
        metricAmount: 14,
        metricUnit: 'g'
      },
      {
        id: 'gal-7',
        name: 'Fresh Garden Thyme Leaves',
        amount: 1,
        unit: 'tsp',
        category: 'Spices & Herbs',
        metricAmount: 2,
        metricUnit: 'g'
      },
      {
        id: 'gal-8',
        name: 'Egg Wash & Demerara Coarse Sugar',
        amount: 1,
        unit: 'egg + 1 tbsp sugar',
        category: 'Dairy & Eggs',
        metricAmount: 1,
        metricUnit: 'item'
      }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Make the Laminated Pastry',
        text: 'In a large chilled mixing bowl, combine flour, 1 tbsp sugar, and a pinch of salt. Cut in the cold butter cubes using your fingers or pastry blender until pea-sized nuggets remain. Drizzle ice water gradually and gently bring dough together into a disc. Wrap in parchment and chill for 30 minutes.',
        timerMinutes: 30,
        tip: 'Do not knead; visible butter streaks are the key to flakiness.'
      },
      {
        stepNumber: 2,
        title: 'Macerate the Berries',
        text: 'Gently fold blackberries with cane sugar, tapioca starch, lemon zest, and stripped fresh thyme leaves in a bowl. Let stand for 10 minutes so juices gently bloom and bond with the starch.',
        timerMinutes: 10,
        tip: 'Thyme adds a subtle herbal forest nuance that cuts berry sweetness.'
      },
      {
        stepNumber: 3,
        title: 'Roll and Fill the Crust',
        text: 'On floured parchment paper, roll the dough into a rough 12-inch circle (about 1/8-inch thick). Pile the berry mixture into the center, leaving a 2-inch border around the edge.',
        tip: 'The beauty of a galette is its organic imperfection.'
      },
      {
        stepNumber: 4,
        title: 'Fold and Sugar the Crust',
        text: 'Fold the dough edges inward over the outer ring of berries, pleating as you work around the circle. Brush the pastry border with beaten egg wash and generously shower with coarse demerara sugar for crunch.',
        tip: 'Chill the formed galette for 10 minutes before baking to lock in the crust shape.'
      },
      {
        stepNumber: 5,
        title: 'Bake to Golden Radiance',
        text: 'Bake at 400°F (200°C) on a preheated baking sheet for 35 to 40 minutes, until the crust is deeply golden amber and the berry filling is actively bubbling.',
        timerMinutes: 35,
        tip: 'Cool on the sheet for 15 minutes to allow juices to set before slicing.'
      }
    ]
  },
  {
    id: 'spiced-roasted-cauliflower-tahini',
    title: 'Whole Roasted Golden Spiced Cauliflower',
    subtitle: 'With whipped garlic tahini, pomegranate arils, and toasted pine nuts',
    description: 'A showstopping Levantine centerpiece. A whole head of cauliflower poached in fragrant turmeric-lemon brine, then roasted until caramelized and tender. Smothered in creamy garlic tahini sauce and garnished with jewel-toned pomegranate and toasted nuts.',
    heroImage: '/src/assets/images/recipe_roasted_cauliflower_1791785166156.jpg',
    prepTimeMinutes: 15,
    cookTimeMinutes: 40,
    servings: 4,
    difficulty: 'Intermediate',
    cuisine: 'Levantine & Middle Eastern',
    category: 'Mezze & Greens',
    dietary: ['Vegan', 'Gluten-Free', 'Dairy-Free'],
    rating: 4.9,
    reviewCount: 88,
    isFeatured: true,
    nutrition: {
      calories: 310,
      protein: 10,
      carbs: 22,
      fat: 22,
      fiber: 8,
    },
    winePairing: 'Dry Greek Assyrtiko or an aromatic Lebanese White',
    chefNotes: 'Pre-poaching the cauliflower head in salted aromatic water ensures the thick center becomes buttery soft, allowing the oven heat to focus exclusively on blistering the exterior into caramelized perfection.',
    ingredients: [
      {
        id: 'caul-1',
        name: 'Whole Cauliflower Head (leaves trimmed, base flat)',
        amount: 1,
        unit: 'large head (~2 lbs)',
        category: 'Produce',
        metricAmount: 900,
        metricUnit: 'g'
      },
      {
        id: 'caul-2',
        name: 'Ground Cumin, Turmeric & Smoked Paprika',
        amount: 1,
        unit: 'tbsp mixed',
        category: 'Spices & Herbs',
        metricAmount: 10,
        metricUnit: 'g'
      },
      {
        id: 'caul-3',
        name: 'Extra Virgin Olive Oil',
        amount: 3,
        unit: 'tbsp',
        category: 'Pantry & Oils',
        metricAmount: 45,
        metricUnit: 'ml'
      },
      {
        id: 'caul-4',
        name: 'Pure Sesame Tahini Paste',
        amount: 0.5,
        unit: 'cup',
        category: 'Pantry & Oils',
        metricAmount: 120,
        metricUnit: 'g'
      },
      {
        id: 'caul-5',
        name: 'Fresh Lemon Juice & Crushed Garlic',
        amount: 3,
        unit: 'tbsp lemon + 2 cloves garlic',
        category: 'Produce',
        metricAmount: 45,
        metricUnit: 'ml'
      },
      {
        id: 'caul-6',
        name: 'Ruby Pomegranate Arils',
        amount: 0.33,
        unit: 'cup',
        category: 'Produce',
        metricAmount: 50,
        metricUnit: 'g'
      },
      {
        id: 'caul-7',
        name: 'Toasted Pine Nuts & Fresh Mint Leaves',
        amount: 3,
        unit: 'tbsp',
        category: 'Produce',
        metricAmount: 30,
        metricUnit: 'g'
      }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Poach the Cauliflower',
        text: 'In a large pot, bring well-salted water with 1 tsp turmeric and lemon slices to a rolling boil. Submerge the trimmed cauliflower head stem-side up. Simmer gently for 8 minutes until a paring knife pierces the core with slight resistance.',
        timerMinutes: 8,
        tip: 'Drain inverted on a wire rack for 5 minutes to release all steam before roasting.'
      },
      {
        stepNumber: 2,
        title: 'Rub Spiced Marinade',
        text: 'Mix cumin, smoked paprika, sea salt, and extra virgin olive oil. Rub the fragrant spiced paste thoroughly over the head, coating every crevice and floret evenly.',
        timerMinutes: 2,
        tip: 'Ensure the bottom base gets coated too for complete seasoning.'
      },
      {
        stepNumber: 3,
        title: 'Roast to Deep Caramelization',
        text: 'Transfer cauliflower onto a baking sheet or cast-iron skillet. Roast at 425°F (220°C) for 30-35 minutes until the exterior is deeply roasted, charred at the tips, and fragrant.',
        timerMinutes: 30,
        tip: 'Baste once halfway through with the pan drippings.'
      },
      {
        stepNumber: 4,
        title: 'Whip the Garlic Tahini',
        text: 'Whisk tahini paste, crushed garlic, lemon juice, and a pinch of salt in a bowl. Slowly stream in 3-4 tablespoons of ice water while whisking continuously until the sauce turns from thick to velvety pale cream.',
        timerMinutes: 3,
        tip: 'Tahini tightens up initially when lemon is added; ice water relaxes it into a silk ribbon.'
      },
      {
        stepNumber: 5,
        title: 'Assemble the Platter',
        text: 'Place the sizzling golden cauliflower onto a wide earthenware platter. Generously cascade the whipped tahini across the florets. Scatter fresh mint, ruby pomegranate arils, and golden toasted pine nuts over the crown.',
        tip: 'Carve wedges table-side like a savory roast.'
      }
    ]
  },
  {
    id: 'wild-mushroom-truffle-risotto',
    title: 'Acquerello Risotto with Porcini & Black Truffle',
    subtitle: 'Slow-simmered carnaroli rice, charred chanterelles, and parmigiano cream',
    description: 'The supreme northern Italian comfort dish. Aged Carnaroli rice toasted in shallot butter, deglazed with dry Pinot Grigio and slowly nurtured with rich forest mushroom broth. Finished with whipped butter, aged Parmigiano-Reggiano, and shaved black truffle.',
    heroImage: '', // Will use styled CSS/SVG fallback as defined in Section 3.E
    prepTimeMinutes: 20,
    cookTimeMinutes: 25,
    servings: 4,
    difficulty: 'Masterclass',
    cuisine: 'Northern Italian',
    category: 'Mains',
    dietary: ['Vegetarian', 'Gluten-Free'],
    rating: 5.0,
    reviewCount: 142,
    nutrition: {
      calories: 590,
      protein: 16,
      carbs: 68,
      fat: 26,
      fiber: 4,
    },
    winePairing: 'Barolo DOCG or Nebbiolo d’Alba',
    chefNotes: 'The mantecatura—beating in freezing cold butter and parmigiano off the heat—creates the velvety wave (all’onda) texture that distinguishes master risotto from rice porridge.',
    ingredients: [
      {
        id: 'ris-1',
        name: 'Carnaroli or Vialone Nano Rice',
        amount: 1.5,
        unit: 'cups',
        category: 'Pantry & Oils',
        metricAmount: 320,
        metricUnit: 'g'
      },
      {
        id: 'ris-2',
        name: 'Wild Mushrooms (Porcini, Chanterelles, Cremini)',
        amount: 12,
        unit: 'oz',
        category: 'Produce',
        metricAmount: 350,
        metricUnit: 'g'
      },
      {
        id: 'ris-3',
        name: 'Rich Vegetable or Mushroom Stock (kept simmering hot)',
        amount: 5,
        unit: 'cups',
        category: 'Pantry & Oils',
        metricAmount: 1200,
        metricUnit: 'ml'
      },
      {
        id: 'ris-4',
        name: 'Dry Italian White Wine',
        amount: 0.5,
        unit: 'cup',
        category: 'Pantry & Oils',
        metricAmount: 120,
        metricUnit: 'ml'
      },
      {
        id: 'ris-5',
        name: 'Cold European Unsalted Butter',
        amount: 4,
        unit: 'tbsp',
        category: 'Dairy & Eggs',
        metricAmount: 60,
        metricUnit: 'g'
      },
      {
        id: 'ris-6',
        name: 'Parmigiano-Reggiano 24-Month (microplaned)',
        amount: 1,
        unit: 'cup',
        category: 'Dairy & Eggs',
        metricAmount: 90,
        metricUnit: 'g'
      },
      {
        id: 'ris-7',
        name: 'Fresh Black Truffle or White Truffle Oil',
        amount: 1,
        unit: 'tsp drizzle',
        category: 'Pantry & Oils',
        metricAmount: 5,
        metricUnit: 'ml'
      }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Sear Forest Mushrooms',
        text: 'In a wide heavy sauté pan, heat 1 tbsp olive oil over high heat. Add sliced wild mushrooms in a single layer and sear undisturbed for 4 minutes until deeply caramelized and brown. Season with thyme and salt, then transfer to a plate.',
        timerMinutes: 5,
        tip: 'Never crowd mushrooms or they will steam instead of caramelizing.'
      },
      {
        stepNumber: 2,
        title: 'Toast the Rice (Tostatura)',
        text: 'Melt 1 tbsp butter in a heavy copper or enamel pot. Sauté finely minced shallots until translucent. Add raw Carnaroli rice and stir dry for 2-3 minutes until rice grains become translucent with a chalky center and hot to the touch.',
        timerMinutes: 3,
        tip: 'Tostatura seals starch inside the grain, keeping it al dente.'
      },
      {
        stepNumber: 3,
        title: 'Deglaze & Simmer',
        text: 'Pour in white wine; let it hiss and evaporate completely. Begin adding simmering hot stock one ladle at a time, stirring gently. Wait until the liquid is nearly absorbed before adding the next ladle. Continue for 16-18 minutes until rice is al dente with a creamy suspension.',
        timerMinutes: 18,
        tip: 'Always keep the stock simmering hot; cold stock stops the starch release.'
      },
      {
        stepNumber: 4,
        title: 'The Mantecatura Emulsion',
        text: 'Remove pot from heat. Fold in the seared mushrooms. Add the cold cubed butter and grated Parmigiano-Reggiano. Shake the pan vigorously back and forth while beating with a wooden spoon for 2 minutes to create the wave (all’onda).',
        timerMinutes: 2,
        tip: 'Cold butter creates a glossy emulsion that warm butter cannot replicate.'
      },
      {
        stepNumber: 5,
        title: 'Garnish with Truffle',
        text: 'Spoon into warm shallow bowls. Tap the bottom of each bowl with the palm of your hand so the risotto flows evenly. Finish with microplaned black truffle shavings and freshly cracked pepper.',
        tip: 'Serve within 90 seconds of plating.'
      }
    ]
  },
  {
    id: 'provencal-saffron-bouillabaisse',
    title: 'Marseille Saffron Seafood Bouillabaisse',
    subtitle: 'Simmered red snapper, sea bass, mussels, fennel, and garlic rouille',
    description: 'The storied fisherman’s stew of the French Mediterranean. Pristine fresh white fish, tender mussels, and wild prawns simmered in an aromatic broth of saffron, star anise, wild fennel, and sun-ripened tomatoes. Served with sourdough croutons and spicy saffron rouille.',
    heroImage: '', // Will use styled CSS/SVG fallback
    prepTimeMinutes: 30,
    cookTimeMinutes: 25,
    servings: 4,
    difficulty: 'Masterclass',
    cuisine: 'French (Provencal)',
    category: 'Seafood',
    dietary: ['Dairy-Free', 'High Protein'],
    rating: 4.9,
    reviewCount: 63,
    nutrition: {
      calories: 460,
      protein: 48,
      carbs: 18,
      fat: 20,
      fiber: 4,
    },
    winePairing: 'Cassis Blanc or Bandol Blanc',
    chefNotes: 'Serve traditionally in two courses: first the rich saffron broth poured over rouille-topped croutons, followed immediately by the magnificent platter of poached fish and shellfish.',
    ingredients: [
      {
        id: 'bou-1',
        name: 'Mixed Fresh Fish Fillets (Red Snapper, Sea Bass, Cod)',
        amount: 1.5,
        unit: 'lbs',
        category: 'Meat & Seafood',
        metricAmount: 700,
        metricUnit: 'g'
      },
      {
        id: 'bou-2',
        name: 'Fresh Mediterranean Mussels (scrubbed & debearded)',
        amount: 1,
        unit: 'lb',
        category: 'Meat & Seafood',
        metricAmount: 450,
        metricUnit: 'g'
      },
      {
        id: 'bou-3',
        name: 'Wild King Prawns (shell on)',
        amount: 8,
        unit: 'pieces',
        category: 'Meat & Seafood',
        metricAmount: 300,
        metricUnit: 'g'
      },
      {
        id: 'bou-4',
        name: 'Saffron Threads (crushed in warm water)',
        amount: 1,
        unit: 'generous pinch (~0.5g)',
        category: 'Spices & Herbs',
        metricAmount: 0.5,
        metricUnit: 'g'
      },
      {
        id: 'bou-5',
        name: 'Fennel Bulb (thinly sliced) & Orange Peel Strip',
        amount: 1,
        unit: 'medium bulb',
        category: 'Produce',
        metricAmount: 200,
        metricUnit: 'g'
      },
      {
        id: 'bou-6',
        name: 'Crushed San Marzano Tomatoes',
        amount: 1.5,
        unit: 'cups',
        category: 'Produce',
        metricAmount: 350,
        metricUnit: 'g'
      },
      {
        id: 'bou-7',
        name: 'Homemade Rouille (garlic, saffron, chili aioli) & Baguette slices',
        amount: 0.5,
        unit: 'cup',
        category: 'Pantry & Oils',
        metricAmount: 120,
        metricUnit: 'g'
      }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Bloom Saffron & Build Aromatics',
        text: 'Steep crushed saffron threads in 3 tbsp warm water. In a large Dutch oven, warm olive oil over medium heat. Sauté sliced leeks, fennel, garlic, and an orange peel peel strip for 6 minutes until soft and fragrant.',
        timerMinutes: 6,
        tip: 'The orange peel provides the authentic Provencal citrus note.'
      },
      {
        stepNumber: 2,
        title: 'Simmer the Golden Broth',
        text: 'Add crushed tomatoes, white wine, saffron infusion, and fish fumet. Bring to a rapid rolling boil, then lower heat to a lively simmer for 15 minutes to marry the flavors.',
        timerMinutes: 15,
        tip: 'A brisk simmer helps naturally emulsify the olive oil into the broth.'
      },
      {
        stepNumber: 3,
        title: 'Poach the Shellfish & Firm Fish',
        text: 'Add firm fish chunks (such as red snapper) and wild prawns into the simmering broth. Cover and cook for 3 minutes.',
        timerMinutes: 3,
        tip: 'Layer seafood strictly according to cooking density.'
      },
      {
        stepNumber: 4,
        title: 'Add Delicate Fish & Mussels',
        text: 'Gently nestle tender cod fillets and fresh scrubbed mussels into the broth. Cover and steam for 4 to 5 minutes until mussel shells open wide and fish flakes easily with a fork.',
        timerMinutes: 5,
        tip: 'Discard any mussels that remain closed after steaming.'
      },
      {
        stepNumber: 5,
        title: 'Service with Garlic Saffron Rouille',
        text: 'Ladle generous steaming broth into broad bowls. Arrange fish and mussels atop. Serve alongside crisp baguette toasts generously slathered with fiery garlic-saffron rouille.',
        tip: 'Dip the rouille crouton directly into the saffron broth.'
      }
    ]
  }
];
