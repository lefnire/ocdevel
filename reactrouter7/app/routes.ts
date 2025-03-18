import {
  type RouteConfig,
  index,
  route,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    // route("walk", "content/blog/20240109-fitness-desk/index.tsx"),
    route("contact", "routes/contact.tsx"),
    route("blog", "routes/blog/layout.tsx", [
      index("routes/blog/list.tsx"),
      route(":id", "routes/blog/full.tsx"),

      // layout("routes/blog/full.tsx", [
      //   // import * as b24 from './20240424-code-ai-for-adhd.mdx';
      //   route('20250214-which-code-ai', 'content/blog/20250214-which-code-ai.mdx'),
      //   route('20250207-sleep-hacks', 'content/blog/20250207-sleep-hacks.mdx'),
      //   route('20240228-walking-desks-incline', 'content/blog/20240228-walking-desks-incline.mdx'),
      //   route('20240131-vr-ar-work', 'content/blog/20240131-vr-ar-work.mdx'),
      //   route('20240117-pomodoro-thinkers', 'content/blog/20240117-pomodoro-thinkers.mdx'),
      //   route('20240111-tylers-setup', 'content/blog/20240111-tylers-setup.mdx'),
      //   route('20240110-ergo-mouse-keyboard', 'content/blog/20240110-ergo-mouse-keyboard.mdx'),
      //   route('20240109-fitness-desk', 'content/blog/20240109-fitness-desk/index.tsx'),
      //   route('20240108-ml-gaming-laptop', 'content/blog/20240108-ml-gaming-laptop.mdx'),
      //   route('20200118-prevent-windows-auto-restart', 'content/blog/20200118-prevent-windows-auto-restart.mdx'),
      //   route('20210108-how-to-use-habitica', 'content/blog/20210108-how-to-use-habitica.tsx'),
      //   route('20201218-alb-ecs', 'content/blog/20201218-alb-ecs.mdx'),
      //   route('20201213-tgc', 'content/blog/20201213-tgc.mdx'),
      //   route('20201213-video2audio', 'content/blog/20201213-video2audio.mdx'),
      //   route('20201209-unable-to-fetch-archives', 'content/blog/20201209-unable-to-fetch-archives.mdx'),
      //   route('20201208-wsl-docker-misc', 'content/blog/20201208-wsl-docker-misc.mdx'),
      //   route('20201207-wsl2-gpu-docker', 'content/blog/20201207-wsl2-gpu-docker.mdx'),
      //   route('20201206-index-vs-quest2', 'content/blog/20201206-index-vs-quest2.mdx'),
      //   route('20201112-emacs27-ubuntu1804', 'content/blog/20201112-emacs27-ubuntu1804.mdx'),
      //   route('20201022-aws-batch-efs-mount', 'content/blog/20201022-aws-batch-efs-mount.mdx'),
      //   route('0ea907ad-f062-428d-a452-293ff16f072c', 'content/blog/jobpig/4.tsx'),
      //   route('87b7f847-5397-4910-8b29-e17647854d94', 'content/blog/jobpig/3.tsx'),
      //   route('038e5143-3dd4-4291-afb7-8d156478b9d8', 'content/blog/jobpig/2.tsx'),
      //   route('0b06cd49-a9d7-4c0a-8390-950a58e8da95', 'content/blog/jobpig/1.tsx'),
      //   route('21204489-34a6-4d56-8299-0e6d3f446d53', 'content/blog/jobpig/0.tsx'),
      // ])
      
    ]),
    route("mlg", "routes/podcast/layout.tsx", {id: "mlg.layout"}, [
      index("routes/podcast/list.tsx", {id: "mlg.list"}),
      route("resources", "routes/podcast/resources.tsx", {id: "mlg.resources"}),
      route("recommend", "routes/podcast/recommend.tsx"),
      route(":id", "routes/podcast/full.tsx", {id: "mlg.full"})
    ]),
    route("llh", "routes/podcast/layout.tsx", {id: "llh.layout"}, [
      index("routes/podcast/list.tsx", {id: "llh.list"}),
      route(":id", "routes/podcast/full.tsx", {id: "llh.full"})
    ]),

  ]),

  route("*", "routes/redirects.tsx"),


] satisfies RouteConfig;
