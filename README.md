## What is this
A few lines of javascript that provides a list of
  1. all Apigee Key Value Maps (KVM) and the details (keys and values) of each KVM
  2. all Apigee target servers and the details (name, host, port, status) of each target server
It utilizes the Apigee Management API calls.

## Prerequisites to run
Node v8.11.1 or higher. Find them [here](https://nodejs.org/ja/blog/release/v8.11.1/)

## How to run this thing
1. Make sure node is installed.To check, run `node -v` at your command prompt.
2. Clone this repo.
3. Update /config/apigeeConfigs.json file with your details. You need to pass the:
    1. Apigee management API **bearer token**. If you don't know how to generate a token, read instructions [here](https://docs.apigee.com/api-platform/system-administration/management-api-tokens).
    2. **Organization name**.
    3. **Environment name**.
    4. Either **keyvaluemaps** or **targetservers** as the resource.
4. Go to the directory that you just cloned run `node apigeeCall.js`

Currently all output is on stdout. You can enhance this by redirecting output to a file.
