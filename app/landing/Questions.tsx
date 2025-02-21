'use client'
import React, { useEffect } from 'react'
import "@/app/globals.css";

const Questions = () => {
  useEffect(() => {
    const init = async () => {
      const { Collapse, initTWE } = await import("tw-elements");
      initTWE({ Collapse })
    }
    init();
  }, []);

  const questionAnswers = [
    {
      id: "collapseOne",
      question: "How does the Picwise photo generator work?",
      answer: "At Picwise, you can effortlessly upload your selfies and create AI characters, which are then utilized to generate lifelike \
      AI photos of yourself. By training the AI to recognize your unique features, it is capable of producing photorealistic images that \
      accurately represent you. You have the freedom to place yourself in various settings, wear different outfits, engage in different actions, \
      and display diverse expressions. The best part is that you can achieve all of this using your laptop or phone, without the need to invest \
      hundreds or thousands of dollars in a professional photographer. Upon signing up, you gain access to the Picwise studio, \
      where you can utilize our pre-set photo shoot templates, create your own prompts, or even replicate photos of other individuals, \
      allowing you to generate an array of imaginative possibilities."
    },
    {
      id: "collapseTwo",
      question: "What type of photos should I upload?",
      answer: "While we accept images of any size for upload, it is worth noting that uploading clear and well-defined facial images will \
      yield superior results. Additionally, to generate optimal outcomes, a minimum of four photos should be uploaded."
    },
    {
      id: "collapseThree",
      question: "How long will it take to take an AI photo?",
      answer: "Considering the present processing times, it typically requires approximately 60 seconds to capture a single photo. However, \
      it is worth noting that you have the capability to capture up to 16 photos simultaneously, allowing for parallel processing and faster overall results."
    },
    {
      id: "collapseFour",
      question: "How many good photos can I expect?",
      answer: "You can anticipate a high success rate of approximately 80% in capturing exceptional photos comparable to \
      a traditional photo shoot, allowing you to personally select the keepers while accounting for the occasional minor \
      imperfections like extra fingers, unexpected hairstyles, or unusual expressions."
    },
    {
      id: "collapseFive",
      question: "Can I upload or generate photos of kids or minors?",
      answer: "Our service is exclusively intended for individuals who are of legal adult age (16 +). It is important to note that AI \
      results can be unpredictable when applied to children, and therefore, it is advisable to refrain from utilizing the service for such purposes."
    },
    {
      id: "collapseSix",
      question: "Is payment secure?",
      answer: "Rest assured, our payment process is secure as we utilize Stripe for transactions, ensuring that none of your \
      credit card information is stored in our system."
    },
    {
      id: "collapseSeven",
      question: "Can I get a refund?",
      answer: "Regrettably, we are unable to provide refunds due to the substantial expenses associated with creating AI characters and generating AI photos. \
      Our upstream providers do not permit us to request refunds for the GPU processing time expended in the creation and generation process. Granting refunds \
      under these circumstances would result in significant financial losses. When you sign up, you acknowledge and agree to waive your right to a refund for this specific reason."
    }
  ]

  return (
    <div className='max-w-6xl max-md:px-4 px-20 py-20 mb-[40px]'>
      <p className='text-[24px] md:text-[40px] font-medium text-center text-white space-y-1 md:space-y-4 tracking-wider mb-14'>
        Frequently asked questions
      </p>
      <div className='grid grid-cols-2 max-md:grid-cols-1 gap-6'>
        <img src="/Questions/question_final.png" alt="" />
        <div id="accordionExample">
          {questionAnswers.map((value, index) => {
            return (
              <div className="rounded-t-lg  bg-transparent dark:bg-body-dark" key={`qa_${index}`}>
                <h2 className="mb-0" id="headingOne">
                  <button
                    className="text-white group relative flex w-full items-center rounded-t-lg bg-transparent px-5 py-4 text-left text-base text-neutral-800 transition "
                    type="button"
                    data-twe-collapse-init
                    data-twe-collapse-collapsed
                    data-twe-target={`#${value.id}`}
                    aria-expanded="false"
                    aria-controls={value.id}>
                    {value.question}
                    <span
                      className="-me-1 ms-auto h-5 w-5 shrink-0 rotate-[-180deg] transition-transform duration-200 ease-in-out group-data-[twe-collapse-collapsed]:me-0 group-data-[twe-collapse-collapsed]:rotate-0 motion-reduce:transition-none [&>svg]:h-6 [&>svg]:w-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </button>
                </h2>
                <div
                  id={value.id}
                  className="!visible hidden"
                  data-twe-collapse-item
                  aria-labelledby="headingOne"
                  data-twe-parent="#accordionExample">
                  <div className="px-5 py-4">
                    {value.answer}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Questions;