import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { tokenId, name } = req.body

  const options = {
    method: 'POST',
    headers: {accept: 'application/json', 'content-type': 'application/json'},
    body: JSON.stringify({deal: {name}})
  };
  
  fetch(`https://crm.rdstation.com/api/v1/deals?token=${tokenId}`, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

  return res.status(201)
}