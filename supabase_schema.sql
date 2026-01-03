-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES (Extends Auth)
create table profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  student_id text,
  avatar_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- COURSES
create table courses (
  id uuid default uuid_generate_v4() primary key,
  code text not null, -- e.g. CS101
  name text not null,
  professor text,
  location text,
  credits integer
);

-- SCHEDULES (For Course Schedule)
create table schedules (
  id uuid default uuid_generate_v4() primary key,
  course_id uuid references courses(id) not null,
  day_of_week text not null, -- Monday, Tuesday...
  start_time time not null,
  end_time time not null,
  room text
);

-- ENROLLMENTS (Links students to courses)
create table enrollments (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid references profiles(id) not null,
  course_id uuid references courses(id) not null,
  unique(student_id, course_id)
);

-- ASSIGNMENTS
create table assignments (
  id uuid default uuid_generate_v4() primary key,
  course_id uuid references courses(id),
  title text not null,
  description text,
  due_date timestamp with time zone not null,
  is_completed boolean default false,
  student_id uuid references profiles(id) -- if we want personal tasks vs course assignments
);

-- CAFETERIA MENU
create table cafeteria_menu (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  category text, -- Breakfast, Lunch, Dinner
  price decimal(10,2),
  image_url text,
  available_date date default current_date
);

-- CAMPUS EVENTS
create table events (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  date timestamp with time zone not null,
  location text,
  organizer text,
  image_url text
);

-- STUDY GROUPS
create table study_groups (
  id uuid default uuid_generate_v4() primary key,
  course_id uuid references courses(id),
  topic text not null,
  location text,
  meeting_time timestamp with time zone,
  max_members integer,
  created_by uuid references profiles(id)
);

-- EXAMS
create table exams (
  id uuid default uuid_generate_v4() primary key,
  course_id uuid references courses(id) not null,
  title text, -- Midterm, Final
  date timestamp with time zone not null,
  location text
);

-- LIBRARY BOOKS
create table library_books (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  author text not null,
  isbn text,
  available_copies integer default 1,
  location_code text -- Shelf number
);

-- RLS POLICIES (Simple setup)
alter table profiles enable row level security;
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- Other tables generally viewable by authenticated users
alter table courses enable row level security;
create policy "Courses viewable by auth users" on courses for select using (auth.role() = 'authenticated');

-- ... (Add similar policies for other read-only public data like cafeteria, events)
-- For demo purposes, we might keep RLS permissive for read
