const ep = {
  title: 'Reinforcement Learning Intro',
  episode: 29,
  mergeEpisode: 29,
  created: "2018-02-05",
  guid: "fc7802de8fb4d4f609fd11db9afb2189",
  file: {},
  libsynEpisode: 6226276,
  teaser: 'Introduction to reinforcement learning concepts',
  body: `
- RL definition: goal, rewards, actions
** Games (Atari, Chess, Go - Lee Sedol & Alpha Go)
** AI: learning, vision / speech, action / motion, planning
** Reasoning / knowledge vs model-based Deep RL?
** Reasoning / knowledge rep (+memory?) => Differential computers (https://deepmind.com/blog/differentiable-neural-computers/)
** vs supervised. Vision = supervised. Games = action. Trading can go both ways!
** Time: Credit assignment, delayed rewards, investment
- Model-based v free
** Policy (what you do; gut reaction)
- Value-based (Q-learning) vs Policy Gradient
** PG is direct: ML -> action
** Value-based indirect: Bellman stuff -> state/action values (Q-values) -> policy
- Openai Gym, cartpole
- Frameworks
** [openai/baselines](https://github.com/openai/baselines)
** [reinforceio/tensorforce](https://github.com/reinforceio/tensorforce)
** [NervanaSystems/coach](https://github.com/NervanaSystems/coach)
** [rll/rllab](https://github.com/rll/rllab)
`
}
export default ep