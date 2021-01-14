// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const songwriters = require.context('./', true, /\.json$/);

export default songwriters.keys().map((file) => {
  return songwriters(file);
});
