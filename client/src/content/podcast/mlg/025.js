import resources from "../resources";

export default {
  title: 'Convolutional Neural Networks',
  episode: 25,
  created: "2017-10-30",
  guid: "91bf8a0266bc22088c897eb756cc97d3",
  file: {},
  libsynEpisode: 5890712,
  resources: [
    resources.cs231n,
  ],
  teaser: 'Convnets or CNNs. Filters, feature maps, window/stride/padding, max-pooling.',
  body: `
See resources on [Deep Learning episode](/mlg/9).

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