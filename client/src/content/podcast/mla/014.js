export default {
  title: 'Machine Learning Server',
  episode: 14,
  mergeEpisode: 44,
  mla: true,
  created: "2021-01-17",
  guid: "434a0677-4265-4c34-9cb0-62ca92c80ed0",
  libsynEpisode: 17581607,
  teaser: "Server-side ML. Training & hosting for inference, with a goal towards serverless. AWS SageMaker, Batch, Lambda, EFS, Cortex.dev",
  body: `
After you train an ML model and need to deploy it to production, you have a number of options. If your model runs rarely (1-50x / day), you can set it up as a batch job through various services. In this case it will run to completion, then take itself offline. If your model needs to always be available, via a customer-facing product with constant usage, then you'll deploy it as an endpoint through various services.

Batch models
* [AWS Batch](https://aws.amazon.com/batch/). Lets you run a model deployed as a Docker container (eg via [ECR](https://aws.amazon.com/batch/)) to completion, using price-saving features like spot instances. Much cheaper than Sagemaker, but at cost of spin-up time.

Endpoint models
* [AWS SageMaker](https://aws.amazon.com/batch/) lets you deploy trained models to a REST endpoint. Also lets you train models & view analytics and various training insights.
* [GCP Cloud ML](https://cloud.google.com/ai-platform). GCP's equivalent to SageMaker.
* [Cortex](https://www.cortex.dev/) is similar to SageMaker, with many added benefits. It's free and open source, using your AWS stack to deploy services (like SageMaker) but allowing cost-savings via spot instances, better than SageMaker's 40% EC2 added cost. Soon they'll support scale-to-0 instances, for when your ML server doesn't have traffic; a huge cost saving. 
* Other competitors include [PaperSpace Gradient](https://gradient.paperspace.com/), [FloydHub](https://www.floydhub.com/), and more.
`
}