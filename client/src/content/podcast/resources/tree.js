import {resources as r} from './index'

export const picks = {
  ordered: {t: "Complete In Order", d: "Complete each section in order before moving on the next (unless specified as optional)."},
  all: {t: "Complete All", d: "Order doesn't matter, but I recommend all these resources. Listed in descending order of my preference."},
  any: {t: "Pick Any", d: "All these resources are good. Pick as many as you like (or none). Listed in descending order of my preference."},
  one: {t: "Pick One", d: "These resources generally cover the same material. You only really need one, but up to you if you want more than one of these for learning-by-repetition. Listed in descending order of my preference."},
}

const sharedAudio = {
  inspire: [
    r.tgc_consciousness,
    r.singularity_is_near,
    r.feeling_of_life,
    r.master_algorithm,
    r.superintelligence,
    r.machines_of_loving_grace,
  ],


}

export default {
 degrees: {
    t: "Degrees / Certificates",
    d: "Consider this mutually-exclusive to the above list of self-learning resources. No point in burning yourself out if you're going to get a Masters in ML anyway.",
    pick: "one",
    expand: true,
    v: [
      r.omscs,
      {
        t: "Others",
        d: "Certificates & nano-degrees. I'm nesting it here since they're not widely respected yet in industry, prefer a traditional Masters (a la above list)",
        pick: "one",
        v: [
          r.udacity_ml,
          r.udacity_self_driving,
          r.udacity_ai,
        ]
      }
    ]
  },

  main: {
    t: "Main",
    d: "Machine learning track - 75% of your learning time.",
    pick: "ordered",
    expand: true,
    v: [
      {
        t: "Inspiration | Optional",
        d: "Non-technical machine learning & AI content: introduction to the subject, or inspiration / philosophy",
        pick: "any",
        v: [
          r.society_of_mind,
          ...sharedAudio.inspire
        ]
      },

      {
        t: "Basics",
        d: "Machine learning Basics. Let the games begin!",
        pick: "all",
        expand: true,
        v: [
          r.tgc_ml,
          r.ng,
          r.handson_tensorflow,
          r.hundred_page_ml,
          {
            t: "Dive Deeper",
            pick: "any",
            v: [
              r.elements_of_stat_learning,
              r.pattern_rec
            ]
          }
        ]
      },

      {
        t: "Programming",
        d: "Eventually you'll need to be pretty good at Python. Not immediately (why I list this after Basics), but probably before going too far.",
        pick: "any",
        v: [
            r.book_python,
            r.python_data_analysis
        ]
      },

      {
        t: "Deep Learning",
        d: "Deep Learning basics. Nothing specific on vision, NLP, etc - just the core concepts.",
        pick: "one",
        v: [
            r.ng_deep_learning,
            r.fastai,
            r.dl_book,
            {
              t: "DL Topics (NLP, CV, RL)",
              d: "Within deep learning, you'll want to specialize in something. Eventually you'll be exposed to most everything, but generally a good idea to pick something you like and master it.",
              pick: "any",
              v: [
                {
                  t: "Natural Language Processing",
                  pick: "any",
                  v: [
                    {
                      t: "Primers | Optional",
                      d: "Some quickie tutorials & articles introducing Deep NLP",
                      pick: "any",
                      v: [
                        r.rnn_articles,
                        r.tf_tuts_rnns,
                      ]
                    },
                    r.speech_and_nlp,
                    r.stanford_nlp,
                    r.cs224n,
                    {
                      t: "Other | Optional",
                      d: "Misc books, articles, etc in NLP",
                      pick: "any",
                      v: [
                        r.nltk,
                      ]
                    }
                  ]
                },

                {
                  t: "Computer Vision",
                  pick: "any",
                  v: [
                    r.cs231n,
                  ]
                },

                {
                  t: "Reinforcement Learning",
                  pick: "any",
                  v: [
                    r.aima,
                    r.sutton_barto,
                    r.cs294,
                    r.david_silver,
                  ]
                }

              ]
            }
        ]
      },
    ]
  },

  math: {
    t: "Math",
    d: "ML math learning track - 25% of your learning time",
    pick: "ordered",
    expand: true,
    v: [
      {
        t: "Primers | Optional",
        d: "Quick-fix primers to get you up and running (but eventually do the heavy learning!)",
        pick: "any",
        v: [
          r.math_primer,
          r.mml_book
        ]
      },
      {
        t: "Linear Algebra",
        pick: "one",
        v: [
          r.tgc_linear_algebra,
          r.fastai_linear_algebra,
          r.book_linear_algebra,
          r.khan_linear_algebra,
        ]
      },
      {
        t: "Calculus",
        pick: "one",
        v: [
          r.tgc_calc,
          r.bluebrown_calc,
          r.book_calc,
          r.khan_calc,
          // TODO brown/blue
        ]
      },
      {
        t: "Statistics & Probability",
        pick: "one",
        v: [
          r.tgc_stats,
          r.khan_stats,
          r.book_stats
        ]
      },
      {
        t: "Other",
        d: "Misc topics valuable to ML, but not the core triumvirate",
        pick: "any",
        v: [
          r.tgc_math_decision_making,
          r.tgc_info_theory,
        ]
      }
    ]

  },

  audio: {
    t: "Audio",
    d: "Supplementary audio learning. For driving / chores / exercise",
    pick: "all",
    expand: true,
    v: [
      {
        t: "Inspiration | Optional",
        d: "Non-technical machine learning & AI content: introduction to the subject, or inspiration / philosophy",
        pick: "any",
        v: sharedAudio.inspire,
      },

      {
        t: "Basics",
        d: "General machine learning content",
        pick: "all",
        v: [
          r.mlg,
          r.tgc_ml,
          r.tgc_math_decision_making
        ]

      },

      {
        t: "Deep Learning",
        d: "Video series which can be listened to instead of watched, if you're really on your game. See Audio-mode in the filters",
        pick: "any",
        v: [
          r.stanford_nlp,
          r.cs224n,
          r.cs231n,
          r.cs294,
          r.david_silver,
        ]
      },

      {
        t: "Math",
        d: "Video series which can be effectively consumed in audio format, without losing too much value. Prefer to watch these, but since you'll have a lot on your visual-learning plate, I've listed resources which you can listen to and save time",
        pick: "all",
        v: [
          r.tgc_linear_algebra,
          r.tgc_calc,
          r.tgc_stats,
          r.tgc_info_theory,
          r.bluebrown_calc,
          r.bluebrown_linalg
        ]
      },

      {
        t: "Podcasts",
        d: "Once you've gotten your fill of the above resources, time to go into auto-pilot. Try a few of these podcasts, find your favorites, and coast.",
        pick: "any",
        v: [
          r.mlg,
          r.lex_fridman,
          r.twiml_and_ai,
          r.linear_digressions,
          r.oreilly_data_show,
          r.talking_machines,
          r.data_skeptic,
          r.learning_machines_101
        ]
      }
    ]
  }
}

