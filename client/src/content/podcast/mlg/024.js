import resources from "../resources";

export default {
  title: 'Tech Stack',
  episode: 24,
  date: "2017-10-06",
  guid: "11e604992dcd4f124cb4d3897c81056f",
  file: {},
  libsynEpisode: 5816352,
  teaser: 'TensorFlow, Pandas, Numpy, Scikit-Learn, Keras, TensorForce.',
  body: `## Resources
- ${resources.books.handson_tensorflow}
- The usual DL resources (pick one):
  - ${resources.books.dl_book}
  - ${resources.courses.fastai}
  
## Custom PC Build

Temporarily removed since the [Titan V](https://www.nvidia.com/en-us/titan/titan-v/) was released, which succeeds my prior 1080ti build recommend. Keep an eye on https://pcpartpicker.com/builds/ for builds with that card (currently none).

## Episode

- [Looking for work](https://www.linkedin.com/in/lefnire/)
- Autodiff frameworks
  - TensorFlow
  - PyTorch (Theano dead!)
  - GPU: Nvidia + Ubuntu
  - AWS v GCP v Azure (see AWS spot instances)
- Pandas, Numpy, ScikitLearn, TensorFlow
- Celery (RabbitMQ)
- Higher
  - Keras
  - TensorForce`
}