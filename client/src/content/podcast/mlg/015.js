export default {
  title: "Performance",
  episode: 15,
  created: "2017-05-07",
  guid: "7da253aa-b035-4702-8475-55b8d3eeeebd",
  file: {
    url: "http://ocdevel.com/files/podcasts/machine-learning/ml-15.mp3",
    length: 37982381 ,
    duration: "41:24"
  },
  libsynEpisode: 5440743,
  teaser: "Performance evaluation & improvement",
  body: `
Performance evaluation

- Performance measures: accuracy, precision, recall, F1/F2 score
- Cross validation: split your data into train, validation, test sets
- Training set is for training your algorithm
- Validation set is to test your algorithm's performance. It can be used to inform changing your model (ie, hyperparameters)
- Test set is used for your final score. It can't be used to inform changing your model.

Performance improvement
 
- Modify hyperpamaraters
- Data: collect more, fill in missing cells, normalize fields
- Regularize: reduce overfitting (high variance) and underfitting (high bias)
`}