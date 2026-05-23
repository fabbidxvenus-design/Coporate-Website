-- ============================================================
-- Coporate_Website — Seed Data
-- Created: 2026-05-22
-- Purpose: Seed data for development matching design screens
-- Note: Requires admin profile to be created first via Supabase Auth
-- ============================================================

-- ============================================================
-- SEED DATA: SITE SETTINGS
-- ============================================================
insert into public.site_settings (key, value) values
  ('company_name', '{"vi": "Fabbi JSC", "en": "Fabbi JSC"}'),
  ('company_email', '{"value": "contact@fabbi.com.vn"}'),
  ('company_phone', '{"value": "+84 28 7108 9999"}'),
  ('company_address', '{"vi": "Tòa nhà Bcons, 4/4 Nguyễn Văn Linh, Q.7, TP.HCM", "en": "Bcons Tower, 4/4 Nguyen Van Linh, Dist.7, HCMC"}'),
  ('social_facebook', '{"url": "https://facebook.com/fabbi"}'),
  ('social_linkedin', '{"url": "https://linkedin.com/company/fabbi"}'),
  ('recruitment_banner', '{"title": "Join Our Team", "subtitle": "Shape the future of technology with us"}'),
  ('about_section', '{"mission": "We build innovative solutions that empower businesses to grow.", "vision": "To be the leading technology partner for enterprises in Vietnam and beyond."}');

-- ============================================================
-- SEED DATA: JOBS
-- ============================================================
insert into public.jobs (slug, title, department, location, employment_type, salary_min, salary_max, summary, description, requirements, benefits, skills, status, published_at, created_by) values

  (
    'senior-frontend-engineer',
    'Senior Frontend Engineer',
    'Engineering',
    'Ho Chi Minh City',
    'full-time',
    35000000,
    50000000,
    'Lead the development of world-class web applications using React, TypeScript, and modern frontend technologies. Work closely with our product and design teams to create exceptional user experiences.',
    '<h2>About This Role</h2><p>As a Senior Frontend Engineer at Fabbi, you will be responsible for architecting and building scalable frontend solutions. You will mentor junior developers and contribute to our engineering culture.</p><h2>What You Will Do</h2><ul><li>Design and implement complex user interfaces using React and TypeScript</li><li>Collaborate with product managers and designers to define product requirements</li><li>Write clean, maintainable, and well-tested code</li><li>Participate in code reviews and knowledge sharing sessions</li><li>Stay up-to-date with industry trends and best practices</li></ul>',
    '<h2>Requirements</h2><ul><li>5+ years of experience in frontend development</li><li>Expert knowledge of React, TypeScript, and modern CSS</li><li>Experience with state management (Redux, Zustand, or similar)</li><li>Understanding of web performance optimization</li><li>Strong problem-solving skills</li><li>Excellent communication in Vietnamese and English</li></ul>',
    '<h2>Benefits</h2><ul><li>Competitive salary with performance bonus</li><li>Healthcare insurance</li><li>Flexible working hours and remote work options</li><li>Learning and development budget</li><li>Modern office in District 7</li><li>Dynamic and collaborative team</li></ul>',
    ARRAY['React', 'TypeScript', 'Next.js', 'CSS', 'Testing'],
    'published',
    '2026-05-01 00:00:00+07',
    null
  ),

  (
    'backend-engineer-nodejs',
    'Backend Engineer (Node.js)',
    'Engineering',
    'Ho Chi Minh City',
    'full-time',
    30000000,
    45000000,
    'Build robust backend services and APIs using Node.js, PostgreSQL, and cloud technologies. Design scalable systems that power our products and services.',
    '<h2>About This Role</h2><p>Join our backend engineering team to design and implement scalable microservices. You will work on high-traffic systems and ensure our applications are reliable and performant.</p><h2>What You Will Do</h2><ul><li>Design and implement RESTful APIs and microservices</li><li>Optimize database queries and ensure data integrity</li><li>Implement authentication and security measures</li><li>Write comprehensive unit and integration tests</li><li>Participate in on-call rotation for production systems</li></ul>',
    '<h2>Requirements</h2><ul><li>3+ years of experience in backend development</li><li>Strong proficiency in Node.js and Express/NestJS</li><li>Experience with PostgreSQL and database design</li><li>Understanding of REST API design principles</li><li>Familiarity with Docker and Kubernetes</li><li>Strong analytical and problem-solving skills</li></ul>',
    '<h2>Benefits</h2><ul><li>Competitive salary and performance bonuses</li><li>Premium healthcare package</li><li>Training and certification reimbursement</li><li>Flexible hybrid work model</li><li>Regular team building activities</li></ul>',
    ARRAY['Node.js', 'PostgreSQL', 'Docker', 'Redis', 'TypeScript'],
    'published',
    '2026-05-05 00:00:00+07',
    null
  ),

  (
    'devops-engineer',
    'DevOps Engineer',
    'Infrastructure',
    'Ho Chi Minh City',
    'full-time',
    35000000,
    55000000,
    'Lead our infrastructure and deployment processes. Design CI/CD pipelines, manage cloud resources, and ensure system reliability across all environments.',
    '<h2>About This Role</h2><p>As a DevOps Engineer, you will be instrumental in scaling our infrastructure. You will work on automation, monitoring, and ensuring high availability of our services.</p><h2>What You Will Do</h2><ul><li>Design and maintain CI/CD pipelines</li><li>Manage cloud infrastructure (AWS/GCP)</li><li>Implement monitoring and alerting systems</li><li>Automate operational tasks and processes</li><li>Ensure security and compliance requirements are met</li></ul>',
    '<h2>Requirements</h2><ul><li>4+ years of experience in DevOps/SRE</li><li>Expert knowledge of Docker and Kubernetes</li><li>Experience with cloud platforms (AWS or GCP)</li><li>Proficiency in infrastructure as code (Terraform, Pulumi)</li><li>Understanding of networking and security</li><li>Strong automation and scripting skills</li></ul>',
    '<h2>Benefits</h2><ul><li>Top-tier compensation package</li><li>Stock options for eligible positions</li><li>Unlimited learning budget</li><li>Work from home flexibility</li><li>Premium health and life insurance</li></ul>',
    ARRAY['AWS', 'Kubernetes', 'Terraform', 'Docker', 'CI/CD'],
    'published',
    '2026-05-10 00:00:00+07',
    null
  ),

  (
    'product-designer',
    'Product Designer',
    'Design',
    'Ho Chi Minh City',
    'full-time',
    25000000,
    40000000,
    'Create beautiful and intuitive user experiences for our products. Work closely with product and engineering teams to deliver designs that delight users.',
    '<h2>About This Role</h2><p>As a Product Designer, you will own the end-to-end design process from research to final implementation. You will contribute to our design system and ensure consistency across all products.</p><h2>What You Will Do</h2><ul><li>Conduct user research and usability testing</li><li>Create wireframes, prototypes, and high-fidelity designs</li><li>Collaborate with engineers on implementation</li><li>Maintain and evolve our design system</li><li>Present designs to stakeholders and incorporate feedback</li></ul>',
    '<h2>Requirements</h2><ul><li>3+ years of experience in product design</li><li>Proficiency in Figma and design tools</li><li>Strong portfolio demonstrating UX/UI skills</li><li>Understanding of front-end development</li><li>Experience with design systems</li><li>Excellent visual and interaction design skills</li></ul>',
    '<h2>Benefits</h2><ul><li>Competitive salary with creative bonus</li><li>Latest hardware and software tools</li><li>Conference attendance opportunities</li><li>Flexible working arrangements</li><li>Creative and collaborative environment</li></ul>',
    ARRAY['Figma', 'UI/UX', 'Prototyping', 'User Research', 'Design System'],
    'published',
    '2026-05-12 00:00:00+07',
    null
  ),

  (
    'qa-engineer',
    'Quality Assurance Engineer',
    'Engineering',
    'Ho Chi Minh City',
    'full-time',
    20000000,
    35000000,
    'Ensure the quality and reliability of our products through comprehensive testing strategies. Design and implement automated test suites.',
    '<h2>About This Role</h2><p>As a QA Engineer, you will be responsible for testing our web and mobile applications. You will develop test plans, create automation frameworks, and work closely with developers to deliver high-quality products.</p><h2>What You Will Do</h2><ul><li>Design and execute test plans and cases</li><li>Develop automated test scripts</li><li>Report and track bugs using issue tracking systems</li><li>Perform regression testing after releases</li><li>Collaborate with developers to improve code quality</li></ul>',
    '<h2>Requirements</h2><ul><li>2+ years of experience in QA/testing</li><li>Experience with automated testing tools (Cypress, Playwright)</li><li>Understanding of CI/CD testing integration</li><li>Knowledge of bug tracking tools</li><li>Strong analytical and problem-solving skills</li><li>Detail-oriented with strong communication skills</li></ul>',
    '<h2>Benefits</h2><ul><li>Competitive salary and benefits</li><li>Training and certification support</li><li>Health insurance coverage</li><li>Flexible work schedule</li><li>Career growth opportunities</li></ul>',
    ARRAY['Cypress', 'Playwright', 'Testing', 'Automation', 'Agile'],
    'review',
    '2026-05-15 00:00:00+07',
    null
  );

-- ============================================================
-- SEED DATA: NEWS ARTICLES
-- ============================================================
insert into public.news_articles (slug, title, excerpt, body, cover_image_url, category, tags, status, published_at, author_id) values

  (
    'fabbi-announces-2026-growth-plan',
    'Fabbi Announces Ambitious 2026 Growth Plan',
    'We are excited to share our strategic vision for 2026, focusing on innovation, talent development, and market expansion.',
    '<h2>Looking Ahead to 2026</h2><p>Fabbi is proud to announce our comprehensive growth plan for 2026. This strategy focuses on three core pillars: innovation, talent development, and market expansion.</p><h3>Innovation</h3><p>Our engineering teams will continue to push boundaries, developing cutting-edge solutions that address real business challenges. We are investing heavily in AI and machine learning capabilities to enhance our product offerings.</p><h3>Talent Development</h3><p>We believe our people are our greatest asset. This year, we are launching new programs to support professional growth, including mentorship initiatives, technical training, and leadership development.</p><h3>Market Expansion</h3><p>Building on our success in Vietnam, we are exploring opportunities in Southeast Asian markets. Our goal is to bring innovative solutions to more businesses across the region.</p><p>Stay tuned for more updates as we execute on this exciting vision!</p>',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200',
    'Company News',
    ARRAY['Growth', 'Strategy', '2026'],
    'published',
    '2026-05-01 00:00:00+07',
    null
  ),

  (
    'new-office-expansion',
    'Fabbi Opens New Modern Office in District 7',
    'We have moved to a brand new, state-of-the-art office space in the heart of Ho Chi Minh City''s tech district.',
    '<h2>A New Home for Innovation</h2><p>Fabbi is thrilled to announce the opening of our new headquarters in District 7, Ho Chi Minh City. This modern workspace reflects our commitment to creating an exceptional environment for our team.</p><h3>Features of Our New Space</h3><p>The new office spans over 2,000 square meters and includes:</p><ul><li>Open collaboration zones with flexible seating</li><li>State-of-the-art meeting rooms and conference facilities</li><li>Quiet focus pods for deep work</li><li>Game rooms and relaxation areas</li><li>Fully equipped kitchen and break areas</li><li>Sustainable design with natural lighting</li></ul><p>We designed this space with our team''s well-being in mind, incorporating elements that promote creativity, collaboration, and work-life balance.</p><p>Welcome to our new home!</p>',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
    'Company News',
    ARRAY['Office', 'Expansion', 'Ho Chi Minh City'],
    'published',
    '2026-05-08 00:00:00+07',
    null
  ),

  (
    'employee-spotlight-linh',
    'Employee Spotlight: Meet Linh, Our Senior Product Manager',
    'Get to know Linh Pham, who brings over 8 years of product management experience to Fabbi.',
    '<h2>Interview with Linh Pham</h2><p>We sat down with Linh to learn more about her journey in product management and her experience at Fabbi.</p><h3>Q: Can you tell us about your background?</h3><p>I have been in product management for over 8 years, working with both startups and established tech companies. I joined Fabbi 2 years ago because of the company''s focus on innovation and its collaborative culture.</p><h3>Q: What do you enjoy most about working at Fabbi?</h3><p>The people, definitely. We have such a talented and supportive team. Everyone is passionate about what they do, and there''s always an opportunity to learn and grow.</p><h3>Q: What advice would you give to aspiring PMs?</h3><p>Never stop learning. The tech industry evolves quickly, so it''s important to stay curious and open to new ideas. Also, always keep the user at the center of everything you do.</p><p>Thank you for sharing your insights, Linh!</p>',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200',
    'Culture',
    ARRAY['Team', 'Product Management', 'Interview'],
    'published',
    '2026-05-12 00:00:00+07',
    null
  ),

  (
    'tech-workshop-recap',
    'Recap: Our First Internal Tech Workshop',
    'Highlights from Fabbi''s inaugural internal technology workshop, bringing together engineers from across the company.',
    '<h2>A Day of Learning and Sharing</h2><p>Last month, we hosted our first internal tech workshop, bringing together over 50 engineers for a day of learning, collaboration, and innovation. The event was a tremendous success!</p><h3>Topics Covered</h3><p>The workshop featured sessions on:</p><ul><li>Modern frontend architecture with Next.js 15</li><li>Backend microservices design patterns</li><li>Testing strategies and best practices</li><li>DevOps and infrastructure automation</li><li>AI/ML integration in production systems</li></ul><h3>Key Takeaways</h3><p>Our engineers shared practical insights and real-world examples from their projects. The hands-on labs allowed participants to apply new concepts immediately.</p><p>We are planning more workshops in the coming months. Stay tuned for updates!</p>',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200',
    'Events',
    ARRAY['Workshop', 'Tech', 'Learning'],
    'published',
    '2026-05-18 00:00:00+07',
    null
  ),

  (
    'remote-work-policy-update',
    'New Hybrid Work Policy: What You Need to Know',
    'Fabbi introduces a flexible hybrid work policy to support work-life balance while maintaining team collaboration.',
    '<h2>Flexibility Meets Collaboration</h2><p>At Fabbi, we believe in empowering our team members to do their best work. That''s why we are introducing a new hybrid work policy that offers flexibility while ensuring strong collaboration.</p><h3>Policy Details</h3><p>Starting next month, our hybrid work policy includes:</p><ul><li>3 days in-office, 2 days remote per week (flexible)</li><li>Core collaboration hours: 10 AM - 3 PM</li><li>Quarterly in-person team events</li><li>Home office setup allowance</li></ul><h3>Benefits</h3><p>This policy supports better work-life balance while maintaining the collaborative culture that makes Fabbi special. Team members can design their work schedule to suit their individual needs.</p><p>For more details, please refer to the full policy document or reach out to HR.</p>',
    'https://images.unsplash.com/photo-1521898284481-a5ec348cb555?w=1200',
    'Policy Update',
    ARRAY['Remote Work', 'Hybrid', 'Policy', 'Work-Life Balance'],
    'published',
    '2026-05-20 00:00:00+07',
    null
  );

-- ============================================================
-- NOTE: Applications seed data requires actual CV files
-- Sample application for demo purposes
-- insert into public.applications (job_id, full_name, email, phone, portfolio_url, message, cv_file_path, cv_file_name, cv_file_size, cv_mime_type, source, status)
-- values
--   (null, 'Sample Applicant', 'applicant@example.com', '+84 901 234 567', 'https://portfolio.example.com', 'I am excited to apply for positions at Fabbi.', '/applications/sample-cv.pdf', 'sample-cv.pdf', 245000, 'application/pdf', 'website', 'new');

-- ============================================================
-- NOTE: profiles table requires auth.users to exist first
-- Admin profile creation must be done through Supabase Auth
-- Run: supabase auth signup or create via Supabase dashboard
-- ============================================================