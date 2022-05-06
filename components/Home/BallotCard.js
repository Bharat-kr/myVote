const BallotCard = () => {
  return (
    <div>
      <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-12 mt-16">
        <div className="flex justify-center md:justify-start -mt-16">
          <img
            className="w-20 h-20 object-cover rounded-full border-2 border-primary"
            src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
          />
        </div>
        <div>
          <h2 className="text-gray-800 text-3xl font-semibold">
            Rajasthan Vidhan Sabha
          </h2>
          <p className="mt-2 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            dolores deserunt ea doloremque natus error, rerum quas odio quaerat
            nam ex commodi hic, suscipit in a veritatis pariatur minus
            consequuntur!
          </p>
        </div>
        <div className="flex justify-end mt-4">
          <a href="/home/sadad" className="text-xl font-medium text-primary">
            View Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default BallotCard;
