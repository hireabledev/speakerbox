import sendMail from '../../lib/email';

export default function emailJobProcessor(job, done) {
  sendMail(job.data)
    .then(() => (done()))
    .catch(err => (done(new Error(err.message))));
}
