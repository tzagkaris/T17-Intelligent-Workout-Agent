import * as express from 'express';
import { ResourceController } from '../shared';
import { ITask, TaskModel } from '@app/models';
import { FilesController } from './files/files.controller';
import { SocketEventsController } from './socket-events/socket-events.controller';
import { ExersiceStateController } from './exersice-state/exersice-state.controller';
import { MediaController } from './media/media.controller';


const apiV1Router = express.Router();


apiV1Router

  // Exersice-State routes
  .use(
    '/exercise',
    new ExersiceStateController().applyRoutes()
  )

    .use (
      '/media',
      new MediaController().applyRoutes()
    )


  // Sockets events routes
  .use(
    '/socket-events',
    new SocketEventsController().applyRoutes()
  )

  // Sockets events routes
  .use(
    '/files',
    new FilesController().applyRoutes()
  )

  // Task routes
  .use(
    '/tasks',
    new ResourceController<ITask>(TaskModel).applyRoutes()
  );


export { apiV1Router };

