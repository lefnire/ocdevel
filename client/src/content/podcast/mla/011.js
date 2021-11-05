const ep = {
  title: 'Practical Clustering',
  episode: 11,
  mergeEpisode: 41,
  mla: true,
  created: "2020-11-07",
  guid: "d8a36847-c1f2-4d8f-adf8-da32d7d0a12d",
  libsynEpisode: 16725809,
  teaser: "Kmeans (sklearn vs FAISS), finding n_clusters via inertia/silhouette, Agglomorative, DBSCAN/HDBSCAN",
  body: `
Clustering via Kmeans, Agglomorative, or DBSCAN/HDBSCAN.

* Kmeans. [sklearn.cluster.KMeans](https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html), [Faiss.kmeans](https://github.com/facebookresearch/faiss/wiki/Faiss-building-blocks:-clustering,-PCA,-quantization). 
* Finding optimal number of clusters n_clusters. [kmeans.inertia_](https://scikit-learn.org/stable/modules/clustering.html#k-means) inside a loop, pass results to [kneed.KneeLocator](https://kneed.readthedocs.io/en/stable/) (Gnothi [sample code](https://github.com/lefnire/ml-tools/blob/master/ml_tools/similars.py)). Or [silhouette_score](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.silhouette_score.html)  (preferred).
* [Agglomorative clustering](https://scikit-learn.org/stable/modules/generated/sklearn.cluster.AgglomerativeClustering.html) with pre-computed cosine similarity square matrix (Gnothi [sample code](https://github.com/lefnire/ml-tools/blob/master/ml_tools/similars.py))
* [DBSCAN](https://scikit-learn.org/stable/modules/generated/sklearn.cluster.DBSCAN.html) / [HDBSCAN](https://hdbscan.readthedocs.io/en/latest/index.html) 
`
}
export default ep