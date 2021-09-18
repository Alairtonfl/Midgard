import { NextFunction, Request, Response } from 'express';
import Jwt from 'jsonwebtoken';

interface Token{
  id: number;
  iat: number;
  exp: number;
}

export default function auth(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) { return res.sendStatus(401); }

  // const token = authorization.replace('Bearer', '').trim();

  const parts = authorization.split(' ');

  if (parts.length !== 2) { return res.sendStatus(401); }

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) { return res.sendStatus(401); }

  try {
    const data = Jwt.verify(token, 'secret');
    const { id } = data as Token;

    req.id = id;
    return next;
  } catch {
    return res.sendStatus(401);
  }
}
