import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../common/components/Footer";
import Navbar from "../../common/components/Navbar";
import useFetchImdb from "../../tmdb/hooks/useFetchImdb";
import useFetchMovieDetails from "../../tmdb/hooks/useFetchMovieDetails";
import Player from "../../vidsrc/components/Player";

const MovieDetails = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetchMovieDetails(id);
  const { data: imdbId } = useFetchImdb(id) || null;
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [iframeError, setIframeError] = useState(false); // Ajouter un état pour gérer les erreurs d'iframe

  useEffect(() => {
    // Réinitialiser les erreurs d'iframe si l'IMDB ID est valide
    if (imdbId && imdbId.imdbId) {
      setIframeError(false);
    }
  }, [imdbId]);

  if (loading) {
    return <div className="text-center mt-20">Chargement...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500">
        Erreur : {error.message}
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container mx-auto mt-4 p-4">
        {/* Grille avec l'affiche et le lecteur vidéo côte à côte */}

        <div className="">
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
        <div className="mb-4 mt-8">
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
      </div>

      {/* Informations supplémentaires sous le player */}

      <Footer />
    </>
  );
};

export default MovieDetails;
