import TIMELINEMODEL from '../models/timeline.ts';
import { Status, Response } from '../deps.ts';
import { asyncVoid } from '../types.d.ts';

export default {
  getAllByTime: async ({ response }: { response: Response }): asyncVoid => {
    const data = await TIMELINEMODEL.getAll();
    response.status = Status.OK;
    response.body = {
      status: 'success',
      message: 'timeline of all blogs created',
      data,
    };
  },
};
