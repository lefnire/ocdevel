// const metaObjects = import.meta.glob('/app/routes/blog.blog*/meta.js');
// export default metaObjects;
import * as b26 from '../../routes/blog.20250214-which-code-ai/meta.js';
import * as b25 from '../../routes/blog.20250207-sleep-hacks/meta.js';
// import * as b24 from './20240424-code-ai-for-adhd/meta.js';
import * as b23 from '../../routes/blog.20240228-walking-desks-incline/meta.js';
import * as b22 from '../../routes/blog.20240131-vr-ar-work/meta.js';
import * as b21 from '../../routes/blog.20240117-pomodoro-thinkers/meta.js';
import * as b20 from '../../routes/blog.20240111-tylers-setup/meta.js';
import * as b19 from '../../routes/blog.20240110-ergo-mouse-keyboard/meta.js';
import * as b18 from '../../routes/blog.20240109-fitness-desk/meta.js';
import * as b17 from '../../routes/blog.20240108-ml-gaming-laptop/meta.js';
import * as b16 from '../../routes/blog.20200118-prevent-windows-auto-restart/meta.js';
import * as b15 from '../../routes/blog.20210108-how-to-use-habitica/meta.js'
import * as b14 from '../../routes/blog.20201218-alb-ecs/meta.js'
import * as b13 from '../../routes/blog.20201213-tgc/meta.js'
import * as b12 from '../../routes/blog.20201213-video2audio/meta.js'
import * as b11 from '../../routes/blog.20201209-unable-to-fetch-archives/meta.js'
import * as b10 from '../../routes/blog.20201208-wsl-docker-misc/meta.js'
import * as b9 from '../../routes/blog.20201207-wsl2-gpu-docker/meta.js'
import * as b8 from '../../routes/blog.20201206-index-vs-quest2/meta.js'
import * as b7 from '../../routes/blog.20201112-emacs27-ubuntu1804/meta.js'
import * as b6 from '../../routes/blog.20201022-aws-batch-efs-mount/meta.js'
// import * as b5 from './jobpig/4'
// import * as b4 from './jobpig/3'
// import * as b3 from './jobpig/2'
// import * as b2 from './jobpig/1'
// import * as b1 from './jobpig/0'

const metas = [
  // pinned
  b18,
  b19,

  b26,
  b25,
  // b24,
  b23,
  b22,
  b21,
  b20,
  b17,
  b16,
  b15,
  b14,
  b13,
  b12,
  b11,
  b10,
  b9,
  b8,
  b7,
  b6,
  
  // b5,
  // b4,
  // b3,
  // b2,
  // b1,
]

export default metas;
export const metasObj = Object.fromEntries(metas.map(m => [
  m.id,
  m
]));