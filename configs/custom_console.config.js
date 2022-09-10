// ✔ create custom console function
function customConsole(type, message, detail, solution) {
  // ✔ create error location and error detail
  const error = new Error();
  const location =
    type === 'success'
      ? undefined
      : typeof detail !== 'string'
      ? detail.stack
        ? detail.stack.split('\n')[1].split(' ').reverse()[0].split('/').reverse()[0]
        : error.stack.split('\n')[3].split(' ').reverse()[0].split('/').reverse()[0].replace(')', '')
      : error.stack.split('\n')[3].split(' ').reverse()[0].split('/').reverse()[0].replace(')', '');
  detail = (detail && detail.message) || detail;
  detail = detail && detail === 'string' ? detail.charAt(0).toUpperCase() + detail.slice(1) : detail;

  // ✔ show error or success in log
  if (type === 'success') {
    console.log(`\x1b[32m✔ ${message}\x1b[0m`);
  } else {
    let errorDetail = typeof detail === 'string' ? detail : JSON.stringify(detail);
    console.log(`\x1b[31mX ${message}\x1b[0m`);
    console.log(`\x1b[33m! ${errorDetail}\x1b[0m`);
    console.log(`\x1b[34m? ${solution}\x1b[0m`);
    console.log(`\x1b[34m> ${location}\x1b[0m`);
  }

  // ✔ return send object to response data to api
  let response = { message, detail, solution };
  return {
    send: (res, status, data, other) => res.status(status).send({ meta: { status: type, status_code: status }, ...response, data, ...other }),
  };
}

// ✔ add custom console to console object
console.Success = message => customConsole('success', message + ' success.');
console.Error = (message, detail, solution) => customConsole('error', message + ' error.', detail, solution);
console.Fail = (message, detail, solution) => customConsole('fail', message + ' unknown error.', detail, solution);
