"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
 
export default function MacbookScrollD() {
  return (
    <div className="flex flex-col overflow-hidden bg-black">
      {/* Desktop/Tablet View */}
      <div className="hidden md:block">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Unleash the power of <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                  Productive Meetings
                </span>
              </h1>
            </>
          }
        >
          <img
            src={`screen1.jpg`}
            alt="hero"
            height={720}
            width={1080}
            className="rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden -my-32">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Unleash the power of <br />
                <span className="text-4xl font-bold mt-1 leading-none">
                  Productive Meetings
                </span>
              </h1>
            </>
          }
        >
          <img
            src={`screenshot_phone.png`}
            alt="hero"
            height={720}
            width={1080}
            className="rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>
    </div>
  );
}