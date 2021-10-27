import _ from "lodash";

export default _.mapValues({
  ml_stack: {
    t: "Machine Learning Server",
    d: `Cloud hosting services for serving your machine learning model`,
    links: [{t: "Article", l: "/mlg/mla-14", p: "free"}]
  },
  frontend_stack: {
    t: "Client, Server, Database",
    d: `Tech stack and cloud services to use for your front-end (web/mobile), app server, and database. As well as some database-ish things like in-memory session management, pub/sub, and job-queues.`,
    links: [
      {t: "Article", l: "/mlg/mla-13", p: "free"}
    ]
  },

  dev_environment: {
      t: "Development Environment",
      d: `Use Windows (dev channel), WSL2, Docker, nvidia-docker for your dev environment`,
      links: [{t: "Article", l: "/mlg/24", p: "free"}]
    },

  get_job: {
    t: "Get a Job",
    d: `Advice for finding work in ML / datascience`,
    links: [{t: "Article", l: "/mlg/mla-15", p: "free"}]
  }
}, v => ({
  topic: "tech",
  ...v
}))