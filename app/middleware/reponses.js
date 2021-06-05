
exports.sendSqlQueryFailResponse = function sendSqlQueryFailResponse(res, err) {
    res.status(200).send({
      status: "fail",
      message: err.message || "Something went wrong,Please try again!"
    });
}

exports.sendSuccessfullyFetcehdResponse =  function sendSuccessfullyFetcehdResponse(res, data, status, msg) {
    res.status(200).send({
      data: data,
      status: status,
      message: msg
    });
}



exports.sendResponse =  function sendResponse(res, status, msg) {
    res.status(200).send({
      status: status,
      message: msg
    });
}

exports.sendSuccessfullyTokenResponse =  function sendSuccessfullyTokenResponse(res, data, token, status, msg) {
    res.status(200).send({
      data: data,
      token: token,
      status: status,
      message: msg
    });
}
