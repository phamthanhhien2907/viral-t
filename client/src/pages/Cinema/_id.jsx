import Loader from "@/components/custom ui/Loader";
import { pathImg } from "@/lib/constant";
import {
  apiGetCollectionById,
  apiGetCollectionDifferentById,
  apiUpdateCollection,
} from "@/services/collectionService";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BigPlayButton, Player } from "video-react";
const DetailCinema = () => {
  const [played, setPlayed] = useState(false);
  const [collection, setCollection] = useState(null);
  const [differentCollection, setDifferentCollection] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id, title, userId } = useParams();
  const navigate = useNavigate();
  const getCollectionById = async (id) => {
    setLoading(true);
    const data = await apiGetCollectionById(id);
    if (data.success) {
      setCollection(data.collections);
      setLoading(false);
    }
  };
  const getCollectionDifferent = async (id) => {
    const data = await apiGetCollectionDifferentById(id);
    if (data.success) {
      setDifferentCollection(data.fillterCollection);
      setLoading(false);
    }
  };
  const updateCollection = async (id, userId) => {
    const data = await apiUpdateCollection(id, userId, { view: userId });
    console.log(data);
  };
  useEffect(() => {
    getCollectionById(id);
    getCollectionDifferent(id);
  }, [id, title]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="h-screen">
          <div className="relative max-sm:w-full mx-auto">
            <div className="sticky w-full top-0">
              <div className="w-full h-[50px] bg-profileColor">
                <ChevronLeft
                  onClick={() => {
                    localStorage.setItem("page", 0);
                    navigate("/");
                  }}
                  className="absolute top-2 z-30 left-4 text-white cursor-pointer"
                  size={30}
                />
                <span className=" text-xl text-white absolute top-2 left-[40%]">
                  {collection?.title}
                </span>
              </div>

              <div onClick={() => updateCollection(id, userId)}>
                <Player
                  // poster={`http://localhost:8080/images/${collection?.image}`}
                  poster={`${pathImg}/images/${collection?.image}`}
                  muted
                  // src={`http://localhost:8080/images/${collection?.video}`}
                  src={`${pathImg}/images/${collection?.video}`}
                >
                  <BigPlayButton position="center" />
                </Player>
              </div>
            </div>
            <div className="bg-gray-100">
              <div className="w-full h-[90px] flex flex-col gap-4 bg-whie py-2 px-4 bg-white">
                <span className="text-black text-xl">{collection?.title}</span>
                <span className="text-gray-500 text-sm">
                  {collection?.view?.length || 0} Lượt xem
                </span>
              </div>
              <div className="w-full h-5 px-4 my-4">
                <span className="font-semibold">Đề xuất</span>
              </div>
              <div className="flex flex-col gap-4 px-2 pb-4">
                {differentCollection &&
                  differentCollection?.map((result) => (
                    <Link
                      key={result?._id}
                      to={`/video/${result?.title.replace(/ /g, "_")}/${
                        result?._id
                      }/${userId}`}
                    >
                      <div className="w-full h-[114px] bg-white flex gap-4 rounded-2xl">
                        <img
                          className="w-[114px] h-full rounded-l-2xl"
                          // src={`http://localhost:8080/images/${result?.image}`}
                          src={`${pathImg}/images/${result?.image}`}
                          alt={result?.title}
                        />
                        <div className="flex flex-col gap-12 py-4">
                          <span className="text-xs">{result?.title}</span>
                          <span className="text-xs font-semibold text-gray-500">
                            {result?.view?.length} Lượt xem
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailCinema;
