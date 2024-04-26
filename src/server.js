const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'OPTIONS'], 
    allowedHeaders: ['Content-Type'] 
}));

app.get('/getData', (req, res) => {
    const csvFilePath = 'game_dataset.csv'; 

    fs.readFile(csvFilePath, 'utf8', (err, csvString) => {
        if (err) {
            console.error('Failed to read CSV file', err);
            res.status(500).json({ error: 'Failed to read CSV file' });
            return;
        }

        Papa.parse(csvString, {
            header: true,
            complete: (results) => {
                res.json(results.data);
            },
            error: (err) => {
                console.error('Error parsing CSV', err);
                res.status(500).json({ error: 'Error parsing CSV' });
            }
        });
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));