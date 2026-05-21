const fs = require('fs');

fs.rename(
    'old.txt',
    'new.txt',
    (err) => {
        console.log('Renamed');
    }
);