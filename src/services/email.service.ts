import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import * as path from "path";

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

    const hbsOptions = {
      viewEngine: {
        extname: ".hbs",
        defaultLayout: "main",
        layoutsDir: path.join(
          process.cwd(),
          "src",
          "email_templates",
          "layouts",
        ),
        partialsDir: path.join(
          process.cwd(),
          "src",
          "email_templates",
          "partials",
        ),
      },
      viewPath: path.join(process.cwd(), "src", "email_templates", "views"),
      extName: ".hbs",
    };

    this.transporter.use("compile", hbs(hbsOptions));
  }

  public async sendEmail(email: string) {
    const mailOptiong = {
      to: email,
      subject: "Hello it is my first email",
      template: "register",
    };
    return await this.transporter.sendMail(mailOptiong);
  }
}

export const emailService = new EmailService();
