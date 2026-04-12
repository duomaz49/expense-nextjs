
INSERT INTO category (id, name, user_id) VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Groceries',     '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Rent',          '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Transport',     '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'Dining Out',    '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', 'Entertainment', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  ('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a66', 'Health',        '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  ('a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a77', 'Utilities',     '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a88', 'Clothing',      '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  ('c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a99', 'Subscriptions', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  ('d1eebc99-9c0b-4ef8-bb6d-6bb9bd380aaa', 'Savings',       '1eb2c6a9-1d67-4878-a871-a2833ef2d42a');

INSERT INTO budget (id, name, amount, month, category_id, user_id) VALUES
  (gen_random_uuid(), 'Groceries April',     '500.00',  '2026-04-01 00:00:00+00', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), 'Rent April',          '1200.00', '2026-04-01 00:00:00+00', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), 'Transport April',     '150.00',  '2026-04-01 00:00:00+00', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), 'Dining Out April',    '250.00',  '2026-04-01 00:00:00+00', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), 'Entertainment April', '100.00',  '2026-04-01 00:00:00+00', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), 'Health April',        '80.00',   '2026-04-01 00:00:00+00', 'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a66', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), 'Utilities April',     '130.00',  '2026-04-01 00:00:00+00', 'a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a77', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), 'Clothing April',      '120.00',  '2026-04-01 00:00:00+00', 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a88', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), 'Subscriptions April', '60.00',   '2026-04-01 00:00:00+00', 'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a99', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), 'Savings April',       '300.00',  '2026-04-01 00:00:00+00', 'd1eebc99-9c0b-4ef8-bb6d-6bb9bd380aaa', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a');

INSERT INTO transaction (id, date, amount, description, category_id, user_id) VALUES
  -- February - Groceries
  (gen_random_uuid(), '2026-02-01 10:00:00+00', '62.40',  'Lidl weekly shop',          'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-02-08 11:00:00+00', '54.90',  'K-Market groceries',        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-02-15 10:30:00+00', '71.20',  'S-Market weekly shop',      'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-02-22 09:45:00+00', '48.30',  'Lidl groceries',            'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  -- February - Rent
  (gen_random_uuid(), '2026-02-01 08:00:00+00', '1200.00','Monthly rent',              'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  -- February - Transport
  (gen_random_uuid(), '2026-02-03 08:15:00+00', '35.00',  'Monthly bus pass',          'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-02-10 17:30:00+00', '12.50',  'Uber home from work',       'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-02-14 20:00:00+00', '18.90',  'Taxi to restaurant',        'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  -- February - Dining Out
  (gen_random_uuid(), '2026-02-07 19:00:00+00', '42.50',  'Dinner at Ravintola Kuu',   'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-02-12 12:30:00+00', '14.90',  'Lunch at Hesburger',        'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-02-14 20:30:00+00', '68.00',  'Valentines dinner',         'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-02-21 13:00:00+00', '11.50',  'Coffee and sandwich',       'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  -- February - Entertainment
  (gen_random_uuid(), '2026-02-08 15:00:00+00', '26.00',  'Cinema tickets x2',         'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-02-20 18:00:00+00', '45.00',  'Board game night supplies', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  -- February - Health
  (gen_random_uuid(), '2026-02-05 09:00:00+00', '55.00',  'Gym membership',            'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a66', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-02-18 11:00:00+00', '22.40',  'Pharmacy — cold medicine',  'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a66', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  -- February - Utilities
  (gen_random_uuid(), '2026-02-04 09:00:00+00', '87.50',  'Electricity bill',          'a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a77', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-02-04 09:05:00+00', '29.90',  'Internet bill',             'a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a77', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  -- February - Clothing
  (gen_random_uuid(), '2026-02-16 14:00:00+00', '59.90',  'Winter jacket sale',        'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a88', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  -- February - Subscriptions
  (gen_random_uuid(), '2026-02-01 00:00:00+00', '15.99',  'Spotify Premium',           'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a99', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-02-01 00:01:00+00', '17.99',  'Netflix',                   'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a99', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-02-03 00:00:00+00', '11.99',  'YouTube Premium',           'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a99', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  -- February - Savings
  (gen_random_uuid(), '2026-02-28 08:00:00+00', '300.00', 'Monthly savings transfer',  'd1eebc99-9c0b-4ef8-bb6d-6bb9bd380aaa', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),

  -- March - Groceries
  (gen_random_uuid(), '2026-03-01 10:00:00+00', '58.70',  'Lidl weekly shop',          'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-03-08 11:15:00+00', '73.20',  'S-Market groceries',        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-03-15 10:00:00+00', '61.40',  'K-Market weekly shop',      'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-03-22 09:30:00+00', '44.80',  'Lidl groceries',            'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-03-29 10:00:00+00', '52.10',  'S-Market top up',           'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  -- March - Rent
  (gen_random_uuid(), '2026-03-01 08:00:00+00', '1200.00','Monthly rent',              'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  -- March - Transport
  (gen_random_uuid(), '2026-03-03 08:00:00+00', '35.00',  'Monthly bus pass',          'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-03-07 18:00:00+00', '9.90',   'Uber to airport',           'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-03-19 22:00:00+00', '14.50',  'Late night taxi',           'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-03-25 07:45:00+00', '8.40',   'Train ticket',              'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  -- March - Dining Out
  (gen_random_uuid(), '2026-03-06 19:30:00+00', '38.00',  'Sushi restaurant',          'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-03-11 12:00:00+00', '13.50',  'Lunch wrap and coffee',     'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-03-17 20:00:00+00', '55.00',  'Birthday dinner',           'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-03-24 13:00:00+00', '16.80',  'Pizza slice and drink',     'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-03-28 19:00:00+00', '44.00',  'Steak house dinner',        'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  -- March - Entertainment
  (gen_random_uuid(), '2026-03-05 20:00:00+00', '32.00',  'Theatre tickets',           'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-03-14 16:00:00+00', '24.00',  'Bowling with friends',      'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-03-21 18:30:00+00', '18.00',  'Escape room',               'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  -- March - Health
  (gen_random_uuid(), '2026-03-05 09:00:00+00', '55.00',  'Gym membership',            'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a66', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-03-12 14:00:00+00', '45.00',  'Dentist checkup',           'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a66', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-03-20 10:00:00+00', '18.90',  'Vitamins and supplements',  'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a66', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  -- March - Utilities
  (gen_random_uuid(), '2026-03-04 09:00:00+00', '91.20',  'Electricity bill',          'a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a77', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-03-04 09:05:00+00', '29.90',  'Internet bill',             'a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a77', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-03-10 10:00:00+00', '12.50',  'Water bill',                'a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a77', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  -- March - Clothing
  (gen_random_uuid(), '2026-03-08 13:00:00+00', '89.90',  'Spring jacket',             'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a88', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-03-15 14:30:00+00', '34.95',  'Running shoes sale',        'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a88', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  -- March - Subscriptions
  (gen_random_uuid(), '2026-03-01 00:00:00+00', '15.99',  'Spotify Premium',           'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a99', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-03-01 00:01:00+00', '17.99',  'Netflix',                   'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a99', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-03-03 00:00:00+00', '11.99',  'YouTube Premium',           'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a99', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  -- March - Savings
  (gen_random_uuid(), '2026-03-31 08:00:00+00', '300.00', 'Monthly savings transfer',  'd1eebc99-9c0b-4ef8-bb6d-6bb9bd380aaa', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),

  -- April - Groceries
  (gen_random_uuid(), '2026-04-01 10:00:00+00', '66.30',  'Lidl weekly shop',          'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-04-05 11:00:00+00', '23.40',  'K-Market top up',           'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-04-08 10:30:00+00', '77.80',  'S-Market weekly shop',      'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-04-09 09:00:00+00', '31.20',  'Lidl top up',               'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  -- April - Rent
  (gen_random_uuid(), '2026-04-01 08:00:00+00', '1200.00','Monthly rent',              'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  -- April - Transport
  (gen_random_uuid(), '2026-04-02 08:00:00+00', '35.00',  'Monthly bus pass',          'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-04-04 17:45:00+00', '11.20',  'Uber home',                 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-04-09 19:00:00+00', '7.50',   'Bus to city center',        'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  -- April - Dining Out
  (gen_random_uuid(), '2026-04-03 12:30:00+00', '15.90',  'Lunch at work cafeteria',   'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-04-05 19:00:00+00', '52.00',  'Italian restaurant',        'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-04-09 13:00:00+00', '9.80',   'Coffee and croissant',      'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  -- April - Entertainment
  (gen_random_uuid(), '2026-04-06 15:00:00+00', '28.00',  'Cinema tickets x2',         'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  -- April - Health
  (gen_random_uuid(), '2026-04-05 09:00:00+00', '55.00',  'Gym membership',            'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a66', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-04-07 11:00:00+00', '14.50',  'Pharmacy — vitamins',       'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a66', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  -- April - Utilities
  (gen_random_uuid(), '2026-04-03 09:00:00+00', '83.40',  'Electricity bill',          'a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a77', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-04-03 09:05:00+00', '29.90',  'Internet bill',             'a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a77', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  -- April - Clothing
  (gen_random_uuid(), '2026-04-06 13:00:00+00', '44.95',  'New jeans',                 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a88', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  -- April - Subscriptions
  (gen_random_uuid(), '2026-04-01 00:00:00+00', '15.99',  'Spotify Premium',           'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a99', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-04-01 00:01:00+00', '17.99',  'Netflix',                   'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a99', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  (gen_random_uuid(), '2026-04-03 00:00:00+00', '11.99',  'YouTube Premium',           'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a99', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a'),
  -- April - Savings
  (gen_random_uuid(), '2026-04-10 08:00:00+00', '300.00', 'Monthly savings transfer',  'd1eebc99-9c0b-4ef8-bb6d-6bb9bd380aaa', '1eb2c6a9-1d67-4878-a871-a2833ef2d42a');
