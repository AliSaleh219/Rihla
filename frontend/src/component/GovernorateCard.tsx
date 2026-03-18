interface GovernorateCardProps {
  name: string;
  image: string;
  onClick: () => void;
}

export default function GovernorateCard({ name, image, onClick }: GovernorateCardProps) {
  return  (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <h3 className="absolute bottom-4 left-4 right-4 text-white font-semibold text-xl">
          {name}
        </h3>
      </div>
    </div>
  );
}
