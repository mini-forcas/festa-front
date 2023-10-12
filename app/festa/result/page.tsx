"use client";
import React, { useState, useEffect } from "react";

const TestData = Array.from({ length: 10 }, (_, index) => ({
  id: index,
  name: `name${index + 1}`,
  correctSum: 5,
  answerTime: 100,
  rank: 10 - index,
}));

const Page = () => {
  const [showRanking, setShowRanking] = useState(false);
  const [visibleData, setVisibleData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (showRanking) {
      // ボタンを押したらランキングを表示し、データをランキング順にソートする
      const sortedData = [...TestData].sort(
        (a, b) => a.correctSum - b.correctSum
      );

      // ランキングの低い人から順に表示
      const timer = setInterval(() => {
        if (currentIndex < sortedData.length) {
          setVisibleData((prevData) => [sortedData[currentIndex], ...prevData]);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          clearInterval(timer); // 全データが表示されたらタイマーを停止
        }
      }, 1000); // 1秒ごとに表示

      return () => {
        clearInterval(timer);
      };
    }
  }, [showRanking, currentIndex]);

  const handleShowRanking = () => {
    setShowRanking(true);
  };

  return (
    <>
      <div>{showRanking ? "ランキング" : "結果発表"}</div>
      {showRanking ? (
        visibleData.map((data, index) => (
          <div
            key={data.id}
            className={`flex bg-blue-800 w-2/3 h-20 rounded items-center mt-2 transform transition-transform duration-500 ease-in-out`}
          >
            <div className="w-24 h-16 rounded text-white border bg-blue-500 ml-2 flex items-center justify-center">
              <div className="text-4xl text-center">{data.rank}</div>
            </div>
            <div className="w-2/3 bg-blue-500 rounded h-16 ml-2 flex items-center justify-center">
              <div className="text-4xl text-center text-white">{data.name}</div>
            </div>
            <div className="w-1/4 mr-2 bg-blue-500 rounded h-16 ml-2 flex items-center justify-center">
              <div className="text-xl text-center text-white">
                {data.correctSum}問 {data.answerTime}
              </div>
            </div>
          </div>
        ))
      ) : (
        <button
          onClick={handleShowRanking}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          ランキングを表示
        </button>
      )}
    </>
  );
};

export default Page;
