import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import UserService from '../../services/UserService';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('event', event)
    const response = await UserService.getUsers()
    return {
        statusCode: 200,
        body: JSON.stringify(response)
    }
}