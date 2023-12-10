import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "doncorleonespizza@hotmail.com",
        pass: "123@doncorleone",
    },
    tls: {
        ciphers: 'SSLv3',
    },
});