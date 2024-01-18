const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error)
}

// overriding the default express error Handler 
const errorhandler = (err, req, res, next ) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // check mongoose bad Object ID
    if(err.name === 'CastError' && err.kind === 'Objectid'){
        message = `Resource not found`;
        statusCode = 404
    }
    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? '😉' : err.stack
    })
}

export {notFound, errorhandler}