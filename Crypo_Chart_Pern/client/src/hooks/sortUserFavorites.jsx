// import { useEffect, useState } from 'react';
// import { getFavorites } from '../api/cryptoAPI';

// function sortUserFavorites(userCoinFavorites) {
//   const [response, setResponse] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const insertUserFavorites = async () => {
//         const { data } = await getFavorites();
//         const userFavorites = data.favorites;
//         // Check if user has favorites, then return if not
//         if (userFavorites.length === 0) {
//           return;
//         }

//         userFavorites.forEach((coin) => {
//           userCoinFavorites[coin.coin] = coin.is_favorite;
//         });
//       };

//       setResponse
//     } catch (error) {
//       setError(error);
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return { response, loading, error };
// }

// export default sortUserFavorites;
