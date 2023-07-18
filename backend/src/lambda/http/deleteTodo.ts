import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { deleteTodo } from '../../businessLogic/todos'
import { getUserId } from '../utils'

export const handler =async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  // TODO: Remove a TODO item by id 
  const userId = getUserId(event)
  const status = await deleteTodo(userId, todoId)

  return {
      statusCode: 201,
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
          result: status
      })
  }
}
