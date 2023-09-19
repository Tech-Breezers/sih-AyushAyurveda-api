const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
});

async function dropAllTables() {

    const connection = await pool.getConnection();
    
    try {
        await connection.query('SET FOREIGN_KEY_CHECKS = 0');

        const [rows, fields] = await connection.query('SHOW TABLES');

        for (const row of rows) {
            const tableName = row[`Tables_in_${process.env.DB_NAME}`];
            await connection.query(`DROP TABLE IF EXISTS \`${tableName}\``);
            console.log(`Dropped table: ${tableName}`);
        }

        console.log('All tables dropped.');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await connection.query('SET FOREIGN_KEY_CHECKS = 1');
        connection.release();
    }
}


async function createTables() {
    const connection = await pool.getConnection();
    
    try {

        await connection.query(`
            CREATE TABLE IF NOT EXISTS meds (
                id INT AUTO_INCREMENT PRIMARY KEY,
                medicine TEXT,
                description TEXT,
                precautions TEXT
            );
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS treats (
                id INT AUTO_INCREMENT PRIMARY KEY,
                disease TEXT,
                symptoms TEXT,
                herbs JSON, -- Use JSON data type for an array of foreign keys
                treatment TEXT,
                alternate_name TEXT
            );
        `);

        console.log('Tables created.');
    } catch (err) {
        console.error('Error creating tables:', err);
    } finally {
        connection.release();
    }
}

async function seedData() {
    const connection = await pool.getConnection();
    
    try {

        await connection.query(`
            INSERT INTO meds (medicine, description, precautions)
            VALUES

                ('lobelia', 
                'Lobelia species are annual or perennial herbs or undershrubs, rarely shrubby, although the “tree” lobelias found at high elevations on the mountains of tropical Africa are remarkable arborescent forms. The genus has a great diversity of forms, and species frequently appear dissimilar from each other.', 
                'induce vomiting,convulsions,nausea'),

                ('ephedra', 
                'Ephedra (Ephedra sinica), also called ma huang, is an herb that has been used in Traditional Chinese Medicine (TCM) for more than 5,000 years, primarily to treat asthma, bronchitis, and hay fever. Ephedra is also prescribed for symptoms of cold and flu, including nasal congestion, cough, fever, and chills.', 
                'hypersensitivity reaction'),

                ('haritaki', 
                'Haritaki is a drupe-like fruit, oval in shape with size varying between 2 - 4.5 cm in length and 1.2 - 2.5 cm in breadth having 5 longitudinal ridges. Depending upon its variety, it turns green - blackish in color when ripens. Haritaki fruit tastes sweet, sour, bitter depending upon its types.', 
                'leads to system weakening if taken with alcohol, not recommended during pregnancy'),

                ('bala', 
                'It goes by the scientific name Sida cordifolia, a perennial herb that grows to 30 metres height with oblong or heart-shaped leaves bearing small, solitary, axillary and white coloured florals. The roots and stems of Bala are very stout and strong. A native plant to India that grows along wastelands and roadsides.', 
                'slow down heart beat, low BP'),

                ('saffron', 
                "Saffron is the dried stigma from the Crocus sativus flower. The name 'saffron' derives from an Arabic word meaning 'to become yellow' which refers to saffron's use as a bright yellow dye. The Latin name 'crocus' most likely stems from an ancient Sanskrit word for saffron.", 
                'a runny nose or sneezing,pain or tenderness around your cheeks'),

                ('Bala', 
                'This herb is used to increase strength of body. Bala is an ancient Ayurveda herb, used widely in a variety of Ayurveda medicines and oils to improve strength of bones.', 
                'Skin rashes'),

                ('Brahmi', 
                'Bacopa monnieri, also called brahmi, water hyssop, thyme-leaved gratiola, and herb of grace, is a staple plant in traditional Ayurvedic medicine. Bacopa monnieri has been used by Ayurvedic medical practitioners for centuries for a variety of purposes, including improving memory, reducing anxiety, and treating epilepsy', 
                'dry mouth, headache, dizziness, drowsiness, palpitation'),

                ('Yogaraj Guggul', 
                'Yogaraja Gulgulu vatika is an ayurvedic medicine for joint pain. It is in tablet form. Its unique formulation may help in reducing joint inflammation, obesity, and muscle pain. It acts by balancing Vata dosha in the body.', 
                'skin rash, diarrhea, mild nausea, hiccups,irregular menstrual cycles'),

                ('sandalwood', 
                'Sandalwood describes a number of small tree species in the genus Santalum, which occur in south and Southeast Asia, Australia and the Pacific. The trees produce an oil, deposited in the heartwood, which when extracted by distillation is used in the international perfumery market.', 
                'Skin allergy'),

                ('turmeric', 
                'An upright herb with large, oblong leaves that are dark green on the upper surface and pale green underneath. Its yellow-white flowers grow on a spike-like stalk and have small, brown seeds. Turmeric only reproduces via its underground stem (rhizome) which is thick and ringed with the bases of old leaves.', 
                'rashes and outbreaks, and shortness of breath'),

                ('gokshura', 
                'Gokshura is a small leafy plant commonly known as Tribulus terrestris in Western countries. In traditional medicine, people used gokshura to treat various disorders, such as urinary tract disorders, kidney disease, and erectile dysfunction.', 
                'stomach distress , rashes'),

                ('bilwa', 
                'Aegle marmelos commonly known as bilwa or bael is an important medicinal plant in Ayurveda. The English name for bael is stone apple, as its rather large fruit is like pale yellow to golden orange when ripe.', 
                'swelling, pain, fever'),

                ('chitrak', 
                'Chitrak is a herbaceous shrub coming from the Plumbaginaceae family. The roots of chitrak are light yellow coloured when fresh, reddish-brown when dry, and are usually straight unbranched, or slightly branched with or without secondary rootlets. It has globous, woody stems with spreading green branches.', 
                'itchy nose, sore throat'),

                ('dashmul', 
                'Dashmool Kadha, an Ayurvedic herbal tonic with ten powerful roots that help to restore balance to the body and promote post-pregnancy care. This best-quality kadha has been prepared using the traditional Indian Jappa method, ensuring its authenticity and effectiveness.', 
                'Skin allergy'),

                ('amalaki', 
                'It is a large deciduous tree with greenish-grey bark. Widely available through out India and is also found under cultivation throughout tropical India.', 
                'itching'),

                ('rock salt', 
                'Rock salt is the name of a sedimentary rock that consists almost entirely of halite, a mineral composed of sodium chloride, NaCl. It forms where large volumes of sea water or salty lake water evaporate from an arid-climate basin -- where there is a replenishing flow of salt water and a restricted input of other water.', 
                'High BP');
                
        `);


        await connection.query(`
            INSERT INTO treats (disease, symptoms, herbs, treatment, alternate_name)
            VALUES

                ('Asthma', 
                'Pain in the heart and ribs, upward respiratory movement (of prána), gas, splitting temple pain, heaviness in the throat and chest, astringent taste in the mouth, and abdominal rumbling.',
                '["lobelia", "ephedra", "haritaki", "bala", "saffron"]', 
                'Bronchodilators, such as lobelia and ephedra, quickly open breathing passages. Long-term use can be depleting for Pitta and Kapha, and immediately weakening for Váyu. Tridoshic herbs include harítakí, balá, and saffron. Each person must follow their appropriate dosha diet. After attacks, the lungs must be strengthened with tonics like chyavan prásh, balá, ahwagandhá, harítakí, and bráhmí. Rebuilding the lungs in this way can help prevent future attacks.', 
                'Dama'),

                ('Arthritis', 
                'Joint pain, loss of taste, thirst, lack of enthusiasm, heaviness, fever, indigestion, swelling (inflammation).',
                '["Mahanarayan Oil", "Brahmi","Yogaraj Guggul", "sandalwood", "turmeric"]', 
                'Mahánáráyan oil improves flexibility, stiffness, muscle fatigue, and removes pain. It is mixed with sesame oil (1:1) and applied to the painful areas. This oil also breaks up blockages and begins to heal locally. After oil application, warm heat, yoga, bath, or mild exercise further improves this situation. Nádi sweda (local steam application) with dashmúl can be applied locally. Náráyan oil is good for muscle and joint pain, lower body circulation, and reversing imbalances caused by aging. Bráhmí and sandalwood oils (mixed together) are very beneficial for Pitta types of arthritis. Avipattikar chúròa is good to ingest for rheumatism. Váyu: Hot spices like cinnamon and fresh ginger. Yogaraj guggul is the best herb for this condition; it cleanses bone tissue, strengthens bones, and improves flexibility. Castor oil or triphalá help keep the colon cleansed. Pitta: Kaishore guggul, sandalwood, gudúchí, aloe, turmeric, saffron. Musta and nirgundí relieve pain. Kapha: Pure guggul is best for this condition. Hot herbs are also helpful, such as cinnamon, dry ginger, turmeric, trikatu. Musta and nirgundí relieve pain', 
                'Ámaváta'),

                ('Diarrhea', 
                'Watery feces, small quantity, expelled with noise, severe pain, and difficulty. It may be dry, frothy, thin, rough, or scaly, slightly brown and frequently expelled. Alternatively, it may seem gooey, burnt, and slimy. One may experience a dry mouth, prolapsed rectum, hair standing on end, and straining to expel stools.',
                '["gokshura", "bilwa", "chitrak", "dashmul", "amalaki", "rock salt", "alamus"]', 
                "If the diarrhea is prematurely halted while áma is still in the body, it may cause various diseases (e.g., hemorrhoids, edema, anemia, tumors, fever, etc.). Rather, it is advised to allow initial áma diarrhea to come out, and even to induce it by taking harítakí. It is a part of the body's defense mechanism to expel toxins (áma). Thus, stopping diarrhea when it is still toxic goes against the body's natural healing process. balá, gokshura, bilwa, ginger, coriander, calamus, pippalí, chitrak, sour pomegranate, dashmúl, ámalakí, ghee, and rock salt are taken with foods and drinks to strengthen the digestion and the constitution. Pain, gas retention, and the desire to pass urine or stool (but cannot): Are healed with bilwa, pippalí, ginger, cane sugar, and sesame oil. Diarrhea with a dry mouth (dehydration): Basmati rice, barley soup, green lentils, sesame seeds, bilwa, kuþaj, íshabgol fried in ghee, and sesame oil/added with yogurt and pomegranate, cane sugar, ginger.Foods include boiled rice with this milk decoction, and ghee. If the person is strong, food (e.g., rice) should be eaten after milk is digested. Weak persons eat food just after the milk. Alternately, fresh butter mixed with honey and sugar is eaten before meals. The rice is soaked in water overnight, and crushed and rubbed the next morning. When the water from this rice is drunk, it heals bloody diarrhea.", 
                'Atísára, Praváhika'),

                ('Digestion', 
                'Weakness, taking a long time to digest foods, increasing acidity, salivation, bad taste in the mouth, loss of taste or appetite, thirst, exhaustion, dizziness, abdominal distention, vomiting, ear noise, intestinal gurgling, burning, heaviness.',
                '["pippali", "black mustard seeds", "ginger", "haritaki"]', 
                'Therapies to eliminate these problems include drinking warm water or a decoction made of pippalí and black mustard seeds. Lightening therapy (i.e., pañcha karma, exercise, foods that are light, hot, sharp, and dry, carminative/digestive herbs— [e.g., ginger and musta, harítakí and ginger, drunk with hot water]). After the stomach is cleansed, persons eat light foods such as thin gruel and kicharí, followed by digestive stimulant herbs. Herbs like dashmúl, ginger, pippalí, triphalá, trikatu, and chitrak reduce Váyu and promote digestion. Black salt is also helpful. They are taken with warm water and also used for massage. One-half cup yogurt and 1/2 cup water (lassi) taken after meals also improves digestion.One-half cup yogurt and 1/2 cup water (lassi) taken after meals also improves digestion. Pungent and sour foods and black salt may be taken only when mixed with bitter and astringent foods. Cane sugar or rock sugar is also useful when mixed with the herbs.', 
                'Grahaní'),

                ('Fever', 
                'Headache, Muscle/Joint pain, Nausea',
                '["Vasaka leaf", "Shukti Bhasma(10%)", "fennel Seeds", "Cinnamon", "Ginger Powder", "tulsi"]', 
                "1. Vasaka leaf is another simple remedy for treating fever. It should be mixed with 'Shukti Bhasma' (10%) and should be taken twice daily in 2 gram doses. 2.Ginger tea is another remedy that always turns out to be comforting and is of great value. Consume a concoction made by adding half a teaspoon of fennel seeds, cinnamon, ginger powder and a little clove to a hot cup of water helps. The herbs should be soaked for about 10 minutes. They should be filtered afterwards before drinking the tea. It should be kept in mind that both ginger and aspirin dilute the blood. Thus, ginger tea should be avoided for two hours after consuming aspirin.", 
                'Jvar'),

                ('Hypertension', 
                'Váyu: Sudden changes in pressure, irregular or an erratic pulse—caused by worry, strain, overwork, nervousness, and insomnia. Pitta: Flushed face, red eyes, violent headaches, sensitivity to light, nose bleeds, anger, irritability, burning, sometimes with liver complications. Kapha: Constant high pressure, obesity, fatigue, edema, high cholesterol.',
                '["ashwagandha", "shankhpushpi", "bhringraj", "garlic"]', 
                'General: Arjuna strengthens the heart, especially if the pulse is weak. Váyu: Brain tonics such as gotu kola, jatamanshi, ashwagandhá, shank pushpí, bhringaráj, garlic, and a Váyu-reducing diet and lifestyle. Shirodhárá (hot oil poured on the head for 7 to 14 sessions) also heal nerves and mental stress. Pitta: Aloe vera gel, chiráyatá, kaóuká, rhubarb, harmonizing herbs like shatávarí, mañjishthá, musta, triphalá, balá, gotu kola, and a Pitta-reducing diet and lifestyle. Garlic, onions, and other hot, salty, and pungent items will aggravate the condition. £hirodhárá is also very helpful. Kapha: Myrrh, trikatu, arjuna, hawthorn berries, diuretics like gokshura, and a Kapha-reducing diet and lifestyle. Shirodhárá is also very helpful.', 
                'Raktagata Vata, Siragata Vata'),

                ('Goiter', 
                'Swollen Neck, cyst',
                '["sitopladi", "trikaatu", "guggul", "calamus"]', 
                'Herbs include kañchanar, guggul, sitopaladi, trikatu, and vachá (calamus). Other therapies include emesis and purgation to eliminate the doshas from the body; therapeutic smoke inhalation, and fasting. If the swelling is in the mouth, then the herbs are made into a paste and rubbed onto the swelling from inside the mouth.', 
                'Galaganda'),

                ('Jaundice', 
                'greenish-bluish-yellow complexion with dizziness, no sexual desire, mild fever, stupor, physical weakness, and poor digestion.',
                '["gokshura", "katuká", "pashana bedha"]', 
                'Purgation with aloe or rhubarb (mixed with fennel) is required in acute conditions. Bhú-ámalakí, turmeric, and mañjißhóhá are next used to cleanse the liver and blood. Certain herbs break up stones. These include gokßhura, kaóuká, and paßhana bedha. Taken with coriander or turmeric, the herb’s actions are directed to the gall bladder.', 
                'Kámalá Roga'),

                ('GallStones', 
                'Symptoms include acute pain in the liver and gallbladder, swelling, and tenderness.',
                '["manjishtha", "turmeric", "Bhut-amalaki", "gokshura"]', 
                'Purgation with aloe or rhubarb (mixed with fennel) is required in acute conditions. Bhú-ámalakí, turmeric, and mañjishthá are next used to cleanse the liver and blood. Certain herbs break up stones. These include gokshura, katuká, and pashana bedha. Taken with coriander or turmeric, the herb’s actions are directed to the gall bladder.', 
                'Pathri');

        `);

        console.log('Data seeded.');
    } catch (err) {
        console.error('Error seeding data:', err);
    } finally {
        connection.release();
    }
}


async function main(){

    try {
        console.log("-----Connected!-----");
        await dropAllTables();
        console.log("-----Dropping previous tables done-----");
        await createTables();
        console.log("-----New table creation done-----");
        await seedData();
        console.log("-----New data insertion done-----");
    } catch (err) {
        console.error('Error:', err);
    } finally {
        pool.end();
    }
        
}

main();
