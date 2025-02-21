import React from "react";

const Methods = () => {
  return (
    <div className="flex flex-col md:w-2/3 pt-20 gap-40 ">
      <div className="grid md:grid-cols-2 grid-cols-1 items-center">
        <div className=" px-10">
          <p className="text-4xl font-medium">
            Create your own AI character
          </p>
          <p className="text-lg pt-10">
            Create photography with artificial intelligence by creating your own AI character. Upload a set of just 20 photos in a diverse range of places, settings, times, and attire. By inputting these images into your AI character, you're teaching it to recognize and replicate it.
            You only need to train your AI character once which takes about 37 minutes.
          </p>
        </div>
        <div className="px-10">
          <img src={`/images/Method (1).png`} alt="" className='rounded-md rightTransition' />
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 grid-cols-1 items-center">
        <div className="px-10">
          <img src={`/images/Method (1).png`} alt="" className='rounded-md leftTransition' />
        </div>
        <div className=" px-10">
          <p className="text-4xl font-medium">
            Create video clips with AI
          </p>
          <p className="text-lg pt-10">
            Take any AI photo you generated, and turn it into a video by tapping [ Make video ]. A few minutes later you have a short video clip of the photo giving you an immersive virtual reality like experience.
            Photo AI is an official launch partner of Stable Video Diffusion and use their tech to turn images into video. It's not perfect yet for sure but it's nice to play with already. Next features we'll add is boomerang videos, background audio and music, longer 10-30 second clips and voice scripts where the AI character lip syncs.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 items-center">
        <div className=" px-10">
          <p className="text-4xl font-medium">
            Design photorealistic scenes
          </p>
          <p className="text-lg pt-10">
            Design any scene you wish, from commonplace to rare, stunning instances. Imagine the ability to create a photograph of a sunlit Parisian cafe in the 1920s, or a moonlit beach in Bali with just the right clothes, all from the comfort of your living room.
            Simply describe your desired scene and watch as the model generates a highly realistic photo that aligns with your vision. Taking photos is fast: right now it takes about 47 seconds per photo.
          </p>
        </div>
        <div className="px-10">
          <img src={`/images/Method (1).png`} alt="" className='rounded-md rightTransition' />
        </div>
      </div>
    </div>
  )
}

export default Methods