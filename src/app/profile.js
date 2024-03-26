import { useState } from "react";
import Image from "next/image";

export default function Profile() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    profilePictureUrl: "/profilepic.jpeg", // Assurez-vous d'avoir une image dans le dossier public
  });

  // Gestion de l'état d'édition
  const [isEditing, setIsEditing] = useState(false);

  // Gestion des changements dans les inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Validation du formulaire
  const validateForm = () => {
    const { name, email } = user;
    if (!name.trim() || !email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      alert("Veuillez remplir correctement tous les champs.");
      return false;
    }
    return true;
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsEditing(false); // Cache le formulaire d'édition après la soumission
  };

  return (
    <div className="max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto p-16 border border-gray-300 rounded-lg shadow-md bg-white">
      <div className="flex flex-col items-center">
        <div
          className="rounded-full overflow-hidden z-2"
          style={{ width: "200px", height: "200px" }}
        >
          <Image
            src={user.profilePictureUrl}
            alt="Profile"
            width={200}
            height={200}
            layout="responsive"
            objectFit="cover"
          />
        </div>

        {isEditing ? (
          <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
            <input
              className="block w-full px-4 py-2 border rounded text-base sm:text-lg lg:text-xl"
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Name"
            />

            <input
              className="block w-full px-4 py-2 border rounded"
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <textarea
              className="block w-full lg:w-96 px-4 py-2 border rounded h-56 text-justify"
              name="bio"
              value={user.bio}
              onChange={handleChange}
              rows="3"
              placeholder="Bio"
            ></textarea>

            <button
              type="submit"
              className="block w-full lg:w-96 lg:h-18 mt-20 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </form>
        ) : (
          <>
            <h1 className="mt-4 text-xl font-semibold">{user.name}</h1>
            <p className="text-gray-600 p-4">{user.email}</p>
            <p className="text-gray-800 mt-5 pr-16 pl-16">{user.bio}</p>
            <button
              className="block w-full lg:w-96 lg:h-18 mt-20 px-4 py-2 bg-blue-500 text-white rounded p-16"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
}
