import getTokenData from '@utils/get-token-data';

export default async function handler(req, res) {
  const { tokens } = req.query;

  try {
    const tokenDetails = await getTokenData(tokens);
    res
      .setHeader('Cache-Control', 's-maxage=31536000, stale-while-revalidate')
      .json(tokenDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}
