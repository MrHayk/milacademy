// deps
import nodemailer from "nodemailer";
import errorHandler from "./error-handler/index.js";
import bcrypt from "bcrypt";
import { _CANT_SEND_MAIL_ } from "./error-handler/error-codes.js";

export const SOCKET_KEYWORDS = {
  MODERATOR_RECEIVED_MESSAGE: "m-newMessage",
  USER_SENT_MESSAGE: "u-sendMessage",
  MODERATOR_SENT_MESSAGE: "m-sendMessage",
  USER_RECEIVED_MESSAGE: "u-newMessage",
  MODERATOR_READ_MESSAGES: "m-readMessages"
};

export async function hash(text) {
  try {
    const hashSalt = await bcrypt.genSalt(10);
    const hashedStr = await bcrypt.hash(text + "", hashSalt);
    return hashedStr;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function compare(text, hash) {
  try {
    const match = await bcrypt.compare(text, hash);
    return match;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export const getResponseTemplate = function () {
  return {
    meta: {
      error: null,
      status: 200
    },
    data: {}
  };
};

export const createController = body => {
  return async (rq, rsp) => {
    const result = getResponseTemplate();
    try {
      result.data = (await body(rq)) || {};
    } catch (err) {
      console.log(err);
      const code = err.code || 0;
      const message = err.message || "";
      errorHandler({ message, code }, result);
    }
    rsp.status(result.meta.status).json(result);
  };
};

export async function sendEmail(email, subject, text) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: subject,
      text: text
    });

    return { message: `Message sent successfully` };
  } catch (error) {
    console.log(error);
    throw _CANT_SEND_MAIL_;
  }
}

const lowerCaseLetters = `abcdefghijklmnopqrstuvwxyz`;
const upperCaseLetters = lowerCaseLetters.toUpperCase();
const numbers = `0123456789`;
const symbols = `_=+-*><()`;
const LOWER_CASE_LETTERS = 1;
const UPPER_CASE_LETTERS = 2;
const NUMBERS = 3;
const SYMBOLS = 4;

export const generateNewPassword = length => {
  let res = ``;
  for (let i = 0; i < length; i++) {
    const type = randomNumber(1, 4);
    switch (type) {
      case LOWER_CASE_LETTERS:
        res += lowerCaseLetters[randomNumber(0, lowerCaseLetters.length - 1)];
        break;
      case UPPER_CASE_LETTERS:
        res += upperCaseLetters[randomNumber(0, upperCaseLetters.length - 1)];
        break;
      case NUMBERS:
        res += numbers[randomNumber(0, numbers.length - 1)];
        break;
      case SYMBOLS:
        res += symbols[randomNumber(0, symbols.length - 1)];
        break;
    }
  }
  return res;
};

export function randomNumber(from, to) {
  return Math.round(Math.random() * Math.abs(to - from)) + from;
}
