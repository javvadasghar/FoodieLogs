import { BiSolidPencil } from "react-icons/bi";
import ScreenWrapper from "../components/screenWrapper";
import { Rating } from "react-simple-star-rating";

const SingleMenuItem: React.FC = () => {
  return (
    <ScreenWrapper title="Whopper" isHeartVisible={true} isHeartFilled={true}>
      {/* Menu items */}

      {/* About */}
      <div className="flex flex-col justify-center items-center gap-y-7">
        <Rating
          size={50}
          transition
          allowFraction
          readonly
          SVGstyle={{
            display: "inline",
          }}
          initialValue={4.5}
          fillColor="#E0A961"
        />
        <BiSolidPencil
          className="text-primary border-2 border-grayDark rounded-full p-2 cursor-pointer"
          size={40}
        />
      </div>

      <div className="flex flex-col mt-5">
        <h3 className="uppercase font-poppins font-bold text-xl text-left">
          Review and notes
        </h3>
        <p className="font-poppins mt-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
      </div>
    </ScreenWrapper>
  );
};

export default SingleMenuItem;
