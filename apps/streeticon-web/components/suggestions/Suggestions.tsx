import React from "react";
import SuggestionItem from "./SuggestionItem";
import SuggestionList from "./SuggestionList";
import BlueBottleLogo from "public/images/bluebottle-logo.svg";
import StarbucksLogo from "public/images/starbucks-logo.svg";
import WomenImage1 from "public/images/women-1.jpg";
import MenImage1 from "public/images/men-1.jpg";

const Suggestions = () => {
  return (
    <SuggestionList>
      <SuggestionItem
        img={BlueBottleLogo}
        title="블루보틀"
        desc="콜시츠키와 최초의 블루보틀"
      />
      <SuggestionItem
        img={WomenImage1}
        title="쥴리"
        desc="여행과 커피를 사랑하는 평범한 여자입니다."
      />
      <SuggestionItem
        img={StarbucksLogo}
        title="스타벅스"
        desc="한국적인 디자인"
      />
      <SuggestionItem
        img={MenImage1}
        title="스테판"
        desc="그린테라스의 바리스타로 일하고 있습니다."
      />
      <SuggestionItem
        img={BlueBottleLogo}
        title="블루보틀"
        desc="콜시츠키와 최초의 블루보틀"
      />
      <SuggestionItem
        img={WomenImage1}
        title="쥴리"
        desc="여행과 커피를 사랑하는 평범한 여자입니다."
      />
      <SuggestionItem
        img={StarbucksLogo}
        title="스타벅스"
        desc="한국적인 디자인"
      />
      <SuggestionItem
        img={MenImage1}
        title="스테판"
        desc="그린테라스의 바리스타로 일하고 있습니다."
      />
    </SuggestionList>
  );
};

export default Suggestions;
