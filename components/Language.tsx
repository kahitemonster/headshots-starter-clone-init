"use client"

import i18n from "@/app/i18n"
import { useEffect, useState } from "react"

export default function Language (): any {
  const [language, setLanguage] = useState("en")

  const handleChangeLanguage = (val: any) => {
    setLanguage(val)
    i18n.changeLanguage(val)
  }

  return (
    <div>
      <select 
        onChange={(e) => handleChangeLanguage(e.target.value)}
        value={language}
        className="block p-2 text-md text-white-900 border border-gray-900 rounded-lg bg-black focus:ring-blue-500 focus:border-blue-500" 
      >
        <option value='en'>English</option>
        <option value='pl'>Polski</option>
      </select>
      <p>{i18n.t('Company_name')}</p>
    </div>
  )
}