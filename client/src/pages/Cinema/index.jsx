import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "video-react/dist/video-react.css";
import { apiGetCollection } from "@/services/collectionService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { pathImg } from "@/lib/constant";
import { useTranslation } from "react-i18next";
import { apiGetCategoryCollection } from "@/services/categoryCollectionService";

const Cinema = ({ currentData }) => {
  const [collections, setCollections] = useState([]);
  const [value, setValue] = useState(null)
  const [categoryCollection, setCategoryCollection] = useState([])
  const { t } = useTranslation("global");
  const getCollection = async () => {
    const data = await apiGetCollection();
    if (data.success) setCollections(data.collections);
  };
  const getCategoryCollection = async () => {
    const data = await apiGetCategoryCollection();
    if (data?.success) {
      setCategoryCollection(data?.getcategoryCollection);
      if (data?.getcategoryCollection?.length) {
        setValue(data?.getcategoryCollection[0]?.name);
      }
    }
  };
  useEffect(() => {
    getCollection();
    getCategoryCollection()
  }, []);
  return (
    <div className="w-full h-screen overflow-y-hidden">
      <Tabs value={value} onValueChange={setValue} className="w-full h-full overflow-y-hidden">
        <div className="w-full bg-profileColor pt-4 flex flex-col overflow-y-hidden">
          <h3 className="text-center text-xl text-white pb-4 max-sm:pb-0 max-sm:text-base">
          {t("cinema.cinemaTitle")}
          </h3>
          <TabsList className="w-full justify-start flex items-center max-sm:items-start gap-2 max-sm:gap-0 overflow-y-hidden tabs-list">
            {categoryCollection?.map((category) => (
               <TabsTrigger key={category?._id} className="relative text-base text-white data-[state=active]:text-white transition-all duration-300 ease-linear
               after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[4px] after:bg-white after:transition-all after:duration-300 after:ease-linear data-[state=active]:after:w-1/2 data-[state=active]:after:left-[25%] max-sm:text-[11px]" value={category?.name} onClick={() => setValue(category?.name)}>
                {category?.name}
              </TabsTrigger>
            ))}
           
           
          </TabsList>
        </div>
        {categoryCollection?.map((category) => (
          <TabsContent key={category?._id} value={category?.name}>
            <div className="grid grid-cols-2 px-3 py-1 gap-2 ">
              {category?.category?.map((collection) => (
                <div
                  key={collection?._id}
                  className="relative mb-4 h-[200px] max-sm:h-[120px]"
                >
                  <Link
                    to={`/video/${collection?.title.replace(/ /g, "_")}/${
                      collection?._id
                    }/${currentData?._id}`}
                  >
                    <img
                      src={`${pathImg}/images/${collection?.image}`}
                      className="w-full h-full rounded-xl object-cover"
                      alt={collection?.title}
                    />
                    <div className="absolute w-full px-4 text-white bg-[rgba(0,0,0,.4)] bottom-0 z-0 flex items-center justify-between">
                      <span className="max-sm:text-sm">{collection?.title}</span>
                      <span className="max-sm:text-sm">
                        {t("cinema.watch")}: {collection?.view?.length}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Cinema;
