import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer"

interface SSSPVAsEmailNextApiRequest extends NextApiRequest {
    body: {
        name: string;
        email: string;
        company: string;
        phone: string;
        package: string;
        message: string;
        matimis: boolean;
    }
}

export default function handle(req: SSSPVAsEmailNextApiRequest, res: NextApiResponse){

    if (req.body.matimis){
        res.status(200).send("lol")
    }

    const transporter = nodemailer.createTransport({
        // @ts-ignore
        host: "mail.sspvas.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.SSPVAS_AUTH_USER,
          pass: process.env.SSPVAS_AUTH_PWD,
        },
        sendMail: true
      });

    console.log(process.env.SSPVAS_AUTH_USER)
    console.log(process.env.SSPVAS_AUTH_PWD)

    const mailOptions = {
        from: 'form@sspvas.com',
        to: 'sean.m.s.pe@gmail.com',
        subject: 'Sending Email using Node.js',
        html: `<h4>From: </h4>${req.body.name} <a href="mailto:${req.body.email}" target="_blank">${req.body.email}</a>
        <h4>Company: </h4>${req.body.company}
        <h4>Number: </h4>${req.body.phone}
        <h4>Package: </h4>${req.body.package}<h4>Message: </h4> <p>${req.body.message}</p>`
    };
    console.log('mail attempt')

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.status(500).send(error)
            } else {
            res.status(200).send("email sent")
        }
    })
} 
