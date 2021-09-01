import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { Todo } from 'typeorm/entities/todos/Todo';

import { CustomError } from 'utils/response/custom-error/CustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.jwtPayload;
  const todoRepository = getRepository(Todo);
  try {
    const todos = await todoRepository.find({
      where: { created_by: id },
      select: ['id', 'text', 'status', 'updated_at'],
    });
    res.customSuccess(200, 'List of todos.', todos);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of tasks.`, null, err);
    return next(customError);
  }
};
