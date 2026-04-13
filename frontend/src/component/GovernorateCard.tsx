interface GovernorateCardProps {
  name: string;
  image: string;
  tripsCount: number;
  onClick: () => void;
}

export default function GovernorateCard({ name, image, tripsCount, onClick }: GovernorateCardProps) {
  const isDisabled = tripsCount === 0;
  return  (
    <div
      onClick={isDisabled ? undefined : onClick}
      className={
        `rounded-xl shadow-md overflow-hidden transition-all group ` +
        (isDisabled
          ? 'bg-gray-300 cursor-not-allowed opacity-60'
          : 'bg-white hover:shadow-xl cursor-pointer')
      }
      style={isDisabled ? { pointerEvents: 'none' } : {}}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className={
            'w-full h-full object-cover transition-transform duration-300 ' +
            (isDisabled ? 'grayscale' : 'group-hover:scale-110')
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>  
      <div className={isDisabled ? 'bg-gray-200 px-4 py-3 flex flex-col gap-1' : 'bg-white px-4 py-3 flex flex-col gap-1'}>
        <h3 className={isDisabled ? 'text-gray-500 font-semibold text-lg truncate' : 'text-gray-900 font-semibold text-lg truncate'}>{name}</h3>
        <span className={isDisabled ? 'text-gray-400 font-medium text-sm' : 'text-gray-600 font-medium text-sm'}>{tripsCount} Trips</span>
      </div>
    </div>
  );
}
