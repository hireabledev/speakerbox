import { expect } from 'chai';
import nock from 'nock';
import { HOST } from 'lib/config';
import superFetch from './fetch';

describe('fetch', () => {
  const STATUS_CODE = 200;
  const BODY = { test: 'test' };

  it('should have body', async () => {
    nock(`${HOST}`).get('/test')
      .reply(STATUS_CODE, BODY);
    const result = await superFetch(`${HOST}/test`);
    expect(result.body).to.deep.equal(BODY);
  });

  it('should have response', async () => {
    nock(`${HOST}`).get('/test')
      .reply(STATUS_CODE, BODY);
    const result = await superFetch(`${HOST}/test`);
    expect(result.res).to.be.an('object');
    expect(result.res).to.contain.all.keys([
      'url', 'status', 'statusText', 'ok', 'body', 'bodyUsed', 'headers',
    ]);
    expect(result.res.status).to.equal(STATUS_CODE);
    expect(result.res.headers).to.be.an('object');
  });

  it('should have content-type application/json', async () => {
    nock(`${HOST}`).get('/test')
      .reply(STATUS_CODE, BODY);
    const result = await superFetch(`${HOST}/test`);
    expect(result.res.headers.get('Content-Type')).to.equal('application/json');
  });

  it('should throw if error status code', async () => {
    nock(`${HOST}`).get('/test')
      .reply(500, { error: 'error', message: 'message', statusCode: 500 });
    try {
      await superFetch(`${HOST}/test`);
      throw new Error('Failed to throw on error status code.');
    } catch (result) {
      expect(result.body.error).to.equal('error');
      expect(result.body.message).to.equal('message');
      expect(result.body.statusCode).to.equal(500);
      expect(result.res.status).to.equal(500);
    }
  });
});
