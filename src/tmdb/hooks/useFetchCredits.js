// import { useState, useEffect } from "react";

// const useFetchCredits = (id) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const API_KEY = "13371b82b1b98f36c09c58eb2ea8b75d";

//   useEffect(() => {
//     const fetchMovieDetails = async () => {
//       try {
//         const response = await fetch(
//           `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${API_KEY}`
//         );
//         const data = await response.json();

//         setData(data);
//         // console.log(JSON.stringify(data, null, 2));
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMovieDetails();
//   }, [id]);

//   return { data, loading, error };
// };

// export default useFetchCredits;
