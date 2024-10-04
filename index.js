const fs = require('fs');
const axios = require('axios');

const STATUS_CODES = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNDEFINED: 404,
    UNAUTHORIZED: 401,
    INTERNAL_SERVER_ERROR: 500,
};
    fs.readFile('OneDrive_1_10-1-2024/9.1.png', async (err, data) => {
    // fs.readFile('OneDrive_1_9-27-2024/invalid/31.2.png', async (err, data) => {
    if (err) throw err;
    const encodedImage = data.toString('base64');

    // fs.writeFile('output.txt', encodedImage, (err) => {
    //     if (err) {
    //         console.error('Error writing to file:', err);
    //     } else {
    //         console.log('Base64 encoded image has been saved to output.txt');
    //     }
    // });


    try {
        const url = 'https://btr2i3e0gj.execute-api.us-west-2.amazonaws.com/test';  // Đường dẫn đến API của bạn
        const data = {
            encodedImages: encodedImage
        };

        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let statusCode = response.data.statusCode

        if (statusCode == STATUS_CODES.SUCCESS) {
            console.log(JSON.parse(response.data.body));
        }
        else if (statusCode == STATUS_CODES.UNDEFINED || statusCode == STATUS_CODES.BAD_REQUEST) {
            console.log(response.data)
        }

    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Error Status Code:', error.response.status);
            console.error('Error Response Data:', error.response.data);
        }
    }
})
