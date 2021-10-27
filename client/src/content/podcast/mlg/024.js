import resources from "../resources";

export default {
  title: 'Tech Stack',
  episode: 24,
  created: "2017-10-06",
  guid: "11e604992dcd4f124cb4d3897c81056f",
  file: {},
  libsynEpisode: 5816352,
  teaser: 'TensorFlow, Pandas, Numpy, Scikit-Learn, Keras, TensorForce.',
  body: `
### Hardware
Use a PC (not Mac, see [mla/12](/mlg/mla-12)). Desktop if you're mostly stationary, as you'll get the best performance bang-for-buck and improved longevity; laptop if you're mostly mobile.

Desktops. Build your own PC, better value than pre-built. See [PC Part Picker](https://pcpartpicker.com/), make sure to use an Nvidia graphics card. Generally shoot for 2nd-best of CPUs/GPUs. Eg, RTX 3070 currently (2020-01); better value-to-price than 3080+.   

For laptops, I like the MSI Stealth series. Buy from a reseller like [Gentech](https://www.gentechpc.com/), Xotic, HIDevolution (I prefer Gentech) - not Amazon / Newegg. This because only resellers offer thermal pasting, and that is a _must_ have for performance & longevity. Make sure to get GPU & CPU thermal pasting at checkout, I used Conductonaut on my last purchase - do your research.

### OS / Software

Use Windows (dev channel), WSL2, and Docker + nvidia-docker. See [mla/12](/mlg/mla-12) for details.

### Programming Tech Stack
Deep-learning frameworks. You'll use both TF & PT eventually, so don't get hung up. [mlg/9](/mlg/9) for details.
1. Tensorflow (and/or Keras)
1. PyTorch (and/or Lightning)

Shallow-learning / utilities: ScikitLearn, Pandas, Numpy

Cloud-hosting: AWS / GCP / Azure. [mla/13](/mlg/mla-13) for details.
`
}