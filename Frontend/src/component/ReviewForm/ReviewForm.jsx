// import { useState } from "react";

// export default function ReviewForm({ onSubmit }) {
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!rating || !comment) return;
//     onSubmit({ rating, comment });
//     setRating(0);
//     setComment("");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 border rounded mt-4">
//       <label>Rating:
//         <select value={rating} onChange={(e) => setRating(+e.target.value)} className="ml-2">
//           <option value="0">Select...</option>
//           {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Star</option>)}
//         </select>
//       </label>
//       <br />
//       <textarea className="w-full mt-2 p-2 border" placeholder="Write a review..." value={comment} onChange={(e) => setComment(e.target.value)} />
//       <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-1 rounded">Submit</button>
//     </form>
//   );
// }
