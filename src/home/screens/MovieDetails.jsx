import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../common/components/Footer";
import Navbar from "../../common/components/Navbar";
import useFetchImdb from "../../tmdb/hooks/useFetchImdb";
import useFetchMovieDetails from "../../tmdb/hooks/useFetchMovieDetails";
import Player from "../../vidsrc/components/Player"; // Votre composant Player
import useFetchTrailers from "../../kinocheck/hooks/useFetchTrailers";

const MovieDetails = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetchMovieDetails(id);
  const { data: imdbId } = useFetchImdb(id) || null;
  const {
    data: kinoData,
    loading: kinoLoading,
    error: kinoError,
  } = useFetchTrailers(imdbId?.imdbId); // Utilisation de useKinoCheck

  const [iframeError, setIframeError] = useState(false); // Ajouter un état pour gérer les erreurs d'iframe

  useEffect(() => {
    if (imdbId && imdbId.imdbId) {
      setIframeError(false);
    }
  }, [imdbId]);

  if (loading || kinoLoading) {
    return <div className="text-center mt-20">Chargement...</div>;
  }

  if (error || kinoError) {
    return (
      <div className="text-center mt-20 text-red-500">
        Erreur : {error ? error.message : kinoError.message}
      </div>
    );
  }
  console.log(kinoData);
  return (
    <>
      <Navbar />

      <div className="container mx-auto mt-4 p-4">
        {/* Grille avec l'affiche et le lecteur vidéo côte à côte */}
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2">
            {/* Player pour la vidéo */}
            {imdbId && imdbId.imdbId ? (
              <Player imdb={imdbId.imdbId} />
            ) : iframeError ? (
              <div className="text-center text-red-500 mt-8">
                Désolé, nous n'avons pas pu charger la vidéo pour ce film.
                Veuillez réessayer plus tard.
              </div>
            ) : (
              <div className="text-center text-gray-500 mt-8">
                Aucune vidéo disponible pour ce film.
              </div>
            )}
          </div>

          <div className="lg:w-1/2 lg:pl-8 mt-8 lg:mt-0">
            {/* Informations sur le film */}
            <div className="mb-4">
              <span className="inline-block bg-blue-200 text-blue-800 text-sm px-3 py-1 rounded-full mr-2">
                Genres: {data.genres.map((genre) => genre.name).join(", ")}
              </span>
            </div>
            <p className="text-lg mb-2">
              <strong>Date de sortie:</strong>{" "}
              <span className="text-gray-700">{data.releaseDate}</span>
            </p>
            <p className="text-lg flex items-center">
              <strong>Note:</strong>
              <span className="ml-2 bg-yellow-200 text-yellow-800 text-sm px-3 py-1 rounded-full">
                {data.rating} / 10 ★
              </span>
            </p>
            <p className="text-lg text-gray-800 mb-6">{data.description}</p>

            {/* Affichage du trailer YouTube si disponible */}
            {kinoData && kinoData.trailer ? (
              <div className="mt-6 flex justify-start">
                <div className="w-1/4">
                  <h2 className="text-ll font-semibold mb-2">
                    Bande Annonce :
                  </h2>
                  <a
                    href={`https://www.youtube.com/watch?v=${kinoData.trailer.youtube_video_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={kinoData.trailer.youtube_thumbnail}
                      alt={kinoData.title}
                      className="rounded-md shadow-md"
                    />
                  </a>
                </div>
              </div>
            ) : iframeError ? (
              <div className="text-center text-red-500 mt-8">
                Désolé, nous n'avons pas pu charger la vidéo pour ce film.
                Veuillez réessayer plus tard.
              </div>
            ) : (
              <div className="text-center text-gray-500 mt-8">
                Aucune vidéo disponible pour ce film.
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MovieDetails;
