const Player = ({ imdb }) => {
  return (
    <div className="aspect-video mx-auto mt-8 max-w-4xl p-4 rounded-lg shadow-lg overflow-hidden border border-gray-200 bg-white transform transition-transform duration-300 ease-in-out hover:scale-101">
      <iframe
        src={`https://vidsrc.me/embed/movie?imdb=${imdb}`}
        className="w-full h-full rounded-lg shadow-xl"
        referrerPolicy="origin"
        allowFullScreen
        onError={() => setIframeError(true)} // Gérer l'erreur de l'iframe
      ></iframe>
    </div>
  );
};

export default Player;
