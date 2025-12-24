INSERT INTO health_questions
(question_text, type, options, category, risk_rules, follow_up_rules)
VALUES

-- =========================
-- BASIC INFORMATION
-- =========================

('What is your age?', 'NUMBER', NULL, 'Basic',
 '{"<30":0,"30-45":5,"46-60":10,">60":20}',
 NULL),

('What is your gender?', 'SINGLE_SELECT',
 '["Male","Female","Other"]', 'Basic',
 NULL,
 NULL),

('What is your height (cm)?', 'NUMBER', NULL, 'Basic',
 NULL,
 NULL),

('What is your weight (kg)?', 'NUMBER', NULL, 'Basic',
 NULL,
 NULL),

('What type of work do you do?', 'SINGLE_SELECT',
 '["Desk job","Manual labor","Mixed"]', 'Basic',
 '{"Desk job":5,"Manual labor":0,"Mixed":3}',
 NULL),

('How many hours do you sit daily?', 'NUMBER', NULL, 'Basic',
 '{"<6":0,"6-8":5,">8":10}',
 NULL),

-- =========================
-- LIFESTYLE & HABITS
-- =========================

('Do you exercise regularly?', 'SINGLE_SELECT',
 '["Yes","Occasionally","No"]', 'Lifestyle',
 '{"Yes":0,"Occasionally":7,"No":15}',
 '{
   "rules": [
     { "answer": "Occasionally", "show": [8] },
     { "answer": "No", "show": [8] }
   ]
 }'),

('How many days per week do you exercise?', 'SINGLE_SELECT',
 '["1-2","3-5","Daily"]', 'Lifestyle',
 '{"1-2":5,"3-5":0,"Daily":0}',
 NULL),

('Do you smoke?', 'SINGLE_SELECT',
 '["No","Occasionally","Yes"]', 'Lifestyle',
 '{"No":0,"Occasionally":10,"Yes":20}',
 '{
   "rules": [
     { "answer": "Occasionally", "show": [10] },
     { "answer": "Yes", "show": [10,11] }
   ]
 }'),

('How many cigarettes do you smoke per day?', 'NUMBER',
 NULL, 'Lifestyle',
 '{"<5":5,"5-10":10,">10":20}',
 NULL),

('For how many years have you been smoking?', 'NUMBER',
 NULL, 'Lifestyle',
 '{"<2":5,"2-5":10,">5":20}',
 NULL),

('Do you consume alcohol?', 'SINGLE_SELECT',
 '["Never","Occasionally","Frequently"]', 'Lifestyle',
 '{"Never":0,"Occasionally":5,"Frequently":15}',
 '{
   "rules": [
     { "answer": "Frequently", "show": [13] }
   ]
 }'),

('How many days per week do you drink alcohol?', 'NUMBER',
 NULL, 'Lifestyle',
 '{"<2":5,"2-4":10,">4":20}',
 NULL),

('How would you rate your stress level?', 'SINGLE_SELECT',
 '["Low","Moderate","High"]', 'Lifestyle',
 '{"Low":0,"Moderate":5,"High":10}',
 '{
   "rules": [
     { "answer": "High", "show": [27,28] }
   ]
 }'),

-- =========================
-- DIET & NUTRITION
-- =========================

('How many meals do you eat per day?', 'SINGLE_SELECT',
 '["1","2","3","4+"]', 'Diet',
 '{"1":10,"2":5,"3":0,"4+":0}',
 NULL),

('How often do you eat junk food?', 'SINGLE_SELECT',
 '["Rarely","Weekly","Daily"]', 'Diet',
 '{"Rarely":0,"Weekly":7,"Daily":15}',
 NULL),

('How would you describe your sugar intake?', 'SINGLE_SELECT',
 '["Low","Moderate","High"]', 'Diet',
 '{"Low":0,"Moderate":5,"High":10}',
 NULL),

('Do you eat fruits and vegetables daily?', 'SINGLE_SELECT',
 '["Daily","Few times a week","Rarely"]', 'Diet',
 '{"Daily":0,"Few times a week":5,"Rarely":10}',
 NULL),

('How much water do you drink daily (liters)?', 'NUMBER',
 NULL, 'Diet',
 '{"<2":5,"2-3":0,">3":0}',
 NULL),

('Do you eat outside food frequently?', 'SINGLE_SELECT',
 '["Mostly home","Mixed","Mostly outside"]', 'Diet',
 '{"Mostly home":0,"Mixed":5,"Mostly outside":10}',
 NULL),

('Do you eat late at night?', 'SINGLE_SELECT',
 '["Yes","No"]', 'Diet',
 '{"Yes":5,"No":0}',
 NULL),

-- =========================
-- SLEEP & RECOVERY
-- =========================

('How many hours do you sleep daily?', 'SINGLE_SELECT',
 '["<5","5-6","7-8",">8"]', 'Sleep',
 '{"<5":20,"5-6":15,"7-8":0,">8":0}',
 '{
   "rules": [
     { "answer": "<5", "show": [23] },
     { "answer": "5-6", "show": [23] }
   ]
 }'),

('How would you rate your sleep quality?', 'SINGLE_SELECT',
 '["Poor","Average","Good"]', 'Sleep',
 '{"Poor":15,"Average":5,"Good":0}',
 NULL),

('What time do you usually go to sleep?', 'SINGLE_SELECT',
 '["Before 11 PM","11 PM–1 AM","After 1 AM"]', 'Sleep',
 '{"Before 11 PM":0,"11 PM–1 AM":5,"After 1 AM":10}',
 NULL),

('Do you snore or wake up during sleep?', 'SINGLE_SELECT',
 '["Yes","No"]', 'Sleep',
 '{"Yes":5,"No":0}',
 NULL),

('Do you feel refreshed after waking up?', 'SINGLE_SELECT',
 '["Yes","No"]', 'Sleep',
 '{"Yes":0,"No":10}',
 NULL),

-- =========================
-- MENTAL WELLBEING
-- =========================

('Do you feel anxious often?', 'SINGLE_SELECT',
 '["Yes","No"]', 'Mental Health',
 '{"Yes":10,"No":0}',
 NULL),

('Do you experience frequent mood swings?', 'SINGLE_SELECT',
 '["Yes","No"]', 'Mental Health',
 '{"Yes":5,"No":0}',
 NULL),

('Do you find it difficult to concentrate?', 'SINGLE_SELECT',
 '["Yes","No"]', 'Mental Health',
 '{"Yes":5,"No":0}',
 NULL),

('Are you satisfied with your work-life balance?', 'SINGLE_SELECT',
 '["Yes","No"]', 'Mental Health',
 '{"Yes":0,"No":10}',
 NULL),

('Do you feel burned out?', 'SINGLE_SELECT',
 '["Yes","No"]', 'Mental Health',
 '{"Yes":10,"No":0}',
 NULL),

-- =========================
-- MEDICAL HISTORY & SYMPTOMS
-- =========================

('Do you have any existing medical conditions?', 'MULTI_SELECT',
 '["Diabetes","Blood Pressure","Thyroid","Heart Disease","None"]',
 'Medical',
 '{"Diabetes":15,"Blood Pressure":15,"Thyroid":10,"Heart Disease":25,"None":0}',
 '{
   "rules": [
     { "answer": "Diabetes", "show": [34] },
     { "answer": "Heart Disease", "show": [38] }
   ]
 }'),

('Is there a family history of chronic diseases?', 'SINGLE_SELECT',
 '["Yes","No"]', 'Medical',
 '{"Yes":10,"No":0}',
 NULL),

('Are you on any long-term medication?', 'SINGLE_SELECT',
 '["Yes","No"]', 'Medical',
 '{"Yes":5,"No":0}',
 NULL),

('Have you been hospitalized in the last year?', 'SINGLE_SELECT',
 '["Yes","No"]', 'Medical',
 '{"Yes":10,"No":0}',
 NULL),

('Do you go for regular health checkups?', 'SINGLE_SELECT',
 '["Yes","No"]', 'Medical',
 '{"Yes":0,"No":5}',
 NULL),

('Do you feel fatigue frequently?', 'SINGLE_SELECT',
 '["Yes","No"]', 'Symptoms',
 '{"Yes":5,"No":0}',
 NULL),

('Do you experience chest discomfort?', 'SINGLE_SELECT',
 '["Yes","No"]', 'Symptoms',
 '{"Yes":30,"No":0}',
 '{
   "rules": [
     { "answer": "Yes", "show": [39] }
   ]
 }'),

('Do you feel shortness of breath?', 'SINGLE_SELECT',
 '["Yes","No"]', 'Symptoms',
 '{"Yes":25,"No":0}',
 NULL),

('Do you experience frequent headaches?', 'SINGLE_SELECT',
 '["Yes","No"]', 'Symptoms',
 '{"Yes":5,"No":0}',
 NULL);
