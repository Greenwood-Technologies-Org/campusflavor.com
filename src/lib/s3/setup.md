# AWS Setup

- [AWS Setup](#aws-setup)
  - [Storage With S3 Bucket](#storage-with-s3-bucket)
  - [Policies With IAM](#policies-with-iam)
    - [mybucket-read-write-delete](#mybucket-read-write-delete)
  - [Roles With IAM](#roles-with-iam)
    - [mybucket-upload-size-check-role](#mybucket-upload-size-check-role)
  - [Users With IAM](#users-with-iam)
    - [myservice-admin](#myservice-admin)
    - [myservice-server](#myservice-server)
  - [Enforcing Constraints With Lambda](#enforcing-constraints-with-lambda)
    - [Trigger](#trigger)
    - [Code](#code)
  - [Cross-Origin Resource Sharing Policy](#cross-origin-resource-sharing-policy)
  - [Maintenance With Managed Apache Aiflow](#maintenance-with-managed-apache-aiflow)

## Storage With S3 Bucket

## Policies With IAM

### mybucket-read-write-delete

Allow `GetObject`, `PutObject`, `ListBucket`, `DeleteObject` on bucket `mybucket`.

```json
{
 "Version": "2012-10-17",
 "Statement": [
  {
   "Effect": "Allow",
   "Action": [
    "s3:GetObject",
    "s3:PutObject",
    "s3:ListBucket",
    "s3:DeleteObject"
   ],
   "Resource": [
    "arn:aws:s3:::mybucket",
    "arn:aws:s3:::mybucket/*"
   ]
  }
 ]
}
```

## Roles With IAM

### mybucket-upload-size-check-role

Basic AWS Lambda execution role and `mybucket-read-write-delete` policy.

## Users With IAM

### myservice-admin

User with `AmazonS3FullAccess` permission policy.

### myservice-server

User with `mybucket-read-write-delete` permission policy. In the security credentials section, create credentials for an application running outside AWS and use the `Access Key` and `Secret Access Key` for authentication when using the `S3Client`.

## Enforcing Constraints With Lambda

### Trigger

```text
S3: mybucket
arn:aws:s3:::mybucket
Details
Bucket arn: arn:aws:s3:::mybucket
Event types: s3:ObjectCreated:Put
Notification name: 2640f6bc-42ab-436b-a1be-18827c3078f7
Service principal: s3.amazonaws.com
Source account: 136562502667
Statement ID: lambda-cff86cfa-f686-4fde-9cfc-b235c3fb550d
```

### Code

```Python
import json
import boto3
from urllib.parse import unquote_plus

def lambda_handler(event, context):
    s3_client = boto3.client('s3')
    
    # get the size of the file that was PUT
    object_size: int = event['Records'][0]['s3']['object']['size']
    max_size: int = 1000000000
    
    # Extract the bucket name
    bucket_name = event['Records'][0]['s3']['bucket']['name']

    # Extract the object key (file name)
    # The key may be URL-encoded, so it's important to decode it
    object_key = unquote_plus(event['Records'][0]['s3']['object']['key'])
    
    print(f"Invoked on: {bucket_name}::{object_key} [{object_size}]")
    
    # if the file size is greater than the max allowed
    if object_size > max_size:
        print(f"Attempting delete: {bucket_name}::{object_key} [{object_size}]")
        
        s3_client.delete_object(Bucket=bucket_name, Key=object_key)
        
        print(f"Deleted: {bucket_name}::{object_key} [{object_size}]")
```

## Cross-Origin Resource Sharing Policy

In S3 Bucket `permissions` under CORS.

```json
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "GET"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": [],
        "MaxAgeSeconds": 3000
    }
]
```

## Maintenance With Managed Apache Aiflow

To Do
