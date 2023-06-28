import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { eventValidationSchema } from 'validationSchema/events';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getEvents();
    case 'POST':
      return createEvent();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getEvents() {
    const data = await prisma.event
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'event'));
    return res.status(200).json(data);
  }

  async function createEvent() {
    await eventValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.guest_list?.length > 0) {
      const create_guest_list = body.guest_list;
      body.guest_list = {
        create: create_guest_list,
      };
    } else {
      delete body.guest_list;
    }
    if (body?.rsvp?.length > 0) {
      const create_rsvp = body.rsvp;
      body.rsvp = {
        create: create_rsvp,
      };
    } else {
      delete body.rsvp;
    }
    if (body?.sos?.length > 0) {
      const create_sos = body.sos;
      body.sos = {
        create: create_sos,
      };
    } else {
      delete body.sos;
    }
    const data = await prisma.event.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
