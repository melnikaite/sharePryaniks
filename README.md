### Running in Lambda

https://console.aws.amazon.com/console/home

Lambda

Create Function

Author from scratch

sharePryaniks

Node.js 8.10

Code entry type S3 https://s3.eu-central-1.amazonaws.com/melnikaite/sharePryaniks.zip

Timeout 30 sec

Memory 1G

Save

CloudWatch Events

Rules

Create

Schedule

Fixed rate

7 days

Add Target

sharePryaniks

Input

JSON

{"domain": "", "login": "", "password": "", "to": "", "amount": 10}

Configur Details

sharePryaniks

Create Rule

### Running locally

docker run --rm -v "$PWD":/var/task lambci/lambda:nodejs8.10 index.handler '{"domain": "", "login": "", "password": "", "to": "", "amount": 1}'
