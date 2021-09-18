/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import User from '../Entities/User';

class UserController {
  async register(req: Request, res: Response) {
    const repository = getRepository(User);
    const { email, name, password } = req.body;

    const userExists = await repository.findOne({ where: { email } });
    if (userExists) { return res.sendStatus(409); }

    const user = repository.create({ email, name, password });
    await repository.save(user);

    return res.json(user);
  }

  async login(req: Request, res: Response) {
    const repository = getRepository(User);
    const { email, password } = req.body;

    const user = await repository.findOne({ where: { email } });
    if (!user) { return res.sendStatus(401); }

    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) { return res.sendStatus(401); }

    const token = Jwt.sign({ id: user.id }, 'secret', { expiresIn: '7d' });

    return res.json({
      user,
      token,
    });
  }
}

export default new UserController();
