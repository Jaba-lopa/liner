const express = require('express')
const router = express.Router();
const nodemailer = require('nodemailer');
const createPath = require('../create-path/createPath');
const fs = require('fs');

router.use(express.urlencoded({extended:false}))

router.get('/bookingSeats', (req, res) => {
    let thanks = {text:''};
    res.render(createPath('booking'), { thanks });
});

router.post('/bookingSeats', (req, res) => {
    let thanks = {
        text:'Спасибо за ваше сообщение. Оно было успешно отправлено.'
    };
    const {title, phone, email, date,city, wish} = req.body;
    let mailFile = `
<html lang="en">
<body>
    <div>
        <p>ФИО: ${title}</p>
        <p>Номер телефона: ${phone}</p>
        <p>Почта: ${email}</p>
        <p>Дата отправления: ${date}</p>
        <p>Место отправления: ${city}</p>
        <p>Пожелание: ${wish}</p>
    </div>
    <style>
        body > div > p {
            font-size: 20px;
            padding: 10px 0;
            font-family: sans-serif;
        }
    </style>
</body>
</html>
    `
    fs.writeFileSync('./views/templates/mail/mail.txt', mailFile, (error) => {
        error ? console.log(error) : console.log('file was created')
    });

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: 'jabalopa6002@gmail.com',
            pass: 'nbgwtjnvpzzfxzzf'
        },
    });

    let info = transporter.sendMail({
        from: 'jabalopa6002@gmail.com',
        to: 'jabalopa6002@gmail.com',
        subject: 'Бронирование комнат',
        html: fs.readFileSync('./views/templates/mail/mail.txt', 'utf8')
    });
        res.render(createPath('booking'), { thanks })
    });

module.exports = router;