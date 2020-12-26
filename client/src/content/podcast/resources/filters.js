import {
  CgMathPercent,
  FaBook, FaChalkboardTeacher,
  FaCouch, FaEye, FaGraduationCap,
  FaHeadphones,
  FaMicrophone, FaNewspaper, FaRegSmile, FaRegStar, FaRobot,
  FaRunning, FaStar, FaStarHalfAlt,
  FaVideo,
  GiBattery0,
  GiBattery100,
  GiBattery50, IoIosChatbubbles, MdWeb, TiSortAlphabetically
} from "react-icons/all";
import {action} from "easy-peasy";

export const learnStyles = {
  learn: {
    t: 'Learn Mode',
    d: "List learning resources for self-teaching, or resources for getting a degree",
    opts: {
      selfTaught: {t: "Self-Taught", d: "Lists all resources intended for self-learning ML, including math."},
      degree: {t: "Degrees/Certificates", d: "Lists degrees/certificates, and hides resources you'd which teach you what you'll learn during the degree. Keeps supplementary material listed."}
    }
  },

  audio: {
    t: "Audio Preference",
    d: "If you enjoy audio for learning, setting this to Audio-Heavy, will move as much as possible to the Audio section. Eg, if a book has both paper & audiobook, it's listed in audio. This includes some videos which do a good job orating!",
    opts: {
      hardCore: {t: "Audio-Heavy", d: "Some video resources are well-orated, and can thus be listened to - saving your eye-time for other resources. These resources are moved to the audio section, with instructions on converting video to audio."},
      normal: {t: "Audio-Light", d: "If you prefer your audio time to be less intense, or simply prefer to watch video resources as they're intended to be consumed, choose this. It'll put video resources in their normal place."}
    }
  },
}

export const filters = {
  engagement: {
    t: "Engagement",
    d: `Is this resource "sit back and enjoy", or does it require coding challenges, exercises, etc?`,
    opts: {
      active: {t: "Active", d: "Requires engagement, like assignments or exercises", i: <FaRunning />},
      passive: {t: "Passive", d: "Passive learning resource, like podcasts or videos", i: <FaCouch />}
    }
  },
  difficulty: {
    t: "Difficulty",
    d: `How hard is this resource to consume? Ie, how much caffeine do you need?`,
    opts: {
      easy: {t: "Easy", d: "Very easy material", i: <GiBattery0 />},
      medium: {t: "Medium", d: "Somewhat difficult material, be caffeinated", i: <GiBattery50 />},
      hard: {t: "Hard", d: "Difficult material, for hard-core learning sessions", i: <GiBattery100 />},
    }
  },
  format: {
    t: "Format",
    d: `Resource format (book, video, course, etc).`,
    opts: {
      audiobook: {t: "Audiobook", d: "Audiobook or similar learning resources", i: <FaHeadphones />},
      podcast: {t: "Podcast", d: "Podcast", i: <FaMicrophone />},
      video: {t: "Video", d: "Video learning resource", i: <FaVideo />},
      book: {t: "Book", d: "Book resource. Textbooks or tradebooks", i: <FaBook />},
      course: {t: "Course", d: "Online course. Either do-it-yourself (no grading) or graded with assignments", i: <FaChalkboardTeacher />},
      degree: {t: "Degree / Certificate", d: "Online degree or certificate. Prefer a degree of course if you have the time and money, nano-degrees and certificates are much less industry-valued.", i: <FaGraduationCap />},
      other: {t: "Other", d: "Other learning resources like articles & blogs", i: <MdWeb />},
    }
  },
  video2audio: {
    t: "Video→Audio",
    d: `For video resources, could you just listen to the video without watching it and still benefit?`,
    opts: {
      bad: {t: "No-Go", d: "Watch it as a video, you'll need the visuals"},
      medium: {t: "Doable", d: "Could be consumed as audio-only, but not for the feint of heart"},
      good: {t: "As Good", d: "Almost just as good to listen to this video resource audio-only. Speaker does a great job orating the visuals."},

    }
  },
  relevance: {
    t: "Relevance",
    d: `How up-to-date is this resource, in cases where it matters (eg with languages/frameworks)?`,
    opts: {
      fresh: {t: "Still Relevant", d: "An up-to-date resource, or timeless"},
      dated: {t: "Outdated", d: "A dated resource, unless it's marked 'essential', see if you can find something newer"},
    }
  },
  importance: {
    t: "Importance",
    d: `How important is this resource? This is the most important tag; it tells you what you must consume, vs what's nice to consume`,
    opts: {
      supplementary: {t: "Supplementary", d: "Nice-to-have resource. Supplementary for the deep-divers on this topic, but not your bread-and-butter", i: <FaRegStar/>},
      valuable: {t: "Valuable", d: "Quite a valuable resource. If you have the extra time, do it", i: <FaStarHalfAlt />},
      essential: {t: "Essential", d: "Required. If interested in this topic, you _need_ this resource", i: <FaStar />},
    }
  },
  topic: {
    t: "Topic",
    d: `What ML topic is this resource relevant to?`,
    opts: {
      fun: {t: "Fun", d: "Fun and inspirational material, like consciousness and futurology", i: <FaRegSmile />},
      basics: {t: "Basics", d: "ML basics, information, end-to-end stuff", i: <TiSortAlphabetically />},
      news_interviews: {t: "News & Interviews", d: "Latest news & interviews in ML, mostly non-technical", i: <FaNewspaper />},
      math: {t: "Math", d: "Fundamental math for ML", i: <CgMathPercent />},
      vision: {t: "CV", d: "Computer Vision", i: <FaEye />},
      nlp: {t: "NLP", d: "Natural Language Processing", i: <IoIosChatbubbles />},
      rl: {t: "RL", d: "Reinforcement Learning / AI", i: <FaRobot />},
    }
  },
  price: {
    t: "Price",
    d: "Cost of this resource (look for other links, there are sometimes free versions)",
    opts: {
      free: {t: "Free", d: "Free! Look for this on resources which have paid links (eg Amazon), sometimes professors release the PDF for free while continuing to sell elsewhere", i: <span>Free</span>},
      "$": {t: "$", d: "Cheap. Under $10", i: <span>$</span>},
      "$$": {t: "$$", d: "Medium-priced. $10-$300", i: <span>$$</span>},
      "$$$": {t: "$$$", d: "Expensive. >$300", i: <span>$$$</span>},
      [undefined]: ""
    }
  },
  updated: {
    t: "Updated At",
    d: "When did I, Tyler, update this resource link? If a long time ago, consider investigating newer alternatives.",
  }
}

export const filterKeys = [
  // Specify filter-key order (since is {} above)
  'importance',
  'format',
  'video2audio',
  'difficulty',
  'engagement',
  'topic',
  'relevance',
  // Extra keys added per resource
  // 'price',
  // 'updated',
]

export const defaults = {
  importance: "supplementary",
  format: "other",
  difficulty: "easy",
  engagement: "passive",
  topic: "basics",
  relevance: "fresh",
}