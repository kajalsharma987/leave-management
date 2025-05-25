// PostgreSQL कनेक्शन के लिए 'pg' लाइब्रेरी को इंपोर्ट करें
const { Pool } = require('pg');

// एक नया PostgreSQL कनेक्शन पूल बनाएं
// connectionString पर्यावरण चर (environment variable) से लिया जाएगा
// यह DATABASE_URL होगा जो आपने Render से कॉपी किया है और .env में सेट करेंगे
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Render जैसे क्लाउड होस्टिंग के लिए SSL सेटिंग्स अक्सर आवश्यक होती हैं
    // rejectUnauthorized: false का उपयोग केवल तभी करें जब आप SSL सर्टिफिकेट्स को सत्यापित नहीं करना चाहते हों
    // प्रोडक्शन में, आपको आमतौर पर SSL सर्टिफिकेट्स को ठीक से कॉन्फ़िगर करना चाहिए
    ssl: {
        rejectUnauthorized: false
    }
});

// डेटाबेस कनेक्शन का परीक्षण करें
// यह सुनिश्चित करने के लिए कि सर्वर स्टार्ट होने पर डेटाबेस से कनेक्शन सफल रहा है
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to the PostgreSQL database:', err);
    } else {
        console.log('Successfully connected to PostgreSQL database!');
    }
});

// इस कनेक्शन पूल ऑब्जेक्ट को एक्सपोर्ट करें ताकि इसे अन्य फाइलों में उपयोग किया जा सके (जैसे app.js)
module.exports = pool;