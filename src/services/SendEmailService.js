import { axios } from "../config/config";

function SendEmail(recipient, subject, body) {

    var EmailModel = {
        "Recipients": recipient,
        "Subject": subject,
        "Body": body
    }

    axios.post("/SendEmail", EmailModel)
        .then(res => {
            console.log(res.data)

        }).catch((error) => {
            console.log(error)

        })

}

export default SendEmail