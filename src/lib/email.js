import sendgrid from 'sendgrid';
import { parseAddresses } from 'mimelib';
import { flatten, mapKeys } from 'lodash';
import { email as debug } from '../lib/debug';
import sentry from '../lib/sentry';
import {
  IS_PROD,
  SEND_EMAIL,
  DEFAUL_EMAIL_TEMPLATE,
  CONTACT_EMAIL,
  SENDGRID_API_KEY,
} from './config';

const sg = sendgrid(SENDGRID_API_KEY);

function mapAddressKey(value, key) {
  switch (key) {
    case 'address':
      return 'email';
    default:
      return key;
  }
}

function mapAddressKeys(address) {
  return mapKeys(address, mapAddressKey);
}

function parseAddressesIfString(input) {
  if (typeof input === 'string') {
    return parseAddresses(input);
  }
  return input;
}

function mapAddresses(input) {
  /* eslint brace-style: 0 */

  let emails = [];

  // String
  if (typeof input === 'string') {
    emails = parseAddresses(input).map(mapAddressKeys);
  }
  // Array of strings or objects
  else if (Array.isArray(input)) {
    emails = flatten(input.map(parseAddressesIfString)).map(mapAddressKeys);
  }
  // Object
  else if (input) {
    emails.push(mapAddressKeys(input));
  }

  return emails;
}

function mapAttachmentKey(value, key) {
  switch (key) {
    case 'contentType':
      return 'type';
    case 'contentDisposition':
      return 'disposition';
    default:
      return key;
  }
}

function mapAttachmentKeys(attachment) {
  return mapKeys(attachment, mapAttachmentKey);
}

function mapAttachments(input) {
  let attachments = [];
  if (input) {
    attachments = input.map(mapAttachmentKeys);
  }
  return attachments;
}

function mapSubstitutionKey(value, key) {
  return `-${key}-`;
}

function mapSubstitutionKeys(substitutions) {
  return mapKeys(substitutions, mapSubstitutionKey);
}

/**
 * Send Email
 * @param  {Object} email               Email object.
 * @param  {String} email.from          Sender.
 * @param  {Array}  email.to            Receiver(s).
 * @param  {Array}  email.cc            CC Receiver(s).
 * @param  {Array}  email.bcc           BCC Receiver(s).
 * @param  {String} email.subject       Receiver(s).
 * @param  {String} email.text          Text content.
 * @param  {String} email.html          HTML content.
 * @param  {String} email.template      Template ID.
 * @param  {String} email.substitutions Template ID.
 * @return {[type]}       [description]
 */
export default function sendMail(email) {
  const requestBody = {
    personalizations: [
      {
        to: mapAddresses(email.to),
      },
    ],
    from: mapAddresses(email.from || CONTACT_EMAIL)[0],
    subject: email.subject,
    template_id: email.template || DEFAUL_EMAIL_TEMPLATE,
  };

  if (email.cc) {
    requestBody.personalizations[0].cc = mapAddresses(email.cc);
  }

  if (email.bcc) {
    requestBody.personalizations[0].bcc = mapAddresses(email.bcc);
  }

  if (email.substitutions) {
    requestBody.personalizations[0].substitutions = mapSubstitutionKeys(email.substitutions);
  }

  if (email.replyTo) {
    requestBody.reply_to = mapAddresses(email.replyTo)[0];
  }

  if (email.text || email.html) {
    requestBody.content = [];
  }

  if (email.text) {
    requestBody.content.push({
      type: 'text/plain',
      value: email.text,
    });
  }

  if (email.html) {
    requestBody.content.push({
      type: 'text/html',
      value: email.html,
    });
  }

  if (email.headers) {
    requestBody.headers = email.headers;
  }

  if (email.attachments) {
    requestBody.attachments = mapAttachments(email.attachments);
  }

  const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: requestBody,
  });

  if (SEND_EMAIL) {
    /* eslint new-cap: 0 */
    if (IS_PROD === false) {
      debug.info(JSON.stringify(requestBody, null, 2));
    }
    return sg.API(request)
      .then(res => {
        debug.info(res);
        return res;
      })
      .catch(err => {
        debug.error(err);
        sentry.captureException(err);
        throw err;
      });
  }
  return new Promise((resolve, reject) => {
    debug.info('[NOT] Sending email:\n', JSON.stringify(requestBody, null, 2));
    resolve({
      statusCode: 200,
      body: {},
      headers: {},
    });
  });
}
