const express = require('express');
const router = express.Router();
const nodeMailer = require('nodemailer');
const SMTPTransport = require('nodemailer/lib/smtp-transport');

router.get('/contato', (req, res) => {
    res.render('./pages/PT-BR/contato.ejs', { title: 'Contato' });
});

router.post('/contato', (req, res) => {
    const { name, email, phone, message } = req.body;

    transporter.sendMail(emailInfo(name, phone, email, message), (error) => {
        if (error) {
            req.flash('error', 'Algo deu errado. Por favor, tente novamente')
            return res.redirect('/contato');
        }
        req.flash('success', 'Mensagem Enviada com Sucesso')
        res.redirect('/contato');
    });
});

router.get('/contact', (req, res) => {
    res.render('./pages/ENG/contato.ejs', { title: 'Contact' });
});

router.post('/contact', (req, res) => {
    const { name, email, phone, message } = req.body;

    transporter.sendMail(emailInfo(name, phone, email, message), (error) => {
        if (error) {
            req.flash('error', 'Something went wrong. Please, try again')
            return res.redirect('/contact');
        }
        req.flash('success', 'Message sent successfully')
        res.redirect('/contact');
    });
});

const transporter = nodeMailer.createTransport(new SMTPTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    }
}));

function emailInfo(name, phone, email, message) {
    return {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_DEST,
        subject: "Mensagem vinda do Portifólio",
        html: `
        <h2>Mensagem de cliente</h2>
        <ul>
            <li><p>Nome: ${name}</p></li>
            <li><p>Telefone: ${phone}</p></li>
            <li><p>E-mail: ${email}</p></li>
            <li><p>Mensagem do Cliente: ${message}</p></li>
        </ul>
        `
    };
};

module.exports = router;