import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import * as path from "path";

import { configs } from "../configs/config";
import { allTemplates } from "../constants/email.constants";
import { EEmailActions } from "../enums/email.enum";

class EmailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      from: "No reply",
      service: "gmail",
      auth: {
        user: configs.NO_REPLY_EMAIL,
        pass: configs.NO_REPLY_PASSWORD,
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

  public async sendEmail(
    email: string,
    emailAction: EEmailActions,
    context: Record<string, string | number> = {},
  ) {
    const { templateName, subject } = allTemplates[emailAction];

    const mailOptiong = {
      to: email,
      subject,
      template: templateName,
      context,
    };
    return await this.transporter.sendMail(mailOptiong);
  }
}

export const emailService = new EmailService();
