"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
    let SCENES_V2 = [
        {
            title: <img src="IMG_8244.PNG" className="h-auto w-1/2 mix-blend-color-dodge"/>,
            // cover: "IMG_8238.PNG",
            images: [
                "IMG_8238.PNG",
                "IMG_8236.PNG",
                "IMG_8237.PNG",
                "IMG_8239.PNG",
                "IMG_8240.PNG",
                "IMG_8242.PNG",
                "IMG_8243.PNG",
            ],
            description: ["2019", "highschool rock band", "satirical themes of death and destruction", "music was kinda shit but we had a lot of fun", "we peaked when we played a garage"]
        },
        {
            title: <img src="monkey-game-wireframe.png" className="h-auto w-1/2 mix-blend-hard-light"/>,
            images: [
                "level1.png",
                "level2.png",
                "level3.png",
                "level4.png",
                "level5.png",
            ],
            description: [
                "2023",
                "Monkey Game",
                "a music minigame where players must remember how the bongos sound and then play back the sequence to progress",
                "bananas give life"
            ]
        }
        // Add more scenes as needed
    ]

    const [currentScene, setCurrentScene] = useState(0)
    const [currentImage, setCurrentImage] = useState(0)
    const [showDescription, setShowDescription] = useState(false)

    const handleScroll = (e: any) => {
        const container = document.getElementById('container')!
        if (!container) return
        const height = container.clientHeight
        const newSceneIndex = Math.floor(container.scrollTop / height)
        if (newSceneIndex !== currentScene) {
            setShowDescription(false) // Hide description on scene change
            setCurrentScene(newSceneIndex)
            // setCurrentImage(0)
        }
    }

    const toggleDescription = () => {
        setShowDescription(!showDescription)
    }

    return (
    <div className="relative bg-black h-[100svh] overflow-clip">
        <div id="container" className={`relative top-0 left-0 container grid items-center justify-center gap-0 h-[100svh] z-20 ${showDescription ? "overflow-y-hidden" : "overflow-y-scroll"}`} style={{ scrollSnapType: "y mandatory" }} onScroll={handleScroll}>
            {SCENES_V2.map((scene, index) => (
                <div key={index} className={`h-[100svh] relative transition-transform duration-200 ${showDescription ? "overflow-x-scroll scale-90 rounded-lg" : "overflow-x-hidden scale-100"}`} style={{ scrollSnapAlign: "center", scrollSnapType: "x mandatory", transformOrigin: "center center"}} onClick={toggleDescription}>
                    <div className={`absolute top-0 left-0 w-full h-full flex justify-center items-center ${showDescription ? "opacity-0" : "opacity-100"}`} style={{ pointerEvents: 'none'}}>
                        {scene.title}
                    </div>
                    <div  className={`w-full h-full flex `} >
                        {scene.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt=""
                                style={{ scrollSnapAlign: 'start' }} 
                                className="h-[100svh] w-auto object-cover"
                            />
                        ))}
                    </div>
                    {showDescription && (
                        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center flex-col gap-2">
                            {scene.description.map((text, index) => (
                                <p key={index} className="text-white text-center mx-6">{text}</p>
                            ))}
                            <p>→</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
)
}