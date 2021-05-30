import nodemailer from 'nodemailer';

const sendEmail = (options) => {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            type: process.env.EMAIL_TYPE,
            user: process.env.EMAIL_USER,
            clientId:process.env.EMAIL_CLIENT_ID,
            clientSecret:process.env.EMAIL_CLIENT_SECRET,
            refreshToken:process.env.EMAIL_REFRESH_TOKEN,
        }
    })

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text,
    }

    transporter.sendMail(mailOptions, (err,info) => {
        if(err){
            console.log(err)
        } else {
            console.log(info)
        }
    })
};

export default sendEmail;