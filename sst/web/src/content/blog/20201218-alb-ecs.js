export default {
  id: '20201218-ecs-alb',
  date: '2020-12-18',
  title: "ECS with Route53, SSL, ALB",
  body: `
To setup ECS with a domain + SSL, you _need_ ALB. I've researched and couldn't find alternatives that weren't wild. This sucks, because ALB is expensive. If this ECS service is your bread-and-butter service, then you'll want ALB eventually anyway, great. If not, suck it up buttercup.

The order of steps you take to set this up are important, you can't easily mix/match these steps, which is why I'm creating this post. I've found other tutorials, but they didn't peg the order exactly and I hit snags.

#### 1. Health-check & Security Group
1. Ensure your server has a health-check. Parts in this stack ping a health route that you specify (like / or /health), without which ECS will consider the service down and attempt a re-deploy. Add a health-check route to your code, it can return anything with a 200 code.
1. You'll be using a Security Group in multiple places. Best to create one now (called "web" or whatever), which allows inbound 80 & 443. [EC2 > Security Groups](https://console.aws.amazon.com/ec2/v2/home#SecurityGroups)
  
#### 2. Route53 and Certificate Manager
1. Register a domain on [Route53](https://console.aws.amazon.com/route53). Created a Hosted Zone for domain.
1. Request a public certificate on [Certificate Manager](https://console.aws.amazon.com/acm). 
   1. Request a certificate > Request a public certificate
   1. Add domains. Be smart, you might want to re-use this. Eg: domain.com, www.domain.com, api.domain.com. You can wildcard like domain.com, *.domain.com. I found having existing non-alias A records on this domain fails DNS validation, in case you hit snags.
   1. DNS Validation
   1. Review -> Confirm and request
   1. Click the certificate request > click each domain > Create record in Route 53
   
#### 3. Target Group & ALB, Point Route53
1. Create Application Load Balancer in [EC2 > Load Balancers](https://console.aws.amazon.com/ec2/v2/home#LoadBalancers)
   1. Create Load Balancer > Application Load Balancer
   1. Scheme = internet-facing, Load Balancer Protocol = HTTPS(443), click all Availability Zones > Next
   1. Choose a certificate from ACM (recommended), select your certificate from (2.2), ELBSecurityPolicy-2016-08 > Next
   1. Choose Security Group from (1.2) > Next
   1. Create a throw-away Target Group. ECS (later) forces you to create its own TG, I couldn't get it to use a pre-created one. Set this Health checks Path to /blah, since we want / later and it would conflict.
   1. Next > Next > Create (skip the Register Targets step)
1. Point to ALB in [Route53](https://console.aws.amazon.com/route53)
   1. Click your Hosted Zone > Create record
   1. Routing Policy = Simple Routing, enter subdomain if desired, Alias = True, Record type = A, Route Traffic To = Alias to an Application Load Balancer, Choose region, Choose load balancer, Evaluate target health = (I don't know)
    
#### 4. ECS
1. ECS [Task Definitions](https://console.aws.amazon.com/ecs/home#/taskDefinitions) > Create new Task Definition > Fargate
   1. Task Role = ecsTaskExecutionRole
   1. Add Container. Setup your Docker stuff, out of scope here. Port mappings = 80/tcp, 443/tcp
1. [Create Cluster](https://console.aws.amazon.com/ecs) > Network Only > View cluster
1. In Services tab of new cluster, Create (create a service)
   1. Launch type = Fargate, choose Task Definition > Other stuff > Next
   1. Select all subnets, choose existing Security Group (1.1), Auto assign IP ENABLED (required by Docker), Load balancer type = Application Load Balancer, Load Balancer Name = choose ALB from (3.1)
   1. Container to load balance. Select your-container:80:80 from drop-down. Click "Add to load balancer". 
   1. Production listener port = (dropdown > 443:HTTPS) > Target group name = create new (name it something good), Target group protocol = HTTP, Path pattern = / (if it gives you beef, set Evaluation order = 1), Health check path = your server's health route.
   1. Next Next Next 
1. Delete throw-away TG at [EC2 > Target Groups](https://console.aws.amazon.com/ec2/v2/home#TargetGroups) > delete the dummy from (3.1) 
`
}