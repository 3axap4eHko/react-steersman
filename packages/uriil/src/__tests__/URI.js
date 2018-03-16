import URI from '../URI';

const testURL = 'http://username:password@test.hostname.com/this/is/a/path?key1=value1&key=value#/hash';
const expectedURL = 'https://myname:mypassword@expected.hostname.com:8080/this/is/mypath?key2=value2&key=value#/hash/expected';

const testProtocols = ['http', 'https', 'ftp'];
const testCredentials = ['', 'username@', 'username:password@'];
const testHostnames = ['hostname', 'hostname.com', 'sub.hostname.com'];
const testPorts = ['', ':80', ':8080'];
const testPaths = ['/', '/path'];
const testQueries = ['', '?query=query', '?query=query&query=query'];
const testHashes = ['', '#hash', '#/hash'];

const totalTestURLCount = testProtocols.length
  * testCredentials.length
  * testHostnames.length
  * testPorts.length
  * testPaths.length
  * testQueries.length
  * testHashes.length;

test('URI constructor', () => {
  const uri = new URI(testURL);
  expect(uri.toString()).toBe(testURL);
});

test(`URI.parse ${totalTestURLCount} urls`, () => {
  const startTime = Date.now();

  testProtocols.forEach(protocol => {
    testCredentials.forEach(credential => {
      testHostnames.forEach(hostname => {
        testPorts.forEach(port => {
          testPaths.forEach(path => {
            testQueries.forEach(query => {
              testHashes.forEach(hash => {
                const url = `${protocol}://${credential}${hostname}${port}${path}${query}${hash}`;
                const data = URI.parse(url);
                expect(data.protocol).toBe(protocol);
                expect(data.hostname).toBe(hostname);
                expect(data.port || '').toBe(port.replace(':', ''));
                expect(data.path).toBe(path);
                expect(data.query || '').toBe(query.replace('?', ''));
                expect(data.hash || '').toBe(hash.replace('#', ''));
              });
            });
          });
        });
      });
    });
  });

  const elapsedTime = (Date.now() - startTime)/1000;
  console.log(`Parsed ${totalTestURLCount} in ${elapsedTime}s`)
});

test('URI reimport', () => {
  const uri = new URI(testURL);
  const extract = uri.toObject();
  expect(new URI(extract).toString()).toBe(testURL);
});

test('Test url params', () => {
  const uri = new URI(testURL);
  uri.protocol = 'HTTPS';
  uri.username = 'myname';
  uri.password = 'mypassword';
  uri.hostname = 'expected.hostname.com';
  uri.port = '8080';
  uri.pathParts = ['this', 'is', 'mypath'];
  uri.queryParams = {
    key2: 'value2',
    key: 'value',
  };
  uri.hash = '/hash/expected';
  expect(uri.toString()).toBe(expectedURL);
});

test('Test incorrect urls', () => {
  expect(() => URI.parse('incorrect-url')).toThrow();
});