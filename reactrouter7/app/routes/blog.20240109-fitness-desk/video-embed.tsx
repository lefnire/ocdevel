export const VideoEmbed = ({ videoId, title }: { videoId: string; title: string }) => (
  <div style={{
    position: 'relative',
    paddingBottom: '177.77%',
    height: 0,
    overflow: 'hidden'
  }}>
    <iframe
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }}
      src={`https://youtube.com/embed/${videoId}`}
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  </div>
);
