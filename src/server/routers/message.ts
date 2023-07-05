import { Router } from "express";
import axios from 'axios';
import client from "../mongodb";
import { isValidEmail, sendEmail } from "../utils/email";



const router = Router();


router.post("/", async (req, res) => {



    const { message, name, email, token } = req.body;


    const score = await validateRecaptcha(token);

    if (!score || score < 0.6) {
        return res.status(403).send({ message: "failed", reason: "captcha" });
    }
    if (!message || !name || !email || !isValidEmail(email)) {
        return res.status(400).send({ message: "failed", reason: "invalid" });
    }

    console.log("PROCCEDING TO SAVING THE MESSAGE");

    try {
        const result = await client.db("craftbyte").collection("messages").insertOne({
            message,
            name,
            email,
            createdAt: Date.now(),
        });

        console.log("MESSAGE SAVED");

        const isSent = await sendEmail("bazhantt@gmail.com", "Someone wants a website!", "Check your mongodb!");

        if (isSent == 1) {
            console.log("EMAIL SENT TO bazhantt@gmail.com");
        }


        return res.send({ message: "ok" });
    } catch (e) {
        console.error("SAVING MESSAGE FAILED");
        return res.status(500).send({ message: "failed", reason: "server" });
    }
});



async function validateRecaptcha(token: string) {
    const secretKey = '6Lc6a6gmAAAAAIzHdQxtiP5OOyNitKhDd86YPsQM'; // Replace with your Secret Key

    const response = await axios({
        method: 'post',
        url: `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    // The API response should contain a `success` property
    if (response.data.success === true) {
        // The reCAPTCHA check was successful
        console.log('reCAPTCHA score:', response.data.score);
        return response.data.score
    } else {
        // The reCAPTCHA check failed
        console.log('reCAPTCHA check failed');
        return null;
    }
}




export {
    router as MessageRouter,
}
