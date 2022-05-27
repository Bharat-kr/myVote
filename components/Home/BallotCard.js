import { useEffect, useState } from "react";
import { useWeb3 } from "../../context/Web3Context";
import { getDetails } from "../../utils/ballot";
import Loader from "../Loader";

const BallotCard = ({ id }) => {
  const { web3 } = useWeb3();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const init = async () => {
      if (web3) {
        setLoading(true);
        let res = await getDetails(web3, id);
        setDetails(res);
        setLoading(false);
      }
    };
    init();
  }, [web3]);

  return (
    <div>
      <div className="max-w-md py-4 px-8 bg-white shadow-lg hover:shadow-md transition ease-in delay-50 rounded-lg my-12 mt-16">
        {loading && <div className="p-4"><Loader/></div>}
        {!loading && (
          <>
            <div className="flex justify-center md:justify-start -mt-16">
              <img
                className="w-20 h-20 object-cover rounded-full border-2 border-primary"
                src={details?.manager?.image}
              />
            </div>
            <div>
              <h2 className="text-gray-800 text-3xl font-semibold">
                {details?.name}
              </h2>
              <p className="mt-2 text-gray-600 line-clamp-3">{details?.description}</p>
            </div>
            <div className="flex justify-end mt-4">
              <a
                href={`/home/${id}`}
                className="text-xl font-medium text-primary"
              >
                View Details
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BallotCard;
