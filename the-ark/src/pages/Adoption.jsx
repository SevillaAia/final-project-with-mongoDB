import React from "react";
import "../App.css";

const adoptionProfiles = [
  {
    id: 1,
    name: "Bella",
    type: "Dog",
    description:
      "A playful and loving dog rescued from the streets. Ready for a forever home!",
    image:
      "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Milo",
    type: "Cat",
    description:
      "Gentle and affectionate, Milo is looking for a family to love.",
    image:
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Luna",
    type: "Parrot",
    description: "Colorful and talkative, Luna was rescued from illegal trade.",
    image:
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=400&q=80",
  },
];

const wildlifeRescues = [
  {
    id: 1,
    name: "Philippine Eagle",
    type: "Wildlife",
    description:
      "Critically endangered, rescued from poachers. Needs ongoing care and support.",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Sea Turtle",
    type: "Wildlife",
    description:
      "Injured by fishing nets, now recovering at The Ark. Needs medical assistance.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
];

const Adoption = () => {
  return (
    <div className="adoption-page">
      <h1>Adoption & Wildlife Rescue</h1>
      <p>
        The Ark rescues and shelters wildlife, protecting them from poachers. We
        also have local shelters that care for rescued pets and help them find
        loving homes. Below are animals ready for adoption and wildlife needing
        your support.
      </p>
      <h2>House Pets for Adoption</h2>
      <div className="adoption-cards">
        {adoptionProfiles.map((pet) => (
          <div className="adoption-card" key={pet.id}>
            <img src={pet.image} alt={pet.name} className="adoption-img" />
            <h3>{pet.name}</h3>
            <p>{pet.description}</p>
            <button className="adopt-btn">Adopt</button>
          </div>
        ))}
      </div>
      <h2>Wildlife Rescues Needing Support</h2>
      <div className="adoption-cards">
        {wildlifeRescues.map((animal) => (
          <div className="adoption-card" key={animal.id}>
            <img
              src={animal.image}
              alt={animal.name}
              className="adoption-img"
            />
            <h3>{animal.name}</h3>
            <p>{animal.description}</p>
            <a href="/donate" className="support-btn">
              Support
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Adoption;
