import categoriesRouter from './categoriesRouter.js'
import plansRouter from './plansRouter.js'
import usersRouter from './usersRouter.js'


export function routerAPI(app) {
    app.use('/categories', categoriesRouter);
    app.use('/plans', plansRouter);
    app.use('/users', usersRouter);
}