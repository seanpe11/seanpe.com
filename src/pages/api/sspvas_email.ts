import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from 'nextjs-cors' 
import nodemailer, { Transporter } from "nodemailer"

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

export default async function handle(req: SSSPVAsEmailNextApiRequest, res: NextApiResponse){
    console.log(req.headers)
    console.log(req.body)

    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });

    if (req.body.matimis){
        res.status(200).send("lol")
    }

    const transporter: Transporter = nodemailer.createTransport({
        name: "sspvas.com",
        host: "mail.sspvas.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.SSPVAS_AUTH_USER,
          pass: process.env.SSPVAS_AUTH_PWD,
        },
      });


    console.log(req.body)
    const html = `<html><h4>From: </h4>${req.body.name} <a href="mailto:${req.body.email}" target="_blank">${req.body.email}</a>
        <h4>Company: </h4>${req.body.company}
        <h4>Number: </h4>${req.body.phone}
        <h4>Package: </h4>${req.body.package}<h4>Message: </h4> <p>${req.body.message}</p></html>`
    console.log(html)


    const mailOptions = {
        from: 'form@sspvas.com',
        to: ['sean.m.s.pe@gmail.com'],
        // to: ['support@sspvas.com', 'sean.m.s.pe@gmail.com', 'sspvirtualassistants@gmail.com' ],
        subject: 'Someone filled out the Contact Form',
        html
    };


    console.log("mail attempt")

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
          return res.status(500).send(error)
      } else {
          return res.status(200).send('Your message has been sent. If you have other concerns, email support@sspvas.com')
      }
    })
} 
