import sendMail from 'lib/email';

export default async function emailJobProcessor(job, done) {
  try {
    await sendMail(job.data);
  } catch (err) {
    done(new Error(err.message));
  }
}
