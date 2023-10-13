import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
// import * as lambda from 'aws-cdk-lib/aws-lambda';
// import * as path from 'path'
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs'
import { Runtime } from 'aws-cdk-lib/aws-lambda';


export interface ApiEndpointParams {
    method: 'GET' | 'POST'
    api: apigateway.RestApi
    lambdaHandler: string
    endpoint: string
}

export default class ApiEndpoint extends Construct {
    constructor(scope: Construct, id: string, props: ApiEndpointParams) {
        super(scope, id)

        const { api, method, endpoint, lambdaHandler } = props
        // const lambdaFn = new lambda.Function(this, `${method}-${endpoint}`, {
        //     runtime: lambda.Runtime.NODEJS_18_X,
        //     handler: `handlers/${lambdaHandler}`,
        //     code: lambda.Code.fromAsset(path.join(__dirname, '../../src'))
        // });

        const lambdaFn = new nodejs.NodejsFunction(this, `${method}-${endpoint}`, {
            runtime: Runtime.NODEJS_18_X,
            entry: `src/handlers/${lambdaHandler}.ts`, // accepts .js, .jsx, .cjs, .mjs, .ts, .tsx, .cts and .mts files
            handler: 'handler', // defaults to 'handler'
        });

        const proxyIntegration = new apigateway.LambdaIntegration(lambdaFn)
        let resource = api.root.getResource(endpoint)
        if(!resource) {
            resource = api.root.addResource(endpoint)
        }
        resource.addMethod(method, proxyIntegration)
    }
}