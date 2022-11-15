import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
// import * as uuid from 'uuid'
// import { getUserId } from '../utils';
// import { createTodo } from '../../businessLogic/todos'
import { todoBuilder } from '../../helpers/todos'
import { createTodo } from '../../helpers/todosAcess'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    console.log(newTodo)
    // TODO: Implement creating a new TODO item
    // const todoId = uuid.v4()

    // const todo = {
    //   todoId: todoId,
    //   userId : getUserId(event),
    //   "createdAt": new Date().toISOString(),
    //   "done": false,
    //   "attachmentUrl": "http://example.com/image.png",
    //   ...newTodo
    //  }
    const todo = todoBuilder(newTodo, event)
    const createdTodo = await createTodo(todo);

    return {
      statusCode: 201,
      body: JSON.stringify({
        createdTodo
      })
    }
  }
)
handler.use(
  cors({
    credentials: true
  })
)
