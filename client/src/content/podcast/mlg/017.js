import {resources} from "../resources";

export default {
  title: 'Checkpoint',
  episode: 17,
  date: "2017-06-04",
  guid: "4977e285-d4fc-45cb-b3a5-aed9e97915c2",
  file: {
    url: "http://ocdevel.com/files/podcasts/machine-learning/ml-17.mp3",
    length: 6625180,
    duration: "6:59"
  },
  libsynEpisode: 5440741,
  teaser: "Checkpoint - learn the material offline!",
  body:
`45m/d ML
- ${resources.courses.ng}
- ${resources.books.python}
- ${resources.audio.dl_episode}
- Go deeper on shallow algos
  - ${resources.books.elements_of_stat_learning}
  - ${resources.books.pattern_rec}

15m/d Math
- ${resources.courses.linear_algebra}
- ${resources.courses.stats}
- ${resources.courses.calc}

Audio
- ${resources.audio.cs229}
- ${resources.audio.master_algorithm}
- ${resources.audio.math_decision_making}
- ${resources.audio.stats}
- ${resources.audio.calc}
- ${resources.audio.video_to_audio}

${resources.other.kaggle}
`
}