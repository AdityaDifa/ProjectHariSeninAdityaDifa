import DBListClass from "../../services/fakeListClass.json";
import dummyClassPicture from "../../images/background-images/dummyClassPicture.jpg";
import { useEffect, useState } from "react";
import fullStarIcon from "../../images/icons/star icon/star.png";
import halfStarIcon from "../../images/icons/star icon/half-star.png";
import blankStarIcon from "../../images/icons/star icon/no-star.png";

type TCard = {
  title: string;
  desc: string;
  mentorName: string;
  mentorJob: string;
  jobPlace: string;
  rating: number;
  voters: number;
  price: number;
  category?: string;
};
export default function ListClass({ category }: { category: any }) {
  const lists = DBListClass;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function Card({
    title,
    desc,
    mentorName,
    mentorJob,
    jobPlace,
    rating,
    voters,
    price,
  }: TCard) {
    function StarRating() {
      const fullStar = Math.floor(rating);
      const halfStar = rating - (rating - 0.5) == 0.5 ? 1 : 0;
      const blankStar = Math.floor(5 - rating);

      function ShowStarIcon({
        numberIcon,
        icon,
      }: {
        numberIcon: number;
        icon: any;
      }) {
        return (
          <>
            {Array.from({ length: numberIcon }, (_, index) => (
              <img
                src={icon}
                className="w-5 h-5"
                key={`${index}_${numberIcon}_${icon}`}
              />
            ))}
          </>
        );
      }
      return (
        <>
          <ShowStarIcon numberIcon={fullStar} icon={fullStarIcon} />
          <ShowStarIcon numberIcon={halfStar} icon={halfStarIcon} />
          <ShowStarIcon numberIcon={blankStar} icon={blankStarIcon} />
        </>
      );
    }

    return (
      <div className="h-full bg-white rounded-[10px] p-4 md:p-5 gap-2 md:gap-4 flex flex-col justify-between">
        <div className="flex gap-3 md:flex-col h-full">
          <div
            className={`relative w-[82px] h-[82px] md:w-full md:h-[193px] overflow-hidden rounded-[10px] shrink-0`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${dummyClassPicture})` }}
            ></div>
          </div>
          <div className={`flex gap-2 flex-col justify-center h-full`}>
            <h5 className="text-4 md:text-[18px] font-semibold">{title}</h5>
            {!isMobile && <p className="gray line-clamp-2 text-4">{desc}</p>}
            <div className="flex items-start gap-1">
              <img src="https://avatar.iran.liara.run/public" className="w-9" />
              <div>
                <h5 className="font-bold text-3 md:text-4">{mentorName}</h5>
                <p className="gray text-3 md:text-4">
                  {mentorJob} di{" "}
                  <span className="gray font-bold text-3 md:text-4">
                    {jobPlace}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-1">
            <div className="flex">{<StarRating />}</div>
            <p className="gray underline-offset-1">{`${rating} (${voters})`}</p>
          </div>
          <h5 className="text-[#3ECF4C]">Rp {price}</h5>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-3"}`}>
      {lists.map((list) =>
        category === list.category ? (
          <Card
            title={list.title}
            desc={list.desc}
            mentorName={list.mentorName}
            mentorJob={list.mentorJob}
            jobPlace={list.jobPlace}
            rating={list.rating}
            voters={list.voters}
            price={list.price}
            category={list.category}
            key={list.title}
          />
        ) : (
          category === "Semua Kelas" && (
            <Card
              title={list.title}
              desc={list.desc}
              mentorName={list.mentorName}
              mentorJob={list.mentorJob}
              jobPlace={list.jobPlace}
              rating={list.rating}
              voters={list.voters}
              price={list.price}
              category={list.category}
              key={list.title}
            />
          )
        )
      )}
    </div>
  );
}
