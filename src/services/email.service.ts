import nodemailer from "nodemailer";

class EmailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      from: "No reply",
      service: "gmail",
      auth: {
        user: "sorokivskyi777@gmail.com",
        pass: "ajzadmzqpixkaagk",
      },
    });
  }

  public async sendEmail(email: string) {
    return this.transporter.sendMail({
      to: email,
      subject: "Hello it is my first email",
      html: "<div>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</div>",
    });
  }
}

export const emailService = new EmailService();
