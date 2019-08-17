A small utility that provides a list of
  1. all Apigee Key Value Maps (KVM) and the details (keys and values) of each KVM
  2. all Apigee target servers and the details (name, host, port, status) of each target server
It utilizes the Apigee Management API calls.

To run locally:

1. Clone the repo
2. Update /config/apigeeConfigs.json file with your details. You need to pass the:
  1. Apigee management API bearer token. If you dont know how to generate a token, read instructions here: https://docs.apigee.com/api-platform/system-administration/management-api-tokens
  2. Organization name
  3. Environment name
  4. Either keyvaluemaps or targetservers as the resource

Currently all output is on stdout. You can enhance this by redirecting output to a file.
