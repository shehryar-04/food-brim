-- ================================================================
-- FoodBrim — Supabase Setup SQL
-- Run this entire file in: Supabase Dashboard → SQL Editor → New query
-- ================================================================

-- ── 1. TABLES ──────────────────────────────────────────────────

create table if not exists categories (
  id          text primary key,
  name        text not null,
  icon_name   text not null,
  sort_order  int  default 0
);

create table if not exists menu_items (
  id           int  primary key,
  category_id  text references categories(id) on delete set null,
  name         text           not null,
  description  text,
  price        decimal(10,2)  not null,
  rating       decimal(3,1)   default 4.5,
  reviews      int            default 0,
  prep_time    text,
  calories     int,
  tags         text[]         default '{}',
  gradient     text,
  icon         text,
  is_available boolean        default true,
  created_at   timestamptz    default now()
);

create table if not exists orders (
  id              uuid          primary key default gen_random_uuid(),
  created_at      timestamptz   default now(),
  customer_name   text          not null,
  phone           text          not null,
  address         text          not null,
  payment_method  text          not null,
  subtotal        decimal(10,2),
  delivery_fee    decimal(10,2) default 2.99,
  total           decimal(10,2) not null,
  status          text          default 'confirmed'
                  check (status in ('confirmed','preparing','on_the_way','delivered'))
);

create table if not exists order_items (
  id              uuid          primary key default gen_random_uuid(),
  order_id        uuid          references orders(id) on delete cascade,
  menu_item_id    int,
  menu_item_name  text          not null,
  price           decimal(10,2) not null,
  quantity        int           not null,
  created_at      timestamptz   default now()
);

-- ── 2. ROW LEVEL SECURITY ──────────────────────────────────────

alter table categories  enable row level security;
alter table menu_items  enable row level security;
alter table orders      enable row level security;
alter table order_items enable row level security;

-- Public read for menu data
create policy "Public read categories"  on categories  for select using (true);
create policy "Public read menu_items"  on menu_items  for select using (true);

-- Orders: anyone can create & read (no auth required for demo)
create policy "Public insert orders"       on orders for insert with check (true);
create policy "Public select orders"       on orders for select using (true);
create policy "Public update order status" on orders for update using (true);

create policy "Public insert order_items"  on order_items for insert with check (true);
create policy "Public select order_items"  on order_items for select using (true);

-- ── 3. ENABLE REALTIME ─────────────────────────────────────────

alter publication supabase_realtime add table orders;

-- ── 4. SEED: CATEGORIES ────────────────────────────────────────

insert into categories (id, name, icon_name, sort_order) values
  ('burgers',  'Burgers',  'Beef',            1),
  ('pizza',    'Pizza',    'Pizza',           2),
  ('sushi',    'Sushi',    'Fish',            3),
  ('pasta',    'Pasta',    'UtensilsCrossed', 4),
  ('desserts', 'Desserts', 'Cookie',          5),
  ('drinks',   'Drinks',   'Coffee',          6),
  ('salads',   'Salads',   'Salad',           7)
on conflict (id) do nothing;

-- ── 5. SEED: MENU ITEMS ────────────────────────────────────────

insert into menu_items
  (id, category_id, name, description, price, rating, reviews, prep_time, calories, tags, gradient, icon)
values
  -- Burgers
  (1,  'burgers',  'The Classic Smash',    'Double smash patty, American cheese, pickles, caramelized onions & secret sauce', 14.99, 4.9, 312, '15 min', 680, ARRAY['Bestseller','Spicy'],          'from-orange-500 to-red-600',    'Beef'),
  (2,  'burgers',  'BBQ Bacon Tower',      'Wagyu beef, crispy bacon, cheddar, BBQ sauce, onion rings on a brioche bun',     18.99, 4.8, 189, '18 min', 850, ARRAY['Premium'],                      'from-amber-500 to-orange-600',  'Sandwich'),
  (3,  'burgers',  'Mushroom Swiss Melt',  'Beef patty, sautéed mushrooms, Swiss cheese, garlic aioli & arugula',           15.99, 4.7, 145, '15 min', 620, ARRAY[]::text[],                       'from-yellow-600 to-amber-700',  'Beef'),
  (4,  'burgers',  'Vegan Beyond Burger',  'Beyond meat patty, vegan cheese, avocado, tomato & chipotle mayo',              16.49, 4.6, 98,  '12 min', 520, ARRAY['Vegan','Healthy'],               'from-green-500 to-emerald-600', 'Sprout'),
  -- Pizza
  (5,  'pizza',    'Margherita Classica',  'San Marzano tomatoes, fresh mozzarella di bufala, fresh basil, EVOO',           16.99, 4.9, 445, '20 min', 720, ARRAY['Vegetarian','Classic'],          'from-red-500 to-rose-600',      'Pizza'),
  (6,  'pizza',    'Pepperoni Supreme',    'Loaded pepperoni, mozzarella, tomato base with Italian herbs',                  19.99, 4.8, 367, '22 min', 890, ARRAY['Bestseller'],                   'from-red-600 to-orange-500',    'Pizza'),
  (7,  'pizza',    'Truffle Funghi',       'White truffle oil, wild mushrooms, fontina, fresh thyme & parmesan',            24.99, 4.9, 201, '25 min', 760, ARRAY['Premium','Chef''s Pick'],        'from-purple-500 to-indigo-600', 'Pizza'),
  (8,  'pizza',    'BBQ Chicken Ranch',    'Grilled chicken, BBQ sauce, red onions, ranch drizzle, cilantro',               21.99, 4.7, 278, '22 min', 840, ARRAY[]::text[],                       'from-amber-500 to-yellow-600',  'Drumstick'),
  -- Sushi
  (9,  'sushi',    'Dragon Roll',          'Shrimp tempura, cucumber, topped with avocado & eel sauce',                    17.99, 4.9, 312, '25 min', 480, ARRAY['Bestseller'],                   'from-green-500 to-teal-600',    'Fish'),
  (10, 'sushi',    'Spicy Tuna Roll',      'Fresh tuna, spicy mayo, cucumber, sesame seeds & tobiko',                      15.99, 4.8, 256, '20 min', 420, ARRAY['Spicy'],                        'from-red-500 to-pink-600',      'Fish'),
  (11, 'sushi',    'Rainbow Roll',         'California roll base topped with assorted sashimi & avocado',                  22.99, 5.0, 189, '25 min', 520, ARRAY['Premium','Chef''s Pick'],        'from-violet-500 to-purple-600', 'Fish'),
  (12, 'sushi',    'Salmon Nigiri Set',    '6-piece fresh Atlantic salmon nigiri with wasabi & pickled ginger',            19.99, 4.8, 143, '15 min', 380, ARRAY['Fresh'],                        'from-orange-400 to-pink-500',   'Fish'),
  -- Pasta
  (13, 'pasta',    'Truffle Carbonara',    'Fresh tagliatelle, guanciale, egg yolk, pecorino & black truffle',             21.99, 4.9, 234, '20 min', 820, ARRAY['Premium','Chef''s Pick'],        'from-yellow-500 to-amber-600',  'UtensilsCrossed'),
  (14, 'pasta',    'Lobster Linguine',     'Fresh lobster, cherry tomatoes, white wine, garlic & chili flakes',            32.99, 5.0, 112, '25 min', 740, ARRAY['Luxury','Seafood'],             'from-red-400 to-orange-500',    'Utensils'),
  (15, 'pasta',    'Pesto Penne',          'Basil pesto, sun-dried tomatoes, roasted pine nuts & parmesan',                16.99, 4.7, 178, '18 min', 650, ARRAY['Vegetarian'],                   'from-green-500 to-lime-500',    'Utensils'),
  -- Desserts
  (16, 'desserts', 'Molten Lava Cake',     'Warm Belgian chocolate cake with a gooey center & vanilla ice cream',          9.99,  5.0, 521, '12 min', 580, ARRAY['Bestseller','Must Try'],        'from-amber-700 to-orange-600',  'Cookie'),
  (17, 'desserts', 'Tiramisu',             'Authentic Italian tiramisu with espresso-soaked ladyfingers & mascarpone',     8.99,  4.9, 389, '5 min',  420, ARRAY['Classic'],                      'from-amber-600 to-yellow-700',  'Coffee'),
  (18, 'desserts', 'Berry Cheesecake',     'New York-style cheesecake with fresh mixed berry compote',                     8.49,  4.8, 267, '5 min',  490, ARRAY[]::text[],                       'from-pink-500 to-rose-600',     'CakeSlice'),
  -- Drinks
  (19, 'drinks',   'Mango Tango Smoothie', 'Fresh mango, passionfruit, pineapple & coconut milk blend',                   7.99,  4.8, 198, '5 min',  280, ARRAY['Vegan','Refreshing'],           'from-yellow-400 to-orange-500', 'GlassWater'),
  (20, 'drinks',   'Cold Brew Coffee',     '24-hour cold brew with oat milk, vanilla & caramel drizzle',                  6.99,  4.9, 445, '3 min',  120, ARRAY['Bestseller'],                   'from-amber-800 to-yellow-900',  'Coffee'),
  (21, 'drinks',   'Strawberry Lemonade',  'Fresh-squeezed lemonade with strawberry purée & mint',                        5.99,  4.7, 312, '3 min',  160, ARRAY['Fresh'],                        'from-pink-400 to-red-500',      'Citrus'),
  (22, 'drinks',   'Matcha Latte',         'Premium ceremonial grade matcha with steamed oat milk',                       7.49,  4.8, 234, '4 min',  140, ARRAY['Healthy','Vegan'],              'from-green-400 to-emerald-500', 'Leaf'),
  -- Salads
  (23, 'salads',   'Caesar Supreme',       'Romaine, house-made caesar dressing, parmesan, croutons & anchovies',         12.99, 4.7, 178, '10 min', 380, ARRAY['Classic'],                      'from-green-500 to-lime-600',    'Salad'),
  (24, 'salads',   'Greek Goddess',        'Cherry tomatoes, cucumber, olives, feta, red onion & herb dressing',          13.99, 4.8, 145, '10 min', 320, ARRAY['Vegetarian','Healthy'],         'from-teal-500 to-cyan-600',     'Salad'),
  (25, 'salads',   'Avocado Power Bowl',   'Quinoa, avocado, edamame, roasted chickpeas & tahini lemon dressing',         15.99, 4.9, 212, '12 min', 450, ARRAY['Vegan','Healthy','Bestseller'], 'from-green-600 to-teal-500',    'Sprout')
on conflict (id) do nothing;
