/**
 * NodeJS send email by OAuth2 and Nodemailer
 */

// Import 2 thư viện cần thiết
const nodemailer = require('nodemailer')
const {OAuth2Client} = require('google-auth-library')


const GOOGLE_MAILER_CLIENT_ID = '1474843543-671thbsul4f7mtq41l1n70doimeovld4.apps.googleusercontent.com'
const GOOGLE_MAILER_CLIENT_SECRET = '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'
const GOOGLE_MAILER_REFRESH_TOKEN = '1//04NKob6JK71ItCgYIARAAGAQSNwF-L9Ir-6ASUHBzu7fB_LNHdHrwq2k-Hf99x1RnqQ1YPpcBF2dV2Et0K_2oU7X-HyRqquqDXyo'
const ADMIN_EMAIL_ADDRESS = 'nguyentemp741@gmail.com'

const myOAuth2Client = new OAuth2Client(
  GOOGLE_MAILER_CLIENT_ID,
  GOOGLE_MAILER_CLIENT_SECRET
)
myOAuth2Client.setCredentials({
  refresh_token: GOOGLE_MAILER_REFRESH_TOKEN
})

async function sendMailResetPassword(email ,tokenPassword) {
    try {
        if (!email || !tokenPassword ) throw new Error('Please provide email, subject and content!')
    
        /**
         * Lấy AccessToken từ RefreshToken (bởi vì Access Token cứ một khoảng thời gian ngắn sẽ bị hết hạn)
         * Vì vậy mỗi lần sử dụng Access Token, chúng ta sẽ generate ra một thằng mới là chắc chắn nhất.
         */
        const myAccessTokenObject = await myOAuth2Client.getAccessToken()
        // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
        const myAccessToken = myAccessTokenObject?.token
    
        // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
        const transport = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: ADMIN_EMAIL_ADDRESS,
            clientId: GOOGLE_MAILER_CLIENT_ID,
            clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
            refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
            accessToken: myAccessToken
          }
        })
        let url = `http://localhost:3000/user/login/auth?token=${tokenPassword}&`
        // mailOption là những thông tin gửi từ phía client lên thông qua API
        const mailOptions = {
          to: email, // Gửi đến ai?
          subject: "Hi New Usẻ", // Tiêu đề email
          html: `Hãy Nhấn vào link này để đăng nhập <h3>${url}</h3>` // Nội dung email
        }
    
        // Gọi hành động gửi email
        await transport.sendMail(mailOptions)
    
        // Không có lỗi gì thì trả về success
        return true;
      } catch (error) {
        // Có lỗi thì các bạn log ở đây cũng như gửi message lỗi về phía client
        console.log(error)
        return false;

      }}
module.exports = sendMailResetPassword;
    