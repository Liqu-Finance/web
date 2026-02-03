"use client";

import { useState } from "react";
import { FaPause } from "react-icons/fa";

export function CLMMChart() {
  const mockBars = [
    72, 54, 68, 45, 32, 48, 44, 95, 82, 58, 68, 52, 38, 28, 35, 66, 28, 32, 24,
    18, 28, 34, 46, 58, 38, 28, 48,
  ];

  const [lowerRangeIndex, setLowerRangeIndex] = useState(7);
  const [upperRangeIndex, setUpperRangeIndex] = useState(20);
  const currentPriceIndex = 13;

  const maxValue = Math.max(...mockBars);
  const basePrice = 3000;
  const priceStep = 50;

  const getLowerPrice = () => basePrice + lowerRangeIndex * priceStep;
  const getUpperPrice = () => basePrice + upperRangeIndex * priceStep;
  const getCurrentPrice = () => basePrice + currentPriceIndex * priceStep;
  const getLowerPercentage = () =>
    (((getLowerPrice() - getCurrentPrice()) / getCurrentPrice()) * 100).toFixed(
      2
    );
  const getUpperPercentage = () =>
    (((getUpperPrice() - getCurrentPrice()) / getCurrentPrice()) * 100).toFixed(
      2
    );

  return (
    <div className="bg-surface border border-border-main rounded-xl p-5 shadow-sm mb-4">
      <div className="mb-4">
        <h2 className="text-text-main text-lg font-bold mb-1">
          Liquidity Distribution
        </h2>
        <p className="text-text-secondary text-sm">
          CLMM range visualization for optimal position
        </p>
      </div>

      <div className="relative pt-16 pb-8 select-none">
        <div className="absolute top-0 left-0 w-full flex items-start justify-between mb-2">
          <div
            className="flex flex-col items-center"
            style={{
              position: "absolute",
              left: `${(lowerRangeIndex / mockBars.length) * 100}%`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="text-xs font-semibold text-text-main mb-1">
              ${getLowerPrice().toFixed(2)}
            </div>
            <div
              className="w-7 h-7 bg-brand rounded flex items-center justify-center shadow-md cursor-grab active:cursor-grabbing relative z-10"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const startX = e.clientX;
                const startIndex = lowerRangeIndex;
                const container = document.querySelector(".relative.pt-16") as HTMLElement;

                const handleMouseMove = (moveEvent: MouseEvent) => {
                  moveEvent.preventDefault();
                  if (container) {
                    const rect = container.getBoundingClientRect();
                    const deltaX = moveEvent.clientX - startX;
                    const barWidth = rect.width / mockBars.length;
                    const deltaIndex = Math.round(deltaX / barWidth);
                    const newIndex = Math.max(
                      0,
                      Math.min(currentPriceIndex - 1, startIndex + deltaIndex)
                    );
                    setLowerRangeIndex(newIndex);
                  }
                };
                const handleMouseUp = () => {
                  document.removeEventListener("mousemove", handleMouseMove);
                  document.removeEventListener("mouseup", handleMouseUp);
                  document.body.style.cursor = "";
                };
                document.body.style.cursor = "grabbing";
                document.addEventListener("mousemove", handleMouseMove);
                document.addEventListener("mouseup", handleMouseUp);
              }}
            >
              <FaPause className="text-white text-xs rotate-90" />
            </div>
            <div className="absolute top-[52px] w-0.5 h-40 border-l-2 border-dashed border-brand/60" />
            <div className="text-xs font-medium text-text-secondary mt-1">
              {getLowerPercentage()}%
            </div>
          </div>

          <div
            className="flex flex-col items-center"
            style={{
              position: "absolute",
              left: `${(currentPriceIndex / mockBars.length) * 100}%`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="text-xs font-semibold text-text-main mb-3">
              ${getCurrentPrice().toFixed(2)}
            </div>
            <div className="absolute top-[24px] w-0.5 h-40 border-l-2 border-dashed border-text-secondary/40" />
          </div>

          <div
            className="flex flex-col items-center"
            style={{
              position: "absolute",
              left: `${(upperRangeIndex / mockBars.length) * 100}%`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="text-xs font-semibold text-text-main mb-1">
              ${getUpperPrice().toFixed(2)}
            </div>
            <div
              className="w-7 h-7 bg-brand rounded flex items-center justify-center shadow-md cursor-grab active:cursor-grabbing relative z-10"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const startX = e.clientX;
                const startIndex = upperRangeIndex;
                const container = document.querySelector(".relative.pt-16") as HTMLElement;

                const handleMouseMove = (moveEvent: MouseEvent) => {
                  moveEvent.preventDefault();
                  if (container) {
                    const rect = container.getBoundingClientRect();
                    const deltaX = moveEvent.clientX - startX;
                    const barWidth = rect.width / mockBars.length;
                    const deltaIndex = Math.round(deltaX / barWidth);
                    const newIndex = Math.max(
                      currentPriceIndex + 1,
                      Math.min(mockBars.length - 1, startIndex + deltaIndex)
                    );
                    setUpperRangeIndex(newIndex);
                  }
                };
                const handleMouseUp = () => {
                  document.removeEventListener("mousemove", handleMouseMove);
                  document.removeEventListener("mouseup", handleMouseUp);
                  document.body.style.cursor = "";
                };
                document.body.style.cursor = "grabbing";
                document.addEventListener("mousemove", handleMouseMove);
                document.addEventListener("mouseup", handleMouseUp);
              }}
            >
              <FaPause className="text-white text-xs rotate-90" />
            </div>
            <div className="absolute top-[52px] w-0.5 h-40 border-l-2 border-dashed border-brand/60" />
            <div className="text-xs font-medium text-text-secondary mt-1">
              +{getUpperPercentage()}%
            </div>
          </div>
        </div>

        <div className="relative h-40">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${mockBars.length * 10} 100`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <path
              d={`M 0 100 ${mockBars
                .map((value, index) => {
                  const x = index * 10 + 5;
                  const y = 100 - (value / maxValue) * 100;
                  return `L ${x} ${y}`;
                })
                .join(" ")} L ${mockBars.length * 10} 100 Z`}
              fill="url(#areaGradient)"
              stroke="none"
            />
            <path
              d={`M 0 ${100 - (mockBars[0] / maxValue) * 100} ${mockBars
                .map((value, index) => {
                  const x = index * 10 + 5;
                  const y = 100 - (value / maxValue) * 100;
                  return `L ${x} ${y}`;
                })
                .join(" ")}`}
              fill="none"
              stroke="#ec4899"
              strokeWidth="0.5"
              opacity="0.6"
            />
          </svg>

          <div className="flex items-end justify-between gap-1 h-40 relative">
            {mockBars.map((value, index) => {
              const heightPercentage = (value / maxValue) * 100;
              const isInRange =
                index >= lowerRangeIndex && index <= upperRangeIndex;

              return (
                <div key={index} className="flex-1 relative">
                  <div
                    className={`w-full rounded-t transition-all ${
                      isInRange ? "bg-brand" : "bg-brand/20"
                    }`}
                    style={{ height: `${heightPercentage}%` }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-text-secondary text-xs">
        <span>Lower Range</span>
        <span>Current Price</span>
        <span>Upper Range</span>
      </div>
    </div>
  );
}
