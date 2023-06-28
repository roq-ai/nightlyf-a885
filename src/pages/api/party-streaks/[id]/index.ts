import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { partyStreakValidationSchema } from 'validationSchema/party-streaks';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.party_streak
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPartyStreakById();
    case 'PUT':
      return updatePartyStreakById();
    case 'DELETE':
      return deletePartyStreakById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPartyStreakById() {
    const data = await prisma.party_streak.findFirst(convertQueryToPrismaUtil(req.query, 'party_streak'));
    return res.status(200).json(data);
  }

  async function updatePartyStreakById() {
    await partyStreakValidationSchema.validate(req.body);
    const data = await prisma.party_streak.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deletePartyStreakById() {
    const data = await prisma.party_streak.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
