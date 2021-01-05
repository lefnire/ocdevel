export default {
  title: 'Cartesian Similarity Metrics',
  episode: 32,
  date: "2020-11-07",
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

Cosine (normalized dot)`
}