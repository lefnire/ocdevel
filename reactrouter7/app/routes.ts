import {
  layout,
  type RouteConfig,
  index,
  route,
  prefix
} from "@react-router/dev/routes";
import _ from 'lodash'

import { flatRoutes } from "@react-router/fs-routes";

// export default flatRoutes() satisfies RouteConfig;

// 378e6c99 for routes SDK

export default [
  // layout("routes/layout.tsx", [
    index("routes/_index.tsx"),
    route("blog", "routes/blog.tsx", [
      index("routes/blog._index.tsx"),
      layout("routes/blog.$id.tsx", [
      //   // import * as b24 from './20240424-code-ai-for-adhd.mdx';
        route('20250214-which-code-ai', 'content/blog/20250214-which-code-ai/route.mdx'),
        route('20250207-sleep-hacks', 'content/blog/20250207-sleep-hacks/route.mdx'),
        route('20240228-walking-desks-incline', 'content/blog/20240228-walking-desks-incline/route.mdx'),
        route('20240131-vr-ar-work', 'content/blog/20240131-vr-ar-work/route.mdx'),
        route('20240117-pomodoro-thinkers', 'content/blog/20240117-pomodoro-thinkers/route.mdx'),
        route('20240111-tylers-setup', 'content/blog/20240111-tylers-setup/route.mdx'),
        route('20240110-ergo-mouse-keyboard', 'content/blog/20240110-ergo-mouse-keyboard/route.mdx'),
        // route('20240109-fitness-desk', 'content/blog/20240109-fitness-desk/index/route.tsx'),
        route('20240108-ml-gaming-laptop', 'content/blog/20240108-ml-gaming-laptop/route.mdx'),
        route('20200118-prevent-windows-auto-restart', 'content/blog/20200118-prevent-windows-auto-restart/route.mdx'),
        route('20210108-how-to-use-habitica', 'content/blog/20210108-how-to-use-habitica/route.tsx'),
        route('20201218-alb-ecs', 'content/blog/20201218-alb-ecs/route.mdx'),
        route('20201213-tgc', 'content/blog/20201213-tgc/route.mdx'),
        route('20201213-video2audio', 'content/blog/20201213-video2audio/route.mdx'),
        route('20201209-unable-to-fetch-archives', 'content/blog/20201209-unable-to-fetch-archives/route.mdx'),
        route('20201208-wsl-docker-misc', 'content/blog/20201208-wsl-docker-misc/route.mdx'),
        route('20201207-wsl2-gpu-docker', 'content/blog/20201207-wsl2-gpu-docker/route.mdx'),
        route('20201206-index-vs-quest2', 'content/blog/20201206-index-vs-quest2/route.mdx'),
        route('20201112-emacs27-ubuntu1804', 'content/blog/20201112-emacs27-ubuntu1804/route.mdx'),
        route('20201022-aws-batch-efs-mount', 'content/blog/20201022-aws-batch-efs-mount/route.mdx'),
        // route('0ea907ad-f062-428d-a452-293ff16f072c', 'content/blog/jobpig/4.tsx'),
        // route('87b7f847-5397-4910-8b29-e17647854d94', 'content/blog/jobpig/3.tsx'),
        // route('038e5143-3dd4-4291-afb7-8d156478b9d8', 'content/blog/jobpig/2.tsx'),
        // route('0b06cd49-a9d7-4c0a-8390-950a58e8da95', 'content/blog/jobpig/1.tsx'),
        // route('21204489-34a6-4d56-8299-0e6d3f446d53', 'content/blog/jobpig/0.tsx'),
      ])

    ]),
    route("mlg", "routes/podcast/route.tsx", {id: "mlg"}, [
      index("routes/podcast._index/route.tsx", {id: "mlg._index"}),
      route("resources", "routes/mlg.resources.tsx", {id: "mlg.resources"}),
      route("recommend", "routes/mlg.recommend.tsx", {id: 'mlg.recommend'}),
      layout("routes/podcast.$id/route.tsx", {id: "mlg._podcast.$id"}, [
        route("1", "content/podcast/mlg/001/route.mdx", {id: "mlg.1"}),
        route("2", "content/podcast/mlg/002/route.mdx", {id: "mlg.2"}),
        route("3", "content/podcast/mlg/003/route.mdx", {id: "mlg.3"}),
        route("4", "content/podcast/mlg/004/route.mdx", {id: "mlg.4"}),
        route("5", "content/podcast/mlg/005/route.mdx", {id: "mlg.5"}),
        route("6", "content/podcast/mlg/006/route.mdx", {id: "mlg.6"}),
        route("7", "content/podcast/mlg/007/route.mdx", {id: "mlg.7"}),
        route("8", "content/podcast/mlg/008/route.mdx", {id: "mlg.8"}),
        route("9", "content/podcast/mlg/009/route.mdx", {id: "mlg.9"}),
        route("10", "content/podcast/mlg/010/route.mdx", {id: "mlg.10"}),
        route("11", "content/podcast/mlg/011/route.mdx", {id: "mlg.11"}),
        route("12", "content/podcast/mlg/012/route.mdx", {id: "mlg.12"}),
        route("13", "content/podcast/mlg/013/route.mdx", {id: "mlg.13"}),
        route("14", "content/podcast/mlg/014/route.mdx", {id: "mlg.14"}),
        route("15", "content/podcast/mlg/015/route.mdx", {id: "mlg.15"}),
        route("16", "content/podcast/mlg/016/route.mdx", {id: "mlg.16"}),
        route("17", "content/podcast/mlg/017/route.mdx", {id: "mlg.17"}),
        route("18", "content/podcast/mlg/018/route.mdx", {id: "mlg.18"}),
        route("19", "content/podcast/mlg/019/route.mdx", {id: "mlg.19"}),
        route("20", "content/podcast/mlg/020/route.mdx", {id: "mlg.20"}),
        route("21", "content/podcast/mlg/021/route.mdx", {id: "mlg.21"}),
        route("22", "content/podcast/mlg/022/route.mdx", {id: "mlg.22"}),
        route("23", "content/podcast/mlg/023/route.mdx", {id: "mlg.23"}),
        route("24", "content/podcast/mlg/024/route.mdx", {id: "mlg.24"}),
        route("25", "content/podcast/mlg/025/route.mdx", {id: "mlg.25"}),
        route("26", "content/podcast/mlg/026/route.mdx", {id: "mlg.26"}),
        route("27", "content/podcast/mlg/027/route.mdx", {id: "mlg.27"}),
        route("28", "content/podcast/mlg/028/route.mdx", {id: "mlg.28"}),
        route("29", "content/podcast/mlg/029/route.mdx", {id: "mlg.29"}),
        route("30", "content/podcast/mlg/030/route.mdx", {id: "mlg.30"}),
        route("31", "content/podcast/mlg/031/route.mdx", {id: "mlg.31"}),
        route("32", "content/podcast/mlg/032/route.mdx", {id: "mlg.32"}),
        route("33", "content/podcast/mlg/033/route.mdx", {id: "mlg.33"}),

        route("mla-1", "content/podcast/mla/001/route.mdx", {id: "mlg.mla-1"}),
        route("mla-2", "content/podcast/mla/002/route.mdx", {id: "mlg.mla-2"}),
        route("mla-3", "content/podcast/mla/003/route.mdx", {id: "mlg.mla-3"}),
        route("mla-4", "content/podcast/mla/004/route.mdx", {id: "mlg.mla-4"}),
        route("mla-5", "content/podcast/mla/005/route.mdx", {id: "mlg.mla-5"}),
        route("mla-6", "content/podcast/mla/006/route.mdx", {id: "mlg.mla-6"}),
        route("mla-7", "content/podcast/mla/007/route.mdx", {id: "mlg.mla-7"}),
        route("mla-8", "content/podcast/mla/008/route.mdx", {id: "mlg.mla-8"}),
        route("mla-9", "content/podcast/mla/009/route.mdx", {id: "mlg.mla-9"}),
        route("mla-10", "content/podcast/mla/010/route.mdx", {id: "mlg.mla-10"}),
        route("mla-11", "content/podcast/mla/011/route.mdx", {id: "mlg.mla-11"}),
        route("mla-12", "content/podcast/mla/012/route.mdx", {id: "mlg.mla-12"}),
        route("mla-13", "content/podcast/mla/013/route.mdx", {id: "mlg.mla-13"}),
        route("mla-14", "content/podcast/mla/014/route.mdx", {id: "mlg.mla-14"}),
        route("mla-15", "content/podcast/mla/015/route.mdx", {id: "mlg.mla-15"}),
        route("mla-16", "content/podcast/mla/016/route.mdx", {id: "mlg.mla-16"}),
        route("mla-17", "content/podcast/mla/017/route.mdx", {id: "mlg.mla-17"}),
        route("mla-18", "content/podcast/mla/018/route.mdx", {id: "mlg.mla-18"}),
        route("mla-19", "content/podcast/mla/019/route.mdx", {id: "mlg.mla-19"}),
        route("mla-20", "content/podcast/mla/020/route.mdx", {id: "mlg.mla-20"}),
        // route("mla-21", "content/podcast/mla/021/route.mdx", {id: "mlg.mla-21"}),
        route("mla-22", "content/podcast/mla/022/route.mdx", {id: "mlg.mla-22"}),
      ])
    ]),
    route("llh", "routes/podcast/route.tsx", {id: "llh"}, [
      index("routes/podcast._index/route.tsx", {id: "llh._index"}),
      layout("routes/podcast.$id/route.tsx", {id: "llh._podcast.$id"}, [
        route("1", "content/podcast/llh/1/route.mdx", {id: "llh.1"}),
        route("2", "content/podcast/llh/2/route.mdx", {id: "llh.2"}),
        route("3", "content/podcast/llh/3/route.mdx", {id: "llh.3"}),
        route("4", "content/podcast/llh/4/route.mdx", {id: "llh.4"}),
      ]),
    ]),

  // ]),

  route("*", "routes/$.tsx"),

] satisfies RouteConfig;
