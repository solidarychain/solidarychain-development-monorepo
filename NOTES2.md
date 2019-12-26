# NOTES2

> Notes after restart to work again with project

## Probelm #1

try to login with a wrong user gives this error

```
{"code":"CLIENT_RES_ERR","explanation":"Chaincode error, this is a wrapper around the responses","description":"There was a problem while invoking the chaincode","responses":[{"response":{"status":500,"payload":{"type":"Buffer","data":[]},"peer":{"url":"grpc://localhost:7051","name":"peer0.org1.hurley.lab","options":{"grpc.max_receive_message_length":-1,"grpc.max_send_message_length":-1,"grpc.keepalive_time_ms":600000,"grpc.http2.min_time_between_pings_ms":120000,"grpc.keepalive_timeout_ms":20000,"grpc.http2.max_pings_without_data":0,"grpc.keepalive_permit_without_calls":1,"name":"peer0.org1.hurley.lab","grpc.ssl_target_name_override":"peer0.org1.hurley.lab","grpc.default_authority":"peer0.org1.hurley.lab"}},"isProposalResponse":true},"error":{"name":"Error","status":500,"message":"Cannot read property 'id' of undefined"}},{"response":{"status":500,"payload":{"type":"Buffer","data":[]},"peer":{"url":"grpc://localhost:7151","name":"peer0.org2.hurley.lab","options":{"grpc.max_receive_message_length":-1,"grpc.max_send_message_length":-1,"grpc.keepalive_time_ms":600000,"grpc.http2.min_time_between_pings_ms":120000,"grpc.keepalive_timeout_ms":20000,"grpc.http2.max_pings_without_data":0,"grpc.keepalive_permit_without_calls":1,"name":"peer0.org2.hurley.lab","grpc.ssl_target_name_override":"peer0.org2.hurley.lab","grpc.default_authority":"peer0.org2.hurley.lab"}},"isProposalResponse":true},"error":{"name":"Error","status":500,"message":"Cannot read property 'id' of undefined"}}],"message":"\n    CLIENT_RES_ERR\n    There was a problem while invoking the chaincode\n    Chaincode error, this is a wrapper around the responses\n\n    Original stack:\n    {\"name\":\"Error\",\"status\":500,\"message\":\"Cannot read property 'id' of undefined\"}\n    "} +839633ms
```

to test use

```shell
$ curl -k -X POST https://localhost:3443/api/login -d '{ "username": "johndoe", "password": "12345678"}' -H 'Content-Type: application/json'
```
