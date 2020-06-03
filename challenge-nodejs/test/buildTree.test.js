const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');

// eslint-disable-next-line no-multi-assign
const { afterEach, beforeEach, describe, it } = (exports.lab = Lab.script());
const { init } = require('../lib/server');
const { treeData } = require('./data/treeData');
const { nodeData } = require('./data/nodeData');

describe('POST /build-tree', () => {
  let server;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
  });

  it('should response with code 200 and empty array', async () => {
    const res = await server.inject({
      method: 'post',
      url: '/build-tree',
      payload: [],
    });
    expect(res.statusCode).to.equal(200);
    expect(res.result).to.equal([]);
  });

  it('should response with code 403 and error nodeData is require parent id', async () => {
    const res = await server.inject({
      method: 'post',
      url: '/build-tree',
      payload: {
        '0': [nodeData[0]],
      },
    });
    expect(res.statusCode).to.equal(400);
    expect(res.result.message).to.equal(
      'Error: nodeData is require parent id expected value is number of null'
    );
  });

  it('should response with code 403 and error Cannot find expected parent node', async () => {
    const res = await server.inject({
      method: 'post',
      url: '/build-tree',
      payload: treeData[1],
    });
    expect(res.statusCode).to.equal(400);
    expect(res.result.message).to.equal(
      'Error: Cannot find expected parent node'
    );
  });

  it('should response with code 200 and matched result', async () => {
    const res = await server.inject({
      method: 'post',
      url: '/build-tree',
      payload: treeData[0],
    });

    const { result } = res;
    expect(res.statusCode).to.equal(200);
    expect(result[0].id).to.equal(10);
    expect(result.parent_id).to.be.undefined();
  });
});

describe('Request to non existing route', () => {
  let server;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
  });

  it('should response 404 Not Found', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/non-existing-route',
    });
    expect(res.statusCode).to.equal(404);
    expect(res.result).to.equal({
      statusCode: 404,
      error: 'Not Found',
      message: 'Not Found',
    });
  });
});
