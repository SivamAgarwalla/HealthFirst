const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken);


exports.sendTwilioMessage = (req, res) => {
if (req.method !== 'POST') {
        res.status(405).end();
    }

    let phoneNumber = req.body.phoneNumber;
    let bodyText = req.body.bodyText;

client.messages
            .create({
                body: bodyText,
                messagingServiceSid: 'MG46fd44d522cd16caaaf4a5c5a9fa8fc0',
                to: phoneNumber
            })
            .then(message => console.log(message.sid))
            .done();


  res.status(200).send(req.body);
}