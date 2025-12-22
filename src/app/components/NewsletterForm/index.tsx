import { useEffect } from "react";

export default function NewsletterForm() {
  return (
    <div className="bg-[#292524] py-12 px-4 border-y border-[#44403c]">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl font-medium mb-4 text-[#e7e5e4]">Newsletter</h3>
        <p className="text-[#a8a29e] mb-6">
          Receba atualizações sobre meus artigos e projetos
        </p>
        <iframe 
          className="flex flex-1 w-full bg-transparent mx-auto" 
          src="https://andrebordignon.substack.com/embed" 
          width="480" 
          height="300" 
          style={{ border: "1px solid #44403c", background: "transparent", borderRadius: "8px" }} 
          frameBorder="0" 
          scrolling="no"
        ></iframe>
      </div>
    </div>
  );
}
