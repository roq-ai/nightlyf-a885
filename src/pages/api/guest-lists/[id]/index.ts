import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { guestListValidationSchema } from 'validationSchema/guest-lists';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.guest_list
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getGuestListById();
    case 'PUT':
      return updateGuestListById();
    case 'DELETE':
      return deleteGuestListById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getGuestListById() {
    const data = await prisma.guest_list.findFirst(convertQueryToPrismaUtil(req.query, 'guest_list'));
    return res.status(200).json(data);
  }

  async function updateGuestListById() {
    await guestListValidationSchema.validate(req.body);
    const data = await prisma.guest_list.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteGuestListById() {
    const data = await prisma.guest_list.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
