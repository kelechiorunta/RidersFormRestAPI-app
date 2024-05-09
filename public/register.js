const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

const path = require('path')

const router = express.Router()

const filePath = path.join(__dirname, 'riders', 'riders.json');

router.get('/', (req, res) => {
    fs.readFile(filePath, (err, data) => {
        if (data && !err) {
            var editData = JSON.parse(data);
            res.status(200).json({rider: editData})
        }else{
            return res.status(500).json({errMsg:'Unable to render file'})
        }
    })
})

router.post('/', (req, res) => {
    fs.readFile(filePath, (err, data) => {
        if (data && !err) {
            var parseData = JSON.parse(data);
            (req.body && req.body.length > 0)? req.body.map(rider => {
                return parseData.push(rider)
            }) : null
            fs.writeFile(filePath, JSON.stringify(parseData, null, 2), (err) => {
                if (err) {
                    handleError(res);
                } else {
                    res.status(200).json({ successMsg: "Saved successfully" });
                }
            });
        } else {
            fs.writeFile(filePath, JSON.stringify({id:0, name:"John"}), (err) => {
                if (err) {
                    handleError(res);
                } else {
                    res.status(200).json({ successMsg: "Saved successfully" });
                }
            });
        }
    });
})
    
// PUT route for updating a rider by ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedRider = req.body;

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ success: false, message: 'Unable to read data' });
        }

        try {
            let ridersData = JSON.parse(data);
            const riderIndex = ridersData.findIndex(rider => {return rider.id == parseInt(id)});

            if (riderIndex !== -1) {
                ridersData[riderIndex] = { ...ridersData[riderIndex], ...updatedRider };
                fs.writeFile(filePath, JSON.stringify(ridersData, null, 2), (err) => {
                    if (err) {
                        console.error('Error writing file:', err);
                        return res.status(500).json({ success: false, message: 'Unable to update rider' });
                    }
                    res.status(200).json({ success: true, message: 'Rider updated successfully', data: ridersData[riderIndex] });
                });
            } else {
                res.status(404).json({ success: false, message: 'Rider not found' });
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).json({ success: false, message: 'Error parsing JSON data' });
        }
    });
});

// DELETE route for deleting a rider by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ success: false, message: 'Unable to read data' });
        }

        try {
            let ridersData = JSON.parse(data);
            const riderIndex = ridersData.findIndex(rider => rider.id == parseInt(id));

            if (riderIndex !== -1) {
                ridersData.splice(riderIndex, 1); // Remove rider from array
                fs.writeFile(filePath, JSON.stringify(ridersData, null, 2), (err) => {
                    if (err) {
                        console.error('Error writing file:', err);
                        return res.status(500).json({ success: false, message: 'Unable to delete rider' });
                    }
                    res.status(200).json({ success: true, message: 'Rider deleted successfully' });
                });
            } else {
                res.status(404).json({ success: false, message: 'Rider not found' });
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).json({ success: false, message: 'Error parsing JSON data' });
        }
    });
});

function handleError(res) {
    res.status(500).json({ errMsg: 'Unable to save' });
}


module.exports = router