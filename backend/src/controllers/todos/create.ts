import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { Todo } from 'typeorm/entities/todos/Todo';

import { CustomError } from 'utils/response/custom-error/CustomError';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const { text } = req.body;
  const { id } = req.jwtPayload;

  const todoRepository = getRepository(Todo);

  try {
    const newTodo = new Todo();
    newTodo.text = text;
    newTodo.created_by = id;
    await todoRepository.save(newTodo);

    res.customSuccess(200, 'Todo successfully created.');
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
