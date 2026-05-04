import React from "react";
import MySwiper from "../../components/swiper";
import HeaderComp from "../../components/globalComp/header";
import Introduction from "../../components/aboutComp/introduction";

export default function AboutPage() {
  return (
    <div className="mt-10">
      <HeaderComp h1="About us" />
      <MySwiper />
      <Introduction />
    </div>
  );
}
