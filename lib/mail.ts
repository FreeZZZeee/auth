import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export const sendVerificationEmail = async (
    email: string, 
    token: string
    ) => {
        const confirmLink = `http://loclhost:3000/auth/new-verification?token=${token}`;

        const transporter = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOSTNAME,
        port: 587,
        secure: false,
        requireTLS: false,
        auth: {
            user: process.env.NODEMAILER_USERNAME,
            pass: process.env.NODEMAILER_PASSWORD,
        },
        logger: true
        });
        

        // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Техническая поддержка" <tech-group@pstu.ru>',
        to: email,
        subject: "Подтверждение элетронной почты",
        // text: "Hello world?",
        html: `<p>Нажать <a href="${confirmLink}">здесь</a> для подтверждения электронной почты</p>`,
        // headers: { 'x-myheader': 'test header' }
    });

     return info.response;
}