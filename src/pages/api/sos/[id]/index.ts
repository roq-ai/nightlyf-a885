import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { sosValidationSchema } from 'validationSchema/sos';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.sos
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getSosById();
    case 'PUT':
      return updateSosById();
    case 'DELETE':
      return deleteSosById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSosById() {
    const data = await prisma.sos.findFirst(convertQueryToPrismaUtil(req.query, 'sos'));
    return res.status(200).json(data);
  }

  async function updateSosById() {
    await sosValidationSchema.validate(req.body);
    const data = await prisma.sos.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteSosById() {
    const data = await prisma.sos.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
