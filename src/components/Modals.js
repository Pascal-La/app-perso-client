export const TransparentModal = ({ children, onClick }) => {
  return (
    <div
      className="flex items-center justify-center text-white w-full
      h-screen absolute"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const InfoModal = ({ onClick, message }) => {
  return (
    <TransparentModal onClick={onClick}>
      <div
        className="flex items-center justify-center font-bold
      text-2xl m-3 w-full md:w-8/12 lg:w-6/12 h-2/5 bg-gradient-to-br
      from-sky-600/90 to-purple-600 rounded-md shadow-lg"
      >
        <h1>{message}</h1>
      </div>
    </TransparentModal>
  );
};
