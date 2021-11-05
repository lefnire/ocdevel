const ep = {
  title: 'Customer Facing Tech Stack',
  episode: 13,
  mergeEpisode: 43,
  mla: true,
  created: "2021-01-02",
  guid: "22372a43-9d7c-40a0-b47a-8341cd729239",
  libsynEpisode: 17400590,
  body: `
### Client

There are many popular front-end frameworks (Angular, Vue, etc), but I recommend React.
* Web front-end
  * [React](https://reactjs.org/) for web client
  * [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html): quick-start React setup
  * [React Bootstrap](https://react-bootstrap.github.io/): quick-start CSS framework (explore others like Tailwind, Chakra, and MaterialUI)
  * Useful plugins: [react-router](https://reactrouter.com/), [easy-peasy](https://easy-peasy.now.sh/).
* Mobile apps
  * [React Native](https://reactnative.dev/)
  
### Server

First, get as _far_ as you possibly can with serverless frameworks, like [AWS Amplify](https://aws.amazon.com/amplify/) or [GCP Firebase](https://firebase.google.com/). Or if you prefer to use individual serverless components rather than an all-in-one package, see [AWS Serverless](https://aws.amazon.com/serverless/) (which are the components used underneath Amplify's hood). 

When you've hit the ceiling on Amplify and need custom server code, _still_ try serverless. [AWS Lambda](https://aws.amazon.com/lambda) lets you write individual routes as Node/Python functions. 

Finally, after you've hit the serverless ceiling (Amplify handling most leg-work, Cognito handling authentication, Lambda for one-off routes) and you _really_ need custom server code for edge-cases, do the following. 
1. Pick a server framework. I recommend Node.js + Express.js (JavaScript, strong concurrency & performance, super popular); or FastAPI (if you prefer to stick to Python; but it's less popular / performant). 
1. Containerize your server code in Docker. Deploy this Dockerfile to [ECR](https://aws.amazon.com/ecr/)
1. Use that container to run a [Fargate cluster](https://aws.amazon.com/fargate/). You may also need [Route53](https://aws.amazon.com/fargate/) (domains) and [ELB](https://aws.amazon.com/elasticloadbalancing/) (domain->fargate load balancing).

[mla-012](/mlg/mla-12) for more information.

### Database, Job-Queues, Sessions

1. Popular databases are Postgres, MySQL, SQL Server, and MongoDB. I recommend [Postgres](https://www.postgresql.org/).
1. For in-memory session-management, and real-time pub/sub, use [Redis](https://redis.io/).
1. For job-queueing (sending work-orders to your ML server), use either [RabbitMQ](https://www.rabbitmq.com/) or [SQS](https://aws.amazon.com/sqs/); I recommend SQS. Use the wrapper library [Celery](https://docs.celeryproject.org/en/stable/getting-started/introduction.html) to interface with these technologies.

All that said, the main reason I like Postgres over its competition is it can replace 2 & 3 for you. You can run a job-queue via Postgres's \`select for update\` feature, and pub/sub via \`listen/notify\`.
`
}
export default ep