import resources from "../resources";

export default {
  title: 'Convolutional Neural Networks',
  episode: 25,
  date: "2017-10-30",
  guid: "91bf8a0266bc22088c897eb756cc97d3",
  file: {},
  libsynEpisode: 5890712,
  teaser: 'Convnets or CNNs. Filters, feature maps, window/stride/padding, max-pooling.',
  body: `## Resources
- ${resources.courses.cs231n}
- ${resources.books.handson_tensorflow}
- The usual DL resources (pick one):
  - ${resources.books.dl_book}
  - ${resources.courses.fastai}
  
## Episode

- One-time donations w/ BTC / PayPal
- Image recognition, classification - computer vision
  - ML takeover
  - Final main network (MLP, RNN, CNN)
- Don't use MLP for images, use CNNs
- Filters -> feature maps -> convolutional layers
- Window, stride, padding
- Max-pooling
- Architectures (ILSVRC ImageNet Challenge)
  - LeNet-5
  - AlexNet
  - GoogLeNet
  - Inception
  - Resnet
  - etc..`
}