import {resources} from '../resources'

export default {
  title: "Introduction",
  episode: 1,
  created: "2017-02-01",
  updated: "2021-10-20",
  libsynEpisode: 5440758,
  guid: "a9bf6e09-aa7e-4126-9e36-22b152419c8f",
  resources: [
    resources.tgc_ml,

    resources.twiml_and_ai,
    resources.oreilly_data_show,
    resources.talking_machines,

    resources.linear_digressions,
    resources.data_skeptic,
    resources.learning_machines_101,
  ],
  teaser: "Introduction to the Machine Learning Guide",
  body: `
- [MLG](https://ocdevel.com/mlg), [Resources Guide](https://ocdevel.com/mlg/resources)
- [Dept Agency](https://deptagency.com)
- Gnothi (podcast project): [website](https://gnothiai.com), [Github](https://github.com/lefnire/gnothi)

What is this podcast? 
- "Middle" level overview (deeper than a bird's eye view of machine learning; higher than math equations)
- No math/programming experience required

Who is it for
- Anyone curious about machine learning fundamentals
- Aspiring machine learning developers

Why audio?
- Supplementary content for commute/exercise/chores will help solidify your book/course-work

What it's not
- News and Interviews: TWiML and AI, O'Reilly Data Show, Talking machines
- Misc Topics: Linear Digressions, Data Skeptic, Learning machines 101
- iTunesU issues

Planned episodes
- What is AI/ML: definition, comparison, history
- Inspiration: automation, singularity, consciousness
- ML Intuition: learning basics (infer/error/train); supervised/unsupervised/reinforcement; applications
- Math overview: linear algebra, statistics, calculus
- Linear models: supervised (regression, classification); unsupervised
- Parts: regularization, performance evaluation, dimensionality reduction, etc
- Deep models: neural networks, recurrent neural networks (RNNs), convolutional neural networks (convnets/CNNs)
- Languages and Frameworks: Python vs R vs Java vs C/C++ vs MATLAB, etc; TensorFlow vs Torch vs Theano vs Spark, etc
`,
  transcript: `
Welcome to the first episode of machine learning guide or MLG, which is a podcast structured as an audio course, whose intent is to teach you the high level principles of machine learning and artificial intelligence. In this podcast, I will provide you a bird's-eye overview. Of the fundamental concepts of machine learning.

This includes things like models and algorithms, both shallow learning models and deep learning models, shallow learning machine learning models include things like linear and logistic regression, Naive Bayes, and decision trees, which as a machine learning newbie, you may not have heard of, but I will also cover deep learning models, which I'm sure you have heard of things like neural networks, convolutional, neural networks, and recurrent neural network.

I'll discuss the languages and frameworks that you want to use in machine learning. We'll talk about Python, TensorFlow, scikit-learn PI torch. These types of topics. I'll discuss at a high level, the math you need to know to succeed in machine learning. This includes calculus statistics and linear algebra, and I will go into all these topics in as much depth as audio allow.

And then I will provide you with the resources needed to deep dive any of these topics offline to master the details that require a visual element, whether it be textbooks or videos. This podcast is of course intended for anybody interested in machine learning, but there tends to be two common subscribers to the podcast.

The first is managers and executive. They're interested in knowing just enough machine learning to be dangerous, whether it's to assess what technologies are available to use in their projects or at their company, or maybe they want to intelligently converse with their machine learning and data science employees.

The second are people who want to learn machine learning. Maybe they're considering pivoting from a different field, into the machine learning field, machine learning, artificial intelligence and data science. I, myself come from a web app development background and decided that I wanted to become a machine learning engineer and self-taught myself machine learning and ended up getting work in the field.

I only have a bachelor's in computer science. So that shows you that it is doable to self-teach machine learning effectively enough to land work in the industry. But in order to do that, you have to be very rigorous and diligent in your self-teaching journey. And you're going to want. A very structured resource guide.

And that is what I'm going to provide to you separate from this podcast. It's as important, a component of your listening experience to machine learning guide that you visit the resources section of my website on my website, ocdevel.com O C D E V E L .com forward slash M L. There is a resources tab, click that tab, and you will get a hierarchically structured list of resources with filters.

So you can filter by format, whether it be audio book, textbook, video course, et cetera, price filters, quality filters. And this tree structured resource guide will provide you the step-by-step in sequential order. What resources you're going to want to consume separate from this podcast to most efficiently manage your learning path through your journey of learning machine learning.

I have spent a lot of time and effort on curating this list of resources. I'm subscribed to many machine learning and data science, subreddits, and RSS feeds. I frequently peruse the syllabus of various courses and the textbooks that they assigned to their students. And there are, of course, just very well known machine learning resources out there, like the Andrew in Coursera course and fast.ai.

So this podcast will provide you the overview of the models and the concepts. But if you're serious about learning machine learning, you're going to want to also spend time on the resources list where I have crafted for you. A step-by-step guide to effectively learn machine learning. Now this resources list is not only for the deep divers.

There are also plenty of great resources listed on that page, including other podcasts, similar to machine learning guide. Some of my favorite podcasts that I listen to out there, various podcasts are news and interview based podcasts, where they interview experts in the field. And those experts discuss latest technologies and inventions and white papers.

Some other podcasts and audio learning resources that are similar to MLG, whose goal is to teach you machine learning and other fields tangential to machine learning, such as math, operations research, and some more fun topics, more inspirational concepts in machine learning, things like the singularity and consciousness can robots be conscious and what is conscious?

So after you listened to this episode, I recommend visiting ocdevel.com/mlg. There, you will find the resources list, which includes other audio supplementary resources that you may want to enjoy alongside this podcast, as well as the deep dive materials that you'll need during your learning.

now as of October 20th, 2021 dept agency, D E P T has acquired the machine learning guide podcast. And they're paying me to work on it, which is fantastic. So I'm going to be breathing new life into the old podcasts. I'm going to be dusting off old episodes, fixing up some. Subjects which may be considered missing in the traditional machine learning educational path, things like decision trees and naive bayes.

And they're bringing you machine learning applied for free. Previously machine learning applied was a separate paid podcast I had, which had discussed the applied things in machine learning, things like technology, stacks, programming, languages, job, hunting, machine learning, operations, where ML ops and all these things.

So I'm going to be merging in these episodes into the main. Thanks to Dept's generosity. The value of depth to you as a listener is that I'm going to be using their projects as talking points for the various subjects I'm going to be discussing. So for example, if I'm discussing computer vision or natural language processing, I might pull in a adept project in those subjects further.

Since this company does data science and machine learning. If you're listening to this podcast, because you want to tap into the industry will apply to them, apply to Dept by way of the links on ocdevel.com. Or if you're a manager listening to this podcast, trying to decide what is feasible by way of machine learning and what types of technologies are used in the space.

And you're looking for talent will hire us. Dept is always looking for new clients. And since I'm on the team, Hey, you might have me as your engineer. If I don't have a depth case study project handy as a talking point for that episode, I'm going to be using my own personal project, gnothi

G N O T H I Gnothi Seauton is ancient Greek for &quot;know thyself&quot; Gnothi is an online journal, a personal journal that uses.

AI to provide resources and insights, things like book recommendations, therapists, suggestions, it generates themes of your journal entries, common recurring patterns. It allows you to ask questions of your journals. It allows you to generate summaries of your journal entries. So for example, give me one year's worth of journal entries in one paragraph, it allows you to share your journal entries with therapists so that they can use these tools as well. And then the project being open source. Gnothi is open source. You can go see the code. You can see how some computer vision algorithm is programmed in Python. Using TensorFlow in the wild, you can see how you would program a summarization model in the deep, natural language processing episodes in the future.

Note, as I'm redoing the podcast, you may find some gaps in your pod catcher. It looks like maybe an episode is missing. That's normal. It's because I've taken out older material that it's no longer relevant. And it's important to bear in mind that I discuss resources in my old episodes.

At the end of the episode, I discussed them in the podcast episode. When you get to that point in the episode, Just skip ahead because this resources page on ocdevel.com is where I dump the resources. Now this allows me to keep things fresh and updated. As resources change as newer better resources become available for some specific topic, then I don't have to go back and edit an episode.

So going forward as I revise these older episodes, I will no longer be including discussions of the resources themselves. Instead, you need to just go to the website to get the resource. Now, with all that meta out of the way, let's dive into the next episode where I define machine learning and artificial intelligence, how they differ from each other compared to data science and so on.

I'll see you in the next episode.
`
}