#! /usr/bin/env bash

lambda_template_path='template.yml'
template_name='template.yml'
bucket=vk-lambda-test

cat application-header.yml > $lambda_template_path
cat layers.yml >> $lambda_template_path

for f in $(find lambdas/ -type f -name "*lambda-cf.yml"); do (cat "${f}"; echo; echo) >> $lambda_template_path; done

aws cloudformation delete-stack --stack-name vk-test-1 --profile vk-test --region us-east-1
aws cloudformation wait stack-delete-complete --stack-name vk-test-1 --profile vk-test --region us-east-1
aws cloudformation package --template-file ${template_name} --s3-bucket ${bucket} --s3-prefix vl --output-template-file packaged-${template_name} --profile vk-test --region us-east-1
aws cloudformation deploy --capabilities CAPABILITY_NAMED_IAM --s3-bucket ${bucket} --template-file packaged-${template_name} --stack-name vk-test-1 --profile vk-test --region us-east-1
