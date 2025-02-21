export default function Index() {

  const privacyInformation = [
    { title: "Your Privacy is our Priority", description: "We prioritize your privacy and take it seriously. Rest assured that your personal data and information are handled with the utmost care and security" },
    { title: "No Sharing of Your Data", description: "We strictly adhere to a policy of not sharing your data with any third parties. Your information is kept confidential and will never be sold or distributed" },
    { title: "Empowering User Consent", description: "We believe in putting you in control. We will never utilize your data or images to train AI models without your explicit consent. Your permission matters to us" },
    { title: "Responsive Customer Support", description: "We offer responsive customer support to address any concerns or queries you may have. Our dedicated support team is available to assist you promptly and efficiently." }
  ]

  return (
    <div className="max-w-6xl px-8 py-4">
      <p className='text-[24px] md:text-[40px] font-medium font-Poppins text-center text-white space-y-1 md:space-y-4 tracking-wider'>
        We value user privacy
      </p>
      <p className="text-[12px] md:text-[20px] text-center pt-6">
        Picwise.Pro always respect user's information
      </p>
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
        {[...Array(4)].map((value, index) => {
          return (
            <div className="flex flex-col bg-black border-[1px] border-white rounded-md p-6">
              <p className="text-white text-[24px] pt-2">
                {privacyInformation[index].title}
              </p>
              <p className="text-[#ABABAB] pt-4">
              {privacyInformation[index].description}
              </p>
              <img src={`/Encryption/encryption${index+1}.png`} />
            </div>
          )
        })}
      </div>
    </div>
  )
}