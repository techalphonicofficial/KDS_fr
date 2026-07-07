import Button from "@/components/ui/Button";

export default function AboutHero({ data }) {

    console.log("career:", data);

  return (
    <section className="relative mt-5 pt-5 pb-5 hero-bg overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#1565c0]/15 glow-blob rounded-full" />

        <div className="container mx-auto mt-5 px-6 max-w-7xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full premium-glass border-[#1565c0]/30 mb-8 animate-fade-in-up">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] !text-[#1565c0]"
              dangerouslySetInnerHTML={{
            __html:data?.title || "khbjyg"
          }}/>
           
           
          </div>
          <h1
            className="text-6xl md:text-8xl font-black !text-gray-200 dark:text-white mb-3 mt-2 leading-[0.9] tracking-tighter animate-fade-in-up transition-colors duration-500"
            style={{ animationDelay: "0.1s" }}
          
            dangerouslySetInnerHTML={{
            __html:data?.subtitle || "huygh"
          }}/>
            {/* <br /> */}
            <span className=" ms-3 gradient-text">Driven by Precision.</span>
          
          <p
            className="text-gray-300 dark:text-[#8b949e] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-3 animate-fade-in-up transition-colors duration-500"
            style={{ animationDelay: "0.2s" }}
          
             dangerouslySetInnerHTML={{
            __html:data?.description || "iuhiuh"
          }}/>
          
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Button
              href="/contact"
              size="lg"
              className="shadow-2xl shadow-[#1565c0]/20 px-4 py-3"
            >
              Partner With Us
            </Button>
          </div>
        </div>
      </section>

  )
}
