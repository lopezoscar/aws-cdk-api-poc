import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import ApiEndpoint from './constructs/ApiEndpoint';
// import * as lambda from 'aws-cdk-lib/aws-lambda';
// import path from 'path'

export class AwsCdkApiPocStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const apiGW = new apigateway.RestApi(this, "aws-cdk-api-poc", {
      restApiName: "AWS CDK API Poc",
      description: "Testing AWS CDK"
    });
   
    // const getUsers = new ApiEndpoint(this, 'getUsers', { method: 'GET', endpoint: 'users', api: apiGW, lambdaHandler: 'users/getUsers.handler' })
    const getUsers = new ApiEndpoint(this, 'getUsers', { method: 'GET', endpoint: 'users', api: apiGW, lambdaHandler: 'users/getUsers' })
    const createUser = new ApiEndpoint(this, 'createUser', { method: 'POST', endpoint: 'users', api: apiGW, lambdaHandler: 'users/createUser' })
    
    // AWS WAF
    // AWS Lambda
    // AWS Lambda Authorizer (check JWT)
  }
}
