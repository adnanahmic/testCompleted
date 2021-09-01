import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { Todo } from 'typeorm/entities/todos/Todo';

import { CustomError } from 'utils/response/custom-error/CustomError';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { status } = req.body;

  const todoRepository = getRepository(Todo);
  try {
    const todo = await todoRepository.findOne({ where: { id } });

    if (!todo) {
      const customError = new CustomError(404, 'General', `Todo with id:${id} not found.`, ['Todo not found.']);
      return next(customError);
    }

    todo.status = status;

    try {
      await todoRepository.save(todo);
      res.customSuccess(200, 'Todo successfully saved.');
    } catch (err) {
      const customError = new CustomError(409, 'Raw', `Todo '${id}' can't be saved.`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
