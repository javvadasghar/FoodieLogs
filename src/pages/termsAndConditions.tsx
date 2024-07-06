import React from "react";
import ScreenWrapper from "../components/screenWrapper";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-poppins">
      {/* banner container */}
      <div className="container flex flex-col justify-center items-center w-full mt-9 ">
        <img src="logo.png" alt="main" width={400} height={400} />
      </div>
      <ScreenWrapper title="Terms and Conditions" titleSize="text-3xl">
        <p className="font-poppins text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          ultricies elit eget imperdiet consectetur. Nam blandit mi eget orci
          tempus vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Suspendisse id vestibulum purus. Fusce euismod metus tortor, in
          pellentesque quam consequat in. Nunc iaculis lorem at risus gravida
          malesuada. Cras augue lectus, tempor nec mi non, vehicula dignissim
          nulla. Vestibulum mauris sem, ultricies faucibus semper a, convallis
          at quam. Integer posuere enim vitae velit lacinia, a placerat ante
          gravida. Proin eget fringilla orci, in rhoncus ligula. Nam auctor erat
          sed dui posuere hendrerit. Sed vitae sapien tellus. Ut sit amet
          pretium diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Vivamus ultricies elit eget imperdiet consectetur. Nam blandit mi eget
          orci tempus vehicula. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Suspendisse id vestibulum purus. Fusce euismod metus
          tortor, in pellentesque quam consequat in. Nunc iaculis lorem at risus
          gravida malesuada. Cras augue lectus, tempor nec mi non, vehicula
          dignissim nulla. Vestibulum mauris sem, ultricies faucibus semper a,
          convallis at quam. Integer posuere enim vitae velit lacinia, a
          placerat ante gravida. Proin eget fringilla orci, in rhoncus ligula.
          Nam auctor erat sed dui posuere hendrerit. Sed vitae sapien tellus. Ut
          sit amet pretium diam.
        </p>
      </ScreenWrapper>
    </div>
  );
};

export default TermsAndConditions;
