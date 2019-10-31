import { axios } from "../config/config";

function SendEmail(recipient, subject, body, colaboradorId = "") {

    var EmailModel = {
        "Recipients": recipient,
        "Subject": subject,
        "Body": body,
        "ColaboradorId": colaboradorId,
    }

    axios.post("/SendEmail", EmailModel)
        .then(res => {
            console.log(res.data)

        }).catch((error) => {
            console.log(error)

        })

}

export default SendEmail