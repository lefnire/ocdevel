export default {
  title: 'Cartesian Similarity Metrics',
  episode: 32,
  // mergeEpisode:
  created: "2020-11-07",
  guid: "7f335339-1e45-4ab1-99de-20a9bda41fca",
  file: {},
  libsynEpisode: 16722518,
  teaser: 'L1/L2 norm, Manhattan, Euclidean, cosine distances, dot product',
  body: `
Normed distances [link](https://medium.com/@kunal_gohrani/different-types-of-distance-metrics-used-in-machine-learning-e9928c5e26c7)

*   A norm is a function that assigns a strictly positive length to each vector in a vector space. [link](https://towardsdatascience.com/how-to-measure-distances-in-machine-learning-13a396aa34ce)
*   Minkowski is generalized. \`p_root(sum(xi-yi)^p)\`. "p" = ? (1, 2, ..) for below.
*   L1: Manhattan/city-block/taxicab. \`abs(x2-x1)+abs(y2-y1)\`. Grid-like distance (triangle legs). Preferred for high-dim space.
*   L2: Euclidean. \`sqrt((x2-x1)^2+(y2-y1)^2\`. \`sqrt(dot-product)\`. Straight-line distance; min distance (Pythagorean triangle edge)
*   Others: Mahalanobis, Chebyshev (p=inf), etc

Dot product

*   A type of inner product.  
    Outer-product: lies outside the involved planes. Inner-product: dot product lies inside the planes/axes involved [link](https://www.quora.com/Whats-the-difference-between-inner-product-dot-product-and-scalar-product/answer/Urgunoon-Saleem). Dot product: inner product on a finite dimensional Euclidean space [link](https://www.quora.com/Whats-the-difference-between-inner-product-dot-product-and-scalar-product/answer/Richard-Morris-34)

Cosine (normalized dot)`,
  transcript: `
[00:00:00] Today, we're going to be talking about Cartesian similarity metrics or Cartesian distance metrics. The key words here you might have heard in working with machine learning are things like Euclidean distance, Manhattan, distance L1, and L2 norms, cosine distance and things like this. So we'll break these all down in this episode, but before we get into the details, I want to break down two words here.

[00:00:26] One word being Cartesian and the. Being the distinction between similarity and distance. So when I say Cartesian, I'm talking about the Cartesian coordinate system, Rene Descartes, Cartesian, the invention of points in space and how they relate to each other. So the Cartesian coordinates system is exactly what you'd expect.

[00:00:47] It's an X, Y axis plane, or it's an XYZ in three dimensions. And so on into infinity dimensions, it's space where vectors represent points in space like stars in a galaxy, and then you can compare vectors to each other based on their distance. So the sun is such and such distance to the earth and the moon is such and such distance to the earth.

[00:01:11] And the moon is such and such distance to the sun. Similarly in vector space, you can compare the distance from one vector to another. And that's what we're going to be talking about in this episode. And the reason I'm making this distinction, the reason I'm saying Cartesian is because it isn't always the case that the vectors we are working with in machine learning, represent points in space.

[00:01:32] We are almost always going to be working with vectors in machine learning. Vectors are everywhere. Vectors or tensors vectors are everywhere in machine learning. The question is, what do they represent? Are they dots in space or do they represent something a little bit more complex? So for example, a vector may represent a probability distribution where each point in the vector is the distribution of some.

[00:01:58] That does not map to a point in space, a star in the sky that could be compared to another star in the sky in terms of light years or miles. So if you have vectors that represent probability distributions, which is very common in machine learning, you'll have a lot of scenarios where you're dealing with those types of vectors.

[00:02:15] You won't be comparing them in a distance metric in the Cartesian. That we're going to be discussing in this episode. And so I'll talk about these other types of distance and similarity metrics in another episode. Incidentally in this particular case of vectors representing probability distributions, you might use the KL-divergence metric or the Jensen Shannon metric to find the difference between probability distributions, KL-divergence or Jensen.

[00:02:49] Another type of vector you might have that can't really be compared using distance metrics in the Cartesian coordinate system would be a, like a binary vector, a one hot encoded vector, for example. So if I had a document, A and a document B and I wanted to know which words were present in both documents, I could represent all the possible words as a vector and for each word that is present in one document, it would be a one.

[00:03:21] And if that word is not present in the document, it would be a zero. So this is a binary vector, and it doesn't really represent coordinates in space. It's not Cartesian. It could be. Depending on the situation. And sometimes you will find that one hot encoded vectors like this, which don't conceptually map to Cartesian coordinate system in that way actually end up working just fine that way.

[00:03:43] And we can use things like the cosine similarity metric and whatnot, but more often than not in a case like that, where you're trying to find the similarity between one vector and another, where they're binary vectors representing the presence or non presence of some feature we would use what's called the Jaccard similarity that Jaccard similarity measures the intersection over the union, which basically means how many features do these two vectors have in common.

[00:04:10] So I won't be getting into all these various other types of similarity metrics. We're only going to be talking about Cartesian similarity metrics here, and we'll talk about other similarity metrics in a future. Cartesian metrics measure the similarity or distance between one vector and another in Cartesian space.

[00:04:28] And so that's the second word we want to break down similarity versus distance similarity versus distance. It's very simple. They're the inverse of each other. The distance. Is how far one point is from another. And the similarity is how close one point is from another. So they're the inverse of each other.

[00:04:47] If our metric always returns a number between zero and one, then the inverse is simply one minus the. So if the distance is 0.3, well, then the similarity is one minus 0.3 being 0.7, very simple, but these metrics don't always return a value between zero and one. And so it's not always so cut and dry how to flip the similarity to the distance or the distance to the similarity and different problems or scenarios in machine learning call for one or the other. And so you just want to know upfront what you need and what you're requesting. Do you need the distance or do you need the similarity? It's very simple. They're the inverse of each other, but you just need to know what you need so you can call the right function or mathematical equation. So Cartesian distance slash similarity metrics.

[00:05:42] Now I mentioned recently, we're going to be following along with the project, Gnothi, G N O T H I a journal that uses AI to provide resources and insights, and the main features in Gnothi that correspond with this episodes topics are going to be comparing your journal entries to books in order to provide book recommendations, as well as.

[00:06:03] Coming up with a distance between your entries as a metric to feed into a clustering algorithm, namely k-means or agglomerative clustering. So in a recent machine learning applied episode, I talked about how you can use the natural language processing tool, hugging face transformers, specifically UKPlabs, sentence-transformers to convert your documents.

[00:06:31] Journal entries in Gnothi into an embedded vector. So that we can compare vectors to each other in Cartesian space, and we would make those comparisons using metrics discussed in this episode specifically, we use cosine similarity and we will talk about that in a bit, but another option, one might consider is to use Euclidean similarity.

[00:06:56] And that might play in either in comparing document to document or in clustering documents using the K means clustering algorithm. So let's get started norms, normed distances, N O R M. A norm. Or a normed distance is nothing more than a, has to be positive value. The specifically in this case, we talk about L1 norm and L2 norm.

[00:07:22] It is the, has to be positive distance between two points in Cartesian space. Now, the reason for that is very obvious. If one point is bottom left and another point is top, right? And you want the distance between. Well, you don't want the one you choose to subtract from the other, the ordering there shouldn't matter.

[00:07:42] X minus Y should not give you a negative value where Y minus X gives you a positive value. So a normed distance between these two vectors is just. We'll say the absolute value of that. But as you'll see in a bit, the way we obtain a strictly positive value, isn't always just the absolute value function.

[00:08:02] So a normed distance is just the distance between two vectors and it has to be positive. So you'll see these words, L1 norm L2 norm and so on normed distances and the main normed distance function is called Minkowski Minkowski M I N K O W S K I you'll say, wait, what about Euclidean? What about cosine? I've never heard Minkowski. You'll see in a bit, hold tight Minkowski is the distance between one point to another in Cartesian space. And it is the blank root of the sum of one point minus the other to the blank. Okay. It's and that blank we call P so it's the P root. Of the sum of all the points minus the other points to the P.

[00:08:56] Now don't worry about the formula. I just thought I'd drop it in there because I kind of have to, but that P is the number in the norm. When we say L1 norm L1 norm and so on. So when we use the number one, It is the one root which is nothing of the sum of X minus Y to the one, which is nothing. And so it's literally xi minus Yi absolute value. And what do we call this? This is the L1 norm. We call this the Manhattan distance, the Manhattan distance, the Manhattan distance formula is the absolute value of X minus Y I very simple formula, absolute value X minus Y I, and we call this Manhattan distance. The L1 norm, which is also the same thing as.

[00:09:51] The Minkowski distance where P equals one and then the is the Euclidean distance. So we'll get to that in a bit, but I want to pause here and I want to point out something that really tripped me up in my early machine learning career. When I first got started, I thought we had five separate things.

[00:10:11] I thought we had the L1 norm, the L2 norm the Minkowski distance, the Manhattan distance and the Euclidean distance, I thought, oh my gosh, there's so many distance metrics out there. How do you know what to use when, and I'll talk about what to use when, but really, as you'll see in a bit here in this section that we're discussing, there's only two distances that you care about.

[00:10:33] The L1 norm and the L2 norm the Manhattan distance and the Euclidean distance, both of them are sort of implementations of the Minkowski distance. In other words, the Minkowski distance is the generalization of these two distances. The Minkowski distance is the concept. It's the formula where there's a variable P that P is the number you plug into the L-blank. L1, L2, 

[00:11:02] and then you have your specific distance function. Okay. So it's actually quite simple. There's not as many distance functions out there in Cartesian space, as you may have thought there were there's the Minkowski distance. You know, hard stop. That's all there is really, and you plug in a value for P and we call that some norm, an L1 norm or an L2 norm.

[00:11:25] The L1 norm we call the Manhattan distance. And the L2 norm we call the Euclidean distance. Okay. L1 norm Manhattan distance. Another word for this is called city block or taxi cab distance. Like I said, it's simply the absolute value of one point minus another point. And what that looks like.

[00:11:46] If you were to visualize it is you go, you know, you go right, and then you go up that's your distance is right. Plus up it's visualized on a grid system. And the distance is one leg of a triangle. Plus the other leg of a triangle. We're talking about 2D space here. Of course, 3d it's different 4D and so on.

[00:12:06] The distance is visualized on a grid system where you add up the distances of each feature minus the other feature. And it looks like you're making these turns in a city. That's why it's called city block or Manhattan, you know, Manhattan, the city they're going north on this street. Then you go east on this street, add those distances up.

[00:12:25] That's the Manhattan distance. So that's the L1 norm slash Manhattan distance. They are synonyms for each other, the L2 norm slash Euclidean distance. It starts off looking the same way, where you go, right? And then you go up, but the actual distance is what we call. The shortest distance between the two points or vectors it's you were to connect the dots.

[00:12:47] You, you went right, and then you went up. Now you draw a line sort of connecting that triangle, finishing the triangle. It's the hypotenuse of the Pythagorean theorem. And it's just the shortest distance between two points. And if you remember the Pythagorean theorem, it's a squared plus B squared equals C squared.

[00:13:05] So what we're dealing with here in two dimensions is X2 minus X1 squared, plus Y2 minus Y1 squared, and then the square root of all of that. Now remember the Minkowski distance. The generalization is the P root. Of the sum of X minus Y I to the P well P here is two. That's why it's called the L2 norm.

[00:13:27] So it's the two root, the square root of X minus Y I to the two squared. And that is the Euclidean distance. It is the shortest path from one dot to the other, a direct route. You don't have to walk down city blocks as you do in the Manhattan distance slash L1 norm, you don't go. And then up, you go directly from point a to point B as the Eagle flies.

[00:13:53] It's a straight line from 0.1 to 0.2. Now, why do we care? Why don't we just use one always and not the other. It's a little bit complicated and I won't get into it too much here. As far as I understand just the S the simplest statement I can make. Due to my limited understanding of the difference between the two distances is that the Euclidean distance is generally preferred, generally prefer.

[00:14:16] I mean, it kind of makes sense. Conceptually, you should always try to compare two points as the Eagle flies. If you're trying to find how far apart they are in space, generally preferred. If you're comparing two points. But in high dimensional space, large vectors, high dimension vectors. The Manhattan distance is preferred.

[00:14:38] If you are working with some machine learning algorithm where you want to know the distance between two points and you're working with high dimensional space, then you might consider, instead of using the L2 norm slash Euclidean distance using the . Slash Manhattan distance it's computationally better because evidently the absolute value of two points minus each other is simpler to compute than the square root of those things squared.

[00:15:07] And that's very obvious, but what wasn't obvious to me is that there are also. Accuracy performance gains in high dimensions under certain algorithmic circumstances when using the Manhattan distance over the Euclidean distance. So Euclidean distance generally when comparing two points works out better most of the time, but if you end up having high dimensions consider using the Manhattan distance.

[00:15:33] Now I want to introduce two new metric words into the mix, but you'll find they're pretty much the same thing as the L1 and L2 norms. Manhattan slash Euclidean distance. And you'll find throughout this episode, it turns out those really are the two only things when it comes to Cartesian distance metrics, most things as you'll see, end up being some version of these or some generalization on these or some spin.

[00:16:00] So the two new words I want to introduce, which I'm sure you've seen before. Mean squared error and mean absolute error. These you will be using as your error metrics in training a machine learning. Specifically a regression machine learning model. So for example, if you were to be training a logistic regression model or a neural network, that's trying to predict a numeric value, then the loss function of that model.

[00:16:32] That will be used in training the model in order to reduce the loss, to minimize the loss, minimize the cost in the training process, the loss function. If you use the mean squared error, that's going to be the sum euclidean distances from the predicted output to the actual output. And it's in the word mean squared error, squared squared, meaning L2 norm.

[00:17:05] So when you have a model that uses as its loss function the mean squared error in order to minimize the distance between predicted numeric output and the actual labels, the actual numbers. The error is going to be represented as the Euclidean distance between the prediction and the label. Okay. So it's the L2 norm between one point and another.

[00:17:33] And if you use as your loss function, the mean absolute error, then it will be using the L1 norm the Manhattan distance, and it's in the. Absolute of the phrase, mean absolute error for every prediction, take the actual numeric value, the label prediction minus label, absolute sum those up and then take the mean, so mean absolute error is related to or uses.

[00:18:04] The L1 norm slash Manhattan distance and mean squared error is related to or uses the L2 norm slash Euclidean distance. And similarly, we talked about why you might use the Manhattan distance over the Euclidean distance. Well, why you might use the mean absolute error over the mean squared error?

[00:18:28] Well, it depends on different circumstances. I won't go too deep into it here, but one common recommendation. I see. When people recommend one loss function over the other will be with respect to outliers. I could be wrong if I recall correctly. It's the mean absolute error. That respects outliers more is more okay with there being outliers than the mean squared error, which squares the loss of , you know, of a point being way out in space, AKA an outlier, it squares, the loss, and therefore the loss is amplified. Well, if you want to be okay with some outliers, you might use the mean absolute error instead, and there are other reasons to use one versus the other. So, so the L1 slash L2 norm have different benefits under different circumstances and the mean absolute error and mean squared error.

[00:19:23] Similarly have their own benefits under different circumstances. But all else being equal, they're quite similar in nature in concept. And in result, honestly, if you were to train a regression model using mean-squared squared error versus mean absolute error as your loss function, you might find that the result, the performance of the model, won't be that different in one scenario to the other.

[00:19:48] so you'll want to play with both those loss functions to see what works best for your. And finally, I want to mention just two more normed distance metrics. One is called the Mahalanobis metric. I don't know anything about it, so I'm just going to completely go past it. Mahalanobis and the other is called the,Chebyshev, the Chevyshev distance.

[00:20:11] And that is the, Minkowski distance. Right? Remember Minkowski is the umbrella term for all these normed, distances, where P equals something? Well, P equals infinity. Is called the Chevyshev distance, the L infinity norm Chebyshev. And, I don't know, I haven't seen this in use in machine learning personally.

[00:20:32] I don't know when or why you'd use this, so, I won't get into it. So that's the essence, the essence of Cartesian distance metrics the generalized umbrella formula is called the Minkowski distance. It is what we call a normed distance in L. Distance function and that something is P in the Minkowski formula.

[00:20:55] That P if it's one L1 we call it the L1 norm or the Manhattan slash city block distance. If that P is two the L2 norm, we call it the Euclidean. And so the next two things I'm going to discuss the dot product and the cosine similarity relate to these distance metrics very strongly. And that's why I keep trying to drive home that effectively, all there is, is Minkowski when you're talking about Cartesian and it's not as complicated as you think there are not that many Cartesian metrics out there.

[00:21:27] there are slight variations of each other and they have different benefits under different circumstances. So let's talk about the dot product. The dot product is probably the first thing you learn in linear algebra and the dot product is an arrow pointing from one point in vector space to another point in vector space.

[00:21:47] It sounds an awful lot like the Euclidean distance, doesn't it? Indeed. It does. Indeed. The Euclidean distance is the square root of the dot product. That's it. Euclidean distance is the square root of the dot product. So you might see people use literally the Euclidean function in their code versus the dot product function.

[00:22:12] Why would you use one versus the other? They're pretty much the same thing or at least there are versions of the same concept. And the answer is just that the dot product is just more mathematical it's more linear algebraic. And so you will see dot products used all over inside of neural networks, for example, or a dot product will be used, you know, effectively as the formula of the, of the linear regression.

[00:22:37] So each neuron in a neural network will be, or at least contain a dot product. And so a dot product lends itself better to computation. when you're running your math on a GPU and it also lends itself better sort of under certain theoretical circumstances. So let's just put it this way. If your purpose is to compare the distance between two points.

[00:23:01] If your goal in your code and your application is specifically to compare the distance between two points, then you would use a distance function. Namely the Euclidean distance. As you will find in the loss function, that is the mean squared error. The purpose of that function is to compare the distance of the predictions to the actual values.

[00:23:24] But if your purpose isn't specifically in comparing distances between vectors instead, you're just working with vectors mathematically. Then you're more likely to be using the dot product, but effectively. Versions of the same concept. And if it's important for you to have high computational performance, you'll use the dot product.

[00:23:44] It's linear algebraic and it converts down to GPU quite effectively, but they are variations of the same. Euclidean distance, L2 norm and the dot product. Yeah. And so I'm pointing this out. Like I said, I didn't know that the L2 norm Euclidean distance was effectively the dot product. When I got started, I thought they were two totally different concepts.

[00:24:07] Having nothing to do with each other. They aren't exactly the same thing. That's not true, but they're very strongly related. And another word that I thought was a totally different concept from the dot product. And maybe I learned this in linear algebra and totally forgot it was the inner product. The inner product is a generalization, just like the Minkowski formula is a conceptual umbrella term in a generalization.

[00:24:29] The inner product is a conceptual term, a umbrella term. One product of which is the dot product. The quote I found online is that, outer products lie outside of the involved planes in the Cartesian coordinate system we're discussing and inner products result in values that lie inside the planes inside the.

[00:24:52] And that the dot product specifically now inside the concept called inner product, the umbrella term of inner product inside that we have the dot product, the dot product is a product in which the product is on an, on a finite dimensional Euclidean space. Of the possible inner product methods. The dot product is one that results on a finite dimensional Euclidean space.

[00:25:18] Honestly. I'm about as confused as you are, your guess is as good as mine suffice it to say I'm pretty sure dot. One of, if not the only product within the inner product space that is used in machine learning for our purposes, the only product you'll ever care about as far as I'm concerned is the dot product and the inner product is not something different.

[00:25:38] It's a generalization of the dot. Okay. So a step back, we have the Minkowski distance. It's got a variable P if P is one, you got the L1 norm slash Manhattan. If P is two, you got the L2 norm slash Euclidean. The dot product is very similar to the Euclidean distance. It has its pros and cons under different circumstances.

[00:25:58] You're mostly going to be working with a dot product in your formulas in your machine learning algorithms, sending something to a GPU, you're mostly going to be using Euclidean distance. When you want to compare the distance between two points in vector space. And finally, we have the cosine similarity metric cosine similarity or cosine distance.

[00:26:18] The cosine similarity from one point to another is the angular distance between those two points. And that's totally different than any of the others we've discussed. So far, the L1 norm Manhattan distances go right. Go up. And you're effectively forming a triangle. The distance is the length of those triangle lakes.

[00:26:41] The L2 norm. Is the hypotenuse of that triangle, the, as the Eagle flies distance from point a to point B. And so in both of those cases, we're sort of working with a triangle here. Well, the cosine distance is if you look at point a and you project a line and then you shift that line clockwise until it reaches point B.

[00:27:04] So it's like a clock, a hand on a clock, the angular distance. Is sort of the circular distance between those two points and that is called the cosine distance. And the cosine distance turns out to be one of the most important distances in Cartesian space. And indeed it's pretty much the only distance metric that I'm using in.

[00:27:29] And here's, what's so special about cosine this is an example that you'll often see in tutorials, what is the cosine similarity metric? Again, back to the example, we have two documents and we're simply counting the number of words or the presence of words in those documents. Now, if we were just counting the presence of words in those documents, using a binary vector ones and zeros one, if a word is present and zero, if it's not the ideal metric would be.

[00:27:57] The Jaccard metric, the Jaccard metric measures the intersection over the union. AKA, how many words do these two documents have in common? And we're not talking about that type of metric. In this episode, we're talking about distance metrics and what. Sometimes see people do is actually treat that binary vector as if it meant something in Cartesian space, that it actually were a point in space.

[00:28:24] And that, that means something. And sometimes that works out just fine. It actually works in practice. And so you could compare two vectors this way, maybe using Euclidean distance, for example, but if you were to use a count vectorizer a count vectorizer counts the number of some word present in a document or a.

[00:28:46] IDF vectorizer which is usually preferred in natural language processing for counting the presence of words and documents. What a TF IDF vectorizer does is it's called term frequency, inverse document frequency. It's basically like counting the number of a word in a document. So if you were to use a count vectorizer the number the T H E might appear 20 times in some document.

[00:29:12] The entry for that point in the vector for that feature in the vector would be 20 in a count vectorizer if you use a TF IDF vectorizer its count is weighted by the rareness, the special-ness of a word across all documents. So it's better for up waiting rarer words in documents and down waiting common words.

[00:29:38] The T H E in documents, where now that entry at that feature in the vector might be a value that would represent the word the as value lists compared to the other values in the vector. Anyway, a TF IDF we vectorize a document into a bunch of numbers and those numbers in one way or another represent the count of words in that document.

[00:30:03] Now you have a TF IDF vector. Representing one document a and a TF IDF vector representing another document B. And you want to compare how similar they are to each other in Cartesian space. Like I said, it might not be the best application of vectors of this sort to Cartesian space. It doesn't quite make sense that they would be a dot in space, but it works.

[00:30:29] So this is commonly done. This is done all the time. TF IDF. In Cartesian space and you want to compare how similar one document is to another well, if you were to use the Euclidean distance or the dot product between two documents and you were to find that they have a lot of specific words in common, like politics, Elections today is November 7th uh Joe Biden just got elected it's obviously on my mind, if you were to compare two documents that have a lot of words in common than they should, what we call have semantic similarity.

[00:31:08] But if one document ends up having 10 times the word politics as another document, then the result gets skewed. It actually changes. It shifts the point in space, even though the words, the overlap of words. Is the same, even though these two documents are still talking about the same things, they still have a lot of words in common, the amount of any one word or another will actually move the document around in space.

[00:31:41] If we increase the number of. Politics, we go this way. And if we decrease the number of the word elections, we go that way. And so it turns out for this type of application and generally across the board in natural language processing, we find that it is generally the case in comparing documents to documents words towards in NLP.

[00:32:04] It is generally. I have found that Euclidean distance is not quite as effective as cosineed distance. And so what cosine distance does is it doesn't consider the magnitude of specific features in the distance between two documents or two points in space. So the magnitude is the length of the vector pointing from one point to another.

[00:32:29] When we have the dot product, a dot product is a combination of it's direction. And it's magnitude. So its direction is where are we pointing in vector space. If we have a telescope and we're pointing the telescope into the night sky, we're looking for a star, the direction or angle that that telescope is pointed is going to be the direction component of the dot product.

[00:32:51] And then how far into space is that star? How many light years or miles that will be the magnitude well, when we increase or decrease the amount of certain words in documents, turns out the magnitude is what changes, not the direction, not the angle of the telescope. And so what the cosine similarity does is it is the dot.

[00:33:14] Minus the magnitude is the dot product without the magnitude. That's what the cosine similarity is, is the angular distance between two vectors. And it is very often the case, especially in natural language processing that we do not care about the magnitude of the distance between. Two points. We only care about the angle.

[00:33:36] And I like to think of this as the vibe. I often see cosine distances used in and out of natural language processing. And my impression is I like to use the word vibe that the cosine distance is that. They're similar in essence, that they're similar in vibe and that the Euclidean distance is that they are literally similar, that they're actually similar.

[00:33:57] So are two points in space, literally similar than we will use the Euclidean distance and are two points in space vibing together, then we will use the cosine distance. So the cosine distance does away with magnitude. It does away with the amount of any one feature in your vector and. As with everything in this episode, it all really just boils down to, you know, the L1 norm Manhattan or the L2 norm Euclid in, we can get the cosine distance from the dot product, which is related to the Euclidean distance by normalizing.

[00:34:37] Normalizing your vectors before applying the dot product. So the cosine between two vectors. I mean, it's actually a mathematical function is the cosine function of two vectors, but you can approximate using the cosine function by first normalizing vector. And vector B and then applying the dot product.

[00:35:03] And as we said, with the dot product, the dot product used everywhere in machine learning and it's linear algebraic and its implementation of vectorized computation and parallelization on CPU and GPU is just is first class. And so very often what you'll actually see instead of literally the cosine function or metric being used to compare two points.

[00:35:26] It's often the case that you won't. Math dot cosine in Python. You'll end up seeing the code author instead, normalizing their points in advance and then applying the dot product. And that is an approximation of the cosine distance. Very good. So, we covered a lot and we ended on dot products and cosine distances.

[00:35:49] So now the two metrics I end up seeing the most personally are the Euclidean distance and the cosine distance. Everywhere Euclidean and cosine, so those are the two I recommend you become most acquainted with. And especially in NLP, cosine dominates in my experience. cosines all over the place. We don't care about the magnitude as much in the case of comparing word vectors or document vectors, we care more about their angular distance to.

[00:36:19] And so what I am doing in is you have your journal entries. They get embedded to vectors using UKPlab sentence transformers, go see the machine learning applied episode on natural language processing tools. If you want to know more about that. And then I do the same for books from a book database based on their descriptions, their blurbs.

[00:36:39] And then now we have two vectors, A and B I use the cosine. Between your entry and a book. And then I find the most similar books to your entries and I take the top 30, and those will be your book recommendations. And Gnothi additionally, there's a step in between if you have a hundred entries, 200 entries.

[00:37:00] Well, I'm trying to find the most similar book. To every single entry that ends up creating a lot of noise. Let's say you end up journaling mostly on a day-to-day basis about family life and relationship stuff and emotions, but it just so happens to be November 7th. So today you journal politics. Now, if that entry matches more closely, a handful of books on politics than any one of your other entries match their own book.

[00:37:34] Then that one politics book will come through stronger than the others. So what do I do first? First, I cluster your entries. I cluster your entries. First. If you have a hundred entries, if you have 200 entries, let's turn this into four, four cluster. Centroids I'm going to talk about in the next machine learning applied.

[00:37:59] Practical clustering tools, namely k-means agglomerative clustering, HDB scan, and all these things for cluster centroids now represent sort of the essence of what you talk about mostly. How do I come up with these cluster? Centroids well, one thing I could do is use K means. K-means to cluster all your entries together.

[00:38:27] It turns out k-means is not a great clustering tool for document embeddings, specifically using the sentence transformers package. Your document embeddings are 768. Dimension vectors. And as I mentioned about L2 norm slash Euclidean distance, high dimensions perform poorly when we're using Euclidean distances between two points and K means is very strongly related to the Euclidean distance of points.

[00:39:02] In essence, that uses Euclidean distance as part of its algorithm. So that L2 norm doesn't fly. In clustering your documents. So what could we do? Well, we could find some algorithm that maybe is, or isn't K means that supports the Manhattan distance. As we said, L1 slash Manhattan distance function, it performs better in high dimensional space, but we also mentioned that it turns out that most NLP applications.

[00:39:34] Best with cosine similarity rather than the L1 or L2 norm reason being the magnitude of any one feature tends to be less important than the angular distance between two points in space. So what can we do to cluster a users journal entries that uses the cosine similarity function? It turns out there is a clustering concept called hierarchical clustering.

[00:40:01] One implementation of which is called agglomorative clustering. You can pass in a pre-computed list of distances in an array of distances, and it will use those distances to cluster your rows. And the distances that I pass in is a square matrix of cosine similarities. For every journal entry to every other journal entry, I will dive deep into everything that's happening here that I'm talking about right now in the next machine learning applied episode, which will be all about practical clustering using scikit-learn and other packages.

[00:40:41] I'll see you in the next.
`
}