#!/bin/bash
aws s3 cp build s3://ocdevel-com --recursive
aws cloudfront create-invalidation --distribution-id E33FG3S3Z19436 --paths "/*"